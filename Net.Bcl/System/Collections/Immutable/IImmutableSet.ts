module System.Collections.Immutable {
    export interface IImmutableSet<T> extends System.Collections.Generic.IReadOnlyCollection<T> {
        Clear(): IImmutableSet<T>;
        Contains(value: T): boolean;
        Add(value: T): IImmutableSet<T>;
        Remove(value: T): IImmutableSet<T>;
        TryGetValue(equalValue: T, actualValue: { refObj: T }): boolean;
        Intersect(other: System.Collections.Generic.IEnumerable<T>): IImmutableSet<T>;
        Except(other: System.Collections.Generic.IEnumerable<T>): IImmutableSet<T>;
        SymmetricExcept(other: System.Collections.Generic.IEnumerable<T>): IImmutableSet<T>;
        Union(other: System.Collections.Generic.IEnumerable<T>): IImmutableSet<T>;
        SetEquals(other: System.Collections.Generic.IEnumerable<T>): boolean;
        IsProperSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
        IsProperSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
        IsSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
        IsSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
        Overlaps(other: System.Collections.Generic.IEnumerable<T>): boolean;
    }
}