//module System.Collections.Immutable {
//    export interface IImmutableListQueries<T> extends System.Collections.Generic.IReadOnlyList<T> {
//        ConvertAll<TOutput>(converter: (_: T) => TOutput): ImmutableList<TOutput>;
//        ForEach(action: (_: T) => void): void;
//        GetRange(index: number, count: number): ImmutableList<T>;
//        CopyTo(array: T[]): void;
//        CopyTo(array: T[], arrayIndex: number): void;
//        CopyTo(index: number, array: T[], arrayIndex: number, count: number): void;
//        Exists(match: (_: T) => boolean): boolean;
//        Find(match: (_: T) => boolean): T;
//        FindAll(match: (_: T) => boolean): ImmutableList<T>;
//        FindIndex(match: (_: T) => boolean): number;
//        FindIndex(startIndex: number, match: (_: T) => boolean): number;
//        FindIndex(startIndex: number, count: number, match: (_: T) => boolean): number;
//        FindLast(match: (_: T) => boolean): T;
//        FindLastIndex(match: (_: T) => boolean): number;
//        FindLastIndex(startIndex: number, match: (_: T) => boolean): number;
//        FindLastIndex(startIndex: number, count: number, match: (_: T) => boolean): number;
//        TrueForAll(match: (_: T) => boolean): boolean;
//        BinarySearch(item: T): number;
//        BinarySearch(item: T, comparer: System.Collections.Generic.IComparer<T>): number;
//        BinarySearch(index: number, count: number, item: T, comparer: System.Collections.Generic.IComparer<T>): number;
//    }
//}