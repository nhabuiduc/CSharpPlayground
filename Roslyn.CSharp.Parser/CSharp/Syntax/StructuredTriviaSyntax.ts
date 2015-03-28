module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class StructuredTriviaSyntax extends CSharpSyntaxNode implements IStructuredTriviaSyntax {
        private parent1: SyntaxTrivia = structDefault(SyntaxTrivia);
        ctor_1526(green: Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): StructuredTriviaSyntax {
            super.ctor_1688(green, position, parent == null ? null : parent.SyntaxTree);
            System.Diagnostics.Debug.Assert(parent == null || position >= 0);
            return this;
        }
        public static Create(trivia: SyntaxTrivia): StructuredTriviaSyntax {
            var node = trivia.UnderlyingNode;
            var parent = <CSharpSyntaxNode>trivia.Token.Parent;
            var position = trivia.Position;
            var red = <StructuredTriviaSyntax>node.CreateRed_9614(parent, position);
            red.parent1 = trivia;
            return red;
        }
        public get ParentTrivia(): SyntaxTrivia {
            return this.parent1;
        }
        constructor() { super(); }
    }
}