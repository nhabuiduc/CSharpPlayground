module Roslyn.Utilities {
    export interface IObjectWritable {
        WriteTo(writer: ObjectWriter): void;
    }
}