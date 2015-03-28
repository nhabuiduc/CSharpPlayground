module Roslyn.Utilities {
    export class KeyValuePair {
        public static Create<K, V>(key: K, value: V): System.Collections.Generic.KeyValuePair<K, V> {
            return new System.Collections.Generic.KeyValuePair<K, V>(key, value);
        }
    }
}