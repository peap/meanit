angular.module('meanit', [])
.controller('MainCtrl', [
'$scope',
function($scope){
    $scope.test = 'Welcome to meanit.';
}]);
