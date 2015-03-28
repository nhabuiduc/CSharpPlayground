module System.Collections.Generic {
    export interface ISortKeyCollection<TKey> {
        KeyComparer: IComparer<TKey>;
    }
}