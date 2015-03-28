module System.Collections.Immutable {
    export class DictionaryEnumerator<TKey, TValue> implements IDictionaryEnumerator {
        private _inner: System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey, TValue>> = null;
        constructor(inner: System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey, TValue>>) {
            //Validation.Requires.NotNull(inner, "inner");
            this._inner = inner;
        }
        get Entry(): DictionaryEntry {
            return new DictionaryEntry(this._inner.Current.Key, this._inner.Current.Value);
        }
        get Key(): Object {
            return this._inner.Current.Key;
        }
        get Value(): Object {
            return this._inner.Current.Value;
        }
        get Current(): Object {
            return this.Entry;
        }
        public MoveNext(): boolean {
            return this._inner.MoveNext();
        }
        public Reset(): void {
            this._inner.Reset();
        }
    }
}