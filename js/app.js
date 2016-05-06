/**
 * Created by kshah on 5/6/16.
 */
var app = angular.module("groceryListApp", ["ngRoute"]);

app.controller ("appTitle", ["$scope", function ($scope) {
    $scope.title = "Grocery List";
}]);

app.controller ("groceryList", ["$scope", function ($scope) {
    $scope.items = [
        {completed: true, name: "milk", date: "01/01/2016"},
        {completed: true, name: "butter", date: "02/01/2016"},
        {completed: true, name: "bread", date: "03/01/2016"},
        {completed: true, name: "eggs", date: "04/01/2016"},
        {completed: true, name: "sugar", date: "05/01/2016"},
        {completed: true, name: "salt", date: "06/01/2016"},
        {completed: true, name: "pepper", date: "07/01/2016"},
        {completed: true, name: "cheese", date: "08/01/2016"}
    ];
}]);