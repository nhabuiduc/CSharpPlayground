module Microsoft.CodeAnalysis.CSharp {
    export class CSharpSyntaxNode extends SyntaxNode implements IMessageSerializable {
        ctor_6242(green: GreenNode, parent: SyntaxNode, position: number): CSharpSyntaxNode {
            super.ctor_5435(green, parent, position);
            return this;
        }
        ctor_1688(green: GreenNode, position: number, syntaxTree: SyntaxTree): CSharpSyntaxNode {
            super.ctor_8973(green, position, syntaxTree);
            return this;
        }
        public get Navigator(): AbstractSyntaxNavigator {
            return Syntax.SyntaxNavigator.Instance;
        }
        public static CloneNodeAsRoot<T extends SyntaxNode>(node: T, syntaxTree: SyntaxTree): T {
            var clone = <T>node.Green.CreateRed_9614(null, 0);
            clone._syntaxTree = syntaxTree;
            return clone;
        }
        public get SyntaxTree(): SyntaxTree {
            if (this._syntaxTree == null) {
                var tree = (this.Parent != null) ? this.Parent.SyntaxTree : CSharpSyntaxTree.CreateWithoutClone(this);
                System.Diagnostics.Debug.Assert(tree != null);
                //Interlocked.CompareExchange(ref this._syntaxTree, tree, null)
                this._syntaxTree = tree;
            }
            return this._syntaxTree;
        }
        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult { throw new Error('not implemented'); }
        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void { throw new Error('not implemented'); }
        public get Parent(): CSharpSyntaxNode {
            return <CSharpSyntaxNode>super.getParent();
        }
        public get ParentOrStructuredTriviaParent(): CSharpSyntaxNode {
            return <CSharpSyntaxNode>super.getParentOrStructuredTriviaParent();
        }
        public get CsGreen(): Syntax.InternalSyntax.CSharpSyntaxNode {
            return <Syntax.InternalSyntax.CSharpSyntaxNode>this.Green;
        }
        public get Kind(): SyntaxKind {
            return <SyntaxKind>this.Green.RawKind;
        }
        public CSharpKind(): SyntaxKind {
            return <SyntaxKind>this.Green.RawKind;
        }
        public get KindText(): string {
            return this.Kind.ToString();
        }
        public get Language(): string {
            return LanguageNames.CSharp;
        }
        public get HasErrors(): boolean {
            if (!this.ContainsDiagnostics) {
                return false;
            }
            return this.HasErrorsSlow();
        }
        private HasErrorsSlow(): boolean {
            return new Syntax.InternalSyntax.SyntaxDiagnosticInfoList().ctor_2725(this.Green).Any((info) => info.Severity == DiagnosticSeverity.Error);
        }
        public GetLeadingTrivia(): SyntaxTriviaList {
            var firstToken = this.GetFirstToken_1962(/*includeZeroWidth:*/true, false, false, false);
            return firstToken.LeadingTrivia;
        }
        public GetTrailingTrivia(): SyntaxTriviaList {
            var lastToken = this.GetLastToken(/*includeZeroWidth:*/true, false, false, false);
            return lastToken.TrailingTrivia;
        }
        public get Location(): Location {
            var tree: SyntaxTree = this.SyntaxTree;
            System.Diagnostics.Debug.Assert(tree != null);
            return (!tree.HasCompilationUnitRoot) ? NoLocation.Singleton : new SourceLocation().ctor_1875(this);
        }
        public ToString(): string {
            return this.Green.ToString();
        }
        public ToFullString(): string {
            return this.Green.ToFullString();
        }
        public WriteTo(writer: System.IO.TextWriter): void {
            this.Green.WriteTo_1077(writer, true, true);
        }
        private static defaultBinder: Roslyn.Utilities.RecordingObjectBinder = new Roslyn.Utilities.ConcurrentRecordingObjectBinder();
        public SerializeTo(stream: System.IO.Stream, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): void {
            var __temp = Instrumentation.Logger.LogBlock_1335(Instrumentation.FunctionId.CSharp_SyntaxNode_SerializeTo, null, 0,/*cancellationToken:*/cancellationToken)
            try
            {
                if (stream == null) {
                    throw new System.ArgumentNullException("stream");
                }
                if (!stream.CanWrite) {
                    throw new System.InvalidOperationException(CSharpResources.TheStreamCannotBeWritten);
                }
                var writer = new Roslyn.Utilities.ObjectWriter().ctor_4283(stream, CSharpSyntaxNode.GetDefaultObjectWriterData(),/*binder:*/CSharpSyntaxNode.defaultBinder,/*cancellationToken:*/cancellationToken)
                try
                {
                    writer.WriteValue(this.Green);
                }
                finally {
                    if (writer != null) writer.Dispose();
                }
            }
            finally {
                if (__temp != null) __temp.Dispose();
            }
        }
        public static DeserializeFrom(stream: System.IO.Stream, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): SyntaxNode {
            var __temp = Instrumentation.Logger.LogBlock_1335(Instrumentation.FunctionId.CSharp_SyntaxNode_DeserializeFrom, null, 0,/*cancellationToken:*/cancellationToken)
            try
            {
                if (stream == null) {
                    throw new System.ArgumentNullException("stream");
                }
                if (!stream.CanRead) {
                    throw new System.InvalidOperationException(CSharpResources.TheStreamCannotBeReadFrom);
                }
                var reader = new Roslyn.Utilities.ObjectReader().ctor_3403(stream,/*defaultData:*/CSharpSyntaxNode.GetDefaultObjectReaderData(),/*binder:*/CSharpSyntaxNode.defaultBinder)
                try
                {
                    var root = <Syntax.InternalSyntax.CSharpSyntaxNode>reader.ReadValue();
                    return root.CreateRed_5702();
                }
                finally {
                    if (reader != null) reader.Dispose();
                }
            }
            finally {
                if (__temp != null) __temp.Dispose();
            }
        }
        private static defaultObjectWriterData: Roslyn.Utilities.ObjectWriterData;
        private static GetDefaultObjectWriterData(): Roslyn.Utilities.ObjectWriterData {
            if (CSharpSyntaxNode.defaultObjectWriterData == null) {
                var data = new Roslyn.Utilities.ObjectWriterData().ctor_7515(CSharpSyntaxNode.GetSerializationData());
                // Interlocked.CompareExchange(ref defaultObjectWriterData, data, null)
                CSharpSyntaxNode.defaultObjectWriterData = data;
            }
            return CSharpSyntaxNode.defaultObjectWriterData;
        }
        private static defaultObjectReaderData: Roslyn.Utilities.ObjectReaderData;
        private static GetDefaultObjectReaderData(): Roslyn.Utilities.ObjectReaderData {
            if (CSharpSyntaxNode.defaultObjectReaderData == null) {
                var data = new Roslyn.Utilities.ObjectReaderData().ctor_1102(CSharpSyntaxNode.GetSerializationData());
                //Interlocked.CompareExchange(ref defaultObjectReaderData, data, null)
                CSharpSyntaxNode.defaultObjectReaderData = data;
            }
            return CSharpSyntaxNode.defaultObjectReaderData;
        }
        private static serializationData: System.Collections.Generic.IEnumerable<Object>;
        private static GetSerializationData(): System.Collections.Generic.IEnumerable<Object> {
            if (CSharpSyntaxNode.serializationData == null) {
                var data = System.Collections.Immutable.ImmutableArray.ToImmutableArray(
                    System.Linq.Enumerable.Concat(System.Linq.Enumerable.Concat(
                        System.Linq.Enumerable.Concat(
                            System.Linq.Enumerable.Concat(
                                new Array<Object>(//System.Reflection.IntrospectionExtensions.GetTypeInfo(/*typeof*/Object).Assembly.FullName,
                                    //System.Reflection.IntrospectionExtensions.GetTypeInfo(/*typeof*/Microsoft.CodeAnalysis.DiagnosticInfo).Assembly.FullName,
                                    //System.Reflection.IntrospectionExtensions.GetTypeInfo(/*typeof*/Microsoft.CodeAnalysis.CSharp.CSharpSyntaxNode).Assembly.FullName,
                                    Gb.AssemblyName,
                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode,/*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken,
                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxTokenWithTrivia,
                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.MissingTokenWithTrivia,
                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxIdentifier,
                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxIdentifierExtended,
                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxIdentifierWithTrailingTrivia,
                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxIdentifierWithTrivia,
                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxTokenWithValue  ,
                                        /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxTokenWithValueAndTrivia  ,
                                            /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxTokenWithValue  ,
                                                /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxTokenWithValueAndTrivia  ,
                                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxTokenWithValue  ,
                                        /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxTokenWithValueAndTrivia  ,
                                            /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxTokenWithValue  ,
                                                /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken.SyntaxTokenWithValueAndTrivia,
                                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxTrivia,
                                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxListBase.WithManyChildren,
                                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxListBase.WithThreeChildren,
                                                    /*typeof*/Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxListBase.WithTwoChildren),
                    Syntax.InternalSyntax.SyntaxFactory.GetNodeTypes()),
                    Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.GetWellKnownTokens()),
                        Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.GetWellKnownTrivia()),
                        new Array<Object>(" ",/*typeof*/Microsoft.CodeAnalysis.SyntaxAnnotation,
                        /*typeof*/Microsoft.CodeAnalysis.DiagnosticInfo,
                        /*typeof*/Microsoft.CodeAnalysis.CSharp.SyntaxDiagnosticInfo,
                        /*typeof*/Microsoft.CodeAnalysis.CSharp.MessageProvider,
                        "messageProvider", "errorCode", "argumentCount", "offset", "width")));
                //var serializationData_ref0 = { refObj: CSharpSyntaxNode.serializationData };
                //System.Threading.Interlocked.CompareExchange(serializationData_ref0, data, null);

                //CSharpSyntaxNode.serializationData = serializationData_ref0.refObj;;
                CSharpSyntaxNode.serializationData = data;
            }
            return CSharpSyntaxNode.serializationData;
        }
        public IsEquivalentTo(other: CSharpSyntaxNode): boolean {
            if (this == other) {
                return true;
            }
            if (other == null) {
                return false;
            }
            return this.Green.IsEquivalentTo(other.Green);
        }
        public GetLocation(): Location {
            return new SourceLocation().ctor_1875(this);
        }
        public GetReference(): SyntaxReference {
            return this.SyntaxTree.GetReference(this);
        }
        public GetDiagnostics(): System.Collections.Generic.IEnumerable<Diagnostic> {
            return this.SyntaxTree.GetDiagnostics_1067(this);
        }
        public GetDirectives(filter: (_: Syntax.DirectiveTriviaSyntax) => boolean = null): System.Collections.Generic.IList<Syntax.DirectiveTriviaSyntax> {
            return (SyntaxNodeOrToken.op_Implicit_1792(this)).GetDirectives_1318<Syntax.DirectiveTriviaSyntax>(filter);
        }
        public GetFirstDirective(predicate: (_: Syntax.DirectiveTriviaSyntax) => boolean = null): Syntax.DirectiveTriviaSyntax {
            // for each
            var childEnumerator = this.ChildNodesAndTokens().GetEnumerator();
            try {
                while (childEnumerator.MoveNext()) {
                    var child = childEnumerator.Current;
                    // foreach block
                    if (child.ContainsDirectives) {
                        if (child.IsNode) {
                            var d = CSharpExtensions.GetFirstDirective(child.AsNode(),
                                predicate);
                            if (d != null) {
                                return d;
                            }
                        }
                        else {
                            var token = child.AsToken();
                            // for each
                            var trEnumerator = token.LeadingTrivia.GetEnumerator();
                            try {
                                while (trEnumerator.MoveNext()) {
                                    var tr = trEnumerator.Current;
                                    // foreach block
                                    if (tr.IsDirective) {
                                        var d = <Syntax.DirectiveTriviaSyntax>tr.GetStructure();
                                        if (predicate == null || predicate(d)) {
                                            return d;
                                        }
                                    }
                                }
                            } finally {
                                if (trEnumerator !== null) trEnumerator.Dispose();

                            }    
                            // end foreach
                        }
                    }
                }
            } finally {
                if (childEnumerator !== null) childEnumerator.Dispose();

            }    
            // end foreach
            return null;
        }
        public GetLastDirective(predicate: (_: Syntax.DirectiveTriviaSyntax) => boolean = null): Syntax.DirectiveTriviaSyntax {
            // for each
            var childEnumerator = this.ChildNodesAndTokens().Reverse().GetEnumerator();
            try {
                while (childEnumerator.MoveNext()) {
                    var child = childEnumerator.Current;
                    // foreach block
                    if (child.ContainsDirectives) {
                        if (child.IsNode) {
                            var d = CSharpExtensions.GetLastDirective(child.AsNode(),
                                predicate);
                            if (d != null) {
                                return d;
                            }
                        }
                        else {
                            var token = child.AsToken();
                            // for each
                            var trEnumerator = token.LeadingTrivia.Reverse().GetEnumerator();
                            try {
                                while (trEnumerator.MoveNext()) {
                                    var tr = trEnumerator.Current;
                                    // foreach block
                                    if (tr.IsDirective) {
                                        var d = <Syntax.DirectiveTriviaSyntax>tr.GetStructure();
                                        if (predicate == null || predicate(d)) {
                                            return d;
                                        }
                                    }
                                }
                            } finally {
                                if (trEnumerator !== null) trEnumerator.Dispose();

                            }    
                            // end foreach
                        }
                    }
                }
            } finally {
                if (childEnumerator !== null) childEnumerator.Dispose();

            }    
            // end foreach
            return null;
        }
        public ChildThatContainsPosition(position: number): SyntaxNodeOrToken {
            if (!this.FullSpan.Contains_2103(position)) {
                throw new System.ArgumentOutOfRangeException("position");
            }
            var childNodeOrToken: SyntaxNodeOrToken = ChildSyntaxList.ChildThatContainsPosition(this, position);
            System.Diagnostics.Debug.Assert(childNodeOrToken.FullSpan.Contains_2103(position), "ChildThatContainsPosition's return value does not contain the requested position.");
            return childNodeOrToken;
        }
        public GetFirstToken_1962(includeZeroWidth: boolean = false, includeSkipped: boolean = false, includeDirectives: boolean = false, includeDocumentationComments: boolean = false): SyntaxToken {
            return <SyntaxToken>super.GetFirstToken(includeZeroWidth, includeSkipped, includeDirectives, includeDocumentationComments);
        }
        public GetFirstToken_1039(predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean = null): SyntaxToken {
            return <SyntaxToken>Syntax.SyntaxNavigator.Instance.GetFirstToken_2110(this, Syntax.SyntaxNavigator.ToCommon_1089(predicate), Syntax.SyntaxNavigator.ToCommon_1495(stepInto));
        }
        public GetLastToken(includeZeroWidth: boolean = false, includeSkipped: boolean = false, includeDirectives: boolean = false, includeDocumentationComments: boolean = false): SyntaxToken {
            return <SyntaxToken>super.GetLastToken(includeZeroWidth, includeSkipped, includeDirectives, includeDocumentationComments);
        }
        public FindTokenInternal(position: number): SyntaxToken {
            var curNode: SyntaxNodeOrToken = SyntaxNodeOrToken.op_Implicit_1792(this);
            while (true) {
                System.Diagnostics.Debug.Assert(CSharpExtensions.CSharpKind_1403(curNode) != SyntaxKind.None);
                System.Diagnostics.Debug.Assert(curNode.FullSpan.Contains_2103(position));
                var node = curNode.AsNode();
                if (node != null) {
                    curNode = node.ChildThatContainsPosition(position);
                }
                else {
                    return curNode.AsToken();
                }
            }
        }
        private FindToken_4481(position: number, findInsideTrivia: (_: SyntaxTrivia) => boolean): SyntaxToken {
            var token = this.FindToken_1444(position,/*findInsideTrivia:*/false);
            if (findInsideTrivia != null) {
                var trivia = CSharpSyntaxNode.GetTriviaFromSyntaxToken(position, token);
                if (trivia.HasStructure && findInsideTrivia(trivia)) {
                    token = (<CSharpSyntaxNode>trivia.GetStructure()).FindTokenInternal(position);
                }
            }
            return token;
        }
        private static GetTriviaFromSyntaxToken(position: number, token: SyntaxToken): SyntaxTrivia {
            var span = token.Span;
            var trivia = new SyntaxTrivia();
            if (position < span.Start && token.HasLeadingTrivia) {
                trivia = CSharpSyntaxNode.GetTriviaThatContainsPosition(token.LeadingTrivia, position);
            }
            else if (position >= span.End && token.HasTrailingTrivia) {
                trivia = CSharpSyntaxNode.GetTriviaThatContainsPosition(token.TrailingTrivia, position);
            }
            return trivia;
        }
        private TryGetEofAt(position: number, Eof: { refObj: SyntaxToken }): boolean {
            if (position == this.EndPosition) {
                var cu: Syntax.CompilationUnitSyntax = __as__<Syntax.CompilationUnitSyntax>(this, Syntax.CompilationUnitSyntax);
                if (cu != null) {
                    Eof.refObj = cu.EndOfFileToken;
                    System.Diagnostics.Debug.Assert(Eof.refObj.EndPosition == position);
                    return true;
                }
            }
            Eof.refObj = structDefault(SyntaxToken);
            return false;
        }
        public FindToken_1444(position: number, findInsideTrivia: boolean = false): SyntaxToken {
            if (findInsideTrivia) {
                return this.FindToken_4481(position, SyntaxTrivia.Any);
            }
            var EoF: SyntaxToken = structDefault(SyntaxToken);
            var EoF_ref0 = { refObj: EoF };
            var ret_val__83 = this.TryGetEofAt(position, EoF_ref0);

            EoF = EoF_ref0.refObj;
            if (ret_val__83) {
                return EoF;
            }
            if (!this.FullSpan.Contains_2103(position)) {
                throw new System.ArgumentOutOfRangeException("position");
            }
            return this.FindTokenInternal(position);
        }
        public FindTokenIncludingCrefAndNameAttributes(position: number): SyntaxToken {
            var nonTriviaToken: SyntaxToken = this.FindToken_1444(position,/*findInsideTrivia:*/false);
            var trivia: SyntaxTrivia = CSharpSyntaxNode.GetTriviaFromSyntaxToken(position, nonTriviaToken);
            if (!SyntaxFacts.IsDocumentationCommentTrivia(CSharpExtensions.CSharpKind_4438(trivia))) {
                return nonTriviaToken;
            }
            System.Diagnostics.Debug.Assert(trivia.HasStructure);
            var triviaToken: SyntaxToken = (<CSharpSyntaxNode>trivia.GetStructure()).FindTokenInternal(position);
            var curr: CSharpSyntaxNode = <CSharpSyntaxNode>triviaToken.Parent;
            while (curr != null) {
                throw new System.NotSupportedException();
                curr = curr.Parent;
            }
            return nonTriviaToken;
        }
        public static GetTriviaThatContainsPosition(list: SyntaxTriviaList, position: number): SyntaxTrivia {
            // for each
            var triviaEnumerator = list.GetEnumerator();
            try {
                while (triviaEnumerator.MoveNext()) {
                    var trivia = triviaEnumerator.Current;
                    // foreach block
                    if (trivia.FullSpan.Contains_2103(position)) {
                        return trivia;
                    }
                    if (trivia.Position > position) {
                        break;
                    }
                }
            } finally {
                if (triviaEnumerator !== null) triviaEnumerator.Dispose();

            }    
            // end foreach
            return structDefault(SyntaxTrivia);
        }
        public FindTrivia_1548(position: number, stepInto: (_: SyntaxTrivia) => boolean): SyntaxTrivia {
            if (this.FullSpan.Contains_2103(position)) {
                return CSharpSyntaxNode.FindTriviaByOffset(this, position - this.Position, stepInto);
            }
            return structDefault(SyntaxTrivia);
        }
        public FindTrivia_1737(position: number, findInsideTrivia: boolean = false): SyntaxTrivia {
            return this.FindTrivia_1548(position, findInsideTrivia ? SyntaxTrivia.Any : null);
        }
        public static FindTriviaByOffset(node: SyntaxNode, textOffset: number, stepInto: (_: SyntaxTrivia) => boolean = null): SyntaxTrivia {
            if (textOffset >= 0) {
                // for each
                var elementEnumerator = node.ChildNodesAndTokens().GetEnumerator();
                try {
                    while (elementEnumerator.MoveNext()) {
                        var element = elementEnumerator.Current;
                        // foreach block
                        var fullWidth = element.FullWidth;
                        if (textOffset < fullWidth) {
                            if (element.IsNode) {
                                return CSharpSyntaxNode.FindTriviaByOffset(element.AsNode(), textOffset, stepInto);
                            }
                            else if (element.IsToken) {
                                var token = element.AsToken();
                                var leading = token.LeadingWidth;
                                if (textOffset < token.LeadingWidth) {
                                    // for each
                                    var triviaEnumerator = token.LeadingTrivia.GetEnumerator();
                                    try {
                                        while (triviaEnumerator.MoveNext()) {
                                            var trivia = triviaEnumerator.Current;
                                            // foreach block
                                            if (textOffset < trivia.FullWidth) {
                                                if (trivia.HasStructure && stepInto != null && stepInto(trivia)) {
                                                    return CSharpSyntaxNode.FindTriviaByOffset(<CSharpSyntaxNode>trivia.GetStructure(), textOffset, stepInto);
                                                }
                                                return trivia;
                                            }
                                            textOffset -= trivia.FullWidth;
                                        }
                                    } finally {
                                        if (triviaEnumerator !== null) triviaEnumerator.Dispose();

                                    }    
                                    // end foreach
                                }
                                else if (textOffset >= leading + token.Width) {
                                    textOffset -= leading + token.Width;
                                    // for each
                                    var triviaEnumerator = token.TrailingTrivia.GetEnumerator();
                                    try {
                                        while (triviaEnumerator.MoveNext()) {
                                            var trivia = triviaEnumerator.Current;
                                            // foreach block
                                            if (textOffset < trivia.FullWidth) {
                                                if (trivia.HasStructure && stepInto != null && stepInto(trivia)) {
                                                    return CSharpSyntaxNode.FindTriviaByOffset(<CSharpSyntaxNode>trivia.GetStructure(), textOffset, stepInto);
                                                }
                                                return trivia;
                                            }
                                            textOffset -= trivia.FullWidth;
                                        }
                                    } finally {
                                        if (triviaEnumerator !== null) triviaEnumerator.Dispose();

                                    }    
                                    // end foreach
                                }
                                return structDefault(SyntaxTrivia);
                            }
                        }
                        textOffset -= fullWidth;
                    }
                } finally {
                    if (elementEnumerator !== null) elementEnumerator.Dispose();

                }    
                // end foreach
            }
            return structDefault(SyntaxTrivia);
        }
        public EquivalentToCore(other: SyntaxNode): boolean {
            return this.IsEquivalentTo(__as__<CSharpSyntaxNode>(other, CSharpSyntaxNode));
        }
        public get SyntaxTreeCore(): SyntaxTree {
            return this.SyntaxTree;
        }
        public FindTokenCore_1334(position: number, findInsideTrivia: boolean): SyntaxToken {
            return this.FindToken_1444(position, findInsideTrivia);
        }
        public FindTokenCore_1204(position: number, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            return this.FindToken_4481(position, FunctionExtensions.ToLanguageSpecific_1552(stepInto));
        }
        public FindTriviaCore(position: number, findInsideTrivia: boolean): SyntaxTrivia {
            return this.FindTrivia_1737(position, findInsideTrivia);
        }
        public ReplaceCore<TNode extends SyntaxNode>(nodes: System.Collections.Generic.IEnumerable<TNode> = null, computeReplacementNode: (_: TNode, __: TNode) => SyntaxNode = null, tokens: System.Collections.Generic.IEnumerable<SyntaxToken> = null, computeReplacementToken: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken = null, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia> = null, computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia = null): SyntaxNode {
            return Syntax.SyntaxReplacer.Replace_2004(this, nodes, computeReplacementNode, tokens, computeReplacementToken, trivia, computeReplacementTrivia);
        }
        public ReplaceNodeInListCore(originalNode: SyntaxNode, replacementNodes: System.Collections.Generic.IEnumerable<SyntaxNode>): SyntaxNode {
            return Syntax.SyntaxReplacer.ReplaceNodeInList(this, originalNode, replacementNodes);
        }
        public InsertNodesInListCore(nodeInList: SyntaxNode, nodesToInsert: System.Collections.Generic.IEnumerable<SyntaxNode>, insertBefore: boolean): SyntaxNode {
            return Syntax.SyntaxReplacer.InsertNodeInList(this, nodeInList, nodesToInsert, insertBefore);
        }
        public ReplaceTokenInListCore(originalToken: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxNode {
            return Syntax.SyntaxReplacer.ReplaceTokenInList(this, originalToken, newTokens);
        }
        public InsertTokensInListCore(originalToken: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>, insertBefore: boolean): SyntaxNode {
            return Syntax.SyntaxReplacer.InsertTokenInList(this, originalToken, newTokens, insertBefore);
        }
        public ReplaceTriviaInListCore(originalTrivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxNode {
            return Syntax.SyntaxReplacer.ReplaceTriviaInList_1364(this, originalTrivia, newTrivia);
        }
        public InsertTriviaInListCore(originalTrivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, insertBefore: boolean): SyntaxNode {
            return Syntax.SyntaxReplacer.InsertTriviaInList_8431(this, originalTrivia, newTrivia, insertBefore);
        }
        public RemoveNodesCore(nodes: System.Collections.Generic.IEnumerable<SyntaxNode>, options: SyntaxRemoveOptions): SyntaxNode {
            return Syntax.SyntaxNodeRemover.RemoveNodes(this, System.Linq.Enumerable.Cast(nodes, SyntaxNode), options);
        }
        public NormalizeWhitespaceCore(indentation: string, elasticTrivia: boolean): SyntaxNode {
            return Syntax.SyntaxFormatter.Format_9806(this, indentation, elasticTrivia);
        }
        IsEquivalentToCore(node: SyntaxNode, topLevel: boolean = false): boolean {
            return SyntaxFactory.AreEquivalent_6317(this, <CSharpSyntaxNode>node, topLevel);
        }
        constructor() { super(); }
    }
}