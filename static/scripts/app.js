
const nodetest = angular.module('nodetest', []);

// filtering for when clicking on display filter checkbox
nodetest.filter('contentFilter', function () {
    return function (input, filter) {
        let check = false;
        for (let key in filter)
            check = check || filter[key];
        if (!check) return input;

        let result = [];
        angular.forEach(input, function (content) {
            angular.forEach(filter, function (isfiltered, display) {
                if (isfiltered === content.display)
                    result.push(content);
            });
        });
        return result;
    };
});
