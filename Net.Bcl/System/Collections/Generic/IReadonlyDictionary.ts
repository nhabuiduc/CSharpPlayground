module System.Collections.Generic {
    export interface IReadOnlyDictionary<TKey, TValue> extends IReadOnlyCollection<KeyValuePair<TKey, TValue>> {
        ContainsKey(key: TKey): boolean;
        TryGetValue(key: TKey, value: { refObj: TValue }): boolean;

        Keys: IEnumerable<TKey>;
        Values: IEnumerable<TValue>;
    }
}