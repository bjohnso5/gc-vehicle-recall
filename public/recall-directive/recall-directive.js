///<reference path="../recall-api/recall.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>
angular.module('recallDirective', ['recallApi']).directive('vehicleRecall', [
    function () {
        'use strict';
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'recall-directive/recall.tpl.html',
            controller: ['$scope', 'recallService', function ($scope, recallService) {
                /**
                 * Query the API with the currently entered $scope items
                 */
                $scope.query = function () {
                    $scope.summary = null;
                    // model name is required to perform query
                    if (null != $scope.queryOptions['model-name']) {
                        recallService.queryRecall($scope.queryOptions).then(function (results) {
                            $scope.resultSet = convertToObjectArray(results);
                        });
                    }
                };
                function convertToObjectArray(results) {
                    var array = [], length = results.ResultSet.length;
                    for (var i = 0; i < length; ++i) {
                        array.push({
                            make: getMake(results.ResultSet[i]),
                            model: getModel(results.ResultSet[i]),
                            year: getYear(results.ResultSet[i]),
                            recallNumber: getRecallNumber(results.ResultSet[i])
                        });
                    }
                    return array;
                }
                /**
                 * Traverses an array of ResultObjects, retrieving the value associated with the provided
                 * field name. Returns the empty string if no value is found matching the field.
                 * @param recallResult
                 * @param field
                 * @returns {string}
                 */
                function getValue(recallResult, field) {
                    var value = "", length = recallResult.length;
                    for (var i = 0; i < length; ++i) {
                        if (recallResult[i].Name === field) {
                            value = recallResult[i].Value.Literal;
                            break;
                        }
                    }
                    return value;
                }
                /**
                 * Get the recall number associated with the provided Vehicle Recall API result.
                 * @param recallResult
                 * @returns {string}
                 */
                function getRecallNumber(recallResult) {
                    return getValue(recallResult, "Recall number");
                }
                /**
                 * Get the vehicle make name associated with the provided Vehicle Recall API result.
                 * @param recallResult
                 * @returns {string}
                 */
                function getMake(recallResult) {
                    return getValue(recallResult, "Make name");
                }
                /**
                 * Get the vehicle model name associated with the provided Vehicle Recall API result.
                 * @param recallResult
                 * @returns {string}
                 */
                function getModel(recallResult) {
                    return getValue(recallResult, "Model name");
                }
                /**
                 * Get the vehicle model year associated with the provided Vehicle Recall API result.
                 * @param recallResult
                 * @returns {string}
                 */
                function getYear(recallResult) {
                    return getValue(recallResult, "Year");
                }
                /**
                 * Get the vehicle recall issuing date associated with the selected recall.
                 * @returns {string}
                 */
                function getRecallDate() {
                    return getValue($scope.summary, "Recall date");
                }
                /**
                 * Get the vehicle recall summary associated with the selected recall.
                 * @returns {string}
                 */
                function getSummaryText() {
                    return getValue($scope.summary, "Comments");
                }
                $scope.queryNext = function () {
                    if ($scope.moreResults()) {
                        $scope.queryOptions.page++;
                        $scope.query();
                    }
                };
                $scope.queryPrevious = function () {
                    if ($scope.previousResults()) {
                        $scope.queryOptions.page--;
                        $scope.query();
                    }
                };
                $scope.details = function (recallNumber) {
                    recallService.querySummary({ 'recall-number': recallNumber }).then(function (results) {
                        $scope.summary = results.ResultSet[0];
                        $scope.summary.selected = recallNumber;
                    });
                };
                // Make functions available on the scope for use in the templates
                $scope.getRecallNumber = getRecallNumber;
                $scope.getMake = getMake;
                $scope.getModel = getModel;
                $scope.getYear = getYear;
                $scope.getRecallDate = getRecallDate;
                $scope.getSummaryText = getSummaryText;
                $scope.isSelected = function (recallResult) {
                    return $scope.summary && $scope.summary.selected && recallResult.recallNumber === $scope.summary.selected;
                };
                $scope.moreResults = function () {
                    return $scope.resultSet && $scope.resultSet.length === 25;
                };
                $scope.previousResults = function () {
                    return $scope.queryOptions && $scope.queryOptions.page !== 1;
                };
                var defaultQueryOptions = { 'model-name': null, page: 1 };
                $scope.queryOptions = defaultQueryOptions;
                $scope.summary = null;
                $scope.resultSet = [];
                $scope.valid = $scope.queryOptions['model-name'] !== null && $scope.queryOptions['model-name'].length > 0;
            }]
        };
    }
]);
//# sourceMappingURL=recall-directive.js.map