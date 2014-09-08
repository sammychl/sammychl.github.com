/********************************
 ** stuff for firebase uploading **
 ********************************/

var app = angular.module('gallery', ['firebase', 'bootstrapLightbox']);

app.controller('galleryCtrl', function($scope, $firebase, Lightbox) {
	var galleryRef = new Firebase('https://glowing-fire-6466.firebaseIO.com/gallery');
	var galleryRefSync = $firebase(galleryRef);
	var galleriesArr = galleryRefSync.$asArray();
	var post;

	$scope.photos = [];
	$scope.meta = {};
	$scope.posts = galleriesArr;
	console.log(galleriesArr);
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
		console.log($scope.selectedPost);
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
		console.log($scope.selectedPost);
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

app.directive('fbShare', [
    function() {
        return {
            restrict: 'A',
            scope: {thumbnailLink: '='},
            link: function(scope, element) {
                element.on('click', function() {
                    FB.ui({
                        method: 'feed',
                        name: 'Name you want to show',
                        link: scope.thumbnailLink,
                        picture: scope.thumbnailLink,
                        caption: 'Caption you want to show',
                        description: 'Description you want to show',
                        message: 'Message you want to show'
                    });
                });
            }
        };
    }
]);
