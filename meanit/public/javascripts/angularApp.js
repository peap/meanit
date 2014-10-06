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
            resolve: {
                post: ['$stateParams', 'posts', function($stateParams, posts) {
                    return posts.get($stateParams.id);
                }],
            },
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
    o.get = function(id) {
        return $http.get('/posts/' + id).then(function(res){
            return res.data;
        });
    };
    o.addComment = function(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment);
    };
    o.downvoteComment = function(post, comment) {
        var url = '/posts/' + post._id + '/comments/' + comment._id + '/downvote';
        return $http.put(url).success(function(data){
            comment.upvotes = data.upvotes;
        });
    };
    o.upvoteComment = function(post, comment) {
        var url = '/posts/' + post._id + '/comments/' + comment._id + '/upvote';
        return $http.put(url).success(function(data){
            comment.upvotes = data.upvotes;
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
'posts',
'post',
function($scope, posts, post){
    $scope.post = post;
    $scope.downvote = function(comment){
        posts.downvoteComment(post, comment);
    };
    $scope.upvote = function(comment){
        posts.upvoteComment(post, comment);
    };
    $scope.addComment = function(){
        if ($scope.body){
            posts.addComment(post._id, {
                body: $scope.body,
                author: 'user',
                upvotes: 0,
            }).success(function(comment){
                $scope.post.comments.push(comment);
            });
            $scope.body = '';
        }
    };
}])

;
