module System.Collections.Immutable {
    export interface IImmutableStack<T> extends System.Collections.Generic.IEnumerable<T> {
        IsEmpty: boolean;
        Clear(): IImmutableStack<T>;
        Push(value: T): IImmutableStack<T>;
        Pop(): IImmutableStack<T>;
        Peek(): T;
    }
}