module System.Collections {
    export interface ICollection extends IEnumerable {
        CopyTo(array: Array<any>, index: number): void;
        Count: number;
        SyncRoot: Object;
        IsSynchronized: boolean;
    }
}