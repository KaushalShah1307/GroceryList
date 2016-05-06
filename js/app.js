/**
 * Created by kshah on 5/6/16.
 */
var app = angular.module("groceryListApp", ["ngRoute"]);

app.config (function ($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "views/groceryList.html",
            controller: "appTitle"
        })
        .when("/addItem", {
            templateUrl: "views/addItem.html",
            controller: "groceryList"
        })
        .when("/addItem/edit/:id", {
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
            {id: 1, completed: true, name: "milk", date: "01/01/2016"},
            {id: 2, completed: true, name: "butter", date: "02/01/2016"},
            {id: 3, completed: true, name: "bread", date: "03/01/2016"},
            {id: 4, completed: true, name: "eggs", date: "04/01/2016"},
            {id: 5, completed: true, name: "sugar", date: "05/01/2016"},
            {id: 6, completed: true, name: "salt", date: "06/01/2016"},
            {id: 7, completed: true, name: "pepper", date: "07/01/2016"},
            {id: 8, completed: true, name: "cheese", date: "08/01/2016"}
        ];

        groceryService.findById = function (id) {
            for (var item in groceryService.items) {
                if(groceryService.items[item].id === id){
                    return groceryService.items[item];
                }
            }
        }

        groceryService.getNewId = function () {
            if(groceryService.newId){
                    groceryService.newId++;
                    return groceryService.newId;
            }else{
                var MaxId = _.max(groceryService.items, function (entry) {
                    return entry.id;
                    groceryService.newId = MaxId.id + 1;
                    return groceryService.newId;
                })
            }
        }

        groceryService.save = function (entry) {
            var updatedItem = groceryService.findById(entry.id);
            if(updatedItem){
                groceryService.completed = entry.completed;
                groceryService.name = entry.name;
                groceryService.date = entry.date;
            }else {
                entry.id = groceryService.getNewId(entry);
                groceryService.items.push(entry);
            }
        }

        return groceryService;
});

app.controller ("appTitle", ["$scope", "GroceryService",function ($scope, GroceryService) {
    $scope.title = "Grocery List";
    $scope.items = GroceryService.items;
}]);

app.controller ("groceryList", ["$scope", "$routeParams", "GroceryService", "$location", function ($scope, $routeParams, GroceryService, $location) {

    if(!$routeParams) {
        $scope.groceryItem = {id: 9, completed: false, name: "", date: new Date()};
    }else{
        $scope.groceryItem = GroceryService.findById(parseInt($routeParams.id));
    }

    $scope.save = function () {
        GroceryService.save ($scope.groceryItem);
        $location.path("/");
    }

    console.log($scope.items);

    $scope.rp = "This is the parameter value: " +$routeParams.id;

}]);