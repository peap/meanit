angular.module('meanit', [])
.controller('MainCtrl', [
'$scope',
function($scope){
    $scope.posts = [
        {title: 'post 1', link: '', upvotes: 5},
        {title: 'post 2', link: '', upvotes: 43},
        {title: 'post 3', link: '', upvotes: 300},
        {title: 'post 4', link: '', upvotes: 12},
        {title: 'post 5', link: '', upvotes: -10},
    ];
    $scope.addPost = function(){
        var title = $scope.title;
        var link = $scope.link;
        if (title && link){
            $scope.posts.push({title: title, link: link, upvotes: 0});
            $scope.title = '';
        }
    };
    $scope.downvote = function(post){
        post.upvotes -= 1;
    };
    $scope.upvote = function(post){
        post.upvotes += 1;
    };
}]);
