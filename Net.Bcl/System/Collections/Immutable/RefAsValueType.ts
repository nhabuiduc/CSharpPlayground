module System.Collections.Immutable {
    export class RefAsValueType<T>
    {
        constructor(value: T) {
            this.Value = value;
        }
        public Value: T;
    }
}