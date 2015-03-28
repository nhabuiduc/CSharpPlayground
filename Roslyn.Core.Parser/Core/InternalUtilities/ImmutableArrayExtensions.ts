module Roslyn.Utilities {
    export class ImmutableArrayExtensions {
        public static ToImmutableArrayOrEmpty_1791<T>(items: T[]): System.Collections.Immutable.ImmutableArray<T> {
            if (items == null) {
                return System.Collections.Immutable.ImmutableArray.Create<T>();
            }
            return System.Collections.Immutable.ImmutableArray.Create<T>(items);
        }
        public static ToImmutableArrayOrEmpty_1553<T>(items: System.Collections.Generic.IEnumerable<T>): System.Collections.Immutable.ImmutableArray<T> {
            if (items == null) {
                return System.Collections.Immutable.ImmutableArray.Create<T>();
            }
            return System.Collections.Immutable.ImmutableArray.CreateRange<T>(items);
        }
        public static ToImmutableArrayOrEmpty_1007<T>(items: System.Collections.Immutable.ImmutableArray<T>): System.Collections.Immutable.ImmutableArray<T> {
            if (items.IsDefault) {
                return System.Collections.Immutable.ImmutableArray.Create<T>();
            }
            return items;
        }
    }
}