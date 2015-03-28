///<reference path="StructuredTriviaSyntax.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class DirectiveTriviaSyntax extends StructuredTriviaSyntax{
        public ApplyDirectives(stack: DirectiveStack): DirectiveStack {
            return stack.Add(new Directive().ctor_8302(this));
        }
        
        ctor_9467(kind: SyntaxKind, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): DirectiveTriviaSyntax {
            super.ctor_1999(kind, diagnostics, annotations);
            this.flags |= GreenNode.NodeFlags.ContainsDirectives;
            return this;
        }
        ctor_1539(kind: SyntaxKind): DirectiveTriviaSyntax {
            super.ctor_1999(kind);
            this.flags |= GreenNode.NodeFlags.ContainsDirectives;
            return this;
        }
        ctor_1258(reader: Roslyn.Utilities.ObjectReader): DirectiveTriviaSyntax {
            super.ctor_1484(reader);
            this.flags |= GreenNode.NodeFlags.ContainsDirectives;
            return this;
        }
        public HashToken: SyntaxToken;
        public EndOfDirectiveToken: SyntaxToken;
        public IsActive: boolean = false;
        constructor() { super(); }
    }
}