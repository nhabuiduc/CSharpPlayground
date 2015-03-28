module System.Collections.Immutable {
    export interface IImmutableArray {
        Array: Array<any>;
        ThrowInvalidOperationIfNotInitialized(): void;
    }
}