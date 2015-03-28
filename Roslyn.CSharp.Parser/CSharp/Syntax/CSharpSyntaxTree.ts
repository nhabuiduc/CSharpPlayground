///<reference path="SyntaxFactory.ts"/>
module Microsoft.CodeAnalysis.CSharp {
    export class CSharpSyntaxTree extends SyntaxTree {
        public static Dummy: SyntaxTree;//= new CSharpSyntaxTree.DummySyntaxTree().ctor_1052();
        public Options: CSharpParseOptions;
        protected CloneNodeAsRoot<T extends CSharpSyntaxNode>(node: T): T {
            return CSharpSyntaxNode.CloneNodeAsRoot(node, this);
        }
        public GetRoot(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): CSharpSyntaxNode { throw new Error('not implemented'); }
        public TryGetRoot(root: { refObj: CSharpSyntaxNode }): boolean { throw new Error('not implemented'); }
        //public GetRootAsync(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): System.Threading.Tasks.Task<CSharpSyntaxNode> {
        //    var node: CSharpSyntaxNode;
        //    var node_ref0 = { refObj: node };
        //    var ret_val__971 = this.TryGetRoot(node_ref0);

        //    node = node_ref0.refObj;
        //    if (ret_val__971) {
        //        return System.Threading.Tasks.Task.FromResult(node);
        //    }
        //    return System.Threading.Tasks.Task.Factory.StartNew(() => this.GetRoot(cancellationToken), cancellationToken);
        //}
        public GetCompilationUnitRoot(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): Syntax.CompilationUnitSyntax {
            return <Syntax.CompilationUnitSyntax>this.GetRoot(cancellationToken);
        }
        public IsEquivalentTo(tree: SyntaxTree, topLevel: boolean = false): boolean {
            return SyntaxFactory.AreEquivalent_1404(this, tree, topLevel);
        }
        public get HasReferenceDirectives(): boolean {
            System.Diagnostics.Debug.Assert(this.HasCompilationUnitRoot);
            return (this.Options.Kind == SourceCodeKind.Interactive || this.Options.Kind == SourceCodeKind.Script) && this.GetCompilationUnitRoot().GetReferenceDirectives_1524().Count > 0;
        }
        private hasDirectives: boolean = false;
        public directives: Syntax.InternalSyntax.DirectiveStack = structDefault(Syntax.InternalSyntax.DirectiveStack);
        public SetDirectiveStack(directives: Syntax.InternalSyntax.DirectiveStack): void {
            this.directives = directives;
            this.hasDirectives = true;
        }
        private GetDirectives(): Syntax.InternalSyntax.DirectiveStack {
            if (!this.hasDirectives) {
                var stack = this.GetRoot().CsGreen.ApplyDirectives(structDefault(Syntax.InternalSyntax.DirectiveStack));
                this.SetDirectiveStack(stack);
            }
            return this.directives;
        }
        public IsAnyPreprocessorSymbolDefined(conditionalSymbols: System.Collections.Immutable.ImmutableArray<string>): boolean {
            System.Diagnostics.Debug.Assert(conditionalSymbols != null);
            // for each
            var conditionalSymbolEnumerator = conditionalSymbols.GetEnumerator();
            try {
                while (conditionalSymbolEnumerator.MoveNext()) {
                    var conditionalSymbol = conditionalSymbolEnumerator.Current;
                    // foreach block
                    if (this.IsPreprocessorSymbolDefined_6691(conditionalSymbol)) {
                        return true;
                    }
                }
            } finally {
                if (conditionalSymbolEnumerator !== null) conditionalSymbolEnumerator.Dispose();

            }    
            // end foreach
            return false;
        }
        public IsPreprocessorSymbolDefined_6691(symbolName: string): boolean {
            return this.IsPreprocessorSymbolDefined_3316(this.GetDirectives(), symbolName);
        }
        private IsPreprocessorSymbolDefined_3316(directives: Syntax.InternalSyntax.DirectiveStack, symbolName: string): boolean {
            switch (directives.IsDefined(symbolName)) {
                case Syntax.InternalSyntax.DefineState.Defined:
                    return true;
                case Syntax.InternalSyntax.DefineState.Undefined:
                    return false;
                default:
                    return this.Options.PreprocessorSymbols.Contains(symbolName);
            }
        }
        private preprocessorStateChangePositions: System.Collections.Immutable.ImmutableArray<number> = <System.Collections.Immutable.ImmutableArray<number>> structDefault(System.Collections.Immutable.ImmutableArray);
        private preprocessorStates: System.Collections.Immutable.ImmutableArray<Syntax.InternalSyntax.DirectiveStack> = <System.Collections.Immutable.ImmutableArray<Syntax.InternalSyntax.DirectiveStack>> structDefault(System.Collections.Immutable.ImmutableArray);
        public IsPreprocessorSymbolDefined_1267(symbolName: string, position: number): boolean {
            if (this.preprocessorStateChangePositions.IsDefault) {
                this.BuildPreprocessorStateChangeMap();
            }
            var searchResult: number = System.Collections.Immutable.ImmutableArray.BinarySearch(this.preprocessorStateChangePositions,
                position);
            var directives: Syntax.InternalSyntax.DirectiveStack = structDefault(Syntax.InternalSyntax.DirectiveStack);
            if (searchResult < 0) {
                searchResult = (~searchResult) - 1;
                if (searchResult >= 0) {
                    directives = this.preprocessorStates.$get$(searchResult);
                }
                else {
                    directives = Syntax.InternalSyntax.DirectiveStack.Empty;
                }
            }
            else {
                directives = this.preprocessorStates.$get$(searchResult);
            }
            return this.IsPreprocessorSymbolDefined_3316(directives, symbolName);
        }
        private BuildPreprocessorStateChangeMap(): void {
            var currentState: Syntax.InternalSyntax.DirectiveStack = Syntax.InternalSyntax.DirectiveStack.Empty;
            var positions = ArrayBuilder.GetInstance_1997<number>();
            var states = ArrayBuilder.GetInstance_1997<Syntax.InternalSyntax.DirectiveStack>();
            // for each
            var directiveEnumerator = this.GetRoot().GetDirectives(d => {
                switch (d.CSharpKind()) {
                    case SyntaxKind.IfDirectiveTrivia:
                    case SyntaxKind.ElifDirectiveTrivia:
                    case SyntaxKind.ElseDirectiveTrivia:
                    case SyntaxKind.EndIfDirectiveTrivia:
                    case SyntaxKind.DefineDirectiveTrivia:
                    case SyntaxKind.UndefDirectiveTrivia:
                        return true;
                    default:
                        return false;
                }
            }).GetEnumerator();
            try {
                while (directiveEnumerator.MoveNext()) {
                    var directive = directiveEnumerator.Current;
                    // foreach block
                    currentState = CSharpExtensions.ApplyDirectives_1810(directive,
                        currentState);
                    switch (directive.CSharpKind()) {
                        case SyntaxKind.IfDirectiveTrivia:
                            break;
                        case SyntaxKind.ElifDirectiveTrivia:
                            states.Add(currentState);
                            positions.Add((<Syntax.ElifDirectiveTriviaSyntax>directive).ElifKeyword.SpanStart);
                            break;
                        case SyntaxKind.ElseDirectiveTrivia:
                            states.Add(currentState);
                            positions.Add((<Syntax.ElseDirectiveTriviaSyntax>directive).ElseKeyword.SpanStart);
                            break;
                        case SyntaxKind.EndIfDirectiveTrivia:
                            states.Add(currentState);
                            positions.Add((<Syntax.EndIfDirectiveTriviaSyntax>directive).EndIfKeyword.SpanStart);
                            break;
                        case SyntaxKind.DefineDirectiveTrivia:
                            states.Add(currentState);
                            positions.Add((<Syntax.DefineDirectiveTriviaSyntax>directive).Name.SpanStart);
                            break;
                        case SyntaxKind.UndefDirectiveTrivia:
                            states.Add(currentState);
                            positions.Add((<Syntax.UndefDirectiveTriviaSyntax>directive).Name.SpanStart);
                            break;
                        default:
                            throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
                    }
                }
            } finally {
                if (directiveEnumerator !== null) directiveEnumerator.Dispose();

            }    
            // end foreach
            var currentPos: number = -1;
            // for each
            var posEnumerator = positions.GetEnumerator();
            try {
                while (posEnumerator.MoveNext()) {
                    var pos = posEnumerator.Current;
                    // foreach block
                    System.Diagnostics.Debug.Assert(currentPos < pos);
                    currentPos = pos;
                }
            } finally {
                if (posEnumerator !== null) posEnumerator.Dispose();

            }    
            // end foreach
            var preprocessorStates_ref0 = { refObj: this.preprocessorStates };
            System.Collections.Immutable.ImmutableInterlocked.InterlockedInitialize(preprocessorStates_ref0, states.ToImmutableAndFree());

            this.preprocessorStates = preprocessorStates_ref0.refObj;;
            var preprocessorStateChangePositions_ref0 = { refObj: this.preprocessorStateChangePositions };
            System.Collections.Immutable.ImmutableInterlocked.InterlockedInitialize(preprocessorStateChangePositions_ref0, positions.ToImmutableAndFree());

            this.preprocessorStateChangePositions = preprocessorStateChangePositions_ref0.refObj;;
        }
        public static Create_5969(root: CSharpSyntaxNode, options: CSharpParseOptions = null, path: string = "", encoding: System.Text.Encoding = null): SyntaxTree {
            if (root == null) {
                throw new System.ArgumentNullException("root");
            }
            var directives = root.Kind == SyntaxKind.CompilationUnit ? (<Syntax.CompilationUnitSyntax>root).GetConditionalDirectivesStack() : Syntax.InternalSyntax.DirectiveStack.Empty;
            return new CSharpSyntaxTree.ParsedSyntaxTree().ctor_1144(/*textOpt:*/null,/*encodingOpt:*/encoding,/*checksumAlgorithm:*/Text.SourceHashAlgorithm.Sha1,/*path:*/path,/*options:*/options != null ? options : CSharpParseOptions.Default,/*root:*/root,/*directives:*/directives);
        }
        public static Create_5255(root: CSharpSyntaxNode, text: Text.SourceText): SyntaxTree {
            System.Diagnostics.Debug.Assert(root != null);
            return new CSharpSyntaxTree.ParsedSyntaxTree().ctor_1144(/*textOpt:*/text,/*encodingOpt:*/text.Encoding,/*checksumAlgorithm:*/text.ChecksumAlgorithm,/*path:*/"",/*options:*/CSharpParseOptions.Default,/*root:*/root,/*directives:*/Syntax.InternalSyntax.DirectiveStack.Empty);
        }
        public static CreateWithoutClone(root: CSharpSyntaxNode): SyntaxTree {
            System.Diagnostics.Debug.Assert(root != null);
            return new CSharpSyntaxTree.ParsedSyntaxTree().ctor_1144(/*textOpt:*/null,/*encodingOpt:*/null,/*checksumAlgorithm:*/Text.SourceHashAlgorithm.Sha1,/*path:*/"",/*options:*/CSharpParseOptions.Default,/*root:*/root,/*directives:*/Syntax.InternalSyntax.DirectiveStack.Empty,/*cloneRoot:*/false);
        }
        public static ParseText_7227(text: string, options: CSharpParseOptions = null, path: string = "", encoding: System.Text.Encoding = null, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): SyntaxTree {
            return CSharpSyntaxTree.ParseText_2029(Text.SourceText.From_1429(text, encoding), options, path, cancellationToken);
        }
        public static ParseText_2029(text: Text.SourceText, options: CSharpParseOptions = null, path: string = "", cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): SyntaxTree {
            if (text == null) {
                throw new System.ArgumentNullException("text");
            }
            if (path == null) {
                throw new System.ArgumentNullException("path");
            }
            var __temp = Instrumentation.Logger.LogBlock_1335(Instrumentation.FunctionId.CSharp_SyntaxTree_FullParse, path, text.Length, cancellationToken)
            try
            {
                options = options != null ? options : CSharpParseOptions.Default;
                var lexer = new Syntax.InternalSyntax.Lexer().ctor_1061(text, options)
                try
                {
                    var parser = new Syntax.InternalSyntax.LanguageParser().ctor_1741(lexer,/*oldTree:*/null,/*changes:*/null, Syntax.InternalSyntax.LexerMode.Syntax,/*cancellationToken:*/cancellationToken)
                    try
                    {
                        var compilationUnit = <Syntax.CompilationUnitSyntax>parser.ParseCompilationUnit().CreateRed_5702();
                        var tree = new CSharpSyntaxTree.ParsedSyntaxTree().ctor_1144(text, text.Encoding, text.ChecksumAlgorithm, path, options, compilationUnit, parser.Directives);
                        SyntaxTreeExtensions.VerifySource(tree);
                        return tree;
                    }
                    finally {
                        if (parser != null) parser.Dispose();
                    }
                }
                finally {
                    if (lexer != null) lexer.Dispose();
                }
            }
            finally {
                if (__temp != null) __temp.Dispose();
            }
        }
        public WithChangedText(newText: Text.SourceText): SyntaxTree {
            var __temp = Instrumentation.Logger.LogBlock_1335(Instrumentation.FunctionId.CSharp_SyntaxTree_IncrementalParse,/*message:*/this.FilePath, 0, structDefault(System.Threading.CancellationToken))
            try
            {
                var oldText: Text.SourceText;
                var oldText_ref0 = { refObj: oldText };
                var ret_val__280 = this.TryGetText(oldText_ref0);

                oldText = oldText_ref0.refObj;
                if (ret_val__280) {
                    var changes = newText.GetChangeRanges(oldText);
                    if (changes.Count == 0 && newText == oldText) {
                        return this;
                    }
                    return this.WithChanges(newText, changes);
                }
                return this.WithChanges(newText, new Array(new Text.TextChangeRange().ctor_4786(new Text.TextSpan().ctor_1506(0, this.Length), newText.Length)));
            }
            finally {
                if (__temp != null) __temp.Dispose();
            }
        }
        private WithChanges(newText: Text.SourceText, changes: System.Collections.Generic.IReadOnlyList<Text.TextChangeRange>): SyntaxTree {
            if (changes == null) {
                throw new System.ArgumentNullException("changes");
            }
            var oldTree = this;
            if (changes.Count == 1 && changes.$get$(0).Span.op_Equality(new Text.TextSpan().ctor_1506(0, this.Length)) && changes.$get$(0).NewLength == newText.Length) {
                changes = null;
                oldTree = null;
            }
            var lexer = new Syntax.InternalSyntax.Lexer().ctor_1061(newText, this.Options)
            try
            {
                var root: CSharpSyntaxNode = null;
                if (oldTree != null) {
                    root = oldTree.GetRoot();
                }
                var parser = new Syntax.InternalSyntax.LanguageParser().ctor_1741(lexer, root,changes)
                try
                {
                    var compilationUnit = <Syntax.CompilationUnitSyntax>parser.ParseCompilationUnit().CreateRed_5702();
                    var tree = new CSharpSyntaxTree.ParsedSyntaxTree().ctor_1144(newText, newText.Encoding, newText.ChecksumAlgorithm, this.FilePath, this.Options, compilationUnit, parser.Directives);
                    SyntaxTreeExtensions.VerifySource(tree,
                        changes);
                    return tree;
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public GetChangedSpans(oldTree: SyntaxTree): System.Collections.Generic.IList<Text.TextSpan> {
            if (oldTree == null) {
                throw new System.ArgumentNullException("oldTree");
            }
            return SyntaxDiffer.GetPossiblyDifferentTextSpans_6752(oldTree, this);
        }
        public GetChanges(oldTree: SyntaxTree): System.Collections.Generic.IList<Text.TextChange> {
            if (oldTree == null) {
                throw new System.ArgumentNullException("oldTree");
            }
            return SyntaxDiffer.GetTextChanges_8869(oldTree, this);
        }
        public GetLineSpan(span: Text.TextSpan, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): FileLinePositionSpan {
            return new FileLinePositionSpan().ctor_1503(this.FilePath, this.GetLinePosition(span.Start), this.GetLinePosition(span.End));
        }
        public GetMappedLineSpan(span: Text.TextSpan, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): FileLinePositionSpan {
            if (this.lazyLineDirectiveMap == null) {
                //Interlocked.CompareExchange(ref lazyLineDirectiveMap, new CSharpLineDirectiveMap(this), null)
                this.lazyLineDirectiveMap = new Syntax.CSharpLineDirectiveMap().ctor_1559(this);
            }
            return this.lazyLineDirectiveMap.TranslateSpan_2705(this.GetText(cancellationToken), this.FilePath, span);
        }
        public GetLineVisibility(position: number, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): LineVisibility {
            if (this.lazyLineDirectiveMap == null) {
                //Interlocked.CompareExchange(ref lazyLineDirectiveMap, new CSharpLineDirectiveMap(this), null)
                this.lazyLineDirectiveMap = new Syntax.CSharpLineDirectiveMap().ctor_1559(this);
            }
            return this.lazyLineDirectiveMap.GetLineVisibility(this.GetText(cancellationToken), position);
        }
        public GetMappedLineSpanAndVisibility(span: Text.TextSpan, isHiddenPosition: { refObj: boolean }): FileLinePositionSpan {
            if (this.lazyLineDirectiveMap == null) {
                //Interlocked.CompareExchange(ref lazyLineDirectiveMap, new CSharpLineDirectiveMap(this), null)
                this.lazyLineDirectiveMap = new Syntax.CSharpLineDirectiveMap().ctor_1559(this);
            }
            return this.lazyLineDirectiveMap.TranslateSpanAndVisibility(this.GetText(), this.FilePath, span, isHiddenPosition);
        }
        public HasHiddenRegions(): boolean {
            if (this.lazyLineDirectiveMap == null) {
                // Interlocked.CompareExchange(ref lazyLineDirectiveMap, new CSharpLineDirectiveMap(this), null)
                this.lazyLineDirectiveMap = new Syntax.CSharpLineDirectiveMap().ctor_1559(this);
            }
            return this.lazyLineDirectiveMap.HasAnyHiddenRegions();
        }
        public GetPragmaDirectiveWarningState(id: string, position: number): ReportDiagnostic {
            if (this.lazyPragmaWarningStateMap == null) {
                //Interlocked.CompareExchange(ref lazyPragmaWarningStateMap, new CSharpPragmaWarningStateMap(this), null)
                this.lazyPragmaWarningStateMap = new Syntax.CSharpPragmaWarningStateMap().ctor_1595(this);
            }
            return this.lazyPragmaWarningStateMap.GetWarningState(id, position);
        }
        private lazyLineDirectiveMap: Syntax.CSharpLineDirectiveMap;
        private lazyPragmaWarningStateMap: Syntax.CSharpPragmaWarningStateMap;
        private GetLinePosition(position: number): Text.LinePosition {
            return this.GetText().Lines.GetLinePosition(position);
        }
        public GetLocation(span: Text.TextSpan): Location {
            return new SourceLocation().ctor_1003(this, span);
        }
        public GetDiagnostics_1067(node: SyntaxNode): System.Collections.Generic.IEnumerable<Diagnostic> {
            if (node == null) {
                throw new System.ArgumentNullException("node");
            }
            return this.GetDiagnostics_1234(node.Green, node.Position);
        }
        private GetDiagnostics_1234(greenNode: GreenNode, position: number): System.Collections.Generic.IEnumerable<Diagnostic> {
            if (greenNode == null) {
                throw new System.InvalidOperationException();
            }
            if (greenNode.ContainsDiagnostics) {
                return this.EnumerateDiagnostics(greenNode, position);
            }
            return Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<Diagnostic>();
        }
        private EnumerateDiagnostics(node: GreenNode, position: number): System.Collections.Generic.IEnumerable<Diagnostic> {
            var __result = new Array<Diagnostic>();
            var enumerator = new SyntaxTreeDiagnosticEnumerator().ctor_1274(this, node, position);
            while (enumerator.MoveNext()) {
                __result.push(enumerator.Current);
                //yield return enumerator.Current;
            }
            return __result;
        }
        public GetDiagnostics_9583(token: SyntaxToken): System.Collections.Generic.IEnumerable<Diagnostic> {
            return this.GetDiagnostics_1234(token.Node, token.Position);
        }
        public GetDiagnostics_1774(trivia: SyntaxTrivia): System.Collections.Generic.IEnumerable<Diagnostic> {
            return this.GetDiagnostics_1234(trivia.UnderlyingNode, trivia.Position);
        }
        public GetDiagnostics_6963(nodeOrToken: SyntaxNodeOrToken): System.Collections.Generic.IEnumerable<Diagnostic> {
            return this.GetDiagnostics_1234(nodeOrToken.UnderlyingNode, nodeOrToken.Position);
        }
        public GetDiagnostics_4066(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): System.Collections.Generic.IEnumerable<Diagnostic> {
            return this.GetDiagnostics_1067(this.GetRoot(cancellationToken));
        }
        protected  GetRootCore(cancellationToken: System.Threading.CancellationToken): SyntaxNode {
            return this.GetRoot(cancellationToken);
        }
        //        protected  async GetRootAsyncCore (cancellationToken:System.Threading.CancellationToken): System.Threading.Tasks.Task<SyntaxNode> 
        //{
        //            return await this.GetRootAsync(cancellationToken).ConfigureAwait(false);
        //        }
        protected  TryGetRootCore(root: { refObj: SyntaxNode }): boolean {
            var node: CSharpSyntaxNode;
            var node_ref0 = { refObj: node };
            var ret_val__273 = this.TryGetRoot(node_ref0);

            node = node_ref0.refObj;
            if (ret_val__273) {
                root.refObj = node;
                return true;
            }
            else {
                root.refObj = null;
                return false;
            }
        }
        public  get OptionsCore(): ParseOptions {
            return this.Options;
        }
        constructor() { super(); }
    }

    export module CSharpSyntaxTree {
        export class DummySyntaxTree extends CSharpSyntaxTree {
            private node: Syntax.CompilationUnitSyntax;
            ctor_1052(): DummySyntaxTree {
                this.node = this.CloneNodeAsRoot(SyntaxFactory.ParseCompilationUnit(System.String.Empty));
                return this;
            }
            public ToString(): string {
                return System.String.Empty;
            }
            public GetText(cancellationToken: System.Threading.CancellationToken): Text.SourceText {
                return Text.SourceText.From_1429(System.String.Empty, System.Text.Encoding.UTF8);
            }
            public TryGetText(text: { refObj: Text.SourceText }): boolean {
                text.refObj = Text.SourceText.From_1429(System.String.Empty, System.Text.Encoding.UTF8);
                return true;
            }
            public get Length(): number {
                return 0;
            }
            public get Options(): CSharpParseOptions {
                return CSharpParseOptions.Default;
            }
            public get FilePath(): string {
                return System.String.Empty;
            }
            public GetReference(node: SyntaxNode): SyntaxReference {
                return new SimpleSyntaxReference().ctor_7792(node);
            }
            public GetRoot(cancellationToken: System.Threading.CancellationToken): CSharpSyntaxNode {
                return this.node;
            }
            public TryGetRoot(root: { refObj: CSharpSyntaxNode }): boolean {
                root.refObj = this.node;
                return true;
            }
            public get HasCompilationUnitRoot(): boolean {
                return true;
            }
            public GetLineSpan(span: Text.TextSpan, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): FileLinePositionSpan {
                return structDefault(FileLinePositionSpan);
            }
            public WithRootAndOptions(root: SyntaxNode, options: ParseOptions): SyntaxTree {
                return SyntaxFactory.SyntaxTree(root,/*options:*/options,/*path:*/this.FilePath,/*encoding:*/null);
            }
            public WithFilePath(path: string): SyntaxTree {
                return SyntaxFactory.SyntaxTree(this.node,/*options:*/this.Options,/*path:*/path,/*encoding:*/null);
            }
            constructor() { super(); }
        }

        export class ParsedSyntaxTree extends CSharpSyntaxTree {
            private options: CSharpParseOptions;
            private path: string;
            private root: CSharpSyntaxNode;
            private hasCompilationUnitRoot: boolean = false;
            private encodingOpt: System.Text.Encoding;
            private checksumAlgorithm: Text.SourceHashAlgorithm = 0;
            private lazyText: Text.SourceText;
            ctor_1144(textOpt: Text.SourceText, encodingOpt: System.Text.Encoding, checksumAlgorithm: Text.SourceHashAlgorithm, path: string, options: CSharpParseOptions, root: CSharpSyntaxNode, directives: Syntax.InternalSyntax.DirectiveStack, cloneRoot: boolean = true): ParsedSyntaxTree {
                System.Diagnostics.Debug.Assert(root != null);
                System.Diagnostics.Debug.Assert(options !=null);
                System.Diagnostics.Debug.Assert(path != null);
                System.Diagnostics.Debug.Assert(textOpt == null || textOpt.Encoding == encodingOpt && textOpt.ChecksumAlgorithm == checksumAlgorithm);
                this.lazyText = textOpt;
                this.encodingOpt = encodingOpt;
                this.checksumAlgorithm = checksumAlgorithm;
                this.options = options;
                this.path = path;
                this.root = cloneRoot ? this.CloneNodeAsRoot(root) : root;
                this.hasCompilationUnitRoot = root.Kind == SyntaxKind.CompilationUnit;
                this.SetDirectiveStack(directives);
                return this;
            }
            public get FilePath(): string {
                return this.path;
            }
            public GetText(cancellationToken: System.Threading.CancellationToken): Text.SourceText {
                if (this.lazyText == null) {
                    var __temp = Instrumentation.Logger.LogBlock_1335(Instrumentation.FunctionId.CSharp_SyntaxTree_GetText,/*message:*/this.FilePath, 0,/*cancellationToken:*/cancellationToken)
                    try
                    {
                       // Interlocked.CompareExchange(ref this.lazyText, this.GetRoot(cancellationToken).GetText(encodingOpt, checksumAlgorithm), null)
                        this.lazyText = this.GetRoot(cancellationToken).GetText(this.encodingOpt, this.checksumAlgorithm);
                    }
                    finally {
                        if (__temp != null) __temp.Dispose();
                    }
                }
                return this.lazyText;
            }
            public TryGetText(text: { refObj: Text.SourceText }): boolean {
                text.refObj = this.lazyText;
                return text.refObj != null;
            }
            public get Length(): number {
                return this.root.FullSpan.Length;
            }
            public GetRoot(cancellationToken: System.Threading.CancellationToken): CSharpSyntaxNode {
                return this.root;
            }
            public TryGetRoot(root: { refObj: CSharpSyntaxNode }): boolean {
                root.refObj = this.root;
                return true;
            }
            public get HasCompilationUnitRoot(): boolean {
                return this.hasCompilationUnitRoot;
            }
            public get Options(): CSharpParseOptions {
                return this.options;
            }
            public GetReference(node: SyntaxNode): SyntaxReference {
                return new SimpleSyntaxReference().ctor_7792(node);
            }
            public ToString(): string {
                return this.GetText(System.Threading.CancellationToken.None).ToString();
            }
            public WithRootAndOptions(root: SyntaxNode, options: ParseOptions): SyntaxTree {
                if (ReferenceEquals(this.root, root) && ReferenceEquals(this.options, options)) {
                    return this;
                }
                return new ParsedSyntaxTree().ctor_1144(null, this.encodingOpt, this.checksumAlgorithm, this.path, <CSharpParseOptions>options, <CSharpSyntaxNode>root, this.directives);
            }
            public WithFilePath(path: string): SyntaxTree {
                if (this.path == path) {
                    return this;
                }
                return new ParsedSyntaxTree().ctor_1144(this.lazyText, this.encodingOpt, this.checksumAlgorithm, path, this.options, this.root, this.directives);
            }
            constructor() { super(); }
        }
    }

    CSharpSyntaxTree.Dummy = new CSharpSyntaxTree.DummySyntaxTree().ctor_1052();
}