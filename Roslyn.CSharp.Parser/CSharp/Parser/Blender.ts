module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class Blender implements IStruct { 
        public lexer: Lexer;
        public oldTreeCursor: Blender.Cursor = structDefault(Blender.Cursor);
        public changes: System.Collections.Immutable.ImmutableStack<Text.TextChangeRange>;
        public newPosition: number = 0;
        public changeDelta: number = 0; 
        public newDirectives: DirectiveStack = structDefault(DirectiveStack);
        public oldDirectives: DirectiveStack = structDefault(DirectiveStack);
        public newLexerDrivenMode: LexerMode = 0;
        ctor_1633(lexer: Lexer, oldTree: CSharp.CSharpSyntaxNode, changes: System.Collections.Generic.IEnumerable<Text.TextChangeRange>): Blender {
            System.Diagnostics.Debug.Assert(lexer != null);
            this.lexer = lexer; 
            this.changes = System.Collections.Immutable.ImmutableStack.Create<Text.TextChangeRange>();
            if (changes != null) {
                var collapsed = Text.TextChangeRange.Collapse(changes);
                var affectedRange = Blender.ExtendToAffectedRange(oldTree, collapsed);
                this.changes = this.changes.Push(affectedRange);
            }
            if (oldTree == null) {
                this.oldTreeCursor = new Blender.Cursor();
                this.newPosition = lexer.TextWindow.Position;
            }
            else {
                this.oldTreeCursor = Blender.Cursor.FromRoot(oldTree).MoveToFirstChild();
                this.newPosition = 0;
            }
            this.changeDelta = 0;
            this.newDirectives = structDefault(DirectiveStack);
            this.oldDirectives = structDefault(DirectiveStack);
            this.newLexerDrivenMode = 0;
            return this;
        }
        ctor_7593(lexer: Lexer, oldTreeCursor: Blender.Cursor, changes: System.Collections.Immutable.ImmutableStack<Text.TextChangeRange>, newPosition: number, changeDelta: number, newDirectives: DirectiveStack, oldDirectives: DirectiveStack, newLexerDrivenMode: LexerMode): Blender {
            System.Diagnostics.Debug.Assert(lexer != null);
            System.Diagnostics.Debug.Assert(changes != null);
            System.Diagnostics.Debug.Assert(newPosition >= 0);
            this.lexer = lexer;
            this.oldTreeCursor = oldTreeCursor;
            this.changes = changes;
            this.newPosition = newPosition;
            this.changeDelta = changeDelta;
            this.newDirectives = newDirectives;
            this.oldDirectives = oldDirectives;
            this.newLexerDrivenMode = newLexerDrivenMode & (LexerMode.MaskXmlDocCommentLocation | LexerMode.MaskXmlDocCommentStyle);
            return this;
        }
        private static ExtendToAffectedRange(oldTree: CSharp.CSharpSyntaxNode, changeRange: Text.TextChangeRange): Text.TextChangeRange {
            var maxLookahead: number = 1;
            var lastCharIndex = oldTree.FullWidth - 1;
            var start = System.Math.Max(System.Math.Min(changeRange.Span.Start, lastCharIndex), 0);
            for (var i = 0; start > 0 && i <= maxLookahead;) {
                var token = oldTree.FindToken_1444(start,/*findInsideTrivia:*/false);
                System.Diagnostics.Debug.Assert(CSharpExtensions.CSharpKind_1238(token) != SyntaxKind.None, "how could we not get a real token back?");
                start = System.Math.Max(0, token.Position - 1);
                if (token.FullWidth > 0) {
                    i++;
                }
            }
            if (Blender.IsInsideInterpolation(oldTree, start)) {
                var column = oldTree.SyntaxTree.GetLineSpan(new Text.TextSpan().ctor_1506(start, 0)).Span.Start.Character;
                start = System.Math.Max(start - column, 0);
            }
            var finalSpan = Text.TextSpan.FromBounds(start, changeRange.Span.End);
            var finalLength = changeRange.NewLength + (changeRange.Span.Start - start);
            return new Text.TextChangeRange().ctor_4786(finalSpan, finalLength);
        }
        private static IsInsideInterpolation(oldTree: CSharp.CSharpSyntaxNode, start: number): boolean {
            var token = oldTree.FindToken_1444(start,/*findInsideTrivia:*/false);
            for (var parent = token.Parent; parent != null; parent = parent.Parent) {
                if (CSharpExtensions.CSharpKind_1207(parent) == SyntaxKind.InterpolatedString) {
                    return true;
                }
            }
            return false;
        }
        public ReadNode(mode: LexerMode): BlendedNode {
            return this.ReadNodeOrToken(mode,/*asToken:*/false);
        }
        public ReadToken(mode: LexerMode): BlendedNode {
            return this.ReadNodeOrToken(mode,/*asToken:*/true);
        }
        private ReadNodeOrToken(mode: LexerMode, asToken: boolean): BlendedNode {
            var reader = new Blender.Reader().ctor_4504(this);
            return reader.ReadNodeOrToken(mode, asToken);
        }
        constructor() { }
    }


    export module Blender {
        export class Cursor implements IStruct {
            public CurrentNodeOrToken: SyntaxNodeOrToken = structDefault(SyntaxNodeOrToken);
            private indexInParent: number = 0;
            ctor_2409(node: SyntaxNodeOrToken, indexInParent: number): Cursor {
                this.CurrentNodeOrToken = node;
                this.indexInParent = indexInParent;
                return this;
            }
            public static FromRoot(node: CSharp.CSharpSyntaxNode): Cursor {
                return new Cursor().ctor_2409(Microsoft.CodeAnalysis.SyntaxNodeOrToken.op_Implicit_1792(node),/*indexInParent:*/0);
            }
            public get IsFinished(): boolean {
                return CSharpExtensions.CSharpKind_1403(this.CurrentNodeOrToken) == SyntaxKind.None || CSharpExtensions.CSharpKind_1403(this.CurrentNodeOrToken) == SyntaxKind.EndOfFileToken;
            }
            private static IsNonZeroWidthOrIsEndOfFile(token: SyntaxNodeOrToken): boolean {
                return CSharpExtensions.CSharpKind_1403(token) == SyntaxKind.EndOfFileToken || token.FullWidth != 0;
            }
            public MoveToNextSibling(): Cursor {
                if (this.CurrentNodeOrToken.Parent != null) {
                    var siblings = this.CurrentNodeOrToken.Parent.ChildNodesAndTokens();
                    for (var i: number = this.indexInParent + 1, n = siblings.Count; i < n; i++) {
                        var sibling = siblings.$get$(i);
                        if (Cursor.IsNonZeroWidthOrIsEndOfFile(sibling)) {
                            return new Cursor().ctor_2409(sibling, i);
                        }
                    }
                    return this.MoveToParent().MoveToNextSibling();
                }
                return structDefault(Cursor);
            }
            private MoveToParent(): Cursor {
                var parent = this.CurrentNodeOrToken.Parent;
                var index = Cursor.IndexOfNodeInParent(parent);
                return new Cursor().ctor_2409(Microsoft.CodeAnalysis.SyntaxNodeOrToken.op_Implicit_1792(parent), index);
            }
            private static IndexOfNodeInParent(node: SyntaxNode): number {
                if (node.Parent == null) {
                    return 0;
                }
                var children = node.Parent.ChildNodesAndTokens();
                var index = SyntaxNodeOrToken.GetFirstChildIndexSpanningPosition_2019(children,(<CSharp.CSharpSyntaxNode>node).Position);
                for (var i: number = index, n = children.Count; i < n; i++) {
                    var child = children.$get$(i);
                    if (child.op_Equality(SyntaxNodeOrToken.op_Implicit_1792( node))) {
                        return i;
                    }
                }
                throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
            }
            public MoveToFirstChild(): Cursor {
                System.Diagnostics.Debug.Assert(this.CurrentNodeOrToken.IsNode);
                var node = this.CurrentNodeOrToken.AsNode();
                if (CSharpExtensions.CSharpKind_1207(node) == SyntaxKind.InterpolatedString) {
                    var greenToken = Lexer.RescanInterpolatedString(<InterpolatedStringSyntax>node.Green);
                    var redToken = new CodeAnalysis.SyntaxToken().ctor_1108(node.Parent, greenToken, node.Position, this.indexInParent);
                    return new Cursor().ctor_2409(Microsoft.CodeAnalysis.SyntaxNodeOrToken.op_Implicit_7398(redToken), this.indexInParent);
                }
                if (node.SlotCount > 0) {
                    var child = Microsoft.CodeAnalysis.ChildSyntaxList.ItemInternal(node, 0);
                    if (Cursor.IsNonZeroWidthOrIsEndOfFile(child)) {
                        return new Cursor().ctor_2409(child, 0);
                    }
                }
                var index: number = 0;
                // for each
                var childEnumerator = this.CurrentNodeOrToken.ChildNodesAndTokens().GetEnumerator();
                try {
                    while (childEnumerator.MoveNext()) {
                        var child = childEnumerator.Current;
                        // foreach block
                        if (Cursor.IsNonZeroWidthOrIsEndOfFile(child)) {
                            return new Cursor().ctor_2409(child, index);
                        }
                        index++;
                    }
                } finally {
                    if (childEnumerator !== null) childEnumerator.Dispose();

                }    
                // end foreach
                return new Cursor();
            }
            public MoveToFirstToken(): Cursor {
                var cursor = this;
                if (!cursor.IsFinished) {
                    for (var node = cursor.CurrentNodeOrToken; CSharpExtensions.CSharpKind_1403(node) != SyntaxKind.None && !SyntaxFacts.IsAnyToken(CSharpExtensions.CSharpKind_1403(node)); node = cursor.CurrentNodeOrToken) {
                        cursor = cursor.MoveToFirstChild();
                    }
                }
                return cursor;
            }
            constructor() { }
        }


        // partial

        export class Reader implements IStruct {
            private lexer: Lexer;
            private oldTreeCursor: Cursor = structDefault(Cursor);
            private changes: System.Collections.Immutable.ImmutableStack<Text.TextChangeRange>;
            private newPosition: number = 0;
            private changeDelta: number = 0;
            private newDirectives: DirectiveStack = structDefault(DirectiveStack);
            private oldDirectives: DirectiveStack = structDefault(DirectiveStack);
            private newLexerDrivenMode: LexerMode = 0;
            ctor_4504(blender: Blender): Reader {
                this.lexer = blender.lexer;
                this.oldTreeCursor = blender.oldTreeCursor;
                this.changes = blender.changes;
                this.newPosition = blender.newPosition;
                this.changeDelta = blender.changeDelta;
                this.newDirectives = blender.newDirectives;
                this.oldDirectives = blender.oldDirectives;
                this.newLexerDrivenMode = blender.newLexerDrivenMode;
                return this;
            }
            public ReadNodeOrToken(mode: LexerMode, asToken: boolean): BlendedNode {
                while (true) {
                    if (this.oldTreeCursor.IsFinished) {
                        return this.ReadNewToken(mode);
                    }
                    if (this.changeDelta < 0) {
                        this.SkipOldToken();
                    }
                    else if (this.changeDelta > 0) {
                        return this.ReadNewToken(mode);
                    }
                    else {
                        var blendedNode: BlendedNode = structDefault(BlendedNode);
                        var blendedNode_ref0 = { refObj: blendedNode };
                        var ret_val__438 = this.TryTakeOldNodeOrToken(asToken, blendedNode_ref0);

                        blendedNode = blendedNode_ref0.refObj;
                        if (ret_val__438) {
                            return blendedNode;
                        }
                        if (this.oldTreeCursor.CurrentNodeOrToken.IsNode) {
                            this.oldTreeCursor = this.oldTreeCursor.MoveToFirstChild();
                        }
                        else {
                            this.SkipOldToken();
                        }
                    }
                }
            }
            private SkipOldToken(): void {
                System.Diagnostics.Debug.Assert(!this.oldTreeCursor.IsFinished);
                this.oldTreeCursor = this.oldTreeCursor.MoveToFirstToken();
                var node = this.oldTreeCursor.CurrentNodeOrToken;
                this.changeDelta += node.FullWidth;
                this.oldDirectives = CSharpExtensions.ApplyDirectives_1395(node,
                    this.oldDirectives);
                this.oldTreeCursor = this.oldTreeCursor.MoveToNextSibling();
                this.SkipPastChanges();
            }
            private SkipPastChanges(): void {
                var oldPosition = this.oldTreeCursor.CurrentNodeOrToken.Position;
                while (!this.changes.IsEmpty && oldPosition >= this.changes.Peek().Span.End) {
                    var change = this.changes.Peek();
                    this.changes = this.changes.Pop();
                    this.changeDelta += change.NewLength - change.Span.Length;
                }
            }
            private ReadNewToken(mode: LexerMode): BlendedNode {
                System.Diagnostics.Debug.Assert(this.changeDelta > 0 || this.oldTreeCursor.IsFinished);
                var token = this.LexNewToken(mode);
                var width = token.FullWidth;
                this.newPosition += width;
                this.changeDelta -= width;
                this.SkipPastChanges();
                return this.CreateBlendedNode(/*node:*/null,/*token:*/token);
            }
            private LexNewToken(mode: LexerMode): SyntaxToken {
                if (this.lexer.TextWindow.Position != this.newPosition) {
                    this.lexer.Reset(this.newPosition, this.newDirectives);
                }
                if (mode >= LexerMode.XmlDocComment) {
                    mode |= this.newLexerDrivenMode;
                }
                var mode_ref0 = { refObj: mode };
                var ret_val__438 = this.lexer.Lex_5670_R(mode_ref0);

                mode = mode_ref0.refObj;
                var token = ret_val__438;
                this.newDirectives = this.lexer.Directives;
                this.newLexerDrivenMode = mode & (LexerMode.MaskXmlDocCommentLocation | LexerMode.MaskXmlDocCommentStyle);
                return token;
            }
            private TryTakeOldNodeOrToken(asToken: boolean, blendedNode: { refObj: BlendedNode }): boolean {
                if (asToken) {
                    this.oldTreeCursor = this.oldTreeCursor.MoveToFirstToken();
                }
                var currentNodeOrToken = this.oldTreeCursor.CurrentNodeOrToken;
                if (!this.CanReuse(currentNodeOrToken)) {
                    blendedNode.refObj = structDefault(BlendedNode);
                    return false;
                }
                this.newPosition += currentNodeOrToken.FullWidth;
                this.oldTreeCursor = this.oldTreeCursor.MoveToNextSibling();
                this.newDirectives = CSharpExtensions.ApplyDirectives_1395(currentNodeOrToken,
                    this.newDirectives);
                this.oldDirectives = CSharpExtensions.ApplyDirectives_1395(currentNodeOrToken,
                    this.oldDirectives);
                blendedNode.refObj = this.CreateBlendedNode(/*node:*/<CSharp.CSharpSyntaxNode>currentNodeOrToken.AsNode(),/*token:*/<InternalSyntax.SyntaxToken>currentNodeOrToken.AsToken().Node);
                return true;
            }
            private CanReuse(nodeOrToken: SyntaxNodeOrToken): boolean {
                if (nodeOrToken.FullWidth == 0) {
                    return false;
                }
                if (nodeOrToken.ContainsAnnotations) {
                    return false;
                }
                if (this.IntersectsNextChange(nodeOrToken)) {
                    return false;
                }
                if (nodeOrToken.ContainsDiagnostics || (nodeOrToken.IsToken && (<CSharpSyntaxNode>nodeOrToken.AsToken().Node).ContainsSkippedText && nodeOrToken.Parent.ContainsDiagnostics)) {
                    return false;
                }
                if (Reader.IsFabricatedToken(CSharpExtensions.CSharpKind_1403(nodeOrToken))) {
                    return false;
                }
                if ((nodeOrToken.IsToken && nodeOrToken.AsToken().IsMissing) || (nodeOrToken.IsNode && Reader.IsIncomplete(<CSharp.CSharpSyntaxNode>nodeOrToken.AsNode()))) {
                    return false;
                }
                if (!nodeOrToken.ContainsDirectives) {
                    return true;
                }
                return this.newDirectives.IncrementallyEquivalent(this.oldDirectives);
            }
            private IntersectsNextChange(nodeOrToken: SyntaxNodeOrToken): boolean {
                if (this.changes.IsEmpty) {
                    return false;
                }
                var oldSpan = nodeOrToken.FullSpan;
                var changeSpan = this.changes.Peek().Span;
                return oldSpan.IntersectsWith_1989(changeSpan);
            }
            private static IsIncomplete(node: CSharp.CSharpSyntaxNode): boolean {
                return node.Green.GetLastTerminal().IsMissing;
            }
            private static IsFabricatedToken(kind: SyntaxKind): boolean {
                switch (kind) {
                    case SyntaxKind.GreaterThanGreaterThanToken:
                    case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                        return true;
                    default:
                        return SyntaxFacts.IsContextualKeyword(kind);
                }
            }
            private CreateBlendedNode(node: CSharp.CSharpSyntaxNode, token: SyntaxToken): BlendedNode {
                return new BlendedNode().ctor_1181(node, token, new Blender().ctor_7593(this.lexer, this.oldTreeCursor, this.changes, this.newPosition, this.changeDelta, this.newDirectives, this.oldDirectives, this.newLexerDrivenMode));
            }
            constructor() { }
        }
    }
}