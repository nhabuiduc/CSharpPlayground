module System.Collections {
    export class DictionaryEntry {
        private _key: Object;
        private _value: Object;
        constructor(key: Object, value: Object) {
            this._key = key;
            this._value = value;
        }
        get Key(): Object {
            return this._key;
        }
        set Key(value: Object) {
            this._key = value;
        }
        get Value(): Object {
            return this._value;
        }
        set Value(value: Object) {
            this._value = value;
        }
    }
}
