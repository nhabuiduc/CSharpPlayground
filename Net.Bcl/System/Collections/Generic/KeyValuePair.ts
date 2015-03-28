module System.Collections.Generic {
    export class KeyValuePair<TKey, TValue>
    {
        private key: TKey;
        private value: TValue;
        constructor(key: TKey, value: TValue) {
            this.key = key;
            this.value = value;
        }
        get Key(): TKey {
            return this.key;
        }
        get Value(): TValue {
            return this.value;
        }
        public ToString(): string {
            return this.key + "" + this.value;
        }
    }
}