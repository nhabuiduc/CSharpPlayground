module System.Collections.Generic {
    export interface IEnumerator<T> extends IDisposable, System.Collections.IEnumerator {
        Current: T;
    }
}