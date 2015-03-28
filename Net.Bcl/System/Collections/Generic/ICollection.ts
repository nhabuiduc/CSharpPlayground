module System.Collections.Generic {
    export interface ICollection<T> extends IEnumerable<T> {
        Count: number;
        IsReadOnly: boolean;
        Add(item: T): void;
        Clear(): void;
        Contains(item: T): boolean;
        CopyTo(array: T[], arrayIndex: number): void;
        Remove(item: T): boolean;
    }
}