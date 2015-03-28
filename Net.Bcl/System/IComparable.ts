module System {
    export interface IComparable {
        CompareTo(obj: Object): number;
    }
    //export interface IComparable<T> {
    //    CompareTo(other: T): number;
    //}
}

module System.Generic {
    
    export interface IComparable<T> {
        CompareTo(other: T): number;
    }
}