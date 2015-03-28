var __extends = function (d, b) {
    for (var p in b) {
        //if (b.hasOwnProperty(p) &&
        //    Object.getOwnPropertyDescriptor(CC, b).g) d[p] = b[p];
        var descriptor = Object.getOwnPropertyDescriptor(b, p);
        if (descriptor === void 0) continue;
        if (descriptor.value !== void 0) {
            d[p] = b[p];
        }

        // add property method
        //descriptor.get
    }
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

function __init<T>(obj: T, option: any): T {
    for (var o in option) {
        obj[o] = option[o];
    }

    return obj;
}

function __ToString(obj: any): string {
    if (obj.ToString !== void 0) {
        return obj.ToString();
    }

    return obj.toString();
}

// it may be fixed in Typescript 1.5
function __unWrapArray(arr: any[]): any {
    if (arr.length == 1 && arr[0] instanceof Array) {
        return __unWrapArray(arr[0]);
    }

    return arr;
}

interface IStruct {
}


function ReferenceEquals(ar1: any, ar2: any): boolean {
    return ar1 === ar2;
}

function structDefault<T extends IStruct>(typeStruct: { prototype: T }): T {
    return new (<any>typeStruct)();
}

function __classOf(value: any): System.Type {
    return value.constructor;
}

function __classProOf<T>(value: T): { prototype: T } {
    return value.constructor;
}

function __classOfType<T>(value: any, type: { prototype: T }): boolean {
    return value.constructor === type;
}

function __className(value: any): string {
    return __classOf(value).name;
}

function __as__<T>(value: any, clss: { prototype: T }): T {
    if (value instanceof <any>clss) {
        return value;
    }

    return null;
}

function __charCode(str: string): number {
    return str.charCodeAt(0);
}

function __byte(value: number): number {
    return value & 0xff;
}

class UnknownType { }

var GbString = String;
var GbMath = Math;

function ArrayBufferToString(buffer: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint16Array(buffer));
}

function StringToArrayBuffer(str: string): ArrayBuffer {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function IsInt(n: number): boolean {
    return n % 1 === 0;
}

class TSEvent<T> {
    private events = new Array<T>();
    public Add(event: T): void {
        this.events.push(event);
    }

    public Remove(event: T): void {
        var idx = this.events.indexOf(event);
        if (idx >= 0) {
            this.events.splice(idx, 1);
        }
    }

    public get Raise(): T {
        return <T><any>this.FuncRaise;
    }

    private FuncRaise(arg1?: any, arg2?: any, arg3?: any, arg4?: any): void {
        for (var i = 0; i < this.events.length; i++) {
            (<any>this.events[i])(arg1, arg2, arg3, arg4);
        }
    }
}

// Boolean ---------------------------------------------------------------------------------------
interface Boolean {
    GetHashCode(): number;
}

Boolean.prototype.GetHashCode = function () {
    return <boolean>this ? 1 : 0;
}
// Array --------------------------------------------------------------------------------------------------------------

function StructArray<T>(typeStruct: { prototype: T }, length: number): Array<T>{
    var arr = new Array<T>(length);

    InitArray(typeStruct, arr);

    return arr;
}

function InitArray<T>(typeStruct: { prototype: T }, arr:Array<any>): void {
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

// --------------------------------------------------------------------------------------------------------------
// Object --------------------------------------------------------------------------------------------------------------
//interface Object {
//    GetType(): System.Type;    
//    ToString(): string;
//    //Equals(val: Object): boolean;
//}

//Object.prototype.GetType = function (): any {
//    return __classOf(this);
//}


//Object.prototype.ToString = function () {
//    return this.toString();
//}


//Object.prototype.Equals = function (val: Object): boolean {
//    return this === val;
//}

// --------------------------------------------------------------------------------------------------------------
// Number --------------------------------------------------------------------------------------------------------------

interface Number {
    CompareTo(value: number): number;
    GetHashCode(): number;
    ToString(format?: string, culture?: System.Globalization.CultureInfo): string;
    ToString(culture: System.Globalization.CultureInfo): string;
}

Number.prototype.GetHashCode = function (): number {
    return this;
}

Number.prototype.CompareTo = function (value: number) {
    if (this > value) return 1;
    else if (this < value) return -1;
    return 0;
}

Number.prototype.ToString = function (format?: any) {
    if (format === void 0) {
        return this.toString();
    }

    if (format instanceof System.Globalization.CultureInfo) {
        return this.toString();
    }

    if (isAll(format, '0')) {
        var result = (<number>this).toString();
        for (var i = result.length; i < format.length; i++) {
            result = "0" + result;
        }
        return result;
    }

    if (format.StartsWith("x")) {
        var length = parseInt(format.substr(1));
        var hexStr = (<number>this).toString(16);
        for (var i = hexStr.length; i < length; i++) {
            hexStr = "0" + hexStr;
        }

        return hexStr;
    }

    if (format.StartsWith("R")) {
        return this.toString();
    }

    throw new Error("not support");
}

function isAll(str: string, char: string): boolean {
    var arr = str.split('');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != char) {
            return false;
        }
    }

    return true;
}

// String --------------------------------------------------------------------------------------------------------------
interface String extends System.Collections.Generic.IEnumerable<string> {
    EndsWith(value: string): boolean;
    EndsWith(value: string, comparison: System.StringComparison): boolean;
    GetHashCode(): number;
    CharCode(): number;
    CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void;
    StartsWith(value: string, comparison?: System.StringComparison): boolean;
    Equals(str2: string, comparison: System.StringComparison): boolean;
    ToString(): string;
    GetEnumerator(): System.Collections.Generic.IEnumerator<string>;
}

String.prototype.GetEnumerator = function (): System.Collections.Generic.IEnumerator<string> {
    var str: string = this;
    return str.split('').GetEnumerator();
}

String.prototype.StartsWith = function (value: string, comparison?: System.StringComparison): boolean {
    if (typeof comparison == 'undefined') {
        comparison = System.StringComparison.CurrentCulture;
    }
    var thisStr = <string>this;
    var argStr = value;
    // TODO: we have only one culture now
    if (comparison == System.StringComparison.CurrentCultureIgnoreCase
        || comparison == System.StringComparison.InvariantCultureIgnoreCase
        || comparison == System.StringComparison.OrdinalIgnoreCase) {
        thisStr = System.String.ToLower(this);
        argStr = System.String.ToLower(value);
    }

    return thisStr.indexOf(argStr) == 0;
}

String.prototype.EndsWith = function (value: string, comparison?: System.StringComparison): boolean {
    if (typeof comparison == 'undefined') {
        comparison = System.StringComparison.CurrentCulture;
    }
    var thisStr = <string>this;
    var argStr = value;
    // TODO: we have only one culture now
    if (comparison == System.StringComparison.CurrentCultureIgnoreCase
        || comparison == System.StringComparison.InvariantCultureIgnoreCase
        || comparison == System.StringComparison.OrdinalIgnoreCase) {
        thisStr = System.String.ToLower(this);
        argStr = System.String.ToLower(value);
    }

    var position = thisStr.length;
    position -= argStr.length;
    var lastIndex = thisStr.lastIndexOf(argStr);
    return lastIndex != -1 && lastIndex == position;
}

String.prototype.GetHashCode = function (): number {
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

String.prototype.CharCode = function (): number {
    return this.charCodeAt(0);
}

String.prototype.CopyTo = function (sourceIndex: number, destination: string[], destinationIndex: number, count: number): void {
    if (destination == null)
        throw new System.ArgumentNullException("destination");
    if (count < 0)
        throw new System.ArgumentOutOfRangeException("count", System.Environment.GetResourceString("ArgumentOutOfRange_NegativeCount"));
    if (sourceIndex < 0)
        throw new System.ArgumentOutOfRangeException("sourceIndex", System.Environment.GetResourceString("ArgumentOutOfRange_Index"));
    if (count > this.length - sourceIndex)
        throw new System.ArgumentOutOfRangeException("sourceIndex", System.Environment.GetResourceString("ArgumentOutOfRange_IndexCount"));
    if (destinationIndex > destination.length - count || destinationIndex < 0)
        throw new System.ArgumentOutOfRangeException("destinationIndex", System.Environment.GetResourceString("ArgumentOutOfRange_IndexCount"));

    var strThis = <string>this;

    for (var i = 0; i < count; i++) {
        destination[i + destinationIndex] = strThis.charAt(i + sourceIndex);
    }

}

String.prototype.toString = function (): string {
    return this;
}
String.prototype.Equals = function (str2: string, comparison: System.StringComparison): boolean {
    if (typeof comparison == 'undefined') {
        comparison = System.StringComparison.CurrentCulture;
    }
    var thisStr = <string>this;
    var argStr = str2;
    // TODO: we have only one culture now
    if (comparison == System.StringComparison.CurrentCultureIgnoreCase
        || comparison == System.StringComparison.InvariantCultureIgnoreCase
        || comparison == System.StringComparison.OrdinalIgnoreCase) {
        thisStr = System.String.ToLower(this);
        argStr = System.String.ToLower(str2);
    }

    return thisStr == argStr;
}

//  --------------------------------------------------------------------------------------------------------------
class int {
    public static MaxValue = 2147483647;
    public static MinValue = -2147483647;
}

class Int32 {
    public static MaxValue = 2147483647;
    public static MinValue = -2147483647;
}

class UInt32 {
    public static MaxValue = 4294967295;
    public static MinValue = 0;
}

class Int64 {
    public static MaxValue = 9223372036854775807;
    public static MinValue = -9223372036854775808;
}

class Byte {
    public static MaxValue = 0xFF;
    public static MinValue = 0;
}

class ushort {
    public static MaxValue = 65535;
    public static MinValue = 0;
}

class uint {
    public static MaxValue = 4294967295;
    public static MinValue = 0;
}

class TSChar {
    public static MaxValue: string = String.fromCharCode(65535);
    //public static MinValue = 0;
}

class GenericStatic_Static<T> {
    private obj: Object = new Object();
    public NewFunc: () => T;
    public Get(clss: any): T {
        var result = this.obj[clss];
        if (result == undefined) {
            return null;
        }
        return <T>result;
    }

    public RegisterOrGet<U>(clss: { prototype: U }): T {
        var result = this.obj[<any>clss];
        if (result === void 0) {
            result = this.NewFunc();
            this.obj[<any>clss] = result;
        }

        return result;
    }
}

class Gb {

    public static GetEnumMembers<T>(enumType: { prototype: T }): { key: string; value: number }[] {
        var arr = new Array();
        for (var enumMember in enumType) {
            if (typeof enumMember === 'string') {
                arr.push({ key: enumMember, value: <number>enumType[enumMember] });
            }
        }

        return arr;
    }

    public static AssemblyName = 'RoslynTypeScript';
    public static Id: number = 0;
    private static InnerHashCode = 10;
    public static get HashCode(): number {
        return Gb.InnerHashCode;
    }

    public static NextHashCode(): number {
        return ++Gb.InnerHashCode;
    }

    public static HasEqualsOperator(val1: Object): boolean {
        return val1.hasOwnProperty('OperatorEquals');
    }

    public static Equals(val1: any, val2: any): boolean {
        return val1.OperatorEquals(val2);
    }

    public static NotEqual(val1: any, val2: any): boolean {
        return val1.OperatorNotEqual(val2);
    }

    public static StringFromChar(c: string, count: number) {
        var arr = new Array<string>();
        for (var i = 0; i < count; i++) {
            arr.push(c);
        }

        return arr.join('');
    }

    public static StringFromCharArray(arr: string[], start: number, length: number) {
       
        if (length > arr.length - start) {
            length = arr.length - start;
        }
        var newArr = new Array<string>(length);
        for (var i = start; i < start + length; i++) {
            newArr[i - start] = arr[i];
        }

        return newArr.join('');
    }
}

class TSArrayBuffer {
    public static Clear(arr: Int8Array, index: number, length: number): void {
        for (var i = index; i < length; i++) {
            arr[i] = 0;
        }
    }
    public static Copy(sourceArray: Int8Array, destinationArray: Int8Array, length: number);
    public static Copy(sourceArray: Int8Array, sourceIndex: number, destinationArray: Int8Array, destinationIndex: number, length: number);
    public static Copy(param1: any, param2: any, param3: any, param4?: any, param5?: any) {
        if (typeof param5 == 'undefined') TSArray.Copy_2(param1, param2, param3);
        if (param5) TSArray.Copy_1(param1, param2, param3, param4, param5);
    }

    public static Copy_1(sourceArray: Int8Array, sourceIndex: number, destinationArray: Int8Array, destinationIndex: number, length: number) {
        for (var i: number = 0; i < length; i++) {
            destinationArray[i + destinationIndex] = sourceArray[i + sourceIndex];
        }
    }

    public static Copy_2(sourceArray: Int8Array, destinationArray: Int8Array, length: number) {
        TSArrayBuffer.Copy_1(sourceArray, 0, destinationArray, 0, length);
    }
}

class TSArray {

    //public static Resize(array: Array<any>, length: number): void {
    //    array.length = length;
    //}

    public static Resize(array: { refObj: Array<any> }, length: number): void {
        array.refObj.length = length;
    }

    public static IndexOf(array: Array<any>, value: Object, startIndex: number, count: number): number {

        var lb: number = 0;

        //var objArray: Object[] = array as Object[];
        var endIndex: number = startIndex + count;

        if (value == null) {
            for (var i: number = startIndex; i < endIndex; i++) {
                if (array[i] == null)
                    return i;
            }
        }
        else {
            var isUseEquals = false;
            if (array.length > 0 && Gb.HasEqualsOperator(array[0])) {
                isUseEquals = true;
            }

            for (var i: number = startIndex; i < endIndex; i++) {
                var obj: any = array[i];
                if (isUseEquals) {
                    if (obj != null && Gb.Equals(obj, value))
                        return i;
                } else {
                    if (obj != null && obj == value)
                        return i;
                }

            }
        }

        return lb - 1;
    }

    public static Clear(arr: Array<any>, index: number, length: number): void {
        var clearValue: any;
        if (arr.length > 0) {

            var firstValue = arr[0];
            if (typeof firstValue == 'number') {
                clearValue = 0;
            } else if (typeof firstValue == 'boolean') {
                clearValue = false;
            } else {
                clearValue = null;
            }
        }

        for (var i = index; i < length; i++) {
            arr[i] = clearValue;
        }
    }
    public static Copy(sourceArray: Array<any>, destinationArray: Array<any>, length: number);
    public static Copy(sourceArray: Array<any>, sourceIndex: number, destinationArray: Array<any>, destinationIndex: number, length: number);
    public static Copy(param1: any, param2: any, param3: any, param4?: any, param5?: any) {
        if (typeof param5 == 'undefined') TSArray.Copy_2(param1, param2, param3);
        if (param5) TSArray.Copy_1(param1, param2, param3, param4, param5);
    }

    public static Copy_1(sourceArray: Array<any>, sourceIndex: number, destinationArray: Array<any>, destinationIndex: number, length: number) {
        for (var i: number = 0; i < length; i++) {
            destinationArray[i + destinationIndex] = sourceArray[i + sourceIndex];
        }
    }

    public static Copy_2(sourceArray: Array<any>, destinationArray: Array<any>, length: number) {
        TSArray.Copy_1(sourceArray, 0, destinationArray, 0, length);
    }

    public static Reverse(array: Array<any>, index: number, length: number) {
        var i: number = index;
        var j: number = index + length - 1;

        while (i < j) {
            var temp: any = array[i];
            array[i] = array[j];
            array[j] = temp;
            i++;
            j--;
        }
    }

    public static GetMedian(low: number, hi: number): number {
        System.Diagnostics.Contracts.Contract.Requires(low <= hi);
        System.Diagnostics.Contracts.Contract.Assert(hi - low >= 0, "Length overflow!");
        return low + ((hi - low) >> 1);
    }
    public static BinarySearch(array: Array<any>, index: number, length: number, value: Object): number;
    public static BinarySearch(array: Array<any>, value: Object, comparer: System.Collections.IComparer): number;
    public static BinarySearch(array: Array<any>, index: number, length: number, value: Object, comparer: System.Collections.IComparer): number;
    public static BinarySearch<T>(array: T[], value: T): number;
    public static BinarySearch<T>(array: T[], value: T, comparer: System.Collections.Generic.IComparer<T>): number;
    public static BinarySearch<T>(array: T[], index: number, length: number, value: T): number;
    public static BinarySearch<T>(array: T[], index: number, length: number, value: T, comparer: System.Collections.Generic.IComparer<T>): number;
    public static BinarySearch(array: Array<any>, value: Object): number;
    public static BinarySearch(param0: any, param1: any, param2?: any, param3?: any, param4?: any): number {
        if (param0 instanceof Array && typeof param1 == 'number' && typeof param2 == 'number' && typeof param3 != 'undefined' && typeof param4 == 'undefined') { return this.BinarySearch_overload5(param0, param1, param2, param3); }
        if (param0 instanceof Array && typeof param1 == 'number' && typeof param2 == 'number' && typeof param3 != 'undefined' && typeof param4 != 'undefined') { return this.BinarySearch_overload6(param0, param1, param2, param3, param4); }
        if (param0 instanceof Array && typeof param1 == 'number' && typeof param2 == 'number' && param3 instanceof Object && typeof param4 == 'undefined') { return this.BinarySearch_overload0(param0, param1, param2, param3); }
        if (param0 instanceof Array && typeof param1 == 'number' && typeof param2 == 'number' && param3 instanceof Object && typeof param4 != 'undefined') { return this.BinarySearch_overload2(param0, param1, param2, param3, param4); }
        if (param0 instanceof Array && typeof param1 != 'undefined' && typeof param2 == 'undefined' && typeof param3 == 'undefined' && typeof param4 == 'undefined') { return this.BinarySearch_overload3(param0, param1); }
        if (param0 instanceof Array && typeof param1 != 'undefined' && typeof param2 != 'undefined' && typeof param3 == 'undefined' && typeof param4 == 'undefined') { return this.BinarySearch_overload4(param0, param1, param2); }
        if (param0 instanceof Array && param1 instanceof Object && typeof param2 != 'undefined' && typeof param3 == 'undefined' && typeof param4 == 'undefined') { return this.BinarySearch_overload1(param0, param1, param2); }
        if (param0 instanceof Array && param1 instanceof Object && typeof param2 == 'undefined' && typeof param3 == 'undefined' && typeof param4 == 'undefined') { return this.BinarySearch_overload7(param0, param1); }
    }
    private static BinarySearch_overload0(array: Array<any>, index: number, length: number, value: Object): number {
        return TSArray.BinarySearch(array, index, length, value, null);
    }
    private static BinarySearch_overload1(array: Array<any>, value: Object, comparer: System.Collections.IComparer): number {
        //if (array == null)
        //    throw new System.ArgumentNullException("array");
        //System.Diagnostics.Contracts.Contract.EndContractBlock();
        var lb: number = 0;
        return TSArray.BinarySearch(array, lb, array.length, value, comparer);
    }
    private static BinarySearch_overload2(array: Array<any>, index: number, length: number, value: Object, comparer: System.Collections.IComparer): number {
        //if (array == null)
        //    throw new System.ArgumentNullException("array");
        //System.Diagnostics.Contracts.Contract.EndContractBlock();
        var lb: number = 0;
        //if (index < lb || length < 0)
        //    throw new System.ArgumentOutOfRangeException((index < lb ? "index" : "length"), System.Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
        //if (array.length - (index - lb) < length)
        //    throw new System.ArgumentException(System.Environment.GetResourceString("Argument_InvalidOffLen"));

        if (comparer == null)
            comparer = System.Collections.Comparer.Default;

        var lo: number = index;
        var hi: number = index + length - 1;
        var objArray = array;

        while (lo <= hi) {
            var i: number = TSArray.GetMedian(lo, hi);
            var c: number = 0;
            try {
                c = comparer.Compare(objArray[i], value);
            }
            catch (e) {
                throw new System.InvalidOperationException(System.Environment.GetResourceString("InvalidOperation_IComparerFailed"), e);
            }

            if (c == 0)
                return i;
            if (c < 0) {
                lo = i + 1;
            }
            else {
                hi = i - 1;
            }
        }

        return ~lo;
    }
    private static BinarySearch_overload3<T>(array: T[], value: T): number {
        //if (array == null)
        //    throw new System.ArgumentNullException("array");
        //System.Diagnostics.Contracts.Contract.EndContractBlock();        
        return TSArray.BinarySearch<T>(array, 0, array.length, value, null);
    }
    private static BinarySearch_overload4<T>(array: T[], value: T, comparer: System.Collections.Generic.IComparer<T>): number {
        //if (array == null)
        //    throw new System.ArgumentNullException("array");
        //System.Diagnostics.Contracts.Contract.EndContractBlock();
        return TSArray.BinarySearch<T>(array, 0, array.length, value, comparer);
    }
    private static BinarySearch_overload5<T>(array: T[], index: number, length: number, value: T): number {
        return TSArray.BinarySearch<T>(array, index, length, value, null);
    }
    private static BinarySearch_overload6<T>(array: T[], index: number, length: number, value: T, comparer: System.Collections.Generic.IComparer<T>): number {
        //if (array == null)
        //    throw new System.ArgumentNullException("array");
        //if (index < 0 || length < 0)
        //    throw new System.ArgumentOutOfRangeException((index < 0 ? "index" : "length"), System.Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
        //if (array.length - index < length)
        //    throw new System.ArgumentException(System.Environment.GetResourceString("Argument_InvalidOffLen"));
        //System.Diagnostics.Contracts.Contract.EndContractBlock();
        throw new System.NotSupportedException("");
        //return ArraySortHelper<T>.Default.BinarySearch(array, index, length, value, comparer);
    }
    private static BinarySearch_overload7(array: Array<any>, value: Object): number {
        if (array == null)
            throw new System.ArgumentNullException("array");
        //System.Diagnostics.Contracts.Contract.Ensures((System.Diagnostics.Contracts.Contract.Result<number>() >= array.GetLowerBound(0) && System.Diagnostics.Contracts.Contract.Result<number>() <= array.GetUpperBound(0)) || (System.Diagnostics.Contracts.Contract.Result<number>() < array.GetLowerBound(0) && ~System.Diagnostics.Contracts.Contract.Result<number>() <= array.GetUpperBound(0) + 1));
        //System.Diagnostics.Contracts.Contract.EndContractBlock();
        var lb: number = 0;
        return TSArray.BinarySearch(array, lb, array.length, value, null);
    }

    public static LastIndexOf(array: Array<any>, value: Object): number;
    public static LastIndexOf(array: Array<any>, value: Object, startIndex: number, count: number): number;
    public static LastIndexOf(array: Array<any>, value: Object, startIndex: number): number;
    public static LastIndexOf(param0: Array<any>, param1: Object, param2?: number, param3?: number): number {
        if (param0 instanceof Array && param1 instanceof Object && typeof param2 == 'number' && typeof param3 == 'number') { return this.LastIndexOf_overload1(param0, param1, param2, param3); }
        if (param0 instanceof Array && param1 instanceof Object && typeof param2 == 'number' && typeof param3 == 'undefined') { return this.LastIndexOf_overload2(param0, param1, param2); }
        if (param0 instanceof Array && param1 instanceof Object && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.LastIndexOf_overload0(param0, param1); }
    }
    private static LastIndexOf_overload0(array: Array<any>, value: Object): number {
        if (array == null)
            throw new System.ArgumentNullException("array");
        //Contract.Ensures(Contract.Result<number>() < array.GetLowerBound(0) + array.length);
        //Contract.EndContractBlock();
        var lb: number = 0;
        return TSArray.LastIndexOf(array, value, array.length - 1 + lb, array.length);
    }
    private static LastIndexOf_overload1(array: Array<any>, value: Object, startIndex: number, count: number): number {
        if (array == null)
            throw new System.ArgumentNullException("array");
        // Contract.Ensures(Contract.Result<number>() < array.GetLowerBound(0) + array.length);
        // Contract.EndContractBlock();
        var lb: number = 0;
        if (array.length == 0) {
            return lb - 1;
        }
        if (startIndex < lb || startIndex >= array.length + lb)
            throw new System.ArgumentOutOfRangeException("startIndex", System.Environment.GetResourceString("ArgumentOutOfRange_Index"));
        if (count < 0)
            throw new System.ArgumentOutOfRangeException("count", System.Environment.GetResourceString("ArgumentOutOfRange_Count"));
        if (count > startIndex - lb + 1)
            throw new System.ArgumentOutOfRangeException("endIndex", System.Environment.GetResourceString("ArgumentOutOfRange_EndIndexStartIndex"));
        //if (array.Rank != 1)
        //    throw new System.RankException(System.Environment.GetResourceString("Rank_MultiDimNotSupported"));
        //var retVal: number = 0;
        //var r: boolean = (() => {
        //    var retVal_ref0 = { refObj: retVal };
        //    var ret_val_ = TrySZLastIndexOf(array, startIndex, count, value, retVal_ref0);

        //    retVal = retVal_ref0.refObj;
        //    return ret_val_;
        //})();
        //if (r)
        //    return retVal;
        //var objArray: Object[] = array as Object[];
        var endIndex: number = startIndex - count + 1;
        if (value == null) {
            for (var i: number = startIndex; i >= endIndex; i--) {
                if (array[i] == null)
                    return i;
            }
        }
        else {
            var isUseEquals = false;
            if (array.length > 0 && Gb.HasEqualsOperator(array[0])) {
                isUseEquals = true;
            }

            for (var i: number = startIndex; i >= endIndex; i--) {
                var obj = array[i];
                if (isUseEquals) {
                    if (obj != null && Gb.Equals(obj, value))
                        return i;
                } else {
                    if (obj != null && obj == value)
                        return i;
                }
            }
        }
        return lb - 1;
    }
    private static LastIndexOf_overload2(array: Array<any>, value: Object, startIndex: number): number {
        if (array == null)
            throw new System.ArgumentNullException("array");
        //Contract.Ensures(Contract.Result<number>() < array.GetLowerBound(0) + array.length);
        //Contract.EndContractBlock();
        var lb: number = 0;
        return TSArray.LastIndexOf(array, value, startIndex, startIndex + 1 - lb);
    }

    public static Sort(array: Array<any>, index: number, length: number): void;
    public static Sort(keys: Array<any>, items: Array<any>, index: number, length: number): void;
    public static Sort(array: Array<any>, comparer: System.Collections.IComparer): void;
    public static Sort(keys: Array<any>, items: Array<any>, comparer: System.Collections.IComparer): void;
    public static Sort(array: Array<any>, index: number, length: number, comparer: System.Collections.IComparer): void;
    public static Sort(keys: Array<any>, items: Array<any>, index: number, length: number, comparer: System.Collections.IComparer): void;
    public static Sort(keys: Array<any>, items: Array<any>): void;
    public static Sort(param0: Array<any>, param1: any, param2?: any, param3?: any, param4?: System.Collections.IComparer): void {
        if (param0 instanceof Array && typeof param1 == 'number' && typeof param2 == 'number' && typeof param3 == 'undefined' && typeof param4 == 'undefined') { return this.Sort_overload0(param0, param1, param2); }
        if (param0 instanceof Array && (param1 instanceof Array || param1 === null) && typeof param2 === 'number' && typeof param3 === 'number' && typeof param4 === 'undefined') { return this.Sort_overload1(param0, param1, param2, param3); }
        if (param0 instanceof Array && (param1 instanceof Array || param1 === null) && typeof param2 === 'number' && typeof param3 === 'number' && typeof param4 !== 'undefined') { return this.Sort_overload5(param0, param1, param2, param3, param4); }
        if (param0 instanceof Array && typeof param1 == 'number' && typeof param2 == 'number' && typeof param3 != 'undefined' && typeof param4 == 'undefined') { return this.Sort_overload4(param0, param1, param2, param3); }

        if (param0 instanceof Array && (param1 instanceof Array || param1 === null) && typeof param2 === 'undefined' && typeof param3 === 'undefined' && typeof param4 === 'undefined') { return this.Sort_overload6(param0, param1); }
        if (param0 instanceof Array && (param1 instanceof Array || param1 === null) && typeof param2 !== 'undefined' && typeof param3 === 'undefined' && typeof param4 === 'undefined') { return this.Sort_overload3(param0, param1, param2); }
        if (param0 instanceof Array && typeof param1 !== 'undefined' && typeof param2 == 'undefined' && typeof param3 === 'undefined' && typeof param4 === 'undefined') { return this.Sort_overload2(param0, param1); }
    }
    private static Sort_overload0(array: Array<any>, index: number, length: number): void {
        TSArray.Sort_overload5(array, null, index, length, null);
    }
    private static Sort_overload1(keys: Array<any>, items: Array<any>, index: number, length: number): void {
        TSArray.Sort_overload5(keys, items, index, length, null);
    }
    private static Sort_overload2(array: Array<any>, comparer: System.Collections.IComparer): void {
        if (array == null)
            throw new System.ArgumentNullException("array");
        //Contract.EndContractBlock();
        TSArray.Sort_overload5(array, null, 0, array.length, comparer);
    }
    private static Sort_overload3(keys: Array<any>, items: Array<any>, comparer: System.Collections.IComparer): void {
        if (keys == null)
            throw new System.ArgumentNullException("keys");
        //Contract.EndContractBlock();
        TSArray.Sort_overload5(keys, items, 0, keys.length, comparer);
    }
    private static Sort_overload4(array: Array<any>, index: number, length: number, comparer: System.Collections.IComparer): void {
        TSArray.Sort_overload5(array, null, index, length, comparer);
    }
    private static Sort_overload5(keys: Array<any>, items: Array<any>, index: number, length: number, comparer: System.Collections.IComparer): void {
        //if (keys == null)
        //    throw new System.ArgumentNullException("keys");
        //if (keys.Rank != 1 || (items != null && items.Rank != 1))
        //    throw new System.RankException(System.Environment.GetResourceString("Rank_MultiDimNotSupported"));
        //if (items != null && keys.GetLowerBound(0) != items.GetLowerBound(0))
        //    throw new System.ArgumentException(System.Environment.GetResourceString("Arg_LowerBoundsMustMatch"));
        //if (index < keys.GetLowerBound(0) || length < 0)
        //    throw new System.ArgumentOutOfRangeException((length < 0 ? "length" : "index"), System.Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
        //if (keys.length - (index - keys.GetLowerBound(0)) < length || (items != null && (index - items.GetLowerBound(0)) > items.length - length))
        //    throw new System.ArgumentException(System.Environment.GetResourceString("Argument_InvalidOffLen"));
        //Contract.EndContractBlock();
        if (length > 1) {
            //if (comparer == System.Collections.Comparer.Default || comparer === null) {
            //    var r: boolean = TrySZSort(keys, items, index, index + length - 1);
            //    if (r)
            //        return
            //}
            //var objKeys: Object[] = keys as Object[];
            //var objItems: Object[] = null;

            var sorter: TSArray.SorterObjectArray = new TSArray.SorterObjectArray(keys, items, comparer);
            sorter.Sort(index, length);
            //if (objKeys != null)
            //    objItems = items as Object[];
            //if (objKeys != null && (items == null || objItems != null)) {
              
            //}
            //else {
            //    var sorter: SorterGenericArray = new SorterGenericArray(keys, items, comparer);
            //    sorter.Sort(index, length);
            //}
        }
    }
    private static Sort_overload6(keys: Array<any>, items: Array<any>): void {
        if (keys == null)
            throw new System.ArgumentNullException("keys");
        //Contract.EndContractBlock();
        TSArray.Sort(keys, items, 0, keys.length, null);
    }
}
module TSArray {
    export class SorterObjectArray {
        private keys: Object[] = null;
        private items: Object[] = null;
        private comparer: System.Collections.IComparer = null;
        constructor(keys: Object[], items: Object[], comparer: System.Collections.IComparer) {
            if (comparer == null)
                comparer = System.Collections.Comparer.Default;
            this.keys = keys;
            this.items = items;
            this.comparer = comparer;
        }
        public SwapIfGreaterWithItems(a: number, b: number): void {
            if (a != b) {
                if (this.comparer.Compare(this.keys[a], this.keys[b]) > 0) {
                    var temp: Object = this.keys[a];
                    this.keys[a] = this.keys[b];
                    this.keys[b] = temp;
                    if (this.items != null) {
                        var item: Object = this.items[a];
                        this.items[a] = this.items[b];
                        this.items[b] = item;
                    }
                }
            }
        }
        private Swap(i: number, j: number): void {
            var t: Object = this.keys[i];
            this.keys[i] = this.keys[j];
            this.keys[j] = t;
            if (this.items != null) {
                var item: Object = this.items[i];
                this.items[i] = this.items[j];
                this.items[j] = item;
            }
        }
        public Sort(left: number, length: number): void {
            this.IntrospectiveSort(left, length);
            //if (BinaryCompatibility.TargetsAtLeast_Desktop_V4_5) {
                
            //}
            //else {
            //    DepthLimitedQuickSort(left, length + left - 1, IntrospectiveSortUtilities.QuickSortDepthThreshold);
            //}
        }
        private DepthLimitedQuickSort(left: number, right: number, depthLimit: number): void {
            do {
                if (depthLimit == 0) {
                    try {
                        this.Heapsort(left, right);
                        return
                    } catch (__ex__) {
                        if (__ex__ instanceof System.IndexOutOfRangeException) {
                            throw new System.ArgumentException(System.Environment.GetResourceString("Arg_BogusIComparer", this.comparer));
                        }
                        var e = __ex__; if (e instanceof System.Exception) {
                            throw new System.InvalidOperationException(System.Environment.GetResourceString("InvalidOperation_IComparerFailed"), e);
                        }

                    }

                }
                var i: number = left;
                var j: number = right;
                var middle: number = TSArray.GetMedian(i, j);
                try {
                    this.SwapIfGreaterWithItems(i, middle);
                    this.SwapIfGreaterWithItems(i, j);
                    this.SwapIfGreaterWithItems(middle, j);
                }
                catch (e) {
                    throw new System.InvalidOperationException(System.Environment.GetResourceString("InvalidOperation_IComparerFailed"), e);
                }

                var x: Object = this.keys[middle];
                do {
                    try {
                        while (this.comparer.Compare(this.keys[i], x) < 0)
                            i++;
                        while (this.comparer.Compare(x, this.keys[j]) < 0)
                            j--;
                    } catch (__ex__) {
                        if (__ex__ instanceof System.IndexOutOfRangeException) {
                            throw new System.ArgumentException(System.Environment.GetResourceString("Arg_BogusIComparer", this.comparer));
                        }
                        var e = __ex__; if (e instanceof System.Exception) {
                            throw new System.InvalidOperationException(System.Environment.GetResourceString("InvalidOperation_IComparerFailed"), e);
                        }

                    }

                    // Contract.Assert(i >= left && j <= right, "(i>=left && j<=right)  Sort failed - Is your IComparer bogus?");
                    if (i > j)
                        break;
                    if (i < j) {
                        var key: Object = this.keys[i];
                        this.keys[i] = this.keys[j];
                        this.keys[j] = key;
                        if (this.items != null) {
                            var item: Object = this.items[i];
                            this.items[i] = this.items[j];
                            this.items[j] = item;
                        }
                    }
                    i++;
                    j--;
                }
                while (i <= j);
                depthLimit--;
                if (j - left <= right - i) {
                    if (left < j)
                        this.DepthLimitedQuickSort(left, j, depthLimit);
                    left = i;
                }
                else {
                    if (i < right)
                        this.DepthLimitedQuickSort(i, right, depthLimit);
                    right = j;
                }
            }
            while (left < right);
        }
        private IntrospectiveSort(left: number, length: number): void {
            if (length < 2)
                return
            try {
                this.IntroSort(left, length + left - 1, 2 * IntrospectiveSortUtilities.FloorLog2(this.keys.length));
            } catch (__ex__) {
                if (__ex__ instanceof System.IndexOutOfRangeException) {
                    IntrospectiveSortUtilities.ThrowOrIgnoreBadComparer(this.comparer);
                }
                var e = __ex__; if (e instanceof System.Exception) {
                    throw new System.InvalidOperationException(System.Environment.GetResourceString("InvalidOperation_IComparerFailed"), e);
                }

            }

        }
        private IntroSort(lo: number, hi: number, depthLimit: number): void {
            while (hi > lo) {
                var partitionSize: number = hi - lo + 1;
                if (partitionSize <= IntrospectiveSortUtilities.IntrosortSizeThreshold) {
                    if (partitionSize == 1) {
                        return
                    }
                    if (partitionSize == 2) {
                        this.SwapIfGreaterWithItems(lo, hi);
                        return
                    }
                    if (partitionSize == 3) {
                        this.SwapIfGreaterWithItems(lo, hi - 1);
                        this.SwapIfGreaterWithItems(lo, hi);
                        this.SwapIfGreaterWithItems(hi - 1, hi);
                        return
                    }
                    this.InsertionSort(lo, hi);
                    return
                }
                if (depthLimit == 0) {
                    this.Heapsort(lo, hi);
                    return
                }
                depthLimit--;
                var p: number = this.PickPivotAndPartition(lo, hi);
                this.IntroSort(p + 1, hi, depthLimit);
                hi = p - 1;
            }
        }
        private PickPivotAndPartition(lo: number, hi: number): number {
            var mid: number = lo + ((hi - lo) / 2 | 0);
            this.SwapIfGreaterWithItems(lo, mid);
            this.SwapIfGreaterWithItems(lo, hi);
            this.SwapIfGreaterWithItems(mid, hi);
            var pivot: Object = this.keys[mid];
            this.Swap(mid, hi - 1);
            var left: number = lo, right = hi - 1;
            while (left < right) {
                while (this.comparer.Compare(this.keys[++left], pivot) < 0)
                    ;
                while (this.comparer.Compare(pivot, this.keys[--right]) < 0)
                    ;
                if (left >= right)
                    break;
                this.Swap(left, right);
            }
            this.Swap(left,(hi - 1));
            return left;
        }
        private Heapsort(lo: number, hi: number): void {
            var n: number = hi - lo + 1;
            for (var i: number = (n / 2 | 0); i >= 1; i = i - 1) {
                this.DownHeap(i, n, lo);
            }
            for (var i: number = n; i > 1; i = i - 1) {
                this.Swap(lo, lo + i - 1);
                this.DownHeap(1, i - 1, lo);
            }
        }
        private DownHeap(i: number, n: number, lo: number): void {
            var d: Object = this.keys[lo + i - 1];
            var dt: Object = (this.items != null) ? this.items[lo + i - 1] : null;
            var child: number = 0;
            while (i <= (n / 2 | 0)) {
                child = 2 * i;
                if (child < n && this.comparer.Compare(this.keys[lo + child - 1], this.keys[lo + child]) < 0) {
                    child++;
                }
                if (!(this.comparer.Compare(d, this.keys[lo + child - 1]) < 0))
                    break;
                this.keys[lo + i - 1] = this.keys[lo + child - 1];
                if (this.items != null)
                    this.items[lo + i - 1] = this.items[lo + child - 1];
                i = child;
            }
            this.keys[lo + i - 1] = d;
            if (this.items != null)
                this.items[lo + i - 1] = dt;
        }
        private InsertionSort(lo: number, hi: number): void {
            var i: number = 0, j = 0;
            var t: Object = null, ti = null;
            for (; i < hi; i++) {
                j = i;
                t = this.keys[i + 1];
                ti = (this.items != null) ? this.items[i + 1] : null;
                while (j >= lo && this.comparer.Compare(t, this.keys[j]) < 0) {
                    this.keys[j + 1] = this.keys[j];
                    if (this.items != null)
                        this.items[j + 1] = this.items[j];
                    j--;
                }
                this.keys[j + 1] = t;
                if (this.items != null)
                    this.items[j + 1] = ti;
            }
        }
    }
    export class IntrospectiveSortUtilities {
        public static IntrosortSizeThreshold: number = 16;
        public static QuickSortDepthThreshold: number = 32;
        public static FloorLog2(n: number): number {
            var result: number = 0;
            while (n >= 1) {
                result++;
                n = (n / 2 | 0);
            }
            return result;
        }
        public static ThrowOrIgnoreBadComparer(comparer: Object): void {
            throw new System.ArgumentException(System.Environment.GetResourceString("Arg_BogusIComparer", comparer));
        }
    }


    export class FunctorComparer<T> implements System.Collections.Generic.IComparer<T>
    {
        comparison: (_: T, __: T) => number = null;
        constructor(comparison: (_: T, __: T) => number) {
            this.comparison = comparison;
        }
        public Compare(x: T, y: T): number {
            return this.comparison(x, y);
        }
    }
}