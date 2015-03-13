///<reference path="recall.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>
'use strict';

class RecallAPIService {
  private restangularService: restangular.IService;
  private validParameters: Array<string> = [
    'make-name',
    'model-name',
    'minimum-model-year',
    'maximum-model-year',
    'year-range'
  ];

  constructor(Restangular: restangular.IService) {
    this.restangularService = Restangular;
  }

  /**
   * Query the recall API with the provided options, returning a Promise.
   * @param options
   * @returns {IPromise<any>|IPromise<T>}
   */
  public queryRecall(options: VehicleRecall.QueryOptions): restangular.IPromise<VehicleRecall.RecallData> {
    var path: restangular.IElement = this.restangularService.one('recall');
    var length: number = this.validParameters.length;
    for(var i = 0; i < length; ++i) {
      var param = this.validParameters[i], paramValue = options[this.validParameters[i]];
      if(paramValue) {
        path = this.restangularService.copy(path).one(param, paramValue);
      }
    }
    return options.page === 1 ? path.get() : path.get({page: options.page});
  }

  /**
   * Query the recall summary represented by the provided options (recall number), returning a Promise.
   * @param options
   * @returns {IPromise<any>|IPromise<T>}
   */
  public querySummary(options: VehicleRecall.SummaryOptions): restangular.IPromise<VehicleRecall.RecallData> {
    return this.restangularService.one('recall-summary').one('recall-number', options['recall-number']).get();
  }
}

angular.module('recallApi', ['restangular']).factory('recallService', [
  'Restangular',
  function(Restangular) {
    return new RecallAPIService(Restangular);
  }
]);
