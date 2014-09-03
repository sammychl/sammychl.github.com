/********************************
 ** stuff for firebase uploading **
 ********************************/

var app = angular.module('gallery', ['firebase']);

app.controller('galleryCtrl', function($scope, $firebase) {
	var galleryRef = new Firebase('https://glowing-fire-6466.firebaseIO.com/gallery');
	var galleryRefSync = $firebase(galleryRef);
	var galleriesArr = galleryRefSync.$asArray();
	var post;

	$scope.photos = [];
	$scope.meta = {};
	$scope.posts = galleriesArr;
	console.log(galleriesArr);
	$scope.security = {password:"", passwordValid:false};
	$scope.selectedPost = {};
	$scope.setSelectedPost = function(id) {
		post = galleriesArr.$getRecord(id);
		console.log($scope.selectedPost);
		if (post.password === $scope.security.password || post.password == "") {
			$scope.security.passwordValid = true;
			$scope.selectedPost = post;
		}
		else {
			$scope.security.passwordValid = false;
			$scope.selectedPost = {};
		}
		console.log($scope.selectedPost);
	};

	$scope.checkPassword = function() {
		if (post.password === $scope.security.password || post.password == "") {
			$scope.security.passwordValid = true;
			$scope.selectedPost = post;
		}
		else {
			$scope.security.passwordValid = false;
			$scope.selectedPost = {};
		}

	}
});
