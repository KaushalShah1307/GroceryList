/**
 * Created by kshah on 5/6/16.
 */
var app = angular.module("groceryListApp", []);

app.controller ("appTitle", ["$scope", function ($scope) {
    $scope.title = "Grocery List";
}]);