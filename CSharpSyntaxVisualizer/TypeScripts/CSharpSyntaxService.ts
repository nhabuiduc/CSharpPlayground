
class CSharpSyntaxService {
    public ParseTree(code: string): Core.SyntaxTree {
        var tree = CSharp.CSharpSyntaxTree.ParseText_7227(code);        
        
        return tree;
    }
}