module Microsoft.CodeAnalysis.Syntax {
    export class TranslationSyntaxReference extends SyntaxReference {
        private reference: SyntaxReference;
        ctor_1683(reference: SyntaxReference): TranslationSyntaxReference {
            this.reference = reference;
            return this;
        }
        public get Span(): Text.TextSpan {
            return this.reference.Span;
        }
        public get SyntaxTree(): SyntaxTree {
            return this.reference.SyntaxTree;
        }
        public GetSyntax(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): SyntaxNode {
            var node = this.Translate(this.reference, cancellationToken);
            System.Diagnostics.Debug.Assert(node.SyntaxTree == this.reference.SyntaxTree);
            return node;
        }
        protected  Translate(reference: SyntaxReference, cancellationToken: System.Threading.CancellationToken): SyntaxNode { throw new Error('not implemented'); }
        constructor() { super(); }
    }
}