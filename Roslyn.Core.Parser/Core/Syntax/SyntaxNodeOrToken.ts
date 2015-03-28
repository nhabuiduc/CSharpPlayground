module Microsoft.CodeAnalysis {
    export class SyntaxNodeOrToken implements System.IEquatable<SyntaxNodeOrToken>, IStruct {
        private nodeOrParent: SyntaxNode;
        private token: GreenNode;
        private position: number = 0;
        private tokenIndex: number = 0;
        ctor_1281(node: SyntaxNode): SyntaxNodeOrToken {
            //this.ctor_1967();
            if (node != null) {
                System.Diagnostics.Debug.Assert(!node.Green.IsList, "node cannot be a list");
                this.position = node.Position;
                this.nodeOrParent = node;
            }
            this.tokenIndex = -1;
            return this;
        }
        ctor_1484(parent: SyntaxNode, token: GreenNode, position: number, index: number): SyntaxNodeOrToken {
            System.Diagnostics.Debug.Assert(parent == null || !parent.Green.IsList, "parent cannot be a list");
            System.Diagnostics.Debug.Assert(token != null || (parent == null && position == 0 && index == 0), "parts must form a token");
            System.Diagnostics.Debug.Assert(token == null || token.IsToken, "token must be a token");
            System.Diagnostics.Debug.Assert(index >= 0, "index must not be negative");
            System.Diagnostics.Debug.Assert(parent == null || token != null, "null token cannot have parent");
            this.position = position;
            this.tokenIndex = index;
            this.nodeOrParent = parent;
            this.token = token;
            return this;
        }

        private get KindText(): string {
            if (this.token != null) {
                return this.token.KindText;
            }
            else if (this.nodeOrParent != null) {
                return this.nodeOrParent.Green.KindText;
            }
            else {
                return "None";
            }
        }
        public get RawKind(): number {
            if (this.token != null) {
                return this.token.RawKind;
            }
            else if (this.nodeOrParent != null) {
                return this.nodeOrParent.RawKind;
            }
            else {
                return 0;
            }
        }
        public get Language(): string {
            if (this.token != null) {
                return this.token.Language;
            }
            else if (this.nodeOrParent != null) {
                return this.nodeOrParent.Language;
            }
            else {
                return System.String.Empty;
            }
        }
        public get IsMissing(): boolean {
            if (this.token != null) {
                return this.token.IsMissing;
            }
            else if (this.nodeOrParent != null) {
                return this.nodeOrParent.IsMissing;
            }
            else {
                return false;
            }
        }
        public get Parent(): SyntaxNode {
            if (this.token != null) {
                return this.nodeOrParent;
            }
            else if (this.nodeOrParent != null) {
                return this.nodeOrParent.Parent;
            }
            else {
                return null;
            }
        }
        public get UnderlyingNode(): GreenNode {
            if (this.token != null) {
                return this.token;
            }
            else if (this.nodeOrParent != null) {
                return this.nodeOrParent.Green;
            }
            else {
                return null;
            }
        }
        public get Position(): number {
            return this.position;
        }
        public get IsToken(): boolean {
            return !this.IsNode;
        }
        public get IsNode(): boolean {
            return this.tokenIndex < 0;
        }
        public AsToken(): SyntaxToken {
            if (this.token != null) {
                return new SyntaxToken().ctor_1108(this.nodeOrParent, this.token, this.Position, this.tokenIndex);
            }
            return structDefault(SyntaxToken);
        }
        public AsNode(): SyntaxNode {
            if (this.token != null) {
                return null;
            }
            return this.nodeOrParent;
        }
        public ChildNodesAndTokens(): ChildSyntaxList {
            return this.IsToken ? structDefault(ChildSyntaxList) : this.nodeOrParent.ChildNodesAndTokens();
        }
        public get Span(): Text.TextSpan {
            if (this.token != null) {
                return this.AsToken().Span;
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.Span;
            }
            return structDefault(Text.TextSpan);
        }
        public get SpanStart(): number {
            if (this.token != null) {
                return this.position + this.token.GetLeadingTriviaWidth();
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.SpanStart;
            }
            return 0;
        }
        public get FullSpan(): Text.TextSpan {
            if (this.token != null) {
                return new Text.TextSpan().ctor_1506(this.Position, this.token.FullWidth);
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.FullSpan;
            }
            return structDefault(Text.TextSpan);
        }
        public ToString(): string {
            if (this.token != null) {
                return this.token.ToString();
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.ToString();
            }
            return System.String.Empty;
        }
        public ToFullString(): string {
            if (this.token != null) {
                return this.token.ToFullString();
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.ToFullString();
            }
            return System.String.Empty;
        }
        public WriteTo(writer: System.IO.TextWriter): void {
            if (this.token != null) {
                this.token.WriteTo_1120(writer);
            }
            else if (this.nodeOrParent != null) {
                this.nodeOrParent.WriteTo(writer);
            }
        }
        public get HasLeadingTrivia(): boolean {
            if (this.token != null) {
                return this.token.HasLeadingTrivia;
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.HasLeadingTrivia;
            }
            return false;
        }
        public GetLeadingTrivia(): SyntaxTriviaList {
            if (this.token != null) {
                return this.AsToken().LeadingTrivia;
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.GetLeadingTrivia();
            }
            return structDefault(SyntaxTriviaList);
        }
        public get HasTrailingTrivia(): boolean {
            if (this.token != null) {
                return this.token.HasTrailingTrivia;
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.HasTrailingTrivia;
            }
            return false;
        }
        public GetTrailingTrivia(): SyntaxTriviaList {
            if (this.token != null) {
                return this.AsToken().TrailingTrivia;
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.GetTrailingTrivia();
            }
            return structDefault(SyntaxTriviaList);
        }
        public WithLeadingTrivia_2002(trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxNodeOrToken {
            if (this.token != null) {
                return SyntaxNodeOrToken.op_Implicit_7398(this.AsToken().WithLeadingTrivia_1496(trivia));
            }
            if (this.nodeOrParent != null) {
                return SyntaxNodeOrToken.op_Implicit_1792(SyntaxNodeExtensions.WithLeadingTrivia_1499(this.nodeOrParent,
                    trivia));
            }
            return this;
        }
        public WithLeadingTrivia_1694(...trivia: SyntaxTrivia[]): SyntaxNodeOrToken {
            return this.WithLeadingTrivia_2002(<System.Collections.Generic.IEnumerable<SyntaxTrivia>>trivia);
        }
        public WithTrailingTrivia_5961(trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxNodeOrToken {
            if (this.token != null) {
                return SyntaxNodeOrToken.op_Implicit_7398(this.AsToken().WithTrailingTrivia_1187(trivia));
            }
            if (this.nodeOrParent != null) {
                return SyntaxNodeOrToken.op_Implicit_1792(SyntaxNodeExtensions.WithTrailingTrivia_1964(this.nodeOrParent,
                    trivia));
            }
            return this;
        }
        public WithTrailingTrivia_3457(...trivia: SyntaxTrivia[]): SyntaxNodeOrToken {
            return this.WithTrailingTrivia_5961(<System.Collections.Generic.IEnumerable<SyntaxTrivia>>trivia);
        }
        public get ContainsDiagnostics(): boolean {
            if (this.token != null) {
                return this.token.ContainsDiagnostics;
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.ContainsDiagnostics;
            }
            return false;
        }
        public GetDiagnostics(): System.Collections.Generic.IEnumerable<Diagnostic> {
            if (this.token != null) {
                return this.AsToken().GetDiagnostics();
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.GetDiagnostics();
            }
            return Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<Diagnostic>();
        }
        public get ContainsDirectives(): boolean {
            if (this.token != null) {
                return this.token.ContainsDirectives;
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.ContainsDirectives;
            }
            return false;
        }
        public get ContainsAnnotations(): boolean {
            if (this.token != null) {
                return this.token.ContainsAnnotations;
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.ContainsAnnotations;
            }
            return false;
        }
        public HasAnnotations_4203(annotationKind: string): boolean {
            if (this.token != null) {
                return this.token.HasAnnotations_4203(annotationKind);
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.HasAnnotations_4203(annotationKind);
            }
            return false;
        }
        public HasAnnotations_9693(annotationKinds: System.Collections.Generic.IEnumerable<string>): boolean {
            if (this.token != null) {
                return this.token.HasAnnotations_9693(annotationKinds);
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.HasAnnotations_9693(annotationKinds);
            }
            return false;
        }
        public HasAnnotation(annotation: SyntaxAnnotation): boolean {
            if (this.token != null) {
                return this.token.HasAnnotation(annotation);
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.HasAnnotation(annotation);
            }
            return false;
        }
        public GetAnnotations_1417(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            if (this.token != null) {
                return this.token.GetAnnotations_1417(annotationKind);
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.GetAnnotations_1417(annotationKind);
            }
            return Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxAnnotation>();
        }
        public GetAnnotations_2034(annotationKinds: System.Collections.Generic.IEnumerable<string>): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            if (this.token != null) {
                return this.token.GetAnnotations_2034(annotationKinds);
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.GetAnnotations_2034(annotationKinds);
            }
            return Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxAnnotation>();
        }
        public WithAdditionalAnnotations_2051(...annotations: SyntaxAnnotation[]): SyntaxNodeOrToken {
            return this.WithAdditionalAnnotations_1967(<System.Collections.Generic.IEnumerable<SyntaxAnnotation>>annotations);
        }
        public WithAdditionalAnnotations_1967(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxNodeOrToken {
            if (annotations == null) {
                throw new System.ArgumentNullException("annotations");
            }
            if (this.token != null) {
                return SyntaxNodeOrToken.op_Implicit_7398(this.AsToken().WithAdditionalAnnotations_1605(annotations));
            }
            if (this.nodeOrParent != null) {
                return SyntaxNodeOrToken.op_Implicit_1792(AnnotationExtensions.WithAdditionalAnnotations_2071(this.nodeOrParent,
                    annotations));
            }
            return this;
        }
        public WithoutAnnotations_6685(...annotations: SyntaxAnnotation[]): SyntaxNodeOrToken {
            return this.WithoutAnnotations_2101(<System.Collections.Generic.IEnumerable<SyntaxAnnotation>>annotations);
        }
        public WithoutAnnotations_2101(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxNodeOrToken {
            if (annotations == null) {
                throw new System.ArgumentNullException("annotations");
            }
            if (this.token != null) {
                return SyntaxNodeOrToken.op_Implicit_7398(this.AsToken().WithoutAnnotations_1841(annotations));
            }
            if (this.nodeOrParent != null) {
                return SyntaxNodeOrToken.op_Implicit_1792(AnnotationExtensions.WithoutAnnotations_1837(this.nodeOrParent,
                    annotations));
            }
            return this;
        }
        public WithoutAnnotations_1777(annotationKind: string): SyntaxNodeOrToken {
            if (annotationKind == null) {
                throw new System.ArgumentNullException("annotationKind");
            }
            if (this.HasAnnotations_4203(annotationKind)) {
                return this.WithoutAnnotations_2101(this.GetAnnotations_1417(annotationKind));
            }
            else {
                return this;
            }
        }
        public Equals_2291(other: SyntaxNodeOrToken): boolean {
            System.Diagnostics.Debug.Assert((this.nodeOrParent == other.nodeOrParent && this.token == other.token && this.position == other.position && this.tokenIndex == other.tokenIndex) == (this.nodeOrParent == other.nodeOrParent && this.token == other.token && this.tokenIndex == other.tokenIndex));
            return this.nodeOrParent == other.nodeOrParent && this.token == other.token && this.tokenIndex == other.tokenIndex;
        }
        public op_Equality(right: SyntaxNodeOrToken): boolean {
            var left = this;
            return left.Equals_2291(right);
        }

        public op_Inequality(right: SyntaxNodeOrToken): boolean {
            var left = this;
            return !left.Equals_2291(right);
        }

        public Equals(obj: Object): boolean {
            return obj instanceof SyntaxNodeOrToken && this.Equals_2291(<SyntaxNodeOrToken>obj);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_7656(this.nodeOrParent, Roslyn.Utilities.Hash.Combine_7656(this.token, this.tokenIndex));
        }
        public IsEquivalentTo(other: SyntaxNodeOrToken): boolean {
            if (this.IsNode != other.IsNode) {
                return false;
            }
            var thisUnderlying = this.UnderlyingNode;
            var otherUnderlying = other.UnderlyingNode;
            return (thisUnderlying == otherUnderlying) || (thisUnderlying != null && thisUnderlying.IsEquivalentTo(otherUnderlying));
        }
        public static op_Implicit_7398(token: SyntaxToken): SyntaxNodeOrToken {
            return new SyntaxNodeOrToken().ctor_1484(token.Parent, token.Node, token.Position, token.Index);
        }
        public static op_Explicit_3521(nodeOrToken: SyntaxNodeOrToken): SyntaxToken {
            return nodeOrToken.AsToken();
        }
        public static op_Implicit_1792(node: SyntaxNode): SyntaxNodeOrToken {
            return new SyntaxNodeOrToken().ctor_1281(node);
        }
        public static op_Explicit_1741(nodeOrToken: SyntaxNodeOrToken): SyntaxNode {
            return nodeOrToken.AsNode();
        }
        public get SyntaxTree(): SyntaxTree {
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.SyntaxTree;
            }
            return null;
        }
        public GetLocation(): Location {
            if (this.token != null) {
                return this.AsToken().GetLocation();
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.GetLocation();
            }
            return null;
        }
        public GetDirectives_1318<TDirective extends SyntaxNode>(typeDirective: { prototype: TDirective },filter: (_: TDirective) => boolean = null): System.Collections.Generic.IList<TDirective> {
            var directives: System.Collections.Generic.List<TDirective> = null;
            var directives_ref0 = { refObj: directives };
            SyntaxNodeOrToken.GetDirectives_1988(typeDirective,this, filter, directives_ref0);

            directives = directives_ref0.refObj;;
            return directives != null ? directives : Roslyn.Utilities.SpecializedCollections.EmptyList<TDirective>();
        }
        private static GetDirectives_1988<TDirective extends SyntaxNode>(typeDirective: { prototype: TDirective },node: SyntaxNodeOrToken, filter: (_: TDirective) => boolean, directives: { refObj: System.Collections.Generic.List<TDirective> }): void {
            if (node.token != null) {
                SyntaxNodeOrToken.GetDirectives_1443(typeDirective,node.AsToken(), filter, directives);
            }
            else if (node.nodeOrParent != null) {
                SyntaxNodeOrToken.GetDirectives_1246(typeDirective,node.nodeOrParent, filter, directives);
            }
        }
        private static GetDirectives_1246<TDirective extends SyntaxNode>(typeDirective: { prototype: TDirective },node: SyntaxNode, filter: (_: TDirective) => boolean, directives: { refObj: System.Collections.Generic.List<TDirective> }): void {
            if (node.ContainsDirectives) {
                // for each
                var childEnumerator = node.ChildNodesAndTokens().GetEnumerator();
                try {
                    while (childEnumerator.MoveNext()) {
                        var child = childEnumerator.Current;
                        // foreach block
                        SyntaxNodeOrToken.GetDirectives_1988(typeDirective,child, filter, directives);
                    }
                } finally {
                    if (childEnumerator !== null) childEnumerator.Dispose();

                }    
                // end foreach
            }
        }
        private static GetDirectives_1443<TDirective extends SyntaxNode>(typeDirective: { prototype: TDirective },token: SyntaxToken, filter: (_: TDirective) => boolean, directives: { refObj: System.Collections.Generic.List<TDirective> }): void {
            if (token.ContainsDirectives) {
                SyntaxNodeOrToken.GetDirectives_4779(typeDirective,token.LeadingTrivia, filter, directives);
                SyntaxNodeOrToken.GetDirectives_4779(typeDirective,token.TrailingTrivia, filter, directives);
            }
        }
        private static GetDirectives_4779<TDirective extends SyntaxNode>(typeDirective: { prototype: TDirective },trivia: SyntaxTriviaList, filter: (_: TDirective) => boolean, directives: { refObj: System.Collections.Generic.List<TDirective> }): void {
            // for each
            var trEnumerator = trivia.GetEnumerator();
            try {
                while (trEnumerator.MoveNext()) {
                    var tr = trEnumerator.Current;
                    // foreach block
                    if (tr.IsDirective) {
                        var directive = __as__<TDirective>(tr.GetStructure(), typeDirective);
                        if (directive != null && (filter == null || filter(directive))) {
                            if (directives.refObj == null) {
                                directives.refObj = new System.Collections.Generic.List<TDirective>();
                            }
                            directives.refObj.Add(directive);
                        }
                    }
                    else if (tr.HasStructure) {
                        SyntaxNodeOrToken.GetDirectives_1246(typeDirective,tr.GetStructure(), filter, directives);
                    }
                }
            } finally {
                if (trEnumerator !== null) trEnumerator.Dispose();

            }    
            // end foreach
        }
        public get Width(): number {
            if (this.token != null) {
                return this.token.Width;
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.Width;
            }
            return 0;
        }
        public get FullWidth(): number {
            if (this.token != null) {
                return this.token.FullWidth;
            }
            if (this.nodeOrParent != null) {
                return this.nodeOrParent.FullWidth;
            }
            return 0;
        }
        public get EndPosition(): number {
            return this.position + this.FullWidth;
        }
        public static GetFirstChildIndexSpanningPosition_6215(node: SyntaxNode, position: number): number {
            if (!node.FullSpan.IntersectsWith_1739(position)) {
                throw new System.ArgumentException("Must be within node's FullSpan", "position");
            }
            return SyntaxNodeOrToken.GetFirstChildIndexSpanningPosition_2019(node.ChildNodesAndTokens(), position);
        }
        public static GetFirstChildIndexSpanningPosition_2019(list: ChildSyntaxList, position: number): number {
            var lo: number = 0;
            var hi: number = list.Count - 1;
            while (lo <= hi) {
                var r: number = lo + ((hi - lo) >> 1);
                var m = list.$get$(r);
                if (position < m.Position) {
                    hi = r - 1;
                }
                else {
                    if (position == m.Position) {
                        for (; r > 0 && list.$get$(r - 1).FullWidth == 0; r--) {
                            ;
                        }
                        return r;
                    }
                    else if (position >= m.EndPosition) {
                        lo = r + 1;
                        continue;
                    }
                    return r;
                }
            }
            throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
        }
        public GetNextSibling(): SyntaxNodeOrToken {
            var parent = this.Parent;
            if (parent == null) {
                return structDefault(SyntaxNodeOrToken);
            }
            var siblings = parent.ChildNodesAndTokens();
            return siblings.Count < 8 ? this.GetNextSiblingFromStart(siblings) : this.GetNextSiblingWithSearch(siblings);
        }
        public GetPreviousSibling(): SyntaxNodeOrToken {
            if (this.Parent != null) {
                var returnNext = false;
                // for each
                var childEnumerator = this.Parent.ChildNodesAndTokens().Reverse().GetEnumerator();
                try {
                    while (childEnumerator.MoveNext()) {
                        var child = childEnumerator.Current;
                        // foreach block
                        if (returnNext) {
                            return child;
                        }
                        if (child.op_Equality(this)) {
                            returnNext = true;
                        }
                    }
                } finally {
                    if (childEnumerator !== null) childEnumerator.Dispose();

                }    
                // end foreach
            }
            return structDefault(SyntaxNodeOrToken);
        }
        private GetNextSiblingFromStart(siblings: ChildSyntaxList): SyntaxNodeOrToken {
            var returnNext = false;
            // for each
            var siblingEnumerator = siblings.GetEnumerator();
            try {
                while (siblingEnumerator.MoveNext()) {
                    var sibling = siblingEnumerator.Current;
                    // foreach block
                    if (returnNext) {
                        return sibling;
                    }
                    if (sibling.op_Equality(this)) {
                        returnNext = true;
                    }
                }
            } finally {
                if (siblingEnumerator !== null) siblingEnumerator.Dispose();

            }    
            // end foreach
            return structDefault(SyntaxNodeOrToken);
        }
        private GetNextSiblingWithSearch(siblings: ChildSyntaxList): SyntaxNodeOrToken {
            var firstIndex = SyntaxNodeOrToken.GetFirstChildIndexSpanningPosition_2019(siblings, this.position);
            var count = siblings.Count;
            var returnNext = false;
            for (var i: number = firstIndex; i < count; i++) {
                if (returnNext) {
                    return siblings.$get$(i);
                }
                if (siblings.$get$(i).op_Equality(this)) {
                    returnNext = true;
                }
            }
            return structDefault(SyntaxNodeOrToken);
        }
        constructor() { }
    }
}