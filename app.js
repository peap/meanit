angular.module('meanit', [])
.factory('posts', [function(){
    var o = {
        posts: [
            {title: 'post 1', link: 'one', upvotes: 5},
            {title: 'post 2', link: '', upvotes: 43},
            {title: 'post 3', link: 'three', upvotes: 300},
            {title: 'post 4', link: '', upvotes: 12},
            {title: 'post 5', link: '', upvotes: -10},
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
}]);
