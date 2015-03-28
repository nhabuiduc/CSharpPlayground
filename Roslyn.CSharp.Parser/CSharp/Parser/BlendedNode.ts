module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class BlendedNode implements IStruct {
        public Node: CSharp.CSharpSyntaxNode;
        public Token: SyntaxToken;
        public Blender: Blender = structDefault(Blender);
        ctor_1181(node: CSharp.CSharpSyntaxNode, token: SyntaxToken, blender: Blender): BlendedNode {
            this.Node = node;
            this.Token = token;
            this.Blender = blender;
            return this;
        }
        constructor() { }
    }
}