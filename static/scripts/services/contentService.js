
angular.module('nodetest').service('contentService', ['$http', function($http) {
    this.fetchJSON = function() {
        return $http({
            url: '/json'
        });
    };

    this.saveJSON = function(newItem) {
        return $http({
            method: 'POST',
            url: '/saveJSON',
            data: JSON.stringify(newItem)
        });
    };
}]);

