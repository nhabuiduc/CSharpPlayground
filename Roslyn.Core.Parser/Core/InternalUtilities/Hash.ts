module Roslyn.Utilities {
    export class Hash {
        public static Combine_1641(newKey: number, currentKey: number): number {
            return ((currentKey * <number>0xA5555529) + newKey);
        }
        public static Combine_1020(newKeyPart: boolean, currentKey: number): number {
            return Hash.Combine_1641(currentKey, newKeyPart ? 1 : 0);
        }
        public static Combine_7656<T>(newKeyPart: T, currentKey: number): number {
            var hash: number = (currentKey * <number>0xA5555529);
            if (newKeyPart != null) {
                if (typeof newKeyPart["GetHashCode"] == 'undefined') {
                    throw new System.FunctionRequiredException("there is no GetHashCode function");
                }
                return (hash + (<any>newKeyPart).GetHashCode());
            }
            return hash;
        }
        //public static CombineValues_9739<T>(values: System.Collections.Generic.IEnumerable<T>, maxItemsToHash: number = Int32.MaxValue): number {
        //    if (values == null) {
        //        return 0;
        //    }
        //    var hashCode = 0;
        //    var count = 0;
        //    // for each
        //    var valueEnumerator = values.GetEnumerator();
        //    try {
        //        while (valueEnumerator.MoveNext()) {
        //            var value = valueEnumerator.Current;
        //            // foreach block
        //            if (count++ >= maxItemsToHash) {
        //                break;
        //            }
        //            if (value != null) {
        //                hashCode = Hash.Combine_1641(value.GetHashCode(), hashCode);
        //            }
        //        }
        //    } finally {
        //        if (valueEnumerator !== null && (<any>valueEnumerator).Dispose !== void 0) (<any>valueEnumerator).Dispose();

        //    }    
        //    // end foreach
        //    return hashCode;
        //}
        //public static CombineValues_4200<T>(values: System.Collections.Immutable.ImmutableArray<T>, maxItemsToHash: number = Int32.MaxValue): number {
        //    if (values.IsDefaultOrEmpty) {
        //        return 0;
        //    }
        //    var hashCode = 0;
        //    var count = 0;
        //    // for each
        //    var valueEnumerator = values.GetEnumerator();
        //    try {
        //        while (valueEnumerator.MoveNext()) {
        //            var value = valueEnumerator.Current;
        //            // foreach block
        //            if (count++ >= maxItemsToHash) {
        //                break;
        //            }
        //            if (value != null) {
        //                hashCode = Hash.Combine_1641(value.GetHashCode(), hashCode);
        //            }
        //        }
        //    } finally {
        //        if (valueEnumerator !== null && (<any>valueEnumerator).Dispose !== void 0) (<any>valueEnumerator).Dispose();

        //    }    
        //    // end foreach
        //    return hashCode;
        //}
        public static CombineValues_1752(values: System.Collections.Generic.IEnumerable<string>, stringComparer: System.StringComparer, maxItemsToHash: number = Int32.MaxValue): number {
            if (values == null) {
                return 0;
            }
            var hashCode = 0;
            var count = 0;
            // for each
            var valueEnumerator = values.GetEnumerator();
            try {
                while (valueEnumerator.MoveNext()) {
                    var value = valueEnumerator.Current;
                    // foreach block
                    if (count++ >= maxItemsToHash) {
                        break;
                    }
                    if (value != null) {
                        hashCode = Hash.Combine_1641(stringComparer.GetHashCode(value), hashCode);
                    }
                }
            } finally {
                if (valueEnumerator !== null && (<any>valueEnumerator).Dispose !== void 0) (<any>valueEnumerator).Dispose();

            }    
            // end foreach
            return hashCode;
        }
        public static FnvOffsetBias: number = (<number>2166136261);
        public static FnvPrime: number = 16777619;
        public static GetFNVHashCode_1519(data: number[]): number {
            var hashCode: number = Hash.FnvOffsetBias;
            for (var i: number = 0; i < data.length; i++) {
                hashCode = ((hashCode ^ data[i]) * Hash.FnvPrime);
            }
            return hashCode;
        }
        //public static GetFNVHashCode_1105(data: byte*,length: number, isAscii: { refObj: boolean }): number {
        //    var hashCode: number = Hash.FnvOffsetBias;
        //    var asciiMask: number = 0;
        //    for (var i: number = 0; i < length; i++) {
        //        var b: number = data.$get$(i);
        //        asciiMask |= b;
        //        hashCode = ((hashCode ^ b) * Hash.FnvPrime);
        //    }
        //    isAscii.refObj = (asciiMask & 0x80) == 0;
        //    return hashCode;
        //}
        public static GetFNVHashCode_6282(data: System.Collections.Immutable.ImmutableArray<number>): number {
            var hashCode: number = Hash.FnvOffsetBias;
            for (var i: number = 0; i < data.Length; i++) {
                hashCode = ((hashCode ^ data.$get$(i)) * Hash.FnvPrime);
            }
            return hashCode;
        }
        public static GetFNVHashCode_8424(text: string, start: number, length: number): number {
            var hashCode: number = Hash.FnvOffsetBias;
            var end: number = start + length;
            for (var i: number = start; i < end; i++) {
                hashCode = ((hashCode ^ text[i].charCodeAt(0)) * Hash.FnvPrime);
            }
            return hashCode;
        }
        public static GetFNVHashCode_6588(text: string, start: number): number {
            return Hash.GetFNVHashCode_8424(text, start,/*length:*/text.length - start);
        }
        public static GetFNVHashCode_6086(text: string): number {
            return Hash.CombineFNVHash_1688(Hash.FnvOffsetBias, text);
        }
        public static GetFNVHashCode_1874(text: System.Text.StringBuilder): number {
            var hashCode: number = Hash.FnvOffsetBias;
            var end: number = text.Length;
            for (var i: number = 0; i < end; i++) {
                hashCode = ((hashCode ^ text.$get$(i).charCodeAt(0)) * Hash.FnvPrime);
            }
            return hashCode;
        }
        public static GetFNVHashCode_1270(text: string[], start: number, length: number): number {
            var hashCode: number = Hash.FnvOffsetBias;
            var end: number = start + length;
            for (var i: number = start; i < end; i++) {
                hashCode = ((hashCode ^ text[i].charCodeAt(0)) * Hash.FnvPrime);
            }
            return hashCode;
        }
        public static GetFNVHashCode_1818(ch: string): number {
            return Hash.CombineFNVHash_8743(Hash.FnvOffsetBias, ch);
        }
        public static CombineFNVHash_1688(hashCode: number, text: string): number {
            // for each
            var chEnumerator = text.GetEnumerator();
            try {
                while (chEnumerator.MoveNext()) {
                    var ch = chEnumerator.Current;
                    // foreach block
                    hashCode = ((hashCode ^ ch.charCodeAt(0)) * Hash.FnvPrime);
                }
            } finally {
                if (chEnumerator !== null && (<any>chEnumerator).Dispose !== void 0) (<any>chEnumerator).Dispose();

            }    
            // end foreach
            return hashCode;
        }
        public static CombineFNVHash_8743(hashCode: number, ch: string): number {
            return ((hashCode ^ ch.charCodeAt(0)) * Hash.FnvPrime);
        }
    }
}