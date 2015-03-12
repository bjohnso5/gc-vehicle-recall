declare module VehicleRecall {

  interface QueryOptions {
    // optional query parameters
    'make-name'?: string;
    'minimum-model-year'?: string;
    'maximum-model-year'?: string;
    // required query
    'model-name': string;
    page: number;
  }

  interface SummaryOptions {
    'recall-number': number;
  }

  interface RecallAPIValue {
    Literal: string;
    Type: string;
  }

  interface ResultObject {
    Name: string;
    Value: RecallAPIValue;
  }

  interface RecallData {
    ResultSet: Array<Array<ResultObject>>;
  }
}