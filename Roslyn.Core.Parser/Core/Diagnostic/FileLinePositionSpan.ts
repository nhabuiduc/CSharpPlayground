module Microsoft.CodeAnalysis {
    export class FileLinePositionSpan implements System.IEquatable<FileLinePositionSpan>, IStruct {
        private path: string;
        private span: Text.LinePositionSpan = structDefault(Text.LinePositionSpan);
        private hasMappedPath: boolean = false;
        public get Path(): string {
            return this.path;
        }
        public get HasMappedPath(): boolean {
            return this.hasMappedPath;
        }
        public get StartLinePosition(): Text.LinePosition {
            return this.span.Start;
        }
        public get EndLinePosition(): Text.LinePosition {
            return this.span.End;
        }
        public get Span(): Text.LinePositionSpan {
            return this.span;
        }
        ctor_1503(path: string, start: Text.LinePosition, end: Text.LinePosition): FileLinePositionSpan {
            this.ctor_2529(path, new Text.LinePositionSpan().ctor_1348(start, end));
            return this;
        }
        ctor_2529(path: string, span: Text.LinePositionSpan): FileLinePositionSpan {
            if (path == null) {
                throw new System.ArgumentNullException("path");
            }
            this.path = path;
            this.span = span;
            this.hasMappedPath = false;
            return this;
        }
        ctor_1079(path: string, span: Text.LinePositionSpan, hasMappedPath: boolean): FileLinePositionSpan {
            this.path = path;
            this.span = span;
            this.hasMappedPath = hasMappedPath;
            return this;
        }
        public get IsValid(): boolean {
            return this.path != null;
        }
        public Equals_2972(other: FileLinePositionSpan): boolean {
            return this.span.Equals_2915(other.span) && this.hasMappedPath == other.hasMappedPath && System.String.Equals(this.path, other.path, System.StringComparison.Ordinal);
        }
        public Equals(other: Object): boolean {
            return other instanceof FileLinePositionSpan && this.Equals_2972(<FileLinePositionSpan>other);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_7656(this.path, Roslyn.Utilities.Hash.Combine_1020(this.hasMappedPath, this.span.GetHashCode()));
        }
        public ToString(): string {
            return this.path + ": " + this.span;
        }
        constructor() { }
    }
}