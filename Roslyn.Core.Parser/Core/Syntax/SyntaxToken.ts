module Microsoft.CodeAnalysis {
    export class SyntaxToken implements System.IEquatable<SyntaxToken>, IStruct {
        public static NonZeroWidth: (_: SyntaxToken) => boolean = t => t.Width > 0;
        public static Any: (_: SyntaxToken) => boolean = t => true;
        private parent: SyntaxNode;
        private token: GreenNode;
        private position: number = 0;
        private index: number = 0;
        ctor_1108(parent: SyntaxNode, token: GreenNode, position: number, index: number): SyntaxToken {
            System.Diagnostics.Debug.Assert(parent == null || !parent.Green.IsList, "list cannot be a parent");
            System.Diagnostics.Debug.Assert(token == null || token.IsToken, "token must be a token");
            this.parent = parent;
            this.token = token;
            this.position = position;
            this.index = index;
            return this;
        }
        ctor_1607(token: GreenNode): SyntaxToken {
           // this.ctor_1485();
            System.Diagnostics.Debug.Assert(token == null || token.IsToken, "token must be a token");
            this.token = token;
            return this;
        }

        public get RawKind(): number {
            return this.token != null ? this.token.RawKind : 0;
        }
        public get Language(): string {
            return this.token != null ? this.token.Language : System.String.Empty;
        }
        public get RawContextualKind(): number {
            return this.token != null ? this.token.RawContextualKind : 0;
        }
        public get Parent(): SyntaxNode {
            return this.parent;
        }
        public get Node(): GreenNode {
            return this.token;
        }
        public get Index(): number {
            return this.index;
        }
        public get Position(): number {
            return this.position;
        }
        public get Width(): number {
            return this.token != null ? this.token.Width : 0;
        }
        public get FullWidth(): number {
            return this.token != null ? this.token.FullWidth : 0;
        }
        public get Span(): Text.TextSpan {
            return this.token != null ? new Text.TextSpan().ctor_1506(this.position + this.token.GetLeadingTriviaWidth(), this.token.Width) : structDefault(Text.TextSpan);
        }
        public get EndPosition(): number {
            return this.token != null ? this.position + this.token.FullWidth : 0;
        }
        public get SpanStart(): number {
            return this.token != null ? this.position + this.token.GetLeadingTriviaWidth() : 0;
        }
        public get FullSpan(): Text.TextSpan {
            return new Text.TextSpan().ctor_1506(this.position, this.FullWidth);
        }
        public get IsMissing(): boolean {
            return this.token != null && this.token.IsMissing;
        }
        public get Value(): Object {
            return this.token != null ? this.token.GetValue() : null;
        }
        public get ValueText(): string {
            return this.token != null ? this.token.GetValueText() : null;
        }
        public get Text(): string {
            return this.token != null ? this.token.ToString() : System.String.Empty;
        }
        public ToString(): string {
            return this.token != null ? this.token.ToString() : System.String.Empty;
        }
        public ToFullString(): string {
            return this.token != null ? this.token.ToFullString() : System.String.Empty;
        }
        public WriteTo_1120(writer: System.IO.TextWriter): void {
            if (this.token != null) {
                this.token.WriteTo_1120(writer);
            }
        }
        public WriteTo_1077(writer: System.IO.TextWriter, leading: boolean, trailing: boolean): void {
            if (this.token != null) {
                this.token.WriteTo_1077(writer, leading, trailing);
            }
        }
        public get HasLeadingTrivia(): boolean {
            return this.token != null && this.token.GetLeadingTriviaCore() != null;
        }
        public get HasTrailingTrivia(): boolean {
            return this.token != null && this.token.GetTrailingTriviaCore() != null;
        }
        public get LeadingWidth(): number {
            return this.token != null ? this.token.GetLeadingTriviaWidth() : 0;
        }
        public get TrailingWidth(): number {
            return this.token != null ? this.token.GetTrailingTriviaWidth() : 0;
        }
        public get ContainsDiagnostics(): boolean {
            return this.token != null && this.token.ContainsDiagnostics;
        }
        public get ContainsDirectives(): boolean {
            return this.token != null && this.token.ContainsDirectives;
        }
        public IsPartOfStructuredTrivia(): boolean {
            return this.parent != null && this.parent.IsPartOfStructuredTrivia();
        }
        public get HasStructuredTrivia(): boolean {
            return this.token != null && this.token.ContainsStructuredTrivia;
        }
        public get ContainsAnnotations(): boolean {
            return this.token != null && this.token.ContainsAnnotations;
        }
        public HasAnnotations_4203(annotationKind: string): boolean {
            return this.token != null && this.token.HasAnnotations_4203(annotationKind);
        }
        public HasAnnotations_1739(...annotationKinds: string[]): boolean {
            return this.token != null && this.token.HasAnnotations_9693(annotationKinds);
        }
        public HasAnnotation(annotation: SyntaxAnnotation): boolean {
            return this.token != null && this.token.HasAnnotation(annotation);
        }
        public GetAnnotations_1417(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            return this.token != null ? this.token.GetAnnotations_1417(annotationKind) : Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxAnnotation>();
        }
        public GetAnnotations_6794(...annotationKinds: string[]): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            return this.GetAnnotations_2034(<System.Collections.Generic.IEnumerable<string>>annotationKinds);
        }
        public GetAnnotations_2034(annotationKinds: System.Collections.Generic.IEnumerable<string>): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            return this.token != null ? this.token.GetAnnotations_2034(annotationKinds) : Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxAnnotation>();
        }
        public WithAdditionalAnnotations_8112(...annotations: SyntaxAnnotation[]): SyntaxToken {
            return this.WithAdditionalAnnotations_1605(<System.Collections.Generic.IEnumerable<SyntaxAnnotation>>annotations);
        }
        public WithAdditionalAnnotations_1605(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxToken {
            if (annotations == null) {
                throw new System.ArgumentNullException("annotations");
            }
            if (this.Node != null) {
                return new SyntaxToken().ctor_1108(/*parent:*/null,/*token:*/GreenNodeExtensions.WithAdditionalAnnotationsGreen(this.token,
                    annotations),/*position:*/0,/*index:*/0);
            }
            return structDefault(SyntaxToken);
        }
        public WithoutAnnotations_1344(...annotations: SyntaxAnnotation[]): SyntaxToken {
            return this.WithoutAnnotations_1841(<System.Collections.Generic.IEnumerable<SyntaxAnnotation>>annotations);
        }
        public WithoutAnnotations_1841(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxToken {
            if (annotations == null) {
                throw new System.ArgumentNullException("annotations");
            }
            if (this.Node != null) {
                return new SyntaxToken().ctor_1108(/*parent:*/null,/*token:*/GreenNodeExtensions.WithoutAnnotationsGreen(this.token,
                    annotations),/*position:*/0,/*index:*/0);
            }
            return structDefault(SyntaxToken);
        }
        public WithoutAnnotations_1141(annotationKind: string): SyntaxToken {
            if (annotationKind == null) {
                throw new System.ArgumentNullException("annotationKind");
            }
            if (this.HasAnnotations_4203(annotationKind)) {
                return this.WithoutAnnotations_1841(this.GetAnnotations_1417(annotationKind));
            }
            else {
                return this;
            }
        }
        public CopyAnnotationsTo(token: SyntaxToken): SyntaxToken {
            if (token.Node == null) {
                return structDefault(SyntaxToken);
            }
            if (this.token == null) {
                return token;
            }
            var annotations = this.Node.GetAnnotations_1741();
            if (annotations == null || annotations.length == 0) {
                return token;
            }
            return new SyntaxToken().ctor_1108(/*parent:*/null,/*token:*/GreenNodeExtensions.WithAdditionalAnnotationsGreen(token.Node,
                annotations),/*position:*/0,/*index:*/0);
        }
        public get LeadingTrivia(): SyntaxTriviaList {
            return this.token != null ? new SyntaxTriviaList().ctor_5254(this, this.token.GetLeadingTriviaCore(), this.Position) : structDefault(SyntaxTriviaList);
        }
        public get TrailingTrivia(): SyntaxTriviaList {
            if (this.token != null) {
                var leading = this.token.GetLeadingTriviaCore();
                var index: number = 0;
                if (leading != null) {
                    index = leading.IsList ? leading.SlotCount : 1;
                }
                var trailingGreen = this.token.GetTrailingTriviaCore();
                var trailingPosition: number = this.position + this.FullWidth;
                if (trailingGreen != null) {
                    trailingPosition -= trailingGreen.FullWidth;
                }
                return new SyntaxTriviaList().ctor_5254(this, trailingGreen, trailingPosition, index);
            }
            return structDefault(SyntaxTriviaList);
        }
        public WithLeadingTrivia_1905(trivia: SyntaxTriviaList): SyntaxToken {
            return this.WithLeadingTrivia_1496(<System.Collections.Generic.IEnumerable<SyntaxTrivia>>trivia);
        }
        public WithTrailingTrivia_6264(trivia: SyntaxTriviaList): SyntaxToken {
            return this.WithTrailingTrivia_1187(<System.Collections.Generic.IEnumerable<SyntaxTrivia>>trivia);
        }
        public WithLeadingTrivia_1185(...trivia: SyntaxTrivia[]): SyntaxToken {
            return this.WithLeadingTrivia_1496(<System.Collections.Generic.IEnumerable<SyntaxTrivia>>trivia);
        }
        public WithLeadingTrivia_1496(trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxToken {
            var greenList = trivia == null ? null : System.Linq.Enumerable.Select(trivia,
                t => t.UnderlyingNode);
            return this.token != null ? new SyntaxToken().ctor_1108(null, this.token.WithLeadingTrivia(this.token.CreateList(greenList)),/*position:*/0,/*index:*/0) : structDefault(SyntaxToken);
        }
        public WithTrailingTrivia_8808(...trivia: SyntaxTrivia[]): SyntaxToken {
            return this.WithTrailingTrivia_1187(<System.Collections.Generic.IEnumerable<SyntaxTrivia>>trivia);
        }
        public WithTrailingTrivia_1187(trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxToken {
            var greenList = trivia == null ? null : System.Linq.Enumerable.Select(trivia,
                t => t.UnderlyingNode);
            return this.token != null ? new SyntaxToken().ctor_1108(null, this.token.WithTrailingTrivia(this.token.CreateList(greenList)),/*position:*/0,/*index:*/0) : structDefault(SyntaxToken);
        }
        public GetAllTrivia(): System.Collections.Generic.IEnumerable<SyntaxTrivia> {
            if (this.HasLeadingTrivia) {
                if (this.HasTrailingTrivia) {
                    return System.Linq.Enumerable.Concat(this.LeadingTrivia,
                        this.TrailingTrivia);
                }
                return this.LeadingTrivia;
            }
            else if (this.HasTrailingTrivia) {
                return this.TrailingTrivia;
            }
            else {
                return Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxTrivia>();
            }
        }
        public op_Equality(right: SyntaxToken): boolean {
            var left = this;
            return left.Equals_1664(right);
        }

        public op_Inequality(right: SyntaxToken): boolean {
            var left = this;
            return !left.Equals_1664(right);
        }

        public Equals_1664(other: SyntaxToken): boolean {
            return this.parent == other.parent && this.token == other.token && this.position == other.position && this.index == other.index;
        }
        public Equals(obj: Object): boolean {
            return obj instanceof SyntaxToken && this.Equals_1664(<SyntaxToken>obj);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_7656(this.parent, Roslyn.Utilities.Hash.Combine_7656(this.token, Roslyn.Utilities.Hash.Combine_1641(this.position, this.index)));
        }
        public GetNextToken_1522(includeZeroWidth: boolean = false, includeSkipped: boolean = false, includeDirectives: boolean = false, includeDocumentationComments: boolean = false): SyntaxToken {
            if (this.token == null) {
                return structDefault(SyntaxToken);
            }
            return this.token.Navigator.GetNextToken_1578(this, includeZeroWidth, includeSkipped, includeDirectives, includeDocumentationComments);
        }
        public GetNextToken_2254(predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean = null): SyntaxToken {
            if (this.token == null) {
                return structDefault(SyntaxToken);
            }
            return <SyntaxToken>this.token.Navigator.GetNextToken_1071(this, predicate, stepInto);
        }
        public GetPreviousToken_2067(includeZeroWidth: boolean = false, includeSkipped: boolean = false, includeDirectives: boolean = false, includeDocumentationComments: boolean = false): SyntaxToken {
            if (this.token == null) {
                return structDefault(SyntaxToken);
            }
            return this.token.Navigator.GetPreviousToken_1070(this, includeZeroWidth, includeSkipped, includeDirectives, includeDocumentationComments);
        }
        public GetPreviousToken_8036(predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean = null): SyntaxToken {
            return <SyntaxToken>this.token.Navigator.GetPreviousToken_1392(this, predicate, stepInto);
        }
        public get SyntaxTree(): SyntaxTree {
            var parent = this.parent;
            return parent == null ? null : parent.SyntaxTree;
        }
        public GetLocation(): Location {
            return this.token != null ? this.SyntaxTree.GetLocation(this.Span) : Location.None;
        }
        public GetDiagnostics(): System.Collections.Generic.IEnumerable<Diagnostic> {
            return this.token != null ? this.SyntaxTree.GetDiagnostics_9583(this) : Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<Diagnostic>();
        }
        public IsEquivalentTo(token: SyntaxToken): boolean {
            return (this.token == null && token.Node == null) || (this.token != null && token.Node != null && this.token.IsEquivalentTo(token.Node));
        }
        constructor() { }
    }
}