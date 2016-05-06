/**
 * Created by kshah on 5/6/16.
 */
var app = angular.module("groceryListApp", ["ngRoute"]);

app.config (function ($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "views/groceryList.html",
            controller: "groceryList"
        })
        .when("/addItem", {
            templateUrl: "views/addItem.html",
            controller: "groceryList"
        })
        .when("/addItem/:id", {
            templateUrl: "views/addItem.html",
            controller: "groceryList"
        })
        .otherwise({
            redirectTo: "/"
        })
});

app.service ("GroceryService", function () {

        var groceryService = {};

        groceryService.items = [
            {completed: true, name: "milk", date: "01/01/2016"},
            {completed: true, name: "butter", date: "02/01/2016"},
            {completed: true, name: "bread", date: "03/01/2016"},
            {completed: true, name: "eggs", date: "04/01/2016"},
            {completed: true, name: "sugar", date: "05/01/2016"},
            {completed: true, name: "salt", date: "06/01/2016"},
            {completed: true, name: "pepper", date: "07/01/2016"},
            {completed: true, name: "cheese", date: "08/01/2016"}
        ];

        return groceryService;
});

app.controller ("appTitle", ["$scope", "GroceryService",function ($scope, GroceryService) {
    $scope.title = "Grocery List";
}]);

app.controller ("groceryList", ["$scope", "$routeParams", "GroceryService", function ($scope, $routeParams, GroceryService) {

    $scope.items = GroceryService.items;

        $scope.rp = "This is the parameter value: " +$routeParams.id;

}]);