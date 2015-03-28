module Microsoft.CodeAnalysis {
    export class SyntaxTree {
        private lazyChecksum: System.Collections.Immutable.ImmutableArray<number> = structDefault(System.Collections.Immutable.ImmutableArray);
        private lazyHashAlgorithm: Text.SourceHashAlgorithm = 0;
        public FilePath: string;
        public HasCompilationUnitRoot: boolean = false;
        public get Options(): ParseOptions {
            return this.OptionsCore;
        }
        public OptionsCore: ParseOptions;
        public Length: number = 0;
        public TryGetText(text: { refObj: Text.SourceText }): boolean { throw new Error('not implemented'); }
        public GetText(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): Text.SourceText { throw new Error('not implemented'); }
        //public GetTextAsync(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): System.Threading.Tasks.Task<Text.SourceText> {
        //    var text: Text.SourceText;
        //    var text_ref0 = { refObj: text };
        //    var ret_val__493 = this.TryGetText(text_ref0);

        //    text = text_ref0.refObj;
        //    if (ret_val__493) {
        //        return System.Threading.Tasks.Task.FromResult(text);
        //    }
        //    else {
        //        return System.Threading.Tasks.Task.Factory.StartNew(() => this.GetText(cancellationToken), cancellationToken);
        //    }
        //}
        public TryGetRoot(root: { refObj: SyntaxNode }): boolean {
            return this.TryGetRootCore(root);
        }
        protected  TryGetRootCore(root: { refObj: SyntaxNode }): boolean { throw new Error('not implemented'); }
        public GetRoot(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): SyntaxNode {
            return this.GetRootCore(cancellationToken);
        }
        protected  GetRootCore(cancellationToken: System.Threading.CancellationToken): SyntaxNode { throw new Error('not implemented'); }
        //public GetRootAsync(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): System.Threading.Tasks.Task<SyntaxNode> {
        //    return this.GetRootAsyncCore(cancellationToken);
        //}
        //protected  GetRootAsyncCore(cancellationToken: System.Threading.CancellationToken): System.Threading.Tasks.Task<SyntaxNode> { throw new Error('not implemented'); }
        public WithChangedText(newText: Text.SourceText): SyntaxTree { throw new Error('not implemented'); }
        public GetDiagnostics_4066(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): System.Collections.Generic.IEnumerable<Diagnostic> { throw new Error('not implemented'); }
        public GetDiagnostics_1067(node: SyntaxNode): System.Collections.Generic.IEnumerable<Diagnostic> { throw new Error('not implemented'); }
        public GetDiagnostics_9583(token: SyntaxToken): System.Collections.Generic.IEnumerable<Diagnostic> { throw new Error('not implemented'); }
        public GetDiagnostics_1774(trivia: SyntaxTrivia): System.Collections.Generic.IEnumerable<Diagnostic> { throw new Error('not implemented'); }
        public GetDiagnostics_6963(nodeOrToken: SyntaxNodeOrToken): System.Collections.Generic.IEnumerable<Diagnostic> { throw new Error('not implemented'); }
        public GetLineSpan(span: Text.TextSpan, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): FileLinePositionSpan { throw new Error('not implemented'); }
        public GetMappedLineSpan(span: Text.TextSpan, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): FileLinePositionSpan { throw new Error('not implemented'); }
        public GetLineVisibility(position: number, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): LineVisibility {
            return LineVisibility.Visible;
        }
        public GetMappedLineSpanAndVisibility(span: Text.TextSpan, isHiddenPosition: { refObj: boolean }): FileLinePositionSpan {
            isHiddenPosition.refObj = this.GetLineVisibility(span.Start) == LineVisibility.Hidden;
            return this.GetMappedLineSpan(span);
        }
        public GetDisplayPath(span: Text.TextSpan, resolver: SourceReferenceResolver): string {
            var mappedSpan = this.GetMappedLineSpan(span);
            if (resolver == null || Roslyn.Utilities.EnumerableExtensions.IsEmpty_2124(mappedSpan.Path)) {
                return mappedSpan.Path;
            }
            return resolver.NormalizePath(mappedSpan.Path,/*baseFilePath:*/mappedSpan.HasMappedPath ? this.FilePath : null) != null ? resolver.NormalizePath(mappedSpan.Path,/*baseFilePath:*/mappedSpan.HasMappedPath ? this.FilePath : null) : mappedSpan.Path;
        }
        public GetDisplayLineNumber(span: Text.TextSpan): number {
            return this.GetMappedLineSpan(span).StartLinePosition.Line + 1;
        }
        public HasHiddenRegions(): boolean { throw new Error('not implemented'); }
        public GetChangedSpans(syntaxTree: SyntaxTree): System.Collections.Generic.IList<Text.TextSpan> { throw new Error('not implemented'); }
        public GetLocation(span: Text.TextSpan): Location { throw new Error('not implemented'); }
        public IsEquivalentTo(tree: SyntaxTree, topLevel: boolean = false): boolean { throw new Error('not implemented'); }
        public GetReference(node: SyntaxNode): SyntaxReference { throw new Error('not implemented'); }
        public GetChanges(oldTree: SyntaxTree): System.Collections.Generic.IList<Text.TextChange> { throw new Error('not implemented'); }
        public WithRootAndOptions(root: SyntaxNode, options: ParseOptions): SyntaxTree { throw new Error('not implemented'); }
        public WithFilePath(path: string): SyntaxTree { throw new Error('not implemented'); }
        constructor() { }
    }
}