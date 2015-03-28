module System.Collections.Immutable {
    export interface IImmutableQueue<T> extends System.Collections.Generic.IEnumerable<T> {
        IsEmpty: boolean;
        Clear(): IImmutableQueue<T>;
        Peek(): T;
        Enqueue(value: T): IImmutableQueue<T>;
        Dequeue(): IImmutableQueue<T>;
    }
}