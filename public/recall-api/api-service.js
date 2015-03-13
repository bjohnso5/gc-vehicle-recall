///<reference path="recall.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>
/**
 * Created by JOHNSB7 on 1/14/2015.
 */
'use strict';
var RecallAPIService = (function () {
    function RecallAPIService(Restangular) {
        this.validParameters = [
            'make-name',
            'model-name',
            'minimum-model-year',
            'maximum-model-year',
            'year-range'
        ];
        this.restangularService = Restangular;
    }
    /**
     * Query the recall API with the provided options, returning a Promise.
     * @param options
     * @returns {IPromise<any>|IPromise<T>}
     */
    RecallAPIService.prototype.queryRecall = function (options) {
        var path = this.restangularService.one('recall');
        var length = this.validParameters.length;
        for (var i = 0; i < length; ++i) {
            var param = this.validParameters[i], paramValue = options[this.validParameters[i]];
            if (paramValue) {
                path = this.restangularService.copy(path).one(param, paramValue);
            }
        }
        return options.page === 1 ? path.get() : path.get({ page: options.page });
    };
    /**
     * Query the recall summary represented by the provided options (recall number), returning a Promise.
     * @param options
     * @returns {IPromise<any>|IPromise<T>}
     */
    RecallAPIService.prototype.querySummary = function (options) {
        return this.restangularService.one('recall-summary').one('recall-number', options['recall-number']).get();
    };
    return RecallAPIService;
})();
angular.module('recallApi', ['restangular']).factory('recallService', [
    'Restangular',
    function (Restangular) {
        return new RecallAPIService(Restangular);
    }
]);
//# sourceMappingURL=api-service.js.map