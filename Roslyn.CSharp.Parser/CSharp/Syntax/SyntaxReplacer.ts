module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxReplacer {
        public static Replace_2004<TNode extends SyntaxNode>(root: SyntaxNode, nodes: System.Collections.Generic.IEnumerable<TNode> = null, computeReplacementNode: (_: TNode, __: TNode) => SyntaxNode = null, tokens: System.Collections.Generic.IEnumerable<SyntaxToken> = null, computeReplacementToken: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken = null, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia> = null, computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia = null): SyntaxNode {
            var replacer = new SyntaxReplacer.Replacer<TNode>().ctor_1330(nodes, computeReplacementNode, tokens, computeReplacementToken, trivia, computeReplacementTrivia);
            if (replacer.HasWork) {
                return replacer.Visit(root);
            }
            else {
                return root;
            }
        }
        public static Replace_2079(root: SyntaxToken, nodes: System.Collections.Generic.IEnumerable<SyntaxNode> = null, computeReplacementNode: (_: SyntaxNode, __: SyntaxNode) => SyntaxNode = null, tokens: System.Collections.Generic.IEnumerable<SyntaxToken> = null, computeReplacementToken: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken = null, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia> = null, computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia = null): SyntaxToken {
            var replacer = new SyntaxReplacer.Replacer<SyntaxNode>().ctor_1330(nodes, computeReplacementNode, tokens, computeReplacementToken, trivia, computeReplacementTrivia);
            if (replacer.HasWork) {
                return replacer.VisitToken(root);
            }
            else {
                return root;
            }
        }
        public static ReplaceNodeInList(root: SyntaxNode, originalNode: SyntaxNode, newNodes: System.Collections.Generic.IEnumerable<SyntaxNode>): SyntaxNode {
            return new SyntaxReplacer.NodeListEditor().ctor_1468(originalNode, newNodes, SyntaxReplacer.ListEditKind.Replace).Visit(root);
        }
        public static InsertNodeInList(root: SyntaxNode, nodeInList: SyntaxNode, nodesToInsert: System.Collections.Generic.IEnumerable<SyntaxNode>, insertBefore: boolean): SyntaxNode {
            return new SyntaxReplacer.NodeListEditor().ctor_1468(nodeInList, nodesToInsert, insertBefore ? SyntaxReplacer.ListEditKind.InsertBefore : SyntaxReplacer.ListEditKind.InsertAfter).Visit(root);
        }
        public static ReplaceTokenInList(root: SyntaxNode, tokenInList: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxNode {
            return new SyntaxReplacer.TokenListEditor().ctor_8760(tokenInList, newTokens, SyntaxReplacer.ListEditKind.Replace).Visit(root);
        }
        public static InsertTokenInList(root: SyntaxNode, tokenInList: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>, insertBefore: boolean): SyntaxNode {
            return new SyntaxReplacer.TokenListEditor().ctor_8760(tokenInList, newTokens, insertBefore ? SyntaxReplacer.ListEditKind.InsertBefore : SyntaxReplacer.ListEditKind.InsertAfter).Visit(root);
        }
        public static ReplaceTriviaInList_1364(root: SyntaxNode, triviaInList: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxNode {
            return new SyntaxReplacer.TriviaListEditor().ctor_5032(triviaInList, newTrivia, SyntaxReplacer.ListEditKind.Replace).Visit(root);
        }
        public static InsertTriviaInList_8431(root: SyntaxNode, triviaInList: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, insertBefore: boolean): SyntaxNode {
            return new SyntaxReplacer.TriviaListEditor().ctor_5032(triviaInList, newTrivia, insertBefore ? SyntaxReplacer.ListEditKind.InsertBefore : SyntaxReplacer.ListEditKind.InsertAfter).Visit(root);
        }
        public static ReplaceTriviaInList_1535(root: SyntaxToken, triviaInList: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxToken {
            return new SyntaxReplacer.TriviaListEditor().ctor_5032(triviaInList, newTrivia, SyntaxReplacer.ListEditKind.Replace).VisitToken(root);
        }
        public static InsertTriviaInList_2070(root: SyntaxToken, triviaInList: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, insertBefore: boolean): SyntaxToken {
            return new SyntaxReplacer.TriviaListEditor().ctor_5032(triviaInList, newTrivia, insertBefore ? SyntaxReplacer.ListEditKind.InsertBefore : SyntaxReplacer.ListEditKind.InsertAfter).VisitToken(root);
        }
        public static GetItemNotListElementException(): System.InvalidOperationException {
            return new System.InvalidOperationException(Roslyn.Utilities.StringExtensions.NeedsLocalization("The item specified is not the element of a list."));
        }
    }
    export module SyntaxReplacer {
        export class Replacer<TNode extends SyntaxNode> extends CSharpSyntaxRewriter {
            private computeReplacementNode: (_: TNode, __: TNode) => SyntaxNode;
            private computeReplacementToken: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken;
            private computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia;
            private nodeSet: System.Collections.Generic.HashSet<SyntaxNode>;
            private tokenSet: System.Collections.Generic.HashSet<SyntaxToken>;
            private triviaSet: System.Collections.Generic.HashSet<SyntaxTrivia>;
            private spanSet: System.Collections.Generic.HashSet<Text.TextSpan>;
            private totalSpan: Text.TextSpan = structDefault(Text.TextSpan);
            private visitIntoStructuredTrivia1: boolean = false;
            private shouldVisitTrivia: boolean = false;
            ctor_1330(nodes: System.Collections.Generic.IEnumerable<TNode>, computeReplacementNode: (_: TNode, __: TNode) => SyntaxNode, tokens: System.Collections.Generic.IEnumerable<SyntaxToken>, computeReplacementToken: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia): Replacer<TNode> {
                super.ctor_2068();
                this.computeReplacementNode = computeReplacementNode;
                this.computeReplacementToken = computeReplacementToken;
                this.computeReplacementTrivia = computeReplacementTrivia;
                this.nodeSet = nodes != null ? new System.Collections.Generic.HashSet<SyntaxNode>(nodes) : Replacer.NoNodes;
                this.tokenSet = tokens != null ? new System.Collections.Generic.HashSet<SyntaxToken>(tokens) : Replacer.NoTokens;
                this.triviaSet = trivia != null ? new System.Collections.Generic.HashSet<SyntaxTrivia>(trivia) : Replacer.NoTrivia;
                this.spanSet = new System.Collections.Generic.HashSet<Text.TextSpan>(System.Linq.Enumerable.Concat(System.Linq.Enumerable.Select(this.nodeSet,
                    n => n.FullSpan),
                    System.Linq.Enumerable.Concat(System.Linq.Enumerable.Select(this.tokenSet,
                        t => t.FullSpan),
                        System.Linq.Enumerable.Select(this.triviaSet,
                            t => t.FullSpan))));
                this.totalSpan = Replacer.ComputeTotalSpan(this.spanSet);
                this.visitIntoStructuredTrivia1 = System.Linq.Enumerable.Any(this.nodeSet,
                    n => n.IsPartOfStructuredTrivia()) || System.Linq.Enumerable.Any(this.tokenSet,
                    t => t.IsPartOfStructuredTrivia()) || System.Linq.Enumerable.Any(this.triviaSet,
                    t => t.IsPartOfStructuredTrivia());
                this.shouldVisitTrivia = this.triviaSet.Count > 0 || this.visitIntoStructuredTrivia1;
                return this;
            }
            private static NoNodes: System.Collections.Generic.HashSet<SyntaxNode> = new System.Collections.Generic.HashSet<SyntaxNode>();
            private static NoTokens: System.Collections.Generic.HashSet<SyntaxToken> = new System.Collections.Generic.HashSet<SyntaxToken>();
            private static NoTrivia: System.Collections.Generic.HashSet<SyntaxTrivia> = new System.Collections.Generic.HashSet<SyntaxTrivia>();
            public get VisitIntoStructuredTrivia(): boolean {
                return this.visitIntoStructuredTrivia1;
            }
            public get HasWork(): boolean {
                return this.nodeSet.Count + this.tokenSet.Count + this.triviaSet.Count > 0;
            }
            private static ComputeTotalSpan(spans: System.Collections.Generic.IEnumerable<Text.TextSpan>): Text.TextSpan {
                var first: boolean = true;
                var start: number = 0;
                var end: number = 0;
                // for each
                var spanEnumerator = spans.GetEnumerator();
                try {
                    while (spanEnumerator.MoveNext()) {
                        var span = spanEnumerator.Current;
                        // foreach block
                        if (first) {
                            start = span.Start;
                            end = span.End;
                            first = false;
                        }
                        else {
                            start = System.Math.Min(start, span.Start);
                            end = System.Math.Max(end, span.End);
                        }
                    }
                } finally {
                    if (spanEnumerator !== null) spanEnumerator.Dispose();

                }    
                // end foreach
                return new Text.TextSpan().ctor_1506(start, end - start);
            }
            private ShouldVisit(span: Text.TextSpan): boolean {
                if (!span.IntersectsWith_1989(this.totalSpan)) {
                    return false;
                }
                // for each
                var sEnumerator = this.spanSet.GetEnumerator();
                try {
                    while (sEnumerator.MoveNext()) {
                        var s = sEnumerator.Current;
                        // foreach block
                        if (span.IntersectsWith_1989(s)) {
                            return true;
                        }
                    }
                } finally {
                    if (sEnumerator !== null) sEnumerator.Dispose();

                }    
                // end foreach
                return false;
            }
            public Visit(node: SyntaxNode): SyntaxNode {
                var rewritten: SyntaxNode = node;
                if (node != null) {
                    if (this.ShouldVisit(node.FullSpan)) {
                        rewritten = super.Visit(node);
                    }
                    if (this.nodeSet.Contains(node) && this.computeReplacementNode != null) {
                        rewritten = this.computeReplacementNode(<TNode>node, <TNode>rewritten);
                    }
                }
                return rewritten;
            }
            public VisitToken(token: SyntaxToken): SyntaxToken {
                var rewritten = token;
                if (this.shouldVisitTrivia && this.ShouldVisit(token.FullSpan)) {
                    rewritten = super.VisitToken(token);
                }
                if (this.tokenSet.Contains(token) && this.computeReplacementToken != null) {
                    rewritten = this.computeReplacementToken(token, rewritten);
                }
                return rewritten;
            }
            public VisitListElement_1457(trivia: SyntaxTrivia): SyntaxTrivia {
                var rewritten = trivia;
                if (this.VisitIntoStructuredTrivia && trivia.HasStructure && this.ShouldVisit(trivia.FullSpan)) {
                    rewritten = this.VisitTrivia(trivia);
                }
                if (this.triviaSet.Contains(trivia) && this.computeReplacementTrivia != null) {
                    rewritten = this.computeReplacementTrivia(trivia, rewritten);
                }
                return rewritten;
            }
            constructor() { super(); }
        }
    }
    export module SyntaxReplacer {
        export enum ListEditKind {
            InsertBefore,
            InsertAfter,
            Replace
        }
    }
    export module SyntaxReplacer {
        export class BaseListEditor extends CSharpSyntaxRewriter {
            private elementSpan: Text.TextSpan = structDefault(Text.TextSpan);
            private visitTrivia: boolean = false;
            private visitIntoStructuredTrivia1: boolean = false;
            protected  editKind: ListEditKind = 0;
            ctor_3573(elementSpan: Text.TextSpan, editKind: ListEditKind, visitTrivia: boolean, visitIntoStructuredTrivia: boolean): BaseListEditor {
                super.ctor_2068();
                this.elementSpan = elementSpan;
                this.editKind = editKind;
                this.visitTrivia = visitTrivia || visitIntoStructuredTrivia;
                this.visitIntoStructuredTrivia1 = visitIntoStructuredTrivia;
                return this;
            }
            public get VisitIntoStructuredTrivia(): boolean {
                return this.visitIntoStructuredTrivia1;
            }
            private ShouldVisit(span: Text.TextSpan): boolean {
                if (span.IntersectsWith_1989(this.elementSpan)) {
                    return true;
                }
                return false;
            }
            public Visit(node: SyntaxNode): SyntaxNode {
                var rewritten: SyntaxNode = node;
                if (node != null) {
                    if (this.ShouldVisit(node.FullSpan)) {
                        rewritten = super.Visit(node);
                    }
                }
                return rewritten;
            }
            public VisitToken(token: SyntaxToken): SyntaxToken {
                var rewritten = token;
                if (this.visitTrivia && this.ShouldVisit(token.FullSpan)) {
                    rewritten = super.VisitToken(token);
                }
                return rewritten;
            }
            public VisitListElement_1457(trivia: SyntaxTrivia): SyntaxTrivia {
                var rewritten = trivia;
                if (this.VisitIntoStructuredTrivia && trivia.HasStructure && this.ShouldVisit(trivia.FullSpan)) {
                    rewritten = this.VisitTrivia(trivia);
                }
                return rewritten;
            }
            constructor() { super(); }
        }
    }
    export module SyntaxReplacer {
        export class NodeListEditor extends BaseListEditor {
            private originalNode: SyntaxNode;
            private newNodes: System.Collections.Generic.IEnumerable<SyntaxNode>;
            ctor_1468(originalNode: SyntaxNode, replacementNodes: System.Collections.Generic.IEnumerable<SyntaxNode>, editKind: ListEditKind): NodeListEditor {
                super.ctor_3573(originalNode.Span, editKind, false, originalNode.IsPartOfStructuredTrivia());
                this.originalNode = originalNode;
                this.newNodes = replacementNodes;
                return this;
            }
            public Visit(node: SyntaxNode): SyntaxNode {
                if (node == this.originalNode) {
                    throw SyntaxReplacer.GetItemNotListElementException();
                }
                return super.Visit(node);
            }
            public VisitList_2124<TNode extends SyntaxNode>(list: SeparatedSyntaxList<TNode>): SeparatedSyntaxList<TNode> {
                throw new Error("Use another method");
            }
            public VisitList_2124_R<TNode extends SyntaxNode>(type: { prototype: TNode }, list: SeparatedSyntaxList<TNode>): SeparatedSyntaxList<TNode> {
                if (this.originalNode instanceof <any>type) {
                    var index = list.IndexOf_1996(<TNode>this.originalNode);
                    if (index >= 0 && index < list.Count) {
                        switch (this.editKind) {
                            case ListEditKind.Replace:
                                return list.ReplaceRange(<TNode>this.originalNode, System.Linq.Enumerable.Cast(this.newNodes, type));
                            case ListEditKind.InsertAfter:
                                return list.InsertRange(index + 1, System.Linq.Enumerable.Cast(this.newNodes, type));
                            case ListEditKind.InsertBefore:
                                return list.InsertRange(index, System.Linq.Enumerable.Cast(this.newNodes, type));
                        }
                    }
                }
                return super.VisitList_2124<TNode>(list);
            }
            public VisitList_1459<TNode extends SyntaxNode>(list: SyntaxList<TNode>): SyntaxList<TNode> {
                throw new Error("Use another method");
            }

            public VisitList_1459_R<TNode extends SyntaxNode>(type: { prototype: TNode },list: SyntaxList<TNode>): SyntaxList<TNode> {
                if (this.originalNode instanceof <any>type) {
                    var index = list.IndexOf_1996(<TNode>this.originalNode);
                    if (index >= 0 && index < list.Count) {
                        switch (this.editKind) {
                            case ListEditKind.Replace:
                                return list.ReplaceRange(<TNode>this.originalNode, System.Linq.Enumerable.Cast(this.newNodes, type));
                            case ListEditKind.InsertAfter:
                                return list.InsertRange(index + 1, System.Linq.Enumerable.Cast(this.newNodes, type));
                            case ListEditKind.InsertBefore:
                                return list.InsertRange(index, System.Linq.Enumerable.Cast(this.newNodes, type));
                        }
                    }
                }
                return super.VisitList_1459<TNode>(list);
            }
            constructor() { super(); }
        }
    }
    export module SyntaxReplacer {
        export class TokenListEditor extends BaseListEditor {
            private originalToken: SyntaxToken = structDefault(SyntaxToken);
            private newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>;
            ctor_8760(originalToken: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>, editKind: ListEditKind): TokenListEditor {
                super.ctor_3573(originalToken.Span, editKind, false, originalToken.IsPartOfStructuredTrivia());
                this.originalToken = originalToken;
                this.newTokens = newTokens;
                return this;
            }
            public VisitToken(token: SyntaxToken): SyntaxToken {
                if (token.op_Equality(this.originalToken)) {
                    throw SyntaxReplacer.GetItemNotListElementException();
                }
                return super.VisitToken(token);
            }
            public VisitList_2127(list: SyntaxTokenList): SyntaxTokenList {
                var index = list.IndexOf_1948(this.originalToken);
                if (index >= 0 && index < list.Count) {
                    switch (this.editKind) {
                        case ListEditKind.Replace:
                            return list.ReplaceRange(this.originalToken, this.newTokens);
                        case ListEditKind.InsertAfter:
                            return list.InsertRange(index + 1, this.newTokens);
                        case ListEditKind.InsertBefore:
                            return list.InsertRange(index, this.newTokens);
                    }
                }
                return super.VisitList_2127(list);
            }
            constructor() { super(); }
        }
    }
    export module SyntaxReplacer {
        export class TriviaListEditor extends BaseListEditor {
            private originalTrivia: SyntaxTrivia = structDefault(SyntaxTrivia);
            private newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>;
            ctor_5032(originalTrivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, editKind: ListEditKind): TriviaListEditor {
                super.ctor_3573(originalTrivia.Span, editKind, true, originalTrivia.IsPartOfStructuredTrivia());
                this.originalTrivia = originalTrivia;
                this.newTrivia = newTrivia;
                return this;
            }
            public VisitList_8614(list: SyntaxTriviaList): SyntaxTriviaList {
                var index = list.IndexOf_1053(this.originalTrivia);
                if (index >= 0 && index < list.Count) {
                    switch (this.editKind) {
                        case ListEditKind.Replace:
                            return list.ReplaceRange(this.originalTrivia, this.newTrivia);
                        case ListEditKind.InsertAfter:
                            return list.InsertRange(index + 1, this.newTrivia);
                        case ListEditKind.InsertBefore:
                            return list.InsertRange(index, this.newTrivia);
                    }
                }
                return super.VisitList_8614(list);
            }
            constructor() { super(); }
        }
    }
}