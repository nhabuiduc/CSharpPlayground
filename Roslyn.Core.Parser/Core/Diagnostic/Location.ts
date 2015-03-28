module Microsoft.CodeAnalysis {
    export class Location {
        ctor_1148(): Location {
            return this;
        }
        public Kind: LocationKind = 0;
        public get IsInSource(): boolean {
            return this.SourceTree != null;
        }
        public get SourceTree(): SyntaxTree {
            return null;
        }
        public get SourceSpan(): Text.TextSpan {
            return structDefault(Text.TextSpan);
        }
        public GetLineSpan(): FileLinePositionSpan {
            return structDefault(FileLinePositionSpan);
        }
        public GetMappedLineSpan(): FileLinePositionSpan {
            return structDefault(FileLinePositionSpan);
        }
        public Equals(obj: Object): boolean { throw new Error('not implemented'); }
        public GetHashCode(): number { throw new Error('not implemented'); }
        public ToString(): string {
            var result: string = this.Kind.ToString();
            if (this.IsInSource) {
                result += "(" + (this.SourceTree != null ? this.SourceTree.FilePath : null) + this.SourceSpan + ")";
            }
            else {
                var pos = this.GetLineSpan();
                if (pos.Path != null) {
                    result += "(" + pos.Path + "@" + (pos.StartLinePosition.Line + 1) + ":" + (pos.StartLinePosition.Character + 1) + ")";
                }
            }
            return result;
        }
        public op_Equality(right: Location): boolean {
            var left = this;
            if (ReferenceEquals(left, null)) {
                return ReferenceEquals(right, null);
            }
            return left.Equals(right);
        }

        public op_Inequality(right: Location): boolean {
            var left = this;
            return !(left.op_Equality(right));
        }

        //protected  GetDebuggerDisplay(): string {
        //    var result: string = this.GetType().Name;
        //    var pos = this.GetLineSpan();
        //    if (pos.Path != null) {
        //        result += "(" + pos.Path + "@" + (pos.StartLinePosition.Line + 1) + ":" + (pos.StartLinePosition.Character + 1) + ")";
        //    }
        //    return result;
        //}
        public static get None(): Location {
            return NoLocation.Singleton;
        }
        public static Create_2122(syntaxTree: SyntaxTree, textSpan: Text.TextSpan): Location {
            if (syntaxTree == null) {
                throw new System.ArgumentNullException("syntaxTree");
            }
            return new SourceLocation().ctor_1003(syntaxTree, textSpan);
        }
        public static Create_1465(filePath: string, textSpan: Text.TextSpan, lineSpan: Text.LinePositionSpan): Location {
            if (filePath == null) {
                throw new System.ArgumentNullException("filePath");
            }
            return new ExternalFileLocation().ctor_1166(filePath, textSpan, lineSpan);
        }
        constructor() { }
    }
}