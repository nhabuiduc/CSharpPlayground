module Roslyn.Utilities {
    export class ObjectReaderWriterBase {

        public static ByteMarkerMask: number = 3 << 6;
        public static Byte1Marker: number = 0;
        public static Byte2Marker: number = 1 << 6;
        public static Byte4Marker: number = 2 << 6;
    }

    export module ObjectReaderWriterBase {
        export enum DataKind {
            Null,
            Type,
            TypeRef,
            TypeRef_B,
            TypeRef_S,
            Object_W,
            ObjectRef,
            ObjectRef_B,
            ObjectRef_S,
            StringUtf8,
            StringUtf16,
            StringRef,
            StringRef_B,
            StringRef_S,
            Boolean_T,
            Boolean_F,
            Char,
            Int8,
            Int16,
            Int32,
            Int32_B,
            Int32_S,
            Int32_Z,
            Int64,
            UInt8,
            UInt16,
            UInt32,
            UInt64,
            Float4,
            Float8,
            Decimal,
            DateTime,
            Enum,
            Array,
            Array_0,
            Array_1,
            Array_2,
            Array_3
        }
    }
}