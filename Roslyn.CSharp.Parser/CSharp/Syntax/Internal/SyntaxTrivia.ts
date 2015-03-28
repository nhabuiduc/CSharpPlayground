module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxTrivia extends CSharpSyntaxNode {
        public Text: string;
        ctor_C_1733(kind: SyntaxKind, text: string, diagnostics: DiagnosticInfo[] = null, annotations: SyntaxAnnotation[] = null): SyntaxTrivia {
            super.ctor_1733(kind, diagnostics, annotations, text.length);
            this.Text = text;
            if (kind == SyntaxKind.PreprocessingMessageTrivia) {
                this.flags |= GreenNode.NodeFlags.ContainsSkippedText;
            }
            return this;
        }
        ctor_5948(reader: Roslyn.Utilities.ObjectReader): SyntaxTrivia {
            super.ctor_4942(reader);
            this.Text = reader.ReadString_7160();
            this.FullWidth = this.Text.length;
            return this;
        }
        public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
            return r => new SyntaxTrivia().ctor_5948(r);
        }
        public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
            super.WriteTo_2123(writer);
            writer.WriteString(this.Text);
        }
        public static Create(kind: SyntaxKind, text: string): SyntaxTrivia {
            return new SyntaxTrivia().ctor_C_1733(kind, text);
        }
        public ToFullString(): string {
            return this.Text;
        }
        public ToString(): string {
            return this.Text;
        }
        public GetSlot(index: number): GreenNode {
            throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
        }
        public get Width(): number {
            System.Diagnostics.Debug.Assert(this.FullWidth == this.Text.length);
            return this.FullWidth;
        }
        public GetLeadingTriviaWidth(): number {
            return 0;
        }
        public GetTrailingTriviaWidth(): number {
            return 0;
        }
        public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
            return new SyntaxTrivia().ctor_C_1733(this.Kind, this.Text, diagnostics, this.GetAnnotations_1741());
        }
        public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
            return new SyntaxTrivia().ctor_C_1733(this.Kind, this.Text, this.GetDiagnostics(), annotations);
        }
        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitTrivia(this);
        }
        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitTrivia(this);
        }
         public WriteTo_1077(writer: System.IO.TextWriter, leading: boolean, trailing: boolean): void {
            writer.WriteString(this.Text);
        }
        public static op_Implicit_2041(trivia: SyntaxTrivia): Microsoft.CodeAnalysis.SyntaxTrivia {
            return new Microsoft.CodeAnalysis.SyntaxTrivia().ctor_1046(structDefault(Microsoft.CodeAnalysis.SyntaxToken), trivia,/*position:*/0,/*index:*/0);
        }
        public IsEquivalentTo(other: GreenNode): boolean {
            if (!super.IsEquivalentTo(other)) {
                return false;
            }
            if (this.Text != (<SyntaxTrivia>other).Text) {
                return false;
            }
            return true;
        }
        public CreateRed_9614(parent: SyntaxNode, position: number): SyntaxNode {
            throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
        }
        constructor() { super(); }
    }
}