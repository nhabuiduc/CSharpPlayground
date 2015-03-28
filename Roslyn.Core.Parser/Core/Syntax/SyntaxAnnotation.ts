module Microsoft.CodeAnalysis {
    export class SyntaxAnnotation implements Roslyn.Utilities.IObjectWritable, Roslyn.Utilities.IObjectReadable, System.IEquatable<SyntaxAnnotation>
    {
        public static ElasticAnnotation: SyntaxAnnotation = new SyntaxAnnotation().ctor_1690();
        private id: number = 0;
        private static nextId: number = 0;
        public Kind: string;
        public Data: string;
        ctor_1690(): SyntaxAnnotation {
            SyntaxAnnotation.nextId++;
            //var nextId_ref0 = { refObj: SyntaxAnnotation.nextId };
            //var ret_val__772 = System.Threading.Interlocked.Increment(nextId_ref0);

            //SyntaxAnnotation.nextId = nextId_ref0.refObj;
            //this.id = ret_val__772;
            this.id = SyntaxAnnotation.nextId;
            return this;
        }
        ctor_7926(kind: string): SyntaxAnnotation {
            this.ctor_1690();
            this.Kind = kind;
            return this;
        }
        ctor_8539(kind: string, data: string): SyntaxAnnotation {
            this.ctor_7926(kind);
            this.Data = data;
            return this;
        }
        ctor_1772(reader: Roslyn.Utilities.ObjectReader): SyntaxAnnotation {
            this.id = reader.ReadInt64();
            this.Kind = reader.ReadString_7160();
            this.Data = reader.ReadString_7160();
            return this;
        }
        WriteTo(writer: Roslyn.Utilities.ObjectWriter): void {
            writer.WriteInt64(this.id);
            writer.WriteString(this.Kind);
            writer.WriteString(this.Data);
        }

        GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
            return r => new SyntaxAnnotation().ctor_1772(r);
        }

        public Equals_1427(other: SyntaxAnnotation): boolean {
            return <Object>other != null && this.id == other.id;
        }
        public op_Equality(right: SyntaxAnnotation): boolean {
            var left = this;
            if (<Object>left == <Object>right) {
                return true;
            }
            if (<Object>left == null || <Object>right == null) {
                return false;
            }
            return left.Equals_1427(right);
        }

        public op_Inequality(right: SyntaxAnnotation): boolean {
            var left = this;
            if (<Object>left == <Object>right) {
                return false;
            }
            if (<Object>left == null || <Object>right == null) {
                return true;
            }
            return !left.Equals_1427(right);
        }

        public Equals(obj: Object): boolean {
            return this.Equals_1427(__as__<SyntaxAnnotation>(obj, SyntaxAnnotation));
        }
        public GetHashCode(): number {
            return this.id.GetHashCode();
        }
        constructor() { }
    }
}