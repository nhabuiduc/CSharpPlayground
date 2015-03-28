module System.Collections {
    export interface IEnumerator {
        MoveNext(): boolean;
        Current: Object;
        Reset(): void;
    }
}