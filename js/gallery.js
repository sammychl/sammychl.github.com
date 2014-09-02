/********************************
 ** stuff for firebase uploading **
 ********************************/

var app = angular.module('gallery', ['firebase']);

app.controller('galleryCtrl', function($scope, $firebase) {
	var galleryRef = new Firebase('https://glowing-fire-6466.firebaseIO.com/gallery');
	var galleryRefSync = $firebase(galleryRef);
	var galleriesArr = galleryRefSync.$asArray();


	$scope.photos = [];
	$scope.meta = {};
	$scope.posts = galleriesArr;
	console.log(galleriesArr);
	$scope.security = {password:""};
	$scope.selectedPost = {};
	$scope.setSelectedPost = function(id) {
		var post = galleriesArr.$getRecord(id);
		console.log($scope.selectedPost);
		if (post.password === $scope.security.password) {
			$scope.selectedPost = post;	
		}
		console.log($scope.selectedPost);
	}; 
});
