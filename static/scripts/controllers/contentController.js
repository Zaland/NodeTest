
angular.module('nodetest').controller('contentController', ['$scope','contentService', function ($scope, contentService) {
    $scope.contentList = [];

    // grabs the JSON list from the server
    contentService.fetchJSON().then(function (response) {
        $scope.contentList = response.data.content;
    });

    // calculate the middle index number in the JSON list
    $scope.calcMiddle = function (index) {
        const listLength = $scope.contentList.length;
        if (listLength % 2 === 1 && index == Math.floor(listLength/2))
            return true;
        else
            return false;
    }

    // add a JSON object to the server, if successful, then update the list
    // in the front end
    $scope.addToList = function() {
        const newItem = { data: $scope.textItem, display: true, type: "text" };
        contentService.saveJSON(newItem).then(function (response) {
            if (response) $scope.contentList.push(newItem);
        });
    }

    // fibonacci number checking functions
    $scope.checkFibonacci = function(index) {
        if (index > 1)
            return isFibonacci(index)
        else
            return false;
    }

    function isSquare (num) {
        return num > 0 && Math.sqrt(num) % 1 === 0;
    }

    function isFibonacci (num) {
        if (isSquare(5 * (num * num) - 4) || isSquare(5 * (num * num) + 4))
            return true;
        else
            return false;
    }
}]);


