///<reference path="ObjectReaderWriterBase.ts"/>
module Roslyn.Utilities {
    export class ObjectWriter extends ObjectReaderWriterBase implements System.IDisposable {
        private writer: System.IO.BinaryWriter;
        private dataMap: ObjectWriterData;
        private binder: RecordingObjectBinder;
        private cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken);
        ctor_4283(stream: System.IO.Stream, defaultData: ObjectWriterData = null, binder: RecordingObjectBinder = null, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): ObjectWriter {
            System.Diagnostics.Debug.Assert(System.BitConverter.IsLittleEndian);
            this.writer = new System.IO.BinaryWriter(stream, System.Text.Encoding.UTF8);
            this.dataMap = new ObjectWriterData().ctor_6162(defaultData);
            this.binder = binder != null ? binder : new SimpleRecordingObjectBinder();
            this.cancellationToken = cancellationToken;
            return this;
        }
        public get Binder(): ObjectBinder {
            return this.binder;
        }
        public Dispose(): void {
            this.dataMap.Dispose();
        }
        public WriteBoolean(value: boolean): void {
            this.writer.WriteBoolean(value);
        }
        public WriteByte(value: number): void {
            this.writer.WriteByte(value);
        }
        public WriteChar(ch: string): void {
            this.writer.WriteChar(ch);
        }
        public WriteDecimal(value: number): void {
            this.writer.WriteDecimal(value);
        }
        public WriteDouble(value: number): void {
            this.writer.WriteDouble(value);
        }
        public WriteSingle(value: number): void {
            this.writer.WriteSingle(value);
        }
        public WriteInt32(value: number): void {
            this.writer.WriteInt32(value);
        }
        public WriteInt64(value: number): void {
            this.writer.WriteInt64(value);
        }
        public WriteSByte(value: number): void {
            this.writer.WriteSByte(value);
        }
        public WriteInt16(value: number): void {
            this.writer.WriteInt16(value);
        }
        public WriteUInt32(value: number): void {
            this.writer.WriteUInt32(value);
        }
        public WriteUInt64(value: number): void {
            this.writer.WriteUInt32(value);
        }
        public WriteUInt16(value: number): void {
            this.writer.WriteUInt16(value);
        }
        public WriteDateTime(value: Date): void {
            this.WriteInt64(value.getTime());
        }
        public WriteCompressedUInt(value: number): void {
            if (value <= (Byte.MaxValue >> 2)) {
                this.writer.WriteByte(<number>value);
            }
            else if (value <= (ushort.MaxValue >> 2)) {
                var byte0: number = <number>(((value >> 8) & 0xFF) | ObjectWriter.Byte2Marker);
                var byte1: number = <number>(value & 0xFF);
                this.writer.WriteByte(byte0);
                this.writer.WriteByte(byte1);
            }
            else if (value <= (uint.MaxValue >> 2)) {
                var byte0: number = <number>(((value >> 24) & 0xFF) | ObjectWriter.Byte4Marker);
                var byte1: number = <number>((value >> 16) & 0xFF);
                var byte2: number = <number>((value >> 8) & 0xFF);
                var byte3: number = <number>(value & 0xFF);
                this.writer.WriteByte(byte0);
                this.writer.WriteByte(byte1);
                this.writer.WriteByte(byte2);
                this.writer.WriteByte(byte3);
            }
            else {
                throw new System.ArgumentException(Microsoft.CodeAnalysis.CodeAnalysisResources.ValueTooLargeToBeRepresented);
            }
        }
        public WriteString(value: string): void {
            if (value == null) {
                this.writer.WriteByte(<number>(ObjectWriter.DataKind.Null));
            }
            else {
                var id: number = 0;
                if ((() => {
                    var id_ref0 = { refObj: id };
                    var ret_val_ = this.dataMap.TryGetId(value, id_ref0);

                    id = id_ref0.refObj;
                    return ret_val_;
                })()) {
                    System.Diagnostics.Debug.Assert(id >= 0);
                    if (id <= Byte.MaxValue) {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.StringRef_B));
                        this.writer.WriteByte(<number>id);
                    }
                    else if (id <= ushort.MaxValue) {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.StringRef_S));
                        this.writer.WriteUShort(<number>id);
                    }
                    else {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.StringRef));
                        this.writer.WriteInt32(id);
                    }
                }
                else {
                    this.dataMap.Add(value);
                    if (Roslyn.Utilities.StringExtensions.IsValidUnicodeString(value)) {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.StringUtf8));
                        this.writer.WriteString(value);
                    }
                    else {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.StringUtf16));
                        this.writer.WriteString(value);
                        // write as normal, comparing to original code

                        //var bytes: number[] = new Array(<number>value.length * __sizeof__(char));
                        //fixed(char * valuePtr = value)
                        //{
                        //    Marshal.Copy((IntPtr)valuePtr, bytes, 0, bytes.Length);
                        //}
                        //this.WriteCompressedUInt(<number>value.length);
                        //this.writer.Write(bytes);
                    }
                }
            }
        }
        public WriteValue(value: Object): void {
            if (value == null) {
                this.writer.WriteByte(<number>(ObjectWriter.DataKind.Null | 0));
            }
            else {
                //var type = value.GetType();
                //if (System.Reflection.IntrospectionExtensions.GetTypeInfo(type).IsEnum) {
                //    this.WriteEnum(value, type);
                //}
                //else
                if (typeof value == 'boolean' || value.constructor == Boolean) {
                    if (<boolean>value) {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.Boolean_T));
                    }
                    else {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.Boolean_F));
                    }
                }
                else if ((typeof value == 'number' || value.constructor == Number) && IsInt(<number>value)) {

                    var v: number = <number>(value);
                    if (v == 0) {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.Int32_Z));
                    }
                    else if (v >= 0 && v < Byte.MaxValue) {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.Int32_B));
                        this.writer.WriteByte(<number>v);
                    }
                    else if (v >= 0 && v < ushort.MaxValue) {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.Int32_S));
                        this.writer.WriteUShort(v);
                    }
                    else {
                        this.writer.WriteByte(<number>(ObjectWriter.DataKind.Int32));
                        this.writer.WriteInt32(v);
                    }
                }
                else if (typeof value == 'number' || value.constructor == Number) {
                    this.writer.WriteDecimal(<number>value);
                }
                else if ((typeof value == 'string' || value.constructor == String) && (<string>value).length == 1) {
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.Char));
                    this.WriteChar(<string>value);
                }
                else if (typeof value == 'string' || value.constructor == String) {
                    this.WriteString(<string>value);
                }
                //else if (type == typeof (short)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.Int16 | 0));
                //    this.writer.Write(<short>(value | 0));
                //}
                //else if (type == typeof (long)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.Int64 | 0));
                //    this.writer.Write(<number>(value | 0));
                //}
                //else if (type == typeof (char)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.Char | 0));
                //    this.WriteChar(<string>value);
                //}
                //else if (type == typeof (sbyte)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.Int8 | 0));
                //    this.writer.Write(<sbyte>value);
                //}
                //else if (type == typeof (byte)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.UInt8 | 0));
                //    this.writer.Write(<number>(value | 0));
                //}
                //else if (type == typeof (ushort)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.UInt16 | 0));
                //    this.writer.Write(<ushort>(value | 0));
                //}
                //else if (type == typeof (uint)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.UInt32 | 0));
                //    this.writer.Write(<number>(value | 0));
                //}
                //else if (type == typeof (ulong)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.UInt64 | 0));
                //    this.writer.Write(<ulong>(value | 0));
                //}
                //else if (type == typeof (decimal)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.Decimal | 0));
                //    this.writer.Write(<number>value);
                //}
                //else if (type == typeof (float)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.Float4 | 0));
                //    this.writer.Write(<number>value);
                //}
                //else if (type == typeof (double)) {
                //    this.writer.Write(<number>(ObjectWriter.DataKind.Float8 | 0));
                //    this.writer.Write(<number>value);
                //}
                else if (value instanceof Date) {
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.DateTime | 0));
                    this.WriteDateTime(<Date>value);
                }
                else if (value instanceof Array) {
                    this.WriteArray(<Array<any>>value);
                }
                //else if (value instanceof System.Type) {
                //    this.WriteType(<System.Type>value);
                //}
                else {
                    this.WriteObject(value);
                }
            }
        }
        //private WriteEnum(value: Object, enumType: System.Type): void {
        //    this.writer.Write(<number>(ObjectWriter.DataKind.Enum | 0));
        //    this.WriteType(enumType);
        //    var type = System.Enum.GetUnderlyingType(enumType);
        //    if (type == typeof (int)) {
        //        this.writer.Write(<number>(value | 0));
        //    }
        //    else if (type == typeof (short)) {
        //        this.writer.Write(<short>(value | 0));
        //    }
        //    else if (type == typeof (byte)) {
        //        this.writer.Write(<number>(value | 0));
        //    }
        //    else if (type == typeof (long)) {
        //        this.writer.Write(<number>(value | 0));
        //    }
        //    else if (type == typeof (sbyte)) {
        //        this.writer.Write(<sbyte>value);
        //    }
        //    else if (type == typeof (ushort)) {
        //        this.writer.Write(<ushort>(value | 0));
        //    }
        //    else if (type == typeof (uint)) {
        //        this.writer.Write(<number>(value | 0));
        //    }
        //    else if (type == typeof (ulong)) {
        //        this.writer.Write(<ulong>(value | 0));
        //    }
        //    else {
        //        throw ExceptionUtilities.UnexpectedValue(type);
        //    }
        //}
        private WriteArray(instance: Array<any>): void {
            //if (instance.Rank > 1) {
            //    throw new System.InvalidOperationException(Microsoft.CodeAnalysis.CodeAnalysisResources.ArraysWithMoreThanOneDimensionCannotBeSerialized);
            //}
            var length: number = instance.length;
            switch (length) {
                case 0:
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.Array_0));
                    break;
                case 1:
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.Array_1));
                    break;
                case 2:
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.Array_2));
                    break;
                case 3:
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.Array_3));
                    break;
                default:
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.Array));
                    this.WriteCompressedUInt(<number>length);
                    break;
            }

            var clssType: System.Type = <System.Type><any>UnknownType;
            if (length > 0) {
                clssType = __classOf(instance[0]);
            }

            this.WriteType(clssType);
            for (var i: number = 0; i < length; i++) {
                this.WriteValue(instance[i]);
            }
        }
        private WriteType(clssType: any): void {
            var id: number = 0;
            //if ((() => {
            var id_ref0 = { refObj: id };
            var ret_val_ = this.dataMap.TryGetId(clssType, id_ref0);

            id = id_ref0.refObj;
            // return ret_val_;
            // })()) {
            if (ret_val_) {
                System.Diagnostics.Debug.Assert(id >= 0);
                if (id <= Byte.MaxValue) {
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.TypeRef_B | 0));
                    this.writer.WriteByte(<number>id);
                }
                else if (id <= ushort.MaxValue) {
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.TypeRef_S | 0));
                    this.writer.WriteUShort(id);
                }
                else {
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.TypeRef | 0));
                    this.writer.WriteInt32(id);
                }
            }
            else {
                this.dataMap.Add(clssType);
                if (this.binder != null) {
                    this.binder.Record_1251(clssType);
                }
                this.writer.WriteByte(<number>(ObjectWriter.DataKind.Type));
                //var assemblyName: string = System.Reflection.IntrospectionExtensions.GetTypeInfo(clssType).Assembly.FullName;
                //var typeName: string = clssType.FullName;
                var assemblyName = Gb.AssemblyName;
                this.WriteString(assemblyName);
                this.WriteString(clssType.name);
            }
        }
        private WriteObject(instance: Object): void {
            this.cancellationToken.ThrowIfCancellationRequested();
            var id: number = 0;
            if ((() => {
                var id_ref0 = { refObj: id };
                var ret_val_ = this.dataMap.TryGetId(instance, id_ref0);

                id = id_ref0.refObj;
                return ret_val_;
            })()) {
                System.Diagnostics.Debug.Assert(id >= 0);
                if (id <= Byte.MaxValue) {
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.ObjectRef_B));
                    this.writer.WriteByte(<number>id);
                }
                else if (id <= ushort.MaxValue) {
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.ObjectRef_S));
                    this.writer.WriteUShort(id);
                }
                else {
                    this.writer.WriteByte(<number>(ObjectWriter.DataKind.ObjectRef));
                    this.writer.WriteInt32(id);
                }
            }
            else {
                this.dataMap.Add(instance);
                if (typeof instance['WriteTo'] === 'undefined') {
                    throw this.NotWritableException(__classOf(instance).name);
                }
                var iwriteable = <IObjectWritable>instance;
                if (iwriteable != null) {
                    this.WriteWritableObject(iwriteable);
                    return
                }

            }
        }
        private WriteWritableObject(instance: IObjectWritable): void {
            this.writer.WriteByte(<number>(ObjectWriter.DataKind.Object_W | 0));
            var type: System.Type = __classOf(instance);
            this.WriteType(type);
            if (this.binder != null) {
                this.binder.Record_2061(instance);
            }
            instance.WriteTo(this);
        }
        private NotWritableException(typeName: string): System.Exception {
            throw new System.InvalidOperationException(System.String.Format(Roslyn.Utilities.StringExtensions.NeedsLocalization("The type '{0}' cannot be written, it does not implement IObjectWritable"), typeName));
        }
        constructor() { super(); }
    }
}