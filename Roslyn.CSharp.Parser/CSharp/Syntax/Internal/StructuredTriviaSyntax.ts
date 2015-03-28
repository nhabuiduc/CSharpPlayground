module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class StructuredTriviaSyntax extends CSharpSyntaxNode {
        ctor_1999(kind: SyntaxKind, diagnostics: DiagnosticInfo[] = null, annotations: SyntaxAnnotation[] = null): StructuredTriviaSyntax {
            super.ctor_1757(kind, diagnostics, annotations);
            this.Initialize();
            return this;
        }
        ctor_1484(reader: Roslyn.Utilities.ObjectReader): StructuredTriviaSyntax {
            super.ctor_4942(reader);
            this.Initialize();
            return this;
        }
        private Initialize(): void {
            this.flags |= GreenNode.NodeFlags.ContainsStructuredTrivia;
            if (this.Kind == SyntaxKind.SkippedTokensTrivia) {
                this.flags |= GreenNode.NodeFlags.ContainsSkippedText;
            }
        }
        constructor() { super(); }
    }
}