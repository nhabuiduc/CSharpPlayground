module System.Collections.Generic {
    export interface IEqualityComparer<T> {
        Equals(x: T, y: T): boolean;
        GetHashCode(obj: T): number;
    }
}