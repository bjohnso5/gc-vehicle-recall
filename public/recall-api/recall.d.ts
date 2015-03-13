declare module VehicleRecall {

  /**
   * Definition of data passed to recall query API
   */
  interface QueryOptions {
    // optional query parameters
    'make-name'?: string;
    'minimum-model-year'?: string;
    'maximum-model-year'?: string;
    // required query
    'model-name': string;
    page: number;
  }

  /**
   * Definition of data passed to recall summary query API
   */
  interface SummaryOptions {
    'recall-number': number;
  }

  /**
   * Definition of a single value returned by the recall API
   */
  interface RecallAPIValue {
    Literal: string;
    Type: string;
  }

  /**
   * Definition of the wrapper object around every value returned by the recall API
   */
  interface ResultObject {
    Name: string;
    Value: RecallAPIValue;
  }

  /**
   * Definition of a full response from the recall API
   */
  interface RecallData {
    ResultSet: Array<Array<ResultObject>>;
  }

  interface RecallRecord {
    make: string;
    model: string;
    year: string;
    recallNumber: string;
  }
}