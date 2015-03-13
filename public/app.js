///<reference path="recall-api/recall.d.ts"/>
///<reference path="../typings/tsd.d.ts"/>
angular.module('ca.gc.recall', ['recallDirective']).config(['RestangularProvider', function (RestangularProvider) {
    RestangularProvider.setDefaultHttpFields({ cache: true });
    RestangularProvider.setBaseUrl('/v1.3/api/eng/vehicle-recall-database');
}]);
//# sourceMappingURL=app.js.map