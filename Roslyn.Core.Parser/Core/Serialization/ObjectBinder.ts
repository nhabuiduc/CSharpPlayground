module Roslyn.Utilities {
    export class ObjectBinder {
        public GetType(assemblyName: string, typeName: string): System.Type { throw new Error('not implemented'); }
        public GetReader(type: System.Type): (_: ObjectReader) => Object { throw new Error('not implemented'); }
        constructor() { }
    }
    export module ObjectBinder {
        export class TypeKey implements System.IEquatable<TypeKey>, IStruct {
            public AssemblyName: string;
            public TypeName: string;
            ctor_1051(assemblyName: string, typeName: string): TypeKey {
                this.AssemblyName = assemblyName;
                this.TypeName = typeName;
                return this;
            }
            public Equals_1132(other: TypeKey): boolean {
                return this.AssemblyName == other.AssemblyName && this.TypeName == other.TypeName;
            }
            public Equals(obj: Object): boolean {
                return obj instanceof TypeKey && this.Equals_1132(<TypeKey>obj);
            }
            public GetHashCode(): number {
                return Hash.Combine_1641(this.AssemblyName.GetHashCode(), this.TypeName.GetHashCode());
            }
            constructor() { }
        }
    }
}