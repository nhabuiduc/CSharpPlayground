module System.Collections.Immutable {
    export interface IStrongEnumerable<T, TEnumerator> {
        GetEnumerator(): TEnumerator;
    }
}