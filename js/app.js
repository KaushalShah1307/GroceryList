/**
 * Created by kshah on 5/6/16.
 */
var app = angular.module("groceryListApp", []);

app.controller ("appTitle", ["$scope", function ($scope) {
    $scope.title = "Grocery List";
}]);

app.controller ("groceryList", ["$scope", function () {
    $scope.items = [
        {completed: true, name: "milk", date: "01/01/2016"},
        {completed: true, name: "butter", date: "02/01/2016"}
    ];
}]);