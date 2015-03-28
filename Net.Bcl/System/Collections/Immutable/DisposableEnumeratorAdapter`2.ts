module System.Collections.Immutable {
    export class DisposableEnumeratorAdapter<T, TEnumerator> implements IDisposable {
        private _enumeratorObject: System.Collections.Generic.IEnumerator<T> = null;
        private _enumeratorStruct: System.Collections.Generic.IEnumerator<T> = null;
        get Current(): T {
            return this._enumeratorObject != null ? this._enumeratorObject.Current : this._enumeratorStruct.Current;
        }
        public MoveNext(): boolean {
            return this._enumeratorObject != null ? this._enumeratorObject.MoveNext() : this._enumeratorStruct.MoveNext();
        }
        public Dispose(): void {
            if (this._enumeratorObject != null) {
                this._enumeratorObject.Dispose();
            }
            else {
                this._enumeratorStruct.Dispose();
            }
        }
        public GetEnumerator(): DisposableEnumeratorAdapter<T, TEnumerator> {
            return this;
        }
        constructor(enumerator: System.Collections.Generic.IEnumerator<T>,obj: Object);
        constructor(enumerator: TEnumerator);
        constructor(enumerator: any, obj?:Object) {
            if ((enumerator && obj)) { this.constructor_DisposableEnumeratorAdapter_overload0(enumerator); }
            if (enumerator) { this.constructor_DisposableEnumeratorAdapter_overload1(enumerator); }
        }
        private constructor_DisposableEnumeratorAdapter_overload0(enumerator: System.Collections.Generic.IEnumerator<T>): void {
            this._enumeratorStruct = null;
            this._enumeratorObject = enumerator;
        }
        private constructor_DisposableEnumeratorAdapter_overload1(enumerator: System.Collections.Generic.IEnumerator<T>): void {
            this._enumeratorStruct = enumerator;
            this._enumeratorObject = null;
        }
    }
}