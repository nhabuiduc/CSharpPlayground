module System.Collections.Generic {
    // the original IDictionary inherited from ICollection, but we got a problem which IDictionary
    // have another Add Method with different signagure, so I changed to inherit from IEnumerable
    export interface IDictionary<TKey, TValue> extends IEnumerable<KeyValuePair<TKey, TValue>> {
        $get$(key: TKey): TValue; 
        $set$(key: TKey, value: TValue): void;
        Keys: ICollection<TKey>;
        Values: ICollection<TValue>;
        ContainsKey(key: TKey): boolean;
        Add(key: TKey, value: TValue): void;
        Remove(key: TKey): boolean;
        TryGetValue(key: TKey, value: { refObj: TValue }): boolean;
    }
}