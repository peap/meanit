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
        })
        .state('post', {
            url: '/post/{id}',
            templateUrl: '/post.html',
            controller: 'PostCtrl',
        })
    ;
   $urlRouterProvider.otherwise('home');
}])

.factory('posts', [function(){
    var o = {
        posts: [
            {id: 0, title: 'post 1', link: 'one',   upvotes: 5,   comments: []},
            {id: 1, title: 'post 2', link: '',      upvotes: 43,  comments: []},
            {id: 2, title: 'post 3', link: 'three', upvotes: 300,
                comments: [{author: 'Eric', body: 'hey', upvotes: 4},]
            },
            {id: 3, title: 'post 4', link: '',      upvotes: 12,  comments: []},
            {id: 4, title: 'post 5', link: '',      upvotes: -10, comments: []},
        ],
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
        if (title){
            $scope.posts.push({title: title, link: link, upvotes: 0});
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
