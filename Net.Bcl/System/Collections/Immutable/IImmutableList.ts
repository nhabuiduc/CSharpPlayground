module System.Collections.Immutable {
    export interface IImmutableList<T> extends System.Collections.Generic.IReadOnlyList<T> {
        Clear(): IImmutableList<T>;
        IndexOf(item: T, index: number, count: number, equalityComparer: System.Collections.Generic.IEqualityComparer<T>): number;
        LastIndexOf(item: T, index: number, count: number, equalityComparer: System.Collections.Generic.IEqualityComparer<T>): number;
        Add(value: T): IImmutableList<T>;
        AddRange(items: System.Collections.Generic.IEnumerable<T>): IImmutableList<T>;
        Insert(index: number, element: T): IImmutableList<T>;
        InsertRange(index: number, items: System.Collections.Generic.IEnumerable<T>): IImmutableList<T>;
        Remove(value: T, equalityComparer: System.Collections.Generic.IEqualityComparer<T>): IImmutableList<T>;
        RemoveAll(match: (_: T) => boolean): IImmutableList<T>;
        RemoveRange(items: System.Collections.Generic.IEnumerable<T>, equalityComparer: System.Collections.Generic.IEqualityComparer<T>): IImmutableList<T>;
        RemoveRange(index: number, count: number): IImmutableList<T>;
        RemoveAt(index: number): IImmutableList<T>;
        SetItem(index: number, value: T): IImmutableList<T>;
        Replace(oldValue: T, newValue: T, equalityComparer: System.Collections.Generic.IEqualityComparer<T>): IImmutableList<T>;
    }
}