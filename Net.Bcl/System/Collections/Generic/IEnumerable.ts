module System.Collections.Generic {
    export interface IEnumerable<T> extends System.Collections.IEnumerable {
         GetEnumerator(): IEnumerator<T>;
    }
}