module System.Collections.Generic {
    export interface IReadOnlyList<T> extends IReadOnlyCollection<T> {
        $get$(index: number): T;
    }
}