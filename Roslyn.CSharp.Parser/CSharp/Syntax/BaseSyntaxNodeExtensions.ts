module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class GreenNodeExtensions {
        public static ToGreenList_1391<T extends Syntax.InternalSyntax.CSharpSyntaxNode>(node: SyntaxNode): Syntax.InternalSyntax.SyntaxList<T> {
            return node != null ? GreenNodeExtensions.ToGreenList_6072<T>(node.Green) : structDefault(Syntax.InternalSyntax.SyntaxList );
        }
        public static ToGreenSeparatedList<T extends Syntax.InternalSyntax.CSharpSyntaxNode>(node: SyntaxNode): Syntax.InternalSyntax.SeparatedSyntaxList<T> {
            return node != null ? new Syntax.InternalSyntax.SeparatedSyntaxList<T>().ctor_9176(InternalSyntax.SyntaxList.op_Implicit_8343<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(GreenNodeExtensions.ToGreenList_6072<T>(node.Green))) : structDefault(Syntax.InternalSyntax.SeparatedSyntaxList );
        }
        public static ToGreenList_6072<T extends Syntax.InternalSyntax.CSharpSyntaxNode>(node: GreenNode): Syntax.InternalSyntax.SyntaxList<T> {
            return new Syntax.InternalSyntax.SyntaxList<T>().ctor_1319(<Syntax.InternalSyntax.CSharpSyntaxNode>node);
        }
    }
}