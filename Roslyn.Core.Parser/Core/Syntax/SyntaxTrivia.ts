module Microsoft.CodeAnalysis {
    export class SyntaxTrivia implements System.IEquatable<SyntaxTrivia>, IStruct {
        public static Any: (_: SyntaxTrivia) => boolean = t => true;
        private token: SyntaxToken = structDefault(SyntaxToken);
        private triviaNode: GreenNode;
        private position: number = 0;
        private index: number = 0;
        ctor_1046(token: SyntaxToken, triviaNode: GreenNode, position: number, index: number): SyntaxTrivia {
            this.token = token;
            this.triviaNode = triviaNode;
            this.position = position;
            this.index = index;
            System.Diagnostics.Debug.Assert(this.RawKind != 0 || this.Equals_3529(structDefault(SyntaxTrivia)));
            return this;
        }
        public get RawKind(): number {
            return this.triviaNode != null ? this.triviaNode.RawKind : 0;
        }

        public get Language(): string {
            return this.triviaNode != null ? this.triviaNode.Language : System.String.Empty;
        }
        public get Token(): SyntaxToken {
            return this.token;
        }
        public get UnderlyingNode(): GreenNode {
            return this.triviaNode;
        }
        public get Position(): number {
            return this.position;
        }
        public get Index(): number {
            return this.index;
        }
        public get Width(): number {
            return this.triviaNode != null ? this.triviaNode.Width : 0;
        }
        public get FullWidth(): number {
            return this.triviaNode != null ? this.triviaNode.FullWidth : 0;
        }
        public get Span(): Text.TextSpan {
            return this.triviaNode != null ? new Text.TextSpan().ctor_1506(this.position + this.triviaNode.GetLeadingTriviaWidth(), this.triviaNode.Width) : structDefault(Text.TextSpan);
        }
        public get SpanStart(): number {
            return this.triviaNode != null ? this.position + this.triviaNode.GetLeadingTriviaWidth() : 0;
        }
        public get FullSpan(): Text.TextSpan {
            return this.triviaNode != null ? new Text.TextSpan().ctor_1506(this.position, this.triviaNode.FullWidth) : structDefault(Text.TextSpan);
        }
        public get ContainsDiagnostics(): boolean {
            return this.triviaNode != null && this.triviaNode.ContainsDiagnostics;
        }
        public get HasStructure(): boolean {
            return this.triviaNode != null && this.triviaNode.IsStructuredTrivia;
        }
        public IsPartOfStructuredTrivia(): boolean {
            return this.token.Parent != null && this.token.Parent.IsPartOfStructuredTrivia();
        }
        public get ContainsAnnotations(): boolean {
            return this.triviaNode != null && this.triviaNode.ContainsAnnotations;
        }
        public HasAnnotations_4203(annotationKind: string): boolean {
            return this.triviaNode != null && this.triviaNode.HasAnnotations_4203(annotationKind);
        }
        public HasAnnotations_1739(...annotationKinds: string[]): boolean {
            return this.triviaNode != null && this.triviaNode.HasAnnotations_9693(annotationKinds);
        }
        public HasAnnotations_1739_Arr(annotationKinds: string[]): boolean {
            return this.triviaNode != null && this.triviaNode.HasAnnotations_9693(annotationKinds);
        }
        public HasAnnotation(annotation: SyntaxAnnotation): boolean {
            return this.triviaNode != null && this.triviaNode.HasAnnotation(annotation);
        }
        public GetAnnotations_1417(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            return this.triviaNode != null ? this.triviaNode.GetAnnotations_1417(annotationKind) : Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxAnnotation>();
        }
        public GetAnnotations_6794(...annotationKinds: string[]): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            return this.triviaNode != null ? this.triviaNode.GetAnnotations_2034(annotationKinds) : Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxAnnotation>();
        }
        public get IsDirective(): boolean {
            return this.triviaNode != null && this.triviaNode.IsDirective;
        }
        public GetStructure(): SyntaxNode {
            return this.HasStructure ? this.triviaNode.GetStructure(this) : null;
        }
        public ToString(): string {
            return this.triviaNode != null ? this.triviaNode.ToString() : System.String.Empty;
        }
        public ToFullString(): string {
            return this.triviaNode != null ? this.triviaNode.ToFullString() : System.String.Empty;
        }
        public WriteTo(writer: System.IO.TextWriter): void {
            if (this.triviaNode != null) {
                this.triviaNode.WriteTo_1120(writer);
            }
        }
        public op_Equality(right: SyntaxTrivia): boolean {
            var left = this;
            return left.Equals_3529(right);
        }

        public op_Inequality(right: SyntaxTrivia): boolean {
            var left = this;
            return !left.Equals_3529(right);
        }

        public Equals_3529(other: SyntaxTrivia): boolean {
            return this.token.op_Equality(other.token) && this.triviaNode == other.triviaNode && this.position == other.position && this.index == other.index;
        }
        public Equals(obj: Object): boolean {
            return obj instanceof SyntaxTrivia && this.Equals_3529(<SyntaxTrivia>obj);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(this.token.GetHashCode(), Roslyn.Utilities.Hash.Combine_7656(this.triviaNode, Roslyn.Utilities.Hash.Combine_1641(this.position, this.index)));
        }
        public WithAdditionalAnnotations_1767(...annotations: SyntaxAnnotation[]): SyntaxTrivia {
            return this.WithAdditionalAnnotations_2069(<System.Collections.Generic.IEnumerable<SyntaxAnnotation>>annotations);
        }
        public WithAdditionalAnnotations_2069(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxTrivia {
            if (annotations == null) {
                throw new System.ArgumentNullException("annotations");
            }
            if (this.UnderlyingNode != null) {
                return new SyntaxTrivia().ctor_1046(/*token:*/structDefault(SyntaxToken),/*triviaNode:*/GreenNodeExtensions.WithAdditionalAnnotationsGreen(this.UnderlyingNode,
                    annotations),/*position:*/0,/*index:*/0);
            }
            return structDefault(SyntaxTrivia);
        }
        public WithoutAnnotations_9940(...annotations: SyntaxAnnotation[]): SyntaxTrivia {
            return this.WithoutAnnotations_4941(<System.Collections.Generic.IEnumerable<SyntaxAnnotation>>annotations);
        }
        public WithoutAnnotations_4941(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxTrivia {
            if (annotations == null) {
                throw new System.ArgumentNullException("annotations");
            }
            if (this.UnderlyingNode != null) {
                return new SyntaxTrivia().ctor_1046(/*token:*/structDefault(SyntaxToken),/*triviaNode:*/GreenNodeExtensions.WithoutAnnotationsGreen(this.UnderlyingNode,
                    annotations),/*position:*/0,/*index:*/0);
            }
            return structDefault(SyntaxTrivia);
        }
        public WithoutAnnotations_4599(annotationKind: string): SyntaxTrivia {
            if (annotationKind == null) {
                throw new System.ArgumentNullException("annotationKind");
            }
            if (this.HasAnnotations_4203(annotationKind)) {
                return this.WithoutAnnotations_4941(this.GetAnnotations_1417(annotationKind));
            }
            else {
                return this;
            }
        }
        public CopyAnnotationsTo(trivia: SyntaxTrivia): SyntaxTrivia {
            if (trivia.UnderlyingNode == null) {
                return structDefault(SyntaxTrivia);
            }
            if (this.UnderlyingNode == null) {
                return trivia;
            }
            var annotations = this.UnderlyingNode.GetAnnotations_1741();
            if (annotations == null || annotations.length == 0) {
                return trivia;
            }
            return new SyntaxTrivia().ctor_1046(/*token:*/structDefault(SyntaxToken),/*triviaNode:*/GreenNodeExtensions.WithAdditionalAnnotationsGreen(trivia.UnderlyingNode,
                annotations),/*position:*/0,/*index:*/0);
        }
        public get SyntaxTree(): SyntaxTree {
            return this.token.SyntaxTree;
        }
        public GetLocation(): Location {
            return this.SyntaxTree.GetLocation(this.Span);
        }
        public GetDiagnostics(): System.Collections.Generic.IEnumerable<Diagnostic> {
            return this.SyntaxTree.GetDiagnostics_1774(this);
        }
        public IsEquivalentTo(trivia: SyntaxTrivia): boolean {
            return (this.triviaNode == null && trivia.UnderlyingNode == null) || (this.triviaNode != null && trivia.UnderlyingNode != null && this.triviaNode.IsEquivalentTo(trivia.UnderlyingNode));
        }
        constructor() { }
    }
}