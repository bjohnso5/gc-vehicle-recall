///<reference path="recall-api/recall.d.ts"/>
///<reference path="../typings/tsd.d.ts"/>

angular.module('ca.gc.recall', ['recallApi'])
  .config(['RestangularProvider',
    function(RestangularProvider: restangular.IProvider) {
      RestangularProvider.setDefaultHttpFields({cache: true});
    }
  ])
  .controller('HomeController', [
    '$scope',
    'recallService',
    function($scope, recallService) {

      /**
       * Query the API with the currently entered $scope items
       */
      $scope.query = function() {
        $scope.summary = null;
        // model name is required to perform query
        if(null != $scope.queryOptions['model-name']) {
          recallService.queryRecall($scope.queryOptions).then(function (results:VehicleRecall.RecallData) {
            $scope.resultSet = results.ResultSet;
          });
        }
      };

      $scope.queryNext = function() {
        if($scope.moreResults()) {
          $scope.queryOptions.page++;
          $scope.query();
        }
      };

      $scope.queryPrevious = function() {
        if($scope.previousResults()) {
          $scope.queryOptions.page--;
          $scope.query();
        }
      };

      $scope.details = function(recallNumber) {
        recallService.querySummary({'recall-number': recallNumber}).then(function(results) {
          $scope.summary = results.ResultSet[0];
          $scope.summary.selected = recallNumber;
        });
      };

      /**
       * Traverses an array of ResultObjects, retrieving the value associated with the provided
       * field name. Returns the empty string if no value is found matching the field.
       * @param recallResult
       * @param field
       * @returns {string}
       */
      function getValue(recallResult: Array<VehicleRecall.ResultObject>, field: string): string {
        var value = "",
          length = recallResult.length;
        for(var i = 0; i < length; ++i) {
          if(recallResult[i].Name === field) {
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
      function getRecallNumber(recallResult: Array<VehicleRecall.ResultObject>): string {
        return getValue(recallResult, "Recall number");
      }

      /**
       * Get the vehicle make name associated with the provided Vehicle Recall API result.
       * @param recallResult
       * @returns {string}
       */
      function getMake(recallResult: Array<VehicleRecall.ResultObject>): string {
        return getValue(recallResult, "Make name");
      }

      /**
       * Get the vehicle model name associated with the provided Vehicle Recall API result.
       * @param recallResult
       * @returns {string}
       */
      function getModel(recallResult: Array<VehicleRecall.ResultObject>): string {
        return getValue(recallResult, "Model name");
      }

      /**
       * Get the vehicle model year associated with the provided Vehicle Recall API result.
       * @param recallResult
       * @returns {string}
       */
      function getYear(recallResult: Array<VehicleRecall.ResultObject>): string {
        return getValue(recallResult, "Year");
      }

      /**
       * Get the vehicle recall issuing date associated with the selected recall.
       * @returns {string}
       */
      function getRecallDate(): string {
        return getValue($scope.summary, "Recall date");
      }

      /**
       * Get the vehicle recall summary associated with the selected recall.
       * @returns {string}
       */
      function getSummaryText(): string {
        return getValue($scope.summary, "Comments");
      }

      // Make functions available on the scope for use in the templates
      $scope.getRecallNumber = getRecallNumber;
      $scope.getMake = getMake;
      $scope.getModel = getModel;
      $scope.getYear = getYear;
      $scope.getRecallDate = getRecallDate;
      $scope.getSummaryText = getSummaryText;

      $scope.isSelected = function(recallResult: Array<VehicleRecall.ResultObject>) {
        return $scope.summary && $scope.summary.selected && getRecallNumber(recallResult) === $scope.summary.selected;
      };

      $scope.moreResults = function() {
        return $scope.resultSet && $scope.resultSet.length === 25;
      };
      $scope.previousResults = function() {
        return $scope.queryOptions && $scope.queryOptions.page !== 1;
      };

      var defaultQueryOptions: VehicleRecall.QueryOptions = { 'model-name': null, page: 1 };
      $scope.queryOptions = defaultQueryOptions;
      $scope.summary = null;
      $scope.resultSet = [];
      $scope.valid = $scope.queryOptions['model-name'] !== null && $scope.queryOptions['model-name'].length > 0;
    }
  ]);