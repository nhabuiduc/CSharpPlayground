module System.Collections.Immutable {
    export interface IImmutableDictionaryInternal<TKey, TValue> {
        ContainsValue(value: TValue): boolean;
    }
}