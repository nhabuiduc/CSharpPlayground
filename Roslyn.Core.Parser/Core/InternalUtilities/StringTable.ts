module Roslyn.Utilities {
    export class StringTable {
        private static LocalSizeBits: number = 11;
        private static LocalSize: number = (1 << StringTable.LocalSizeBits);
        private static LocalSizeMask: number = StringTable.LocalSize - 1;
        private static SharedSizeBits: number = 16;
        public static SharedSize: number = (1 << StringTable.SharedSizeBits);
        private static SharedSizeMask: number = StringTable.SharedSize - 1;
        private static SharedBucketBits: number = 4;
        private static SharedBucketSize: number = (1 << StringTable.SharedBucketBits);
        private static SharedBucketSizeMask: number = StringTable.SharedBucketSize - 1;
        private localTable: StringTable.Entry[] = StructArray(StringTable.Entry, StringTable.LocalSize);
        public static sharedTable: StringTable.Entry[];//= StructArray(StringTable.Entry, StringTable.SharedSize);
        private localRandom: number = System.Environment.TickCount;
        private static sharedRandom: number = System.Environment.TickCount;
        ctor_1032(): StringTable {
            this.ctor_2526(null);
            return this;
        }
        ctor_2526(pool: ObjectPool<StringTable>): StringTable {
            this.pool = pool;
            return this;
        }
        private pool: ObjectPool<StringTable> ;
        private static StaticPool: ObjectPool<StringTable> = StringTable.CreatePool();
        private static CreatePool(): ObjectPool<StringTable> {
            var pool: ObjectPool<StringTable> = null;
            pool = new ObjectPool<StringTable>().ctor_5203(() => new StringTable().ctor_2526(pool), System.Environment.ProcessorCount * 2);
            return pool;
        }
        public static GetInstance(): StringTable {
            return StringTable.StaticPool.Allocate();
        }
        public Free(): void {
            this.pool.Free(this);
        }
        public Add_5745(chars: string[], start: number, len: number): string {
            var hashCode = Hash.GetFNVHashCode_1270(chars, start, len);
            var arr = this.localTable;
            var idx = StringTable.LocalIdxFromHash(hashCode);
            var text = arr[idx].Text;
            if (text != null && arr[idx].HashCode == hashCode) {
                var result = arr[idx].Text;
                if (StringTable.TextEquals_2659(result, chars, start, len)) {
                    return result;
                }
            }
            var shared: string = StringTable.FindSharedEntry_8276(chars, start, len, hashCode);
            if (shared != null) {
                arr[idx].HashCode = hashCode;
                arr[idx].Text = shared;
                return shared;
            }
            return this.AddItem_1779(chars, start, len, hashCode);
        }
        public Add_2770(chars: string, start: number, len: number): string {
            var hashCode = Hash.GetFNVHashCode_8424(chars, start, len);
            var arr = this.localTable;
            var idx = StringTable.LocalIdxFromHash(hashCode);
            var text = arr[idx].Text;
            if (text != null && arr[idx].HashCode == hashCode) {
                var result = arr[idx].Text;
                if (StringTable.TextEquals_1395(result, chars, start, len)) {
                    return result;
                }
            }
            var shared: string = StringTable.FindSharedEntry_1588(chars, start, len, hashCode);
            if (shared != null) {
                arr[idx].HashCode = hashCode;
                arr[idx].Text = shared;
                return shared;
            }
            return this.AddItem_2078(chars, start, len, hashCode);
        }
        public Add_1301(chars: string): string {
            var hashCode = Hash.GetFNVHashCode_1818(chars);
            var arr = this.localTable;
            var idx = StringTable.LocalIdxFromHash(hashCode);
            var text = arr[idx].Text;
            if (text != null) {
                var result = arr[idx].Text;
                if (text.length == 1 && text[0] == chars) {
                    return result;
                }
            }
            var shared: string = StringTable.FindSharedEntry_2038(chars, hashCode);
            if (shared != null) {
                arr[idx].HashCode = hashCode;
                arr[idx].Text = shared;
                return shared;
            }
            return this.AddItem_1837(chars, hashCode);
        }
        public Add_1270(chars: System.Text.StringBuilder): string {
            var hashCode = Hash.GetFNVHashCode_1874(chars);
            var arr = this.localTable;
            var idx = StringTable.LocalIdxFromHash(hashCode);
            var text = arr[idx].Text;
            if (text != null && arr[idx].HashCode == hashCode) {
                var result = arr[idx].Text;
                if (StringTable.TextEquals_1689(result, chars)) {
                    return result;
                }
            }
            var shared: string = StringTable.FindSharedEntry_1080(chars, hashCode);
            if (shared != null) {
                arr[idx].HashCode = hashCode;
                arr[idx].Text = shared;
                return shared;
            }
            return this.AddItem_1988(chars, hashCode);
        }
        public Add_2003(chars: string): string {
            var hashCode = Hash.GetFNVHashCode_6086(chars);
            var arr = this.localTable;
            var idx = StringTable.LocalIdxFromHash(hashCode);
            var text = arr[idx].Text;
            if (text != null && arr[idx].HashCode == hashCode) {
                var result = arr[idx].Text;
                if (result == chars) {
                    return result;
                }
            }
            var shared: string = StringTable.FindSharedEntry_2102(chars, hashCode);
            if (shared != null) {
                arr[idx].HashCode = hashCode;
                arr[idx].Text = shared;
                return shared;
            }
            this.AddCore(chars, hashCode);
            return chars;
        }
        private static FindSharedEntry_8276(chars: string[], start: number, len: number, hashCode: number): string {
            var arr = StringTable.sharedTable;
            var idx: number = StringTable.SharedIdxFromHash(hashCode);
            var e: string = null;
            for (var i: number = 1; i < StringTable.SharedBucketSize + 1; i++) {
                e = arr[idx].Text;
                var hash: number = arr[idx].HashCode;
                if (e != null) {
                    if (hash == hashCode && StringTable.TextEquals_2659(e, chars, start, len)) {
                        break;
                    }
                    e = null;
                }
                else {
                    break;
                }
                idx = (idx + i) & StringTable.SharedSizeMask;
            }
            return e;
        }
        private static FindSharedEntry_1588(chars: string, start: number, len: number, hashCode: number): string {
            var arr = StringTable.sharedTable;
            var idx: number = StringTable.SharedIdxFromHash(hashCode);
            var e: string = null;
            for (var i: number = 1; i < StringTable.SharedBucketSize + 1; i++) {
                e = arr[idx].Text;
                var hash: number = arr[idx].HashCode;
                if (e != null) {
                    if (hash == hashCode && StringTable.TextEquals_1395(e, chars, start, len)) {
                        break;
                    }
                    e = null;
                }
                else {
                    break;
                }
                idx = (idx + i) & StringTable.SharedSizeMask;
            }
            return e;
        }
        //private static FindSharedEntryASCII(hashCode: number, asciiChars: byte*,length: number): string {
        //    var arr = StringTable.sharedTable;
        //    var idx: number = StringTable.SharedIdxFromHash(hashCode);
        //    var e: string = null;
        //    for (var i: number = 1; i < StringTable.SharedBucketSize + 1; i++) {
        //        e = arr[idx].Text;
        //        var hash: number = arr[idx].HashCode;
        //        if (e != null) {
        //            if (hash == hashCode && StringTable.TextEqualsASCII(e, asciiChars, length)) {
        //                break;
        //            }
        //            e = null;
        //        }
        //        else {
        //            break;
        //        }
        //        idx = (idx + i) & StringTable.SharedSizeMask;
        //    }
        //    return e;
        //}
        private static FindSharedEntry_2038(chars: string, hashCode: number): string {
            var arr = StringTable.sharedTable;
            var idx: number = StringTable.SharedIdxFromHash(hashCode);
            var e: string = null;
            for (var i: number = 1; i < StringTable.SharedBucketSize + 1; i++) {
                e = arr[idx].Text;
                if (e != null) {
                    if (e.length == 1 && e[0] == chars) {
                        break;
                    }
                    e = null;
                }
                else {
                    break;
                }
                idx = (idx + i) & StringTable.SharedSizeMask;
            }
            return e;
        }
        private static FindSharedEntry_1080(chars: System.Text.StringBuilder, hashCode: number): string {
            var arr = StringTable.sharedTable;
            var idx: number = StringTable.SharedIdxFromHash(hashCode);
            var e: string = null;
            for (var i: number = 1; i < StringTable.SharedBucketSize + 1; i++) {
                e = arr[idx].Text;
                var hash: number = arr[idx].HashCode;
                if (e != null) {
                    if (hash == hashCode && StringTable.TextEquals_1689(e, chars)) {
                        break;
                    }
                    e = null;
                }
                else {
                    break;
                }
                idx = (idx + i) & StringTable.SharedSizeMask;
            }
            return e;
        }
        private static FindSharedEntry_2102(chars: string, hashCode: number): string {
            var arr = StringTable.sharedTable;
            var idx: number = StringTable.SharedIdxFromHash(hashCode);
            var e: string = null;
            for (var i: number = 1; i < StringTable.SharedBucketSize + 1; i++) {
                e = arr[idx].Text;
                var hash: number = arr[idx].HashCode;
                if (e != null) {
                    if (hash == hashCode && e == chars) {
                        break;
                    }
                    e = null;
                }
                else {
                    break;
                }
                idx = (idx + i) & StringTable.SharedSizeMask;
            }
            return e;
        }
        private AddItem_1779(chars: string[], start: number, len: number, hashCode: number): string {
            var text = Gb.StringFromCharArray(chars, start, len);
            this.AddCore(text, hashCode);
            return text;
        }
        private AddItem_2078(chars: string, start: number, len: number, hashCode: number): string {
            var text = chars.substr(start, len);
            this.AddCore(chars, hashCode);
            return text;
        }
        private AddItem_1837(chars: string, hashCode: number): string {
            var text = Gb.StringFromChar(chars,1);
            this.AddCore(text, hashCode);
            return text;
        }
        private AddItem_1988(chars: System.Text.StringBuilder, hashCode: number): string {
            var text = chars.ToString();
            this.AddCore(text, hashCode);
            return text;
        }
        private AddCore(chars: string, hashCode: number): void {
            this.AddSharedEntry(hashCode, chars);
            var arr = this.localTable;
            var idx = StringTable.LocalIdxFromHash(hashCode);
            arr[idx].HashCode = hashCode;
            arr[idx].Text = chars;
        }
        private AddSharedEntry(hashCode: number, text: string): void {
            var arr = StringTable.sharedTable;
            var idx: number = StringTable.SharedIdxFromHash(hashCode);
            var curIdx: number = idx;
            foundIdx:
            while (true) {
                for (var i: number = 1; i < StringTable.SharedBucketSize + 1; i++) {
                    if (arr[curIdx].Text == null) {
                        idx = curIdx;
                        break foundIdx;
                    }
                    curIdx = (curIdx + i) & StringTable.SharedSizeMask;
                }
                var i1 = this.LocalNextRandom() & StringTable.SharedBucketSizeMask;
                idx = (idx + (((i1 * i1 + i1) / 2 | 0))) & StringTable.SharedSizeMask; break;
            }
            arr[idx].HashCode = hashCode;
            arr[idx].Text = text;
            //var Text_ref0 = { refObj: arr[idx].Text };
            //System.Threading.Volatile.Write(Text_ref0, text);

            //arr[idx].Text = Text_ref0.refObj;;
        }
        public static AddShared(chars: System.Text.StringBuilder): string {
            var hashCode = Hash.GetFNVHashCode_1874(chars);
            var shared: string = StringTable.FindSharedEntry_1080(chars, hashCode);
            if (shared != null) {
                return shared;
            }
            return StringTable.AddSharedSlow_9166(hashCode, chars);
        }
        private static AddSharedSlow_9166(hashCode: number, builder: System.Text.StringBuilder): string {
            var text: string = builder.ToString();
            StringTable.AddSharedSlow_6583(hashCode, text);
            return text;
        }
        //public static AddSharedUTF8(bytes: byte*,byteCount: number): string {
        //    var isAscii: boolean = false;
        //    var isAscii_ref0 = { refObj: isAscii };
        //    var ret_val__890 = Hash.GetFNVHashCode_1105(bytes, byteCount, isAscii_ref0);

        //    isAscii = isAscii_ref0.refObj;
        //    var hashCode: number = ret_val__890;
        //    if (isAscii) {
        //        var shared: string = StringTable.FindSharedEntryASCII(hashCode, bytes, byteCount);
        //        if (shared != null) {
        //            return shared;
        //        }
        //    }
        //    return StringTable.AddSharedSlow_1302(hashCode, bytes, byteCount, isAscii);
        //}
        //private static AddSharedSlow_1302(hashCode: number, utf8Bytes: byte*,byteCount: number, isAscii: boolean): string {
        //    var text: string = System.Reflection.Metadata.MetadataStringDecoder.DefaultUTF8.GetString(utf8Bytes, byteCount);
        //    if (isAscii) {
        //        StringTable.AddSharedSlow_6583(hashCode, text);
        //    }
        //    return text;
        //}
        private static AddSharedSlow_6583(hashCode: number, text: string): void {
            var arr = StringTable.sharedTable;
            var idx: number = StringTable.SharedIdxFromHash(hashCode);
            var curIdx: number = idx;
            foundIdx:
            while (true) {
                for (var i: number = 1; i < StringTable.SharedBucketSize + 1; i++) {
                    if (arr[curIdx].Text == null) {
                        idx = curIdx;
                        break foundIdx;
                    }
                    curIdx = (curIdx + i) & StringTable.SharedSizeMask;
                }
                var i1 = StringTable.SharedNextRandom() & StringTable.SharedBucketSizeMask;
                idx = (idx + (((i1 * i1 + i1) / 2 | 0))) & StringTable.SharedSizeMask; break;
            }
            arr[idx].HashCode = hashCode;
            var Text_ref0 = { refObj: arr[idx].Text };
            System.Threading.Volatile.Write(Text_ref0, text);

            arr[idx].Text = Text_ref0.refObj;;
        }
        private static LocalIdxFromHash(hash: number): number {
            return hash & StringTable.LocalSizeMask;
        }
        private static SharedIdxFromHash(hash: number): number {
            return (hash ^ (hash >> StringTable.LocalSizeBits)) & StringTable.SharedSizeMask;
        }
        private LocalNextRandom(): number {
            return this.localRandom++;
        }
        private static SharedNextRandom(): number {
            StringTable.sharedRandom++;
            return StringTable.sharedRandom;
            //var sharedRandom_ref0 = { refObj: StringTable.sharedRandom };
            //var ret_val__747 = System.Threading.Interlocked.Increment(sharedRandom_ref0);

            //StringTable.sharedRandom = sharedRandom_ref0.refObj;
            //return ret_val__747;
        }
        public static TextEquals_1395(array: string, text: string, start: number, length: number): boolean {
            if (array.length != length) {
                return false;
            }
            for (var i = 0; i < array.length; i++) {
                if (array[i] != text[start + i]) {
                    return false;
                }
            }
            return true;
        }
        public static TextEquals_1689(array: string, text: System.Text.StringBuilder): boolean {
            if (array.length != text.Length) {
                return false;
            }
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i] != text.$get$(i)) {
                    return false;
                }
            }
            return true;
        }
        //public static TextEqualsASCII(text: string, ascii: byte*,length: number): boolean {
        //    for (var i = 0; i < length; i++) {
        //        System.Diagnostics.Debug.Assert((ascii.$get$(i) & 0x80) == 0, "The byte* input to this method must be valid ASCII.");
        //    }
        //    if (length != text.length) {
        //        return false;
        //    }
        //    for (var i = 0; i < length; i++) {
        //        if (ascii.$get$(i) != text[i]) {
        //            return false;
        //        }
        //    }
        //    return true;
        //}
        public static TextEquals_2659(array: string, text: string[], start: number, length: number): boolean {
            return array.length == length && StringTable.TextEqualsCore(array, text, start);
        }
        private static TextEqualsCore(array: string, text: string[], start: number): boolean {
            var s: number = start;
            for (var i = 0; i < array.length; i++) {
                if (array[i] != text[s]) {
                    return false;
                }
                s++;
            }
            return true;
        }
        constructor() { }
    }
    export module StringTable {
        export class Entry implements IStruct {
            public HashCode: number = 0;
            public Text: string = null;
            constructor() { }
        }
    }

     StringTable.sharedTable = StructArray(StringTable.Entry, StringTable.SharedSize);
}