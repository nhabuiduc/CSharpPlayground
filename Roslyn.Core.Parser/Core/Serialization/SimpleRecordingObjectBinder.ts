///<reference path="RecordingObjectBinder.ts"/>
module Roslyn.Utilities {
    export class SimpleRecordingObjectBinder extends RecordingObjectBinder {
        private typeMap: System.Collections.Generic.Dictionary<ObjectBinder.TypeKey, System.Type> = new System.Collections.Generic.Dictionary<ObjectBinder.TypeKey, System.Type>();
        private readerMap: System.Collections.Generic.Dictionary<System.Type, (_: ObjectReader) => Object> = new System.Collections.Generic.Dictionary<System.Type,(_: ObjectReader) => Object>();
        public GetType(assemblyName: string, typeName: string): System.Type {
            var type: System.Type;
            var type_ref0 = { refObj: type };
            var ret_val__421 = this.typeMap.TryGetValue(new ObjectBinder.TypeKey().ctor_1051(assemblyName, typeName), type_ref0);

            type = type_ref0.refObj;
            if (!ret_val__421) {
                System.Diagnostics.Debug.Assert(false, assemblyName + "/" + typeName + " don't exist");
            }
            return type;
        }
        public GetReader(type: System.Type): (_: ObjectReader) => Object {
            var reader: (_: ObjectReader) => Object;
            var reader_ref0 = { refObj: reader };
            var ret_val__533 = this.readerMap.TryGetValue(type, reader_ref0);

            reader = reader_ref0.refObj;
            if (!ret_val__533) {
                System.Diagnostics.Debug.Assert(false, type.toString() + " reader doesn't exist");
            }
            return reader;
        }
        private HasConstructor(type: System.Type): boolean {
            return this.readerMap.ContainsKey(type);
        }
        public Record_1251(type: System.Type): void {
            if (type != null) {
                //var key = new ObjectBinder.TypeKey().ctor_1051(System.Reflection.IntrospectionExtensions.GetTypeInfo(type).Assembly.FullName, type.FullName);
                var key = new ObjectBinder.TypeKey().ctor_1051(Gb.AssemblyName, type.name);
                if (!this.typeMap.ContainsKey(key)) {
                    this.typeMap.Add(key, type);
                }
            }
        }
        public Record_2061(instance: Object): void {
            if (instance != null) {
                var clssType = __classOf(instance);

                var readable = <IObjectReadable>instance;
                if (typeof readable["GetReader"] === 'undefined') {
                    readable = null;
                }
                if (readable != null) {
                    if (this.HasConstructor(clssType)) {
                        // System.Diagnostics.Debug.Assert(this.typeMap.ContainsKey(new SimpleRecordingObjectBinder.TypeKey(System.Reflection.IntrospectionExtensions.GetTypeInfo(clssType).Assembly.FullName, clssType.FullName)));
                        return
                    }
                    if (!this.readerMap.ContainsKey(clssType)) {
                        this.readerMap.Add(clssType, readable.GetReader());
                    }
                }
                this.Record_1251(clssType);
            }
        }
        constructor() { super(); }
    }
}