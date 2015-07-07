'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		// Create new Article
		$scope.create = function() {
			// Create new Article object
			var article = new Articles({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Article
		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		// Update existing Article
		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Articles
		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		// Find existing Article
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};

		$scope.currentPage = 0;
		$scope.pageSize = 5;
		$scope.images = ["http://everythingbirdsonline.com/wp-content/uploads/2014/06/birds-of-paradise.jpg",
						"http://randomstory.org/wp-content/uploads/2013/07/44.jpg",
						"http://www.photographyblogger.net/wp-content/uploads/2012/06/Brightly-Colored-Birds22.jpg",
						"http://i.telegraph.co.uk/multimedia/archive/02649/birds-mouse_2649566k.jpg",
						"http://creationrevolution.com/wp-content/uploads/2012/12/bird1.jpg",
						"http://amolife.com/image/images/stories/beautiful%20birds/beautiful-birds-1.jpg",
						"https://upload.wikimedia.org/wikipedia/commons/3/32/House_sparrow04.jpg",
						"http://www.pageresource.com/wallpapers/wallpaper/birds-falcon-bird.jpg",
						"http://news.bbcimg.co.uk/media/images/73826000/jpg/_73826131_trevorhannant-greattit.jpg",
						"http://www.pageresource.com/wallpapers/wallpaper/bird-birds_569458.jpg"];

		$scope.selectedPhoto=$scope.images[0];
		$scope.numberOfPages=function(){
			return Math.ceil($scope.images.length/$scope.pageSize);
		}
		$scope.select=function(url){
			var index= $scope.images.indexOf(url);
			$scope.selectedPhoto=$scope.images[index];
		}


	}
]);
