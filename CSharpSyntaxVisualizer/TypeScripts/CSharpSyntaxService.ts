
class CSharpSyntaxService {
    // fields
    private lastTree: Core.SyntaxTree;
    private lastSourceCode: Core.Text.SourceText;
    private changeQueue = new System.Collections.Generic.Queue<Core.Text.TextChange>();
    // events

    public onTreeGotByEditor: () => void;

    // public methods
    public ParseTree(code: string): Core.SyntaxTree {
        var source = Core.Text.SourceText.From_1429(code);
        var tree = CSharp.CSharpSyntaxTree.ParseText_2029(source);
        this.lastTree = tree;
        this.lastSourceCode = source;
        return tree;
    }
    public addChange(change: Core.Text.TextChange): void {
        this.changeQueue.Enqueue(change);
    }

    //public AddChange(changes: Core.Text.TextChange): Core.SyntaxTree {
    //    if (this.lastSourceCode == null) {
    //        return;
    //    }
    //    var source = this.lastSourceCode.WithChanges_5075([changes]);
    //    var tree = this.lastTree.WithChangedText(source);
    //    this.lastTree = tree;
    //    this.lastSourceCode = source;
    //    return tree;
    //}

    public getLastTree(): Core.SyntaxTree {
        if (this.lastTree == null) {
            return this.getTree();
        }

        return this.lastTree;
    }

    public getTree(): Core.SyntaxTree {
        if (this.changeQueue.Count == 0) {
            return this.lastTree;
        }

        this.applyChangedOnSource();
        var tree = this.lastTree.WithChangedText(this.lastSourceCode);
        this.lastTree = tree;
        return this.lastTree;
    }


    public getTokensFromSpan(from: number, length: number): Playground.Highlight.HighlightSpan[] {
        var span = new Core.Text.TextSpan().ctor_1506(from, length);
        var result = this.getTree().GetRoot().DescendantTokens_9576(span);
        var arr: PHighlight.HighlightSpan[] = [];
        this.convertToHighlightSpans(result, span, arr);
        return arr;

    }

    // private methods  

    private handleHighlightToken(token: Core.SyntaxToken, fullSpan: Core.Text.TextSpan,
        arr: PHighlight.HighlightSpan[]): void {
        if (!fullSpan.IntersectsWith_1989(token.Span)) {
            return;
        }

        if (CSharp.CSharpExtensions.IsKeyword(token)) {
            arr.push(this.createSpan(token.Span, PHighlight.HighlightSyntaxKind.Keyword));
            return;
        }

        if (token.RawKind == CSharp.SyntaxKind.StringLiteralToken
            || token.RawKind == CSharp.SyntaxKind.InterpolatedStringStartToken
            || token.RawKind == CSharp.SyntaxKind.InterpolatedStringMidToken
            || token.RawKind == CSharp.SyntaxKind.InterpolatedStringEndToken) {
            arr.push(this.createSpan(token.Span, PHighlight.HighlightSyntaxKind.String));
            return;
        }

        if (token.RawKind == CSharp.SyntaxKind.IdentifierToken) {
            if (token.Parent instanceof CSharp.Syntax.ConstructorDeclarationSyntax) {
                arr.push(this.createSpan(token.Span, PHighlight.HighlightSyntaxKind.Constructor));
                return;
            }
            if (token.Text == "var"
                && token.Parent instanceof CSharp.Syntax.IdentifierNameSyntax
                && !(token.Parent.Parent instanceof CSharp.Syntax.QualifiedNameSyntax)) {
                arr.push(this.createSpan(token.Span, PHighlight.HighlightSyntaxKind.Keyword));
                return;
            }
            if (token.Parent instanceof CSharp.Syntax.TypeDeclarationSyntax
                || token.Parent instanceof CSharp.Syntax.EnumDeclarationSyntax) {
                arr.push(this.createSpan(token.Span, PHighlight.HighlightSyntaxKind.ClassName));
                return;
            }

            if (this.isOnlyIdentifierOrLastInQualifiedName(token)) {
                arr.push(this.createSpan(token.Span, PHighlight.HighlightSyntaxKind.ClassName));
                return;
            }
        }

        arr.push(this.createSpan(token.Span, PHighlight.HighlightSyntaxKind.None));
    }

    private isOnlyIdentifierOrLastInQualifiedName(token: Core.SyntaxToken): boolean {
        
        var childOutermostNode: Core.SyntaxNode ;
        if (token.Parent instanceof CSharp.Syntax.IdentifierNameSyntax
            && !(token.Parent.Parent instanceof CSharp.Syntax.QualifiedNameSyntax))
        {
            childOutermostNode = token.Parent;
        }

        if (!childOutermostNode) {
            var qualifiedName = <CSharp.Syntax.QualifiedNameSyntax>token.Parent.Parent;
            if (qualifiedName.Right != token.Parent) {
                return false;
            }

            if (qualifiedName.Parent instanceof CSharp.Syntax.QualifiedNameSyntax) {
                return false;
            }
            childOutermostNode = qualifiedName;
        }
        var outermostNode: Core.SyntaxNode = childOutermostNode.Parent;
        if (outermostNode instanceof CSharp.Syntax.PropertyDeclarationSyntax
            || outermostNode instanceof CSharp.Syntax.VariableDeclarationSyntax
            || outermostNode instanceof CSharp.Syntax.AttributeSyntax
            || outermostNode instanceof CSharp.Syntax.ObjectCreationExpressionSyntax) {
            return true;
        }
        if (outermostNode instanceof CSharp.Syntax.ForEachStatementSyntax) {
            return (<CSharp.Syntax.ForEachStatementSyntax>outermostNode).Type == childOutermostNode;
        }

        return false;
    }

    //private OutOfQualifiedName(token: Core.SyntaxToken): Core.SyntaxNode
    //{
    //    var result = token.Parent.Parent;
    //    while (result instanceof CSharp.Syntax.QualifiedNameSyntax) {
    //        result = result.Parent;
    //    }
    //    return result;
    //}

    private handleHighlightTrivia(trivia: Core.SyntaxTrivia, fullSpan: Core.Text.TextSpan,
        arr: PHighlight.HighlightSpan[]): void {
        if (!fullSpan.IntersectsWith_1989(trivia.Span)) {
            return;
        }

        if (trivia.HasStructure) {
            var structure = trivia.GetStructure();
            if (structure instanceof CSharp.Syntax.DocumentationCommentTriviaSyntax) {
                arr.push(this.createSpan(structure.Span, PHighlight.HighlightSyntaxKind.XmlComment));
            }
        }

        if (trivia.RawKind == CSharp.SyntaxKind.SingleLineCommentTrivia
            || trivia.RawKind == CSharp.SyntaxKind.MultiLineCommentTrivia) {
            arr.push(this.createSpan(trivia.Span, PHighlight.HighlightSyntaxKind.Comment));
        }
    }

    private convertToHighlightSpans(tokens: SGenerics.IEnumerable<Core.SyntaxToken>,
        fullSpan: Core.Text.TextSpan, arr: PHighlight.HighlightSpan[])
        : PHighlight.HighlightSpan[] {
        _foreach(tokens,(token) => {
            if (token.HasLeadingTrivia) {
                _foreach(token.LeadingTrivia, trivia => {
                    this.handleHighlightTrivia(trivia, fullSpan, arr);
                });
            }

            var hlToken = this.handleHighlightToken(token, fullSpan, arr);

            if (token.HasTrailingTrivia) {
                _foreach(token.TrailingTrivia, trivia => {
                    this.handleHighlightTrivia(trivia, fullSpan, arr);
                });
            }
        });

        return arr;
    }

    private createSpan(span: Core.Text.TextSpan, kind: PHighlight.HighlightSyntaxKind) {
        return new Playground.Highlight.HighlightSpan(span.Start, span.Length, kind);
    }

    private applyChangedOnSource(): void {
        var source = this.lastSourceCode;
        while (this.changeQueue.Count > 0) {
            source = source.WithChanges_9931(this.changeQueue.Dequeue());
        }
        this.lastSourceCode = source;
    }
}