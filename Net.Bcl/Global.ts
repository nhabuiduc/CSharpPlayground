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

