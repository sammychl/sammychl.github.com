/*******************************
 ** stuff for dropbox chooser api**
 ******************************/

var imageFiles = [];
var options = {

	// Required. Called when a user selects an item in the Chooser.
	success: function(files) {
		imageFiles = files;
		alert("Photos successfully selected. Please enter Tags,Title, and Password then click firebasePush");
	},

	// Optional. Called when the user closes the dialog without selecting a file
	// and does not include any parameters.
	cancel: function() {
		alert("user cancelled by closing dialog without selecting file");
	},

	// Optional. "preview" (default) is a preview link to the document for sharing,
	// "direct" is an expiring link to download the contents of the file. For more
	// information about link types, see Link types below.
	linkType: "preview", // or "direct"

	// Optional. A value of false (default) limits selection to a single file, while
	// true enables multiple file selection.
	multiselect: true,

	// Optional. This is a list of file extensions. If specified, the user will
	// only be able to select files with these extensions. You may also specify
	// file types, such as "video" or "images" in the list. For more information,
	// see File types below. By default, all extensions are allowed.
	extensions: ['.jpg']
};

var button = Dropbox.createChooseButton(options);
document.getElementById("dropboxChooser").appendChild(button);

/********************************
 ** stuff for firebase uploading **
 ********************************/

var app = angular.module('galleryChooser', ['firebase']);


function rawDownload (imageFiles) {
	angular.forEach(imageFiles, function(file) {
		file.thumbnailLink = file.thumbnailLink.replace("bounding_box=75&mode=fit", "bounding_box=256&mode=fit");
		file.link = file.link.replace("?dl=0", "?raw=1");
	});
	return imageFiles;

}

app.controller('galleryChooserCtrl', function($scope, $firebase, $firebaseSimpleLogin) {
	var galleryRef = new Firebase('https://glowing-fire-6466.firebaseIO.com/gallery');
	var galleryRefSync = $firebase(galleryRef);
	var galleriesArr = galleryRefSync.$asArray();
	var authClient = $firebaseSimpleLogin(galleryRef);

	$scope.cred = {email:"", password:""};
	$scope.currentUser = {};
	$scope.loginUser = function() {
		authClient.$login('password', {
			email: $scope.cred.email,
			password: $scope.cred.password
		});
		$scope.currentUser = authClient.user;		
	};


	$scope.photos = [];
	$scope.meta = {};
	$scope.posts = galleriesArr;


	$scope.selectedPost = {};


	$scope.setSelectedPost = function(id) {
		$scope.selectedPost = galleriesArr.$getRecord(id);
		console.log($scope.selectedPost);
	};


	$scope.firebasePush = function() {
		console.log('firebasePush');
		galleriesArr.$add({
			weddingDate: new Date(),
			tags: $scope.meta.tags,
			title: $scope.meta.title,
			password: $scope.meta.password,
			description: $scope.meta.description,
			fburl: $scope.meta.fburl,
			files: rawDownload(imageFiles)
		}).then(function(ref) {
			var id = ref.name();
			console.log("added record with id " + id);
			$scope.photos = galleriesArr[galleriesArr.$indexFor(id)].files;
			$scope.post = galleriesArr[galleriesArr.$indexFor(id)];
		});
		
	};	
});



