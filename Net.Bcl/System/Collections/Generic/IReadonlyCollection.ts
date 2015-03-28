module System.Collections.Generic {
    export interface IReadOnlyCollection<T> extends IEnumerable<T> {
        Count: number;
    }
}