module System.Collections.Immutable {
    export class ImmutableInterlocked {
        public static InterlockedInitialize<T>(localtion: { refObj: ImmutableArray<T> }, value: ImmutableArray<T>): void {
            localtion.refObj = value;
        }
        public static InterlockedCompareExchange<T>(lazyHash: { refObj: ImmutableArray<T> }, immutableArray1: ImmutableArray<T>, immutableArray2: ImmutableArray<T>): ImmutableArray<T> {
            var original = lazyHash.refObj.array;
            if (lazyHash.refObj.array == immutableArray2.array) {
                lazyHash.refObj.array = immutableArray1.array;
            }
            return new ImmutableArray<T>(original);
        }
    }
}