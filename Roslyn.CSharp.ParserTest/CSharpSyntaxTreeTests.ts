import CSharp = Microsoft.CodeAnalysis.CSharp;
import Core = Microsoft.CodeAnalysis;
class CSharpSyntaxTreeTests {
    public Test1(): void {
        var code = "class A {}";
        var tree = CSharp.CSharpSyntaxTree.ParseText_7227(code);
        Assert.AreEqual(tree.GetRoot().ToFullString(), code);

        var code2 = "/*class A {}";

        var tree2 = CSharp.CSharpSyntaxTree.ParseText_7227(code2);
        Assert.AreEqual(tree2.GetRoot().ToFullString(), code2);

        var result = tree2.GetChangedSpans(tree).$get$(0);
        
    }
}

Run(CSharpSyntaxTreeTests);