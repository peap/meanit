angular.module('meanit', ['ui.router'])

.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl',
            resolve: {
                postPromise: ['posts', function(posts){
                    return posts.getAll();
                }],
            },
        })
        .state('post', {
            url: '/post/{id}',
            templateUrl: '/post.html',
            controller: 'PostCtrl',
        })
    ;
   $urlRouterProvider.otherwise('home');
}])

.factory('posts', ['$http', function($http){
    var o = {
        posts: [],
        getAll: function() {
            return $http.get('/posts').success(function(data){
                angular.copy(data, o.posts);
            });
        },
    };
    return o;
}])

.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
    $scope.posts = posts.posts;
    $scope.addPost = function(){
        var title = $scope.title;
        var link = $scope.link;
        var id = posts.posts.length;
        if (title){
            $scope.posts.push({id: id, title: title, link: link, upvotes: 0, comments: []});
            $scope.title = '';
            $scope.link = '';
        }
    };
    $scope.downvote = function(post){
        post.upvotes -= 1;
    };
    $scope.upvote = function(post){
        post.upvotes += 1;
    };
}])

.controller('PostCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.downvote = function(comment){
        comment.upvotes -= 1;
    };
    $scope.upvote = function(comment){
        comment.upvotes += 1;
    };
    $scope.addComment = function(){
        if ($scope.body){
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0,
            });
            $scope.body = '';
        }
    };
}])

;
