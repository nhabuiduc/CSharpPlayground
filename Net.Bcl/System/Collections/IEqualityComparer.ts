module System.Collections {
    export interface IEqualityComparer {
        Equals(x: Object, y: Object): boolean;
        GetHashCode(obj: Object): number;
    }
}