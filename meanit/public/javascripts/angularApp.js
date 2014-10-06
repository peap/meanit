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
    };
    o.getAll = function() {
        return $http.get('/posts').success(function(data){
            angular.copy(data, o.posts);
        });
    };
    o.create = function(post) {
        return $http.post('/posts', post).success(function(data){
            o.posts.push(data);
        });
    };
    o.downvote = function(post) {
        return $http.put('/posts/' + post._id + '/downvote').success(function(data){
            post.upvotes = data.upvotes;
        });
    };
    o.upvote = function(post) {
        return $http.put('/posts/' + post._id + '/upvote').success(function(data){
            // duplicating logic in backend... could be wrong
            post.upvotes = data.upvotes;
        });
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
            posts.create({
                title: title,
                link: link,
            });
            $scope.title = '';
            $scope.link = '';
        }
    };
    $scope.downvote = function(post){
        posts.downvote(post);
    };
    $scope.upvote = function(post){
        posts.upvote(post);
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
