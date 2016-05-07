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

app.service ("GroceryService", function ($http) {

        var groceryService = {};

        groceryService.items = [];

        $http.get("data/server_data.json")
            .success(function (data) {
                groceryService.items = data;
                for (var item in groceryService.items){
                    groceryService.items[item].date = new Date(groceryService.items[item].date);
                }
            })
            .error(function (data, status) {

            });

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
        };

        groceryService.markCompleted = function (entry) {
            entry.completed = !entry.completed;
        };
    
        groceryService.removeItem = function (entry) {
            var index = groceryService.items.indexOf(entry);

            groceryService.items.splice(index, 1);
        };

        return groceryService;
});

app.controller ("appTitle", ["$scope", "GroceryService",function ($scope, GroceryService) {
    $scope.title = "Grocery List";
    $scope.items = GroceryService.items;

    $scope.removeItem = function (entry) {
        GroceryService.removeItem(entry);
    };

    $scope.markCompleted = function (entry) {
        GroceryService.markCompleted(entry);
    }
}]);

app.controller ("groceryList", ["$scope", "$routeParams", "GroceryService", "$location", function ($scope, $routeParams, GroceryService, $location) {

    if(!$routeParams) {
        $scope.groceryItem = {id: 9, completed: false, name: "", date: new Date()};
    }else{
        $scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
    }

    $scope.save = function () {
        GroceryService.save ($scope.groceryItem);
        $location.path("/");
    }

    console.log($scope.items);

    $scope.rp = "This is the parameter value: " +$routeParams.id;

}]);

app.directive("ksGroceryItems", function () {
   return{
       restrict: "E",
       templateUrl: "views/groceryItems.html"
   }
});