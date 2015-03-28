module Microsoft.CodeAnalysis {
    export class SourceReferenceResolver {
        constructor() {

        }
        public Equals(other: Object): boolean { throw new Error('not implemented'); }
        public GetHashCode(): number { throw new Error('not implemented'); }
        public NormalizePath(path: string, baseFilePath: string): string { throw new Error('not implemented'); }
        public ResolveReference(path: string, baseFilePath: string): string { throw new Error('not implemented'); }
        public OpenRead(resolvedPath: string): System.IO.Stream { throw new Error('not implemented'); }
        public OpenReadChecked(fullPath: string): System.IO.Stream {
            var stream = this.OpenRead(fullPath);
            if (stream == null || !stream.CanRead) {
                throw new System.InvalidOperationException(CodeAnalysisResources.ReferenceResolverShouldReturnReadableNonNullStream);
            }
            return stream;
        }
    }
}