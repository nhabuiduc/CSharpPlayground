
class CSharpSyntaxService {
    private lastTree: Core.SyntaxTree;
    private lastSourceCode: Core.Text.SourceText;
    public ParseTree(code: string): Core.SyntaxTree {
        var source = Core.Text.SourceText.From_1429(code);
        var tree = CSharp.CSharpSyntaxTree.ParseText_2029(source);
        this.lastTree = tree;
        this.lastSourceCode = source;
        return tree;
    }

    public WithChange(changes: Core.Text.TextChange[]): Core.SyntaxTree {
        if (this.lastSourceCode == null) {
            return;
        }
        var source = this.lastSourceCode.WithChanges_5075(changes);
        var tree = this.lastTree.WithChangedText(source);
        this.lastTree = tree;
        this.lastSourceCode = source;
        return tree;
    }

    public GetTree(): Core.SyntaxTree {
        return this.lastTree;
    }

}