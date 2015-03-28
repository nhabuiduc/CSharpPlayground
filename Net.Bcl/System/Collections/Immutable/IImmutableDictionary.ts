module System.Collections.Immutable {
    export interface IImmutableDictionary<TKey, TValue> extends System.Collections.Generic.IReadOnlyDictionary<TKey, TValue> {
        Clear(): IImmutableDictionary<TKey, TValue>;
        Add(key: TKey, value: TValue): IImmutableDictionary<TKey, TValue>;
        AddRange(pairs: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey, TValue>>): IImmutableDictionary<TKey, TValue>;
        SetItem(key: TKey, value: TValue): IImmutableDictionary<TKey, TValue>;
        SetItems(items: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey, TValue>>): IImmutableDictionary<TKey, TValue>;
        RemoveRange(keys: System.Collections.Generic.IEnumerable<TKey>): IImmutableDictionary<TKey, TValue>;
        Remove(key: TKey): IImmutableDictionary<TKey, TValue>;
        Contains(pair: System.Collections.Generic.KeyValuePair<TKey, TValue>): boolean;
        TryGetKey(equalKey: TKey, actualKey: { refObj: TKey }): boolean;
    }
}