
class CSharpSyntaxService {
    // fields
    private lastTree: Core.SyntaxTree;
    private lastSourceCode: Core.Text.SourceText;
    private changeQueue = new System.Collections.Generic.Queue<Core.Text.TextChange>();
    // events

    // public methods
    public ParseTree(code: string): Core.SyntaxTree {
        var source = Core.Text.SourceText.From_1429(code);
        var tree = CSharp.CSharpSyntaxTree.ParseText_2029(source);
        this.lastTree = tree;
        this.lastSourceCode = source;
        return tree;
    }
    public AddChange(change: Core.Text.TextChange): void {
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

    public GetTree(): Core.SyntaxTree {
        if (this.changeQueue.Count == 0) {
            return this.lastTree;
        }

        this.ApplyChangedOnSource();
        var tree = this.lastTree.WithChangedText(this.lastSourceCode);
        this.lastTree = tree;
        return this.lastTree;
    }


    public GetTokensFromSpan(from: number, length: number): Playground.Highlight.HighlightSpan[]{
        var span = new Core.Text.TextSpan().ctor_1506(from, length);
        var result = this.lastTree.GetRoot().DescendantTokens_9576(span);
        return this.ConvertToHighlightSpans(result);

    }

    // private methods    
    private ConvertToHighlightSpans(tokens: SGenerics.IEnumerable<Core.SyntaxToken>): PHighlight.HighlightSpan[]{
        var arr: PHighlight.HighlightSpan[] = [];
        _foreach(tokens,(token) => {
            if (CSharp.CSharpExtensions.IsKeyword(token)) {
                arr.push(this.CreateSpan(token, PHighlight.HighlightSyntaxKind.Keyword));                
            }

            if (token.RawKind == CSharp.SyntaxKind.IdentifierToken) {
                if (token.Parent instanceof CSharp.Syntax.ClassDeclarationSyntax) {
                    arr.push(this.CreateSpan(token, PHighlight.HighlightSyntaxKind.ClassName));  
                }
            }
            
        });

        return arr;
    }    

    private CreateSpan(token: Core.SyntaxToken, kind: PHighlight.HighlightSyntaxKind) {
        return new Playground.Highlight.HighlightSpan(token.Span.Start, token.Span.Length, kind);
    }

    private ApplyChangedOnSource(): void {
        var source = this.lastSourceCode;
        while (this.changeQueue.Count > 0) {
            source = source.WithChanges_9931(this.changeQueue.Dequeue());
        }
        this.lastSourceCode = source;
    }
}