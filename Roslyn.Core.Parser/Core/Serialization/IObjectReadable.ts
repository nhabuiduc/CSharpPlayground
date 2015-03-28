module Roslyn.Utilities {
    export interface IObjectReadable {
        GetReader(): (_: ObjectReader) => Object;
    }
}