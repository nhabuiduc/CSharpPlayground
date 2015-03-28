module System.Collections.Generic {
    export interface ISet<T> extends ICollection<T> {
        Add(item: T): boolean;
        UnionWith(other: IEnumerable<T>): void;
        IntersectWith(other: IEnumerable<T>): void;
        ExceptWith(other: IEnumerable<T>): void;
        SymmetricExceptWith(other: IEnumerable<T>): void;
        IsSubsetOf(other: IEnumerable<T>): boolean;
        IsSupersetOf(other: IEnumerable<T>): boolean;
        IsProperSupersetOf(other: IEnumerable<T>): boolean;
        IsProperSubsetOf(other: IEnumerable<T>): boolean;
        Overlaps(other: IEnumerable<T>): boolean;
        SetEquals(other: IEnumerable<T>): boolean;
    }
}