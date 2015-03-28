/// <reference path="Location.ts" />
module Microsoft.CodeAnalysis {
    export class ExternalFileLocation extends Location implements System.IEquatable<ExternalFileLocation>
    {
        private sourceSpan: Text.TextSpan = structDefault(Text.TextSpan);
        private lineSpan: FileLinePositionSpan = structDefault(FileLinePositionSpan);
        ctor_1166(filePath: string, sourceSpan: Text.TextSpan, lineSpan: Text.LinePositionSpan): ExternalFileLocation {
            super.ctor_1148();
            this.sourceSpan = sourceSpan;
            this.lineSpan = new FileLinePositionSpan().ctor_2529(filePath, lineSpan);
            return this;
        }
        public get SourceSpan(): Text.TextSpan {
            return this.sourceSpan;
        }
        public GetLineSpan(): FileLinePositionSpan {
            return this.lineSpan;
        }
        public GetMappedLineSpan(): FileLinePositionSpan {
            return this.lineSpan;
        }
        public get Kind(): LocationKind {
            return LocationKind.ExternalFile;
        }
        public Equals(obj: Object): boolean {
            return this.Equals_1713(__as__<ExternalFileLocation>(obj, ExternalFileLocation));
        }
        public Equals_1713(obj: ExternalFileLocation): boolean {
            if (ReferenceEquals(obj, this)) {
                return true;
            }
            return obj != null && this.sourceSpan.op_Equality(obj.sourceSpan) && this.lineSpan.Equals_2972(obj.lineSpan);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(this.lineSpan.GetHashCode(), this.sourceSpan.GetHashCode());
        }
        constructor() { super(); }
    }
}