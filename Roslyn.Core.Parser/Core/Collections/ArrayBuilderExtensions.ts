module Microsoft.CodeAnalysis {
    export class ArrayBuilderExtensions {
        public static Any<T>(builder: ArrayBuilder<T>, predicate: (_: T) => boolean): boolean {
            // for each
            var itemEnumerator = builder.GetEnumerator();
            try {
                while (itemEnumerator.MoveNext()) {
                    var item = itemEnumerator.Current;
                    // foreach block
                    if (predicate(item)) {
                        return true;
                    }
                }
            } finally {
                if (itemEnumerator !== null && (<any>itemEnumerator).Dispose !== void 0) (<any>itemEnumerator).Dispose();

            }    
            // end foreach
            return false;
        }
        public static All<T>(builder: ArrayBuilder<T>, predicate: (_: T) => boolean): boolean {
            // for each
            var itemEnumerator = builder.GetEnumerator();
            try {
                while (itemEnumerator.MoveNext()) {
                    var item = itemEnumerator.Current;
                    // foreach block
                    if (!predicate(item)) {
                        return false;
                    }
                }
            } finally {
                if (itemEnumerator !== null && (<any>itemEnumerator).Dispose !== void 0) (<any>itemEnumerator).Dispose();

            }    
            // end foreach
            return true;
        }
        public static SelectAsArray_1569<TItem, TResult>(items: ArrayBuilder<TItem>, map: (_: TItem) => TResult): System.Collections.Immutable.ImmutableArray<TResult> {
            switch (items.Count) {
                case 0:
                    return System.Collections.Immutable.ImmutableArray.Empty;
                case 1:
                    return System.Collections.Immutable.ImmutableArray.Create_overload0(map(items.$get$(0)));
                case 2:
                    return System.Collections.Immutable.ImmutableArray.Create_overload1(map(items.$get$(0)), map(items.$get$(1)));
                case 3:
                    return System.Collections.Immutable.ImmutableArray.Create_overload2(map(items.$get$(0)), map(items.$get$(1)), map(items.$get$(2)));
                case 4:
                    return System.Collections.Immutable.ImmutableArray.Create_overload3(map(items.$get$(0)), map(items.$get$(1)), map(items.$get$(2)), map(items.$get$(3)));
                default:
                    var builder = ArrayBuilder.GetInstance_9802<TResult>(items.Count);
                    // for each
                    var itemEnumerator = items.GetEnumerator();
                    try {
                        while (itemEnumerator.MoveNext()) {
                            var item = itemEnumerator.Current;
                            // foreach block
                            builder.Add(map(item));
                        }
                    } finally {
                        if (itemEnumerator !== null && (<any>itemEnumerator).Dispose !== void 0) (<any>itemEnumerator).Dispose();

                    }    
                    // end foreach
                    return builder.ToImmutableAndFree();
            }
        }
        public static SelectAsArray_3004<TItem, TArg, TResult>(items: ArrayBuilder<TItem>, map: (_: TItem, __: TArg) => TResult, arg: TArg): System.Collections.Immutable.ImmutableArray<TResult> {
            switch (items.Count) {
                case 0:
                    return System.Collections.Immutable.ImmutableArray.Empty;
                case 1:
                    return System.Collections.Immutable.ImmutableArray.Create_overload0(map(items.$get$(0), arg));
                case 2:
                    return System.Collections.Immutable.ImmutableArray.Create_overload1(map(items.$get$(0), arg), map(items.$get$(1), arg));
                case 3:
                    return System.Collections.Immutable.ImmutableArray.Create_overload2(map(items.$get$(0), arg), map(items.$get$(1), arg), map(items.$get$(2), arg));
                case 4:
                    return System.Collections.Immutable.ImmutableArray.Create_overload3(map(items.$get$(0), arg), map(items.$get$(1), arg), map(items.$get$(2), arg), map(items.$get$(3), arg));
                default:
                    var builder = ArrayBuilder.GetInstance_9802<TResult>(items.Count);
                    // for each
                    var itemEnumerator = items.GetEnumerator();
                    try {
                        while (itemEnumerator.MoveNext()) {
                            var item = itemEnumerator.Current;
                            // foreach block
                            builder.Add(map(item, arg));
                        }
                    } finally {
                        if (itemEnumerator !== null && (<any>itemEnumerator).Dispose !== void 0) (<any>itemEnumerator).Dispose();

                    }    
                    // end foreach
                    return builder.ToImmutableAndFree();
            }
        }
        public static AddOptional<T>(builder: ArrayBuilder<T>, item: T): void {
            if (item != null) {
                builder.Add(item);
            }
        }
        public static Push<T>(builder: ArrayBuilder<T>, e: T): void {
            builder.Add(e);
        }
        public static Pop<T>(builder: ArrayBuilder<T>): T {
            var e = ArrayBuilderExtensions.Peek(builder);
            builder.RemoveAt(builder.Count - 1);
            return e;
        }
        public static Peek<T>(builder: ArrayBuilder<T>): T {
            return builder.$get$(builder.Count - 1);
        }
    }
}