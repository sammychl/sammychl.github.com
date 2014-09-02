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

	$scope.selectedPost = {};
	$scope.setSelectedPost = function(id) {
		$scope.selectedPost = galleriesArr.$getRecord(id);
		console.log($scope.selectedPost);
	}; 
});
