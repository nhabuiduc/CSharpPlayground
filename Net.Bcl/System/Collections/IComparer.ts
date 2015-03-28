module System.Collections {
    export interface IComparer {
        Compare(x: Object, y: Object): number;
    }
}