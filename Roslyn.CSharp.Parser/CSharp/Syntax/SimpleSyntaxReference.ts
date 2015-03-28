module Microsoft.CodeAnalysis.CSharp {
    export class SimpleSyntaxReference extends SyntaxReference {
        private node: SyntaxNode;
        ctor_7792(node: SyntaxNode): SimpleSyntaxReference {
            this.node = node;
            return this;
        }
        public get SyntaxTree(): SyntaxTree {
            return this.node.SyntaxTree;
        }
        public get Span(): Text.TextSpan {
            return this.node.Span;
        }
        public GetSyntax(cancellationToken: System.Threading.CancellationToken): SyntaxNode {
            return this.node;
        }
        constructor() { super(); }
    }
}