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
            {id: 1, completed: true, name: "milk", date: new Date("January 1, 2016 11:30:00")},
            {id: 2, completed: true, name: "butter", date: new Date("February 1, 2016 11:30:00")},
            {id: 3, completed: true, name: "bread", date: new Date("March 1, 2016 11:30:00")},
            {id: 4, completed: true, name: "eggs", date: new Date("April 1, 2016 11:30:00")},
            {id: 5, completed: true, name: "sugar", date: new Date("May 1, 2016 11:30:00")},
            {id: 6, completed: true, name: "salt", date: new Date("June 1, 2016 11:30:00")},
            {id: 7, completed: true, name: "pepper", date: new Date("July 1, 2016 11:30:00")},
            {id: 8, completed: true, name: "cheese", date: new Date("August 1, 2016 11:30:00")}
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
        $scope.groceryItem = GroceryService.findById(parseInt($routeParams.id));
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