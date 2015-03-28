module System.Collections {
    export interface IStructuralComparable {
        CompareTo(other: Object, comparer: IComparer): number;
    }
}