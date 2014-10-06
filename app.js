angular.module('meanit', [])
.controller('MainCtrl', [
'$scope',
function($scope){
    $scope.posts = [
        {title: 'post 1', upvotes: 5},
        {title: 'post 2', upvotes: 43},
        {title: 'post 3', upvotes: 300},
        {title: 'post 4', upvotes: 12},
        {title: 'post 5', upvotes: 10},
    ];
}]);
