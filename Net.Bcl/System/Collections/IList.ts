module System.Collections {
    export interface IList extends ICollection {
        $get$(index: number): Object;
         $set$(index: number, value: Object): void;
        Add(value: Object): number;
        Contains(value: Object): boolean;
        Clear(): void;
        IsReadOnly: boolean;
        IsFixedSize: boolean;
        IndexOf(value: Object): number;
        Insert(index: number, value: Object): void;
        Remove(value: Object): void;
        RemoveAt(index: number): void;
    }
}