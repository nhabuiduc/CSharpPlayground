module System.Collections.Generic {
    export interface IList<T> extends ICollection<T> {
        $get$(index: number): T; 
        $set$(index: number, value: T): void;
        IndexOf(item: T): number;
        Insert(index: number, item: T): void;
        RemoveAt(index: number): void;
    }
}