module System.Collections.Immutable {
    export interface IStrongEnumerator<T> {
        Current: T;
        MoveNext(): boolean;
    }
}