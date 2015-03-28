module System.Collections.Generic {
    export interface IHashKeyCollection<TKey> {
        KeyComparer: IEqualityComparer<TKey>;
    }
}