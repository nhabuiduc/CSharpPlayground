///<reference path="SyntaxNodeCache.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class CSharpSyntaxNode extends GreenNode {
        private myHash = Gb.NextHashCode();

        ctor_1907(kind: SyntaxKind): CSharpSyntaxNode {
            super.ctor_1817(<number>kind);
            GreenStats.NoteGreen(this);
            return this;
        }
        ctor_2126(kind: SyntaxKind, fullWidth: number): CSharpSyntaxNode {
            super.ctor_1801(<number>kind, fullWidth);
            GreenStats.NoteGreen(this);
            return this;
        }
        ctor_1475(kind: SyntaxKind, diagnostics: DiagnosticInfo[]): CSharpSyntaxNode {
            super.ctor_1355(<number>kind, diagnostics);
            GreenStats.NoteGreen(this);
            return this;
        }
        ctor_4463(kind: SyntaxKind, diagnostics: DiagnosticInfo[], fullWidth: number): CSharpSyntaxNode {
            super.ctor_1879(<number>kind, diagnostics, fullWidth);
            GreenStats.NoteGreen(this);
            return this;
        }
        ctor_1757(kind: SyntaxKind, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): CSharpSyntaxNode {
            super.ctor_6664(<number>kind, diagnostics, annotations);
            GreenStats.NoteGreen(this);
            return this;
        }
        ctor_1733(kind: SyntaxKind, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[], fullWidth: number): CSharpSyntaxNode {
            super.ctor_7650(<number>kind, diagnostics, annotations, fullWidth);
            GreenStats.NoteGreen(this);
            return this;
        }
        ctor_4942(reader: Roslyn.Utilities.ObjectReader): CSharpSyntaxNode {
            super.ctor_1105(reader);
            return this;
        }
        public get Language(): string {
            return LanguageNames.CSharp;
        }
        public get Kind(): SyntaxKind {
            return <SyntaxKind>this.RawKind;
        }
        public get KindText(): string {
            return this.Kind.ToString();
        }
        public get RawContextualKind(): number {
            return this.RawKind;
        }
        public get IsStructuredTrivia(): boolean {
            return this instanceof StructuredTriviaSyntax;
        }
        public get IsDirective(): boolean {
            return this instanceof DirectiveTriviaSyntax;
        }

        public GetHashCode(): number {
            return this.myHash;
        }

        public GetSlotOffset(index: number): number {
            System.Diagnostics.Debug.Assert(index < 11);
            var offset: number = 0;
            for (var i: number = 0; i < index; i++) {
                var child = this.GetSlot(i);
                if (child != null) {
                    offset += child.FullWidth;
                }
            }
            return offset;
        }
        public ChildNodesAndTokens(): ChildSyntaxList {
            return new ChildSyntaxList().ctor_9473(this);
        }
        public EnumerateNodes(): System.Collections.Generic.IEnumerable<GreenNode> {
            var __result = new Array<GreenNode>();
            __result.push(this);
            //yield return this;
            var stack = new System.Collections.Generic.Stack<ChildSyntaxList.Enumerator>(24);
            stack.Push(this.ChildNodesAndTokens().GetEnumerator());
            while (stack.Count > 0) {
                var en = stack.Pop();
                if (!en.MoveNext()) {
                    continue;
                }
                var current = en.Current;
                stack.Push(en);
                __result.push(current);
                //yield return current;
                if (!(current instanceof SyntaxToken)) {
                    stack.Push((<CSharpSyntaxNode>current).ChildNodesAndTokens().GetEnumerator());
                    continue;
                }
            }
            return __result;
        }
        public GetFirstToken(): SyntaxToken {
            return <SyntaxToken>this.GetFirstTerminal();
        }
        public GetLastToken(): SyntaxToken {
            return <SyntaxToken>this.GetLastTerminal();
        }
        public GetLastNonmissingToken(): SyntaxToken {
            return <SyntaxToken>this.GetLastNonmissingTerminal();
        }
        public GetLeadingTrivia(): CSharpSyntaxNode {
            return null;
        }
        public GetLeadingTriviaCore(): GreenNode {
            return this.GetLeadingTrivia();
        }
        public GetTrailingTrivia(): CSharpSyntaxNode {
            return null;
        }
        public GetTrailingTriviaCore(): GreenNode {
            return this.GetTrailingTrivia();
        }
        public ToString(): string {
            var sb = Collections.PooledStringBuilder.GetInstance();
            var writer = new System.IO.StringWriter(sb.Builder, System.Globalization.CultureInfo.InvariantCulture);
            this.WriteTo_1077(writer,/*leading:*/false,/*trailing:*/false);
            return sb.ToStringAndFree_3093();
        }
        public ToFullString(): string {
            var sb = Collections.PooledStringBuilder.GetInstance();
            var writer = new System.IO.StringWriter(sb.Builder, System.Globalization.CultureInfo.InvariantCulture);
            this.WriteTo_1077(writer,/*leading:*/true,/*trailing:*/true);
            return sb.ToStringAndFree_3093();
        }
        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult { throw new Error('not implemented'); }
        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void { throw new Error('not implemented'); }
        public ApplyDirectives(stack: DirectiveStack): DirectiveStack {
            if (this.ContainsDirectives) {
                for (var i: number = 0, n = this.SlotCount; i < n; i++) {
                    var child = this.GetSlot(i);
                    if (child != null) {
                        stack = (<CSharpSyntaxNode>child).ApplyDirectives(stack);
                    }
                }
            }
            return stack;
        }
        public GetDirectives_1135(): System.Collections.Generic.IList<DirectiveTriviaSyntax> {
            if ((this.flags & GreenNode.NodeFlags.ContainsDirectives) != 0) {
                var list = new System.Collections.Generic.List<DirectiveTriviaSyntax>(32);
                CSharpSyntaxNode.GetDirectives_2035(this, list);
                return list;
            }
            return Roslyn.Utilities.SpecializedCollections.EmptyList<DirectiveTriviaSyntax>();
        }
        private static GetDirectives_2035(node: GreenNode, directives: System.Collections.Generic.List<DirectiveTriviaSyntax>): void {
            if (node != null && node.ContainsDirectives) {
                var d = __as__<DirectiveTriviaSyntax>(node, DirectiveTriviaSyntax);
                if (d != null) {
                    directives.Add(d);
                }
                else {
                    var t = __as__<SyntaxToken>(node, SyntaxToken);
                    if (t != null) {
                        CSharpSyntaxNode.GetDirectives_2035(t.GetLeadingTrivia(), directives);
                        CSharpSyntaxNode.GetDirectives_2035(t.GetTrailingTrivia(), directives);
                    }
                    else {
                        for (var i: number = 0, n = node.SlotCount; i < n; i++) {
                            CSharpSyntaxNode.GetDirectives_2035(node.GetSlot(i), directives);
                        }
                    }
                }
            }
        }
        protected SetFactoryContext_9638(context: SyntaxFactoryContext): void {
            if (context.IsInAsync) {
                this.flags |= GreenNode.NodeFlags.FactoryContextIsInAsync;
            }
            if (context.IsInQuery) {
                this.flags |= GreenNode.NodeFlags.FactoryContextIsInQuery;
            }
        }
        public static SetFactoryContext_4391(flags: GreenNode.NodeFlags, context: SyntaxFactoryContext): GreenNode.NodeFlags {
            if (context.IsInAsync) {
                flags |= GreenNode.NodeFlags.FactoryContextIsInAsync;
            }
            if (context.IsInQuery) {
                flags |= GreenNode.NodeFlags.FactoryContextIsInQuery;
            }
            return flags;
        }
        public get Navigator(): AbstractSyntaxNavigator {
            return SyntaxNavigator.Instance;
        }
        public CreateList(nodes: System.Collections.Generic.IEnumerable<GreenNode>, alwaysCreateListNode: boolean): GreenNode {
            if (nodes == null) {
                return null;
            }
            var list = System.Linq.Enumerable.ToArray(System.Linq.Enumerable.Select(nodes,
                n => <CSharpSyntaxNode>n));
            var __tSwitch49 = list.length;
            while (true) {
                var __tDefault11 = false;
                switch (__tSwitch49) {
                    case 0:
                        return null;
                    case 1:
                        if (alwaysCreateListNode) {
                            __tDefault11 = true; break;
                        }
                        else {
                            return list[0];
                        }
                    case 2:
                        return SyntaxListBase.List_1257(list[0], list[1]);
                    case 3:
                        return SyntaxListBase.List_1258(list[0], list[1], list[2]);
                    default:
                        return SyntaxListBase.List_2130(list);
                }


                if (__tDefault11) {
                    return SyntaxListBase.List_2130(list);
                }

                break;
            }

        }
        public CreateSeparator<TNode>(element: SyntaxNode): Microsoft.CodeAnalysis.SyntaxToken {
            return Microsoft.CodeAnalysis.CSharp.SyntaxFactory.Token_1045(SyntaxKind.CommaToken);
        }
        public IsTriviaWithEndOfLine(): boolean {
            return this.Kind == SyntaxKind.EndOfLineTrivia || this.Kind == SyntaxKind.SingleLineCommentTrivia;
        }
        private static structuresTable: System.Runtime.CompilerServices.ConditionalWeakTable<SyntaxNode, System.Collections.Generic.Dictionary<Microsoft.CodeAnalysis.SyntaxTrivia, SyntaxNode>> = new System.Runtime.CompilerServices.ConditionalWeakTable<SyntaxNode, System.Collections.Generic.Dictionary<Microsoft.CodeAnalysis.SyntaxTrivia, SyntaxNode>>();
        public GetStructure(trivia: Microsoft.CodeAnalysis.SyntaxTrivia): SyntaxNode {
            if (trivia.HasStructure) {
                var parent = trivia.Token.Parent;
                if (parent != null) {
                    var structure: SyntaxNode;
                    var structsInParent = CSharpSyntaxNode.structuresTable.GetValue(parent, n => new System.Collections.Generic.ObjectDictionary<Microsoft.CodeAnalysis.SyntaxTrivia, SyntaxNode>());
                  //  lock(structsInParent)
                    //{
                        var structure_ref0 = { refObj: structure };
                        var ret_val__127 = structsInParent.TryGetValue(trivia, structure_ref0);

                        structure = structure_ref0.refObj;
                        if (!ret_val__127) {
                            structure = CSharp.Syntax.StructuredTriviaSyntax.Create(trivia);
                            structsInParent.Add(trivia, structure);
                        }
                   // }
                    return structure;
                }
                else {
                    return CSharp.Syntax.StructuredTriviaSyntax.Create(trivia);
                }
            }
            return null;
        }
        constructor() { super(); }
    }
}