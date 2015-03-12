///<reference path="recall.d.ts"/>
///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/restangular/restangular.d.ts"/>
/**
 * Created by JOHNSB7 on 1/14/2015.
 */
'use strict';

angular.module('recallApi')
.factory('recallService', [
    'Restangular',
    function(Restangular) {
      Restangular.setBaseUrl('https://webbroker.devl.td.com/v1.3/api/eng/vehicle-recall-database');

      var validParameters = [
        'make-name',
        'model-name',
        'minimum-model-year',
        'maximum-model-year',
        'year-range'
      ], length = validParameters.length;

      return {
        queryRecall: function(options: VehicleRecall.QueryOptions): restangular.IPromise<VehicleRecall.RecallData> {
          var path: restangular.IElement = Restangular.one('recall');
          for(var i = 0; i < length; ++i) {
            var param = validParameters[i], paramValue = options[validParameters[i]];
            if(paramValue) {
              path = Restangular.copy(path).one(param, paramValue);
            }
          }
          return options.page === 1 ? path.get() : path.get({page: options.page});
        },
        querySummary: function(options: VehicleRecall.SummaryOptions): restangular.IPromise<VehicleRecall.RecallData> {
          return Restangular.one('recall-summary').one('recall-number', options['recall-number']).get();
        }
      }
    }
  ]);
