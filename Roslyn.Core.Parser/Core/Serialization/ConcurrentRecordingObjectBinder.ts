///<reference path="RecordingObjectBinder.ts"/>
module Roslyn.Utilities {
    export class ConcurrentRecordingObjectBinder extends RecordingObjectBinder {
        private typeMap: System.Collections.Concurrent.ConcurrentDictionary<ObjectBinder.TypeKey, System.Type> = new System.Collections.Concurrent.ConcurrentDictionary<ObjectBinder.TypeKey, System.Type>();
        private readerMap: System.Collections.Concurrent.ConcurrentDictionary<System.Type, (_: ObjectReader) => Object> = new System.Collections.Concurrent.ConcurrentDictionary<System.Type,(_: ObjectReader) => Object>();
        public GetType(assemblyName: string, typeName: string): System.Type {
            var type: System.Type;
            var type_ref0 = { refObj: type };
            var ret_val__902 = this.typeMap.TryGetValue(new ObjectBinder.TypeKey().ctor_1051(assemblyName, typeName), type_ref0);

            type = type_ref0.refObj;
            if (!ret_val__902) {
                System.Diagnostics.Debug.Assert(false, assemblyName + "/" + typeName + " don't exist");
            }
            return type;
        }
        public GetReader(type: System.Type): (_: ObjectReader) => Object {
            var reader: (_: ObjectReader) => Object;
            var reader_ref0 = { refObj: reader };
            var ret_val__423 = this.readerMap.TryGetValue(type, reader_ref0);

            reader = reader_ref0.refObj;
            if (!ret_val__423) {
                System.Diagnostics.Debug.Assert(false, type.toString() + " reader doesn't exist");
            }
            return reader;
        }
        private HasConstructor(type: System.Type): boolean {
            return this.readerMap.ContainsKey(type);
        }
        public Record_1251(type: System.Type): void {
            if (type != null) {
                //var key = new ObjectBinder.TypeKey(System.Reflection.IntrospectionExtensions.GetTypeInfo(type).Assembly.FullName, type.name);
                var key = new ObjectBinder.TypeKey().ctor_1051(Gb.AssemblyName, type.name);
                this.typeMap.TryAdd(key, type);
            }
        }
        public Record_2061(instance: Object): void {
            if (instance != null) {
                var type = __classOf(instance);
                var readable = <IObjectReadable>instance;
                if (readable.GetReader === void 0) {
                    readable = null;
                }
                if (readable != null) {
                    if (this.HasConstructor(type)) {
                        return
                    }
                    this.readerMap.TryAdd(type, readable.GetReader());
                }
                this.Record_1251(type);
            }
        }
        constructor() { super(); }
    }
}