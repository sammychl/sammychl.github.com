/********************************
 ** stuff for firebase uploading **
 ********************************/

var app = angular.module('gallery', ['firebase', 'bootstrapLightbox']);

app.controller('galleryCtrl', function($scope, $firebase, Lightbox, $sce) {
	var galleryRef = new Firebase('https://glowing-fire-6466.firebaseIO.com/gallery');
	var galleryRefSync = $firebase(galleryRef);
	var galleriesArr = galleryRefSync.$asArray();
	var post = {folderId:""};

	$scope.photos = [];
	$scope.meta = {};
	$scope.posts = galleriesArr;

	$scope.security = {password:"", passwordValid:false};
	$scope.selectedPost = false;


	function matchPostToLightboxApi (post) {
		angular.forEach(post.files, function(image) {
			image.url = image.link;
			image.caption = image.name;
		});
		return post;
	}

	$scope.openLightboxModal = function(index) {
		Lightbox.openModal($scope.selectedPost.files, index);
	};

	
	$scope.setSelectedPost = function(id) {
		post = galleriesArr.$getRecord(id);

		if (post.password === $scope.security.password || post.password === "null") {
			$scope.security.passwordValid = true;
			$scope.security.passwordError = "";
			$scope.selectedPost = matchPostToLightboxApi(post);
		}
		else {
			$scope.security.passwordValid = false;
			$scope.security.passwordError = "Please enter Password";
			$scope.selectedPost = {};
		}
		
	};
	
	/* Set iframeSrc **/
	$scope.iframeSrc = $sce.trustAsResourceUrl(getIframeUrl())
	
	function getIframeUrl(){	
		// One should think about their particular case and sanitize accordingly
		var baseUrl = "https://drive.google.com/embeddedfolderview?id="; 
		var qs = "0B_X7y9ovzp5UdE1CZnFieVhVQjA#list" && (post.folderId + "#grid")
		// `baseUrl` isn't exposed to a user's control, so we don't have to worry about escaping it.?
		return baseUrl + qs;		
	};

	
	
	
	
	$scope.checkPassword = function() {
		if (post.password === $scope.security.password || post.password === "null") {
			$scope.security.passwordValid = true;
			$scope.security.passwordError = "";
			$scope.selectedPost = matchPostToLightboxApi(post);
		}
		else {
			$scope.security.passwordValid = false;
			$scope.security.passwordError = "Incorrect Password";
			$scope.selectedPost = {};
		}

	};
});


