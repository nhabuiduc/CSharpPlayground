///<reference path="ObjectReaderWriterBase.ts"/>
module Roslyn.Utilities {
    export class ObjectReader extends ObjectReaderWriterBase implements System.IDisposable {
        private reader: System.IO.BinaryReader;
        private dataMap: ObjectReaderData;
        private binder: ObjectBinder;
        ctor_3403(stream: System.IO.Stream, defaultData: ObjectReaderData = null, binder: ObjectBinder = null): ObjectReader {
            System.Diagnostics.Debug.Assert(System.BitConverter.IsLittleEndian);
            this.reader = new System.IO.BinaryReader(stream, System.Text.Encoding.UTF8);
            this.dataMap = new ObjectReaderData().ctor_1681(defaultData);
            this.binder = binder;
            return this;
        }
        public Dispose(): void {
            this.dataMap.Dispose();
        }
        public ReadBoolean(): boolean {
            return this.reader.ReadBoolean();
        }
        public ReadByte(): number {
            return this.reader.ReadByte();
        }
        public ReadChar(): string {
            //return <string>this.reader.ReadUInt16();
            return this.reader.ReadChar();
        }
        public ReadDecimal(): number {
            return this.reader.ReadDecimal();
        }
        public ReadDouble(): number {
            return this.reader.ReadDouble();
        }
        public ReadSingle(): number {
            return this.reader.ReadSingle();
        }
        public ReadInt32(): number {
            return this.reader.ReadInt32();
        }
        public ReadInt64(): number {
            return this.reader.ReadInt64();
        }
        public ReadSByte(): number {
            return this.reader.ReadSByte();
        }
        public ReadInt16(): number {
            return this.reader.ReadInt16();
        }
        public ReadUInt32(): number {
            return this.reader.ReadUInt32();
        }
        //public ReadUInt64(): number {
        //    return this.reader.ReadUInt64();
        //}
        public ReadUInt16(): number {
            return this.reader.ReadUInt16();
        }
        public ReadDateTime(): Date {
           // return System.DateTime.FromBinary(this.ReadInt64());
            return new Date(this.ReadDecimal());
        }
        public ReadCompressedUInt(): number {
            var info = this.reader.ReadByte();
            var marker: number = <number>(info & ObjectReader.ByteMarkerMask);
            var byte0: number = <number>(info & ~ObjectReader.ByteMarkerMask);
            if (marker == ObjectReader.Byte1Marker) {
                return byte0;
            }
            else if (marker == ObjectReader.Byte2Marker) {
                var byte1 = this.reader.ReadByte();
                return ((<number>byte0) << 8) | byte1;
            }
            else if (marker == ObjectReader.Byte4Marker) {
                var byte1 = this.reader.ReadByte();
                var byte2 = this.reader.ReadByte();
                var byte3 = this.reader.ReadByte();
                return ((<number>byte0) << 24) | ((<number>byte1) << 16) | ((<number>byte2) << 8) | byte3;
            }
            else {
                throw ExceptionUtilities.UnexpectedValue(marker);
            }
        }
        private static Int32Zero: Object = 0;
        private static BooleanTrue: Object = true;
        private static BooleanFalse: Object = false;
        public ReadValue(): Object {
            var kind: ObjectReaderWriterBase.DataKind = <ObjectReaderWriterBase.DataKind>this.reader.ReadByte();
            switch (kind) {
                case ObjectReaderWriterBase.DataKind.Null:
                    return null;
                case ObjectReaderWriterBase.DataKind.Boolean_T:
                    return ObjectReader.BooleanTrue;
                case ObjectReaderWriterBase.DataKind.Boolean_F:
                    return ObjectReader.BooleanFalse;
                case ObjectReaderWriterBase.DataKind.Int8:
                    return this.reader.ReadSByte();
                case ObjectReaderWriterBase.DataKind.UInt8:
                    return this.reader.ReadByte();
                case ObjectReaderWriterBase.DataKind.Int16:
                    return this.reader.ReadInt16();
                case ObjectReaderWriterBase.DataKind.UInt16:
                    return this.reader.ReadUInt16();
                case ObjectReaderWriterBase.DataKind.Int32:
                    return this.reader.ReadInt32();
                case ObjectReaderWriterBase.DataKind.Int32_B:
                    return <number>this.reader.ReadByte();
                case ObjectReaderWriterBase.DataKind.Int32_S:
                    return <number>this.reader.ReadUInt16();
                case ObjectReaderWriterBase.DataKind.Int32_Z:
                    return ObjectReader.Int32Zero;
                case ObjectReaderWriterBase.DataKind.UInt32:
                    return this.reader.ReadUInt32();
                case ObjectReaderWriterBase.DataKind.Int64:
                    return this.reader.ReadInt64();
                //case ObjectReaderWriterBase.DataKind.UInt64:
                //    return this.reader.ReadUInt64();
                case ObjectReaderWriterBase.DataKind.Float4:
                    return this.reader.ReadSingle();
                case ObjectReaderWriterBase.DataKind.Float8:
                    return this.reader.ReadDouble();
                case ObjectReaderWriterBase.DataKind.Decimal:
                    return this.reader.ReadDecimal();
                case ObjectReaderWriterBase.DataKind.DateTime:
                    return this.ReadDateTime();
                case ObjectReaderWriterBase.DataKind.Char:
                    return this.ReadChar();
                case ObjectReaderWriterBase.DataKind.StringUtf8:
                case ObjectReaderWriterBase.DataKind.StringUtf16:
                case ObjectReaderWriterBase.DataKind.StringRef:
                case ObjectReaderWriterBase.DataKind.StringRef_B:
                case ObjectReaderWriterBase.DataKind.StringRef_S:
                    return this.ReadString_4398(kind);
                case ObjectReaderWriterBase.DataKind.Object_W:
                case ObjectReaderWriterBase.DataKind.ObjectRef:
                case ObjectReaderWriterBase.DataKind.ObjectRef_B:
                case ObjectReaderWriterBase.DataKind.ObjectRef_S:
                    return this.ReadObject(kind);
                case ObjectReaderWriterBase.DataKind.Type:
                case ObjectReaderWriterBase.DataKind.TypeRef:
                case ObjectReaderWriterBase.DataKind.TypeRef_B:
                case ObjectReaderWriterBase.DataKind.TypeRef_S:
                    return this.ReadType_2536(kind);
                //case ObjectReaderWriterBase.DataKind.Enum:
                //    return this.ReadEnum();
                case ObjectReaderWriterBase.DataKind.Array:
                case ObjectReaderWriterBase.DataKind.Array_0:
                case ObjectReaderWriterBase.DataKind.Array_1:
                case ObjectReaderWriterBase.DataKind.Array_2:
                case ObjectReaderWriterBase.DataKind.Array_3:
                    return this.ReadArray(kind);
                default:
                    throw ExceptionUtilities.UnexpectedValue(kind);
            }
        }
        public ReadString_7160(): string {
            var kind: ObjectReaderWriterBase.DataKind = <ObjectReaderWriterBase.DataKind>this.reader.ReadByte();
            if (kind == ObjectReaderWriterBase.DataKind.Null) {
                return null;
            }
            else {
                return this.ReadString_4398(kind);
            }
        }
        private ReadString_4398(kind: ObjectReaderWriterBase.DataKind): string {
            switch (kind) {
                case ObjectReaderWriterBase.DataKind.StringRef_B:
                    return <string>this.dataMap.GetValue(this.reader.ReadByte());
                case ObjectReaderWriterBase.DataKind.StringRef_S:
                    return <string>this.dataMap.GetValue(this.reader.ReadUInt16());
                case ObjectReaderWriterBase.DataKind.StringRef:
                    return <string>this.dataMap.GetValue(this.reader.ReadInt32());
                case ObjectReaderWriterBase.DataKind.StringUtf16:
                case ObjectReaderWriterBase.DataKind.StringUtf8:
                    return this.ReadStringLiteral(kind);
                default:
                    throw ExceptionUtilities.UnexpectedValue(kind);
            }
        }
        private ReadStringLiteral(kind: ObjectReaderWriterBase.DataKind): string {
            var id: number = this.dataMap.GetNextId();
            var value: string;
            if (kind == ObjectReaderWriterBase.DataKind.StringUtf8) {
                value = this.reader.ReadString();
            }
            else {
                value = this.reader.ReadString();
                //var characterCount: number = <number>this.ReadCompressedUInt();
                //var bytes: number[] = this.reader.ReadBytes(characterCount * __sizeof__(char));
                //fixed(byte * bytesPtr = bytes)
                //{
                //    value = new string((char *)bytesPtr, 0, characterCount);
                //}
            }
            this.dataMap.AddValue(id, value);
            return value;
        }
        private ReadArray(kind: ObjectReaderWriterBase.DataKind): Array<any> {
            var length: number = 0;
            switch (kind) {
                case ObjectReaderWriterBase.DataKind.Array_0:
                    length = 0;
                    break;
                case ObjectReaderWriterBase.DataKind.Array_1:
                    length = 1;
                    break;
                case ObjectReaderWriterBase.DataKind.Array_2:
                    length = 2;
                    break;
                case ObjectReaderWriterBase.DataKind.Array_3:
                    length = 3;
                    break;
                case ObjectReaderWriterBase.DataKind.Array:
                default:
                    length = <number>this.ReadCompressedUInt();
                    break;
            }
            var elementType: System.Type = this.ReadType_7814();
            var array: Array<any> = new Array<any>(length);
            for (var i: number = 0; i < length; i++) {
                var value = this.ReadValue();
                //array.SetValue(value, i);
                array[i] = value;
            }
            return array;
        }
        private ReadType_7814(): System.Type {
            var kind: ObjectReaderWriterBase.DataKind = <ObjectReaderWriterBase.DataKind>this.reader.ReadByte();
            return this.ReadType_2536(kind);
        }
        private ReadType_2536(kind: ObjectReaderWriterBase.DataKind): System.Type {
            switch (kind) {
                case ObjectReaderWriterBase.DataKind.TypeRef_B:
                    return <System.Type>this.dataMap.GetValue(this.reader.ReadByte());
                case ObjectReaderWriterBase.DataKind.TypeRef_S:
                    return <System.Type>this.dataMap.GetValue(this.reader.ReadUInt16());
                case ObjectReaderWriterBase.DataKind.TypeRef:
                    return <System.Type>this.dataMap.GetValue(this.reader.ReadInt32());
                case ObjectReaderWriterBase.DataKind.Type:
                    var id: number = this.dataMap.GetNextId();
                    var assemblyName = this.ReadString_7160();
                    var typeName = this.ReadString_7160();
                    if (this.binder == null) {
                        throw this.NoBinderException(typeName);
                    }
                    var type = this.binder.GetType(assemblyName, typeName);
                    this.dataMap.AddValue(id, type);
                    return type;
                default:
                    throw ExceptionUtilities.UnexpectedValue(kind);
            }
        }
        //private ReadEnum(): Object {
        //    var enumType = this.ReadType_7814();
        //    var type = System.Enum.GetUnderlyingType(enumType);
        //    if (type == /*typeof*/ <any>Number) {
        //        return System.Enum.ToObject(enumType, this.reader.ReadInt32());
        //    }
        //    if (type == /*typeof*/ <any>Number) {
        //        return System.Enum.ToObject(enumType, this.reader.ReadInt16());
        //    }
        //    if (type == /*typeof*/ <any>Number) {
        //        return System.Enum.ToObject(enumType, this.reader.ReadByte());
        //    }
        //    if (type == /*typeof*/ <any>Number) {
        //        return System.Enum.ToObject(enumType, this.reader.ReadInt64());
        //    }
        //    if (type == /*typeof*/ <any>Number) {
        //        return System.Enum.ToObject(enumType, this.reader.ReadSByte());
        //    }
        //    if (type == /*typeof*/ <any>Number) {
        //        return System.Enum.ToObject(enumType, this.reader.ReadUInt16());
        //    }
        //    if (type == /*typeof*/ <any>Number) {
        //        return System.Enum.ToObject(enumType, this.reader.ReadUInt32());
        //    }
        //    if (type == /*typeof*/ <any>Number) {
        //        return System.Enum.ToObject(enumType, this.reader.ReadUInt64());
        //    }
        //    throw ExceptionUtilities.UnexpectedValue(enumType);
        //}
        private ReadObject(kind: ObjectReaderWriterBase.DataKind): Object {
            switch (kind) {
                case ObjectReaderWriterBase.DataKind.ObjectRef_B:
                    return this.dataMap.GetValue(this.reader.ReadByte());
                case ObjectReaderWriterBase.DataKind.ObjectRef_S:
                    return this.dataMap.GetValue(this.reader.ReadUInt16());
                case ObjectReaderWriterBase.DataKind.ObjectRef:
                    return this.dataMap.GetValue(this.reader.ReadInt32());
                case ObjectReaderWriterBase.DataKind.Object_W:
                    return this.ReadReadableObject();
                case ObjectReaderWriterBase.DataKind.Array:
                    return this.ReadArray(kind);
                default:
                    throw ExceptionUtilities.UnexpectedValue(kind);
            }
        }
        private ReadReadableObject(): Object {
            var id: number = this.dataMap.GetNextId();
            var type: System.Type = this.ReadType_7814();
            var instance = this.CreateInstance(type);
            this.dataMap.AddValue(id, instance);
            return instance;
        }
        private CreateInstance(type: System.Type): Object {
            if (this.binder == null) {
                return this.NoBinderException(type.name);
            }
            var reader = this.binder.GetReader(type);
            if (reader == null) {
                return this.NoReaderException(type.name);
            }
            return reader(this);
        }
        private NoBinderException(typeName: string): System.Exception {
            throw new System.InvalidOperationException(System.String.Format(StringExtensions.NeedsLocalization("Cannot deserialize type '{0}', no binder supplied."), typeName));
        }
        private NoReaderException(typeName: string): System.Exception {
            throw new System.InvalidOperationException(System.String.Format(StringExtensions.NeedsLocalization("Cannot deserialize type '{0}', it has no deserialization reader."), typeName));
        }
        constructor() { super(); }
    }
}