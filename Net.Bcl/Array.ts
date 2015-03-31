function StructArray<T>(typeStruct: { prototype: T }, length: number): Array < T > {
    var arr = new Array<T>(length);

    InitArray(typeStruct, arr);

    return arr;
}

function InitArray<T>(typeStruct: { prototype: T }, arr: Array<any>): void {
    var defaultValue: any;
    if (typeStruct === <any>Boolean) {
        defaultValue = false;
    } else if (typeStruct === <any>Number) {
        defaultValue = 0;
    } else if (typeStruct === <any>TSChar) {
        defaultValue = '';
    } else {
        defaultValue = structDefault(typeStruct);
    }
    for (var i = 0; i < arr.length; i++) {
        arr[i] = defaultValue;
    }
}

interface Array<T> extends System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyList<T>, System.Collections.Generic.IList<T> {
    GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
    $get$(index: number): T;
    $set$(index, value: T): void
    Count: number;
    Length: number;
    IndexOf(item: T): number;
    GetHashCode(): number;
    CopyTo(arr: Array<T>, index: number): void;
}

Array.prototype.CopyTo = function (arr: Array<any>, index: number): void {
    TSArray.Copy_1(this, 0, arr, index, this.length);
}

Array.prototype.GetHashCode = function () {
    if (this.myHash === void 0) {
        this.myHash = Gb.NextHashCode();
    }

    return this.myHash;
}

Array.prototype.GetEnumerator = function (): System.Collections.Generic.IEnumerator<any> {
    return new ArrayEnumerator(this);
}

Array.prototype.$get$ = function (index: number): any {
    return this[index];
}

Array.prototype.$set$ = function (index: number, value: any): void {
    return this[index] = value;
}

Array.prototype.IndexOf = function (item: any): number {
    if (Gb.HasEqualsOperator(item)) {

        for (var i = 0; i < this.length; i++) {
            if (Gb.Equals(this[i], item)) {
                return i;
            }
        }
        return -1;
    }

    for (var i = 0; i < this.length; i++) {
        if (this[i] == item) {
            return i;
        }
    }
    return -1;
}

Object.defineProperty(Array.prototype, "Count", {
    get: function () {
        return this.length;
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Array.prototype, "Length", {
    get: function () {
        return this.length;
    },
    enumerable: true,
    configurable: true
});

class ArrayEnumerator<T> implements System.Collections.Generic.IEnumerator<T> {

    private array: Array<T>;
    private position: number;
    constructor(array: Array<T>) {
        this.array = array;
        this.position = -1;
    }

    public get Current(): T {
        return this.array[this.position];
    }

    public MoveNext(): boolean {
        this.position++;
        return this.position < this.array.length;
    }

    public Reset(): void {
        this.position = -1;
    }

    public Dispose(): void {
        this.array = null;
    }
}