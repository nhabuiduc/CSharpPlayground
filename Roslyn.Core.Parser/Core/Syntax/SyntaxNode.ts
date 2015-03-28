module Microsoft.CodeAnalysis {
    export class SyntaxNode {
        private green: GreenNode;
        private parent: SyntaxNode;
        public _syntaxTree: SyntaxTree;
        private position: number = 0;
        private myHash = Gb.NextHashCode();
        ctor_5435(green: GreenNode, parent: SyntaxNode, position: number): SyntaxNode {
            System.Diagnostics.Debug.Assert(position >= 0, "position cannot be negative");
            //System.Diagnostics.Debug.Assert(parent ?.this.Green.IsList != true,"list cannot be a parent");
            this.position = position;
            this.green = green;
            this.parent = parent;
            return this;
        }
        ctor_8973(green: GreenNode, position: number, syntaxTree: SyntaxTree): SyntaxNode {
            this.ctor_5435(green, null, position);
            this._syntaxTree = syntaxTree;
            return this;
        }

        public GetHashCode(): number {
            return this.myHash;
        }

        public Navigator: AbstractSyntaxNavigator;

        public get RawKind(): number {
            return this.green.RawKind;
        }
        public KindText: string;
        public Language: string;
        public get Green(): GreenNode {
            return this.green;
        }
        public get Position(): number {
            return this.position;
        }
        public get EndPosition(): number {
            return this.position + this.green.FullWidth;
        }
        public get SyntaxTree(): SyntaxTree {
            return this.SyntaxTreeCore;
        }
        public get IsList(): boolean {
            return this.Green.IsList;
        }
        public get FullSpan(): Text.TextSpan {
            return new Text.TextSpan().ctor_1506(this.Position, this.Green.FullWidth);
        }
        public get SlotCount(): number {
            return this.Green.SlotCount;
        }
        public get Span(): Text.TextSpan {
            var start = this.Position;
            var width = this.Green.FullWidth;
            var precedingWidth = this.Green.GetLeadingTriviaWidth();
            start += precedingWidth;
            width -= precedingWidth;
            width -= this.Green.GetTrailingTriviaWidth();
            System.Diagnostics.Debug.Assert(width >= 0);
            return new Text.TextSpan().ctor_1506(start, width);
        }
        public get SpanStart(): number {
            return this.Position + this.Green.GetLeadingTriviaWidth();
        }
        public get Width(): number {
            return this.Green.Width;
        }
        public get FullWidth(): number {
            return this.Green.FullWidth;
        }
        public GetRed_1713(field: { refObj: SyntaxNode }, slot: number): SyntaxNode {
            var result = field.refObj;
            if (result == null) {
                var green = this.Green.GetSlot(slot);
                if (green != null) {
                    result = green.CreateRed_9614(this, this.GetChildPosition(slot));
                    //result = Interlocked.CompareExchange(ref field, result, null)
                    //field = result != null ? Interlocked.CompareExchange(ref field, result, null)
                    field.refObj = result;
                }
            }
            return result;
        }
        public GetRedAtZero_1834(field: { refObj: SyntaxNode }): SyntaxNode {
            var result = field.refObj;
            if (result == null) {
                var green = this.Green.GetSlot(0);
                if (green != null) {
                    result = green.CreateRed_9614(this, this.Position);
                    //result = Interlocked.CompareExchange(ref field, result, null)
                    //field = result != null ? Interlocked.CompareExchange(ref field, result, null)
                    field.refObj = result;
                }
            }
            return result;
        }
        protected GetRed_2015<T extends SyntaxNode>(field: { refObj: T }, slot: number): T {
            var result = field.refObj;
            if (result == null) {
                var green = this.Green.GetSlot(slot);
                if (green != null) {
                    result = <T>green.CreateRed_9614(this, this.GetChildPosition(slot));
                    //result = Interlocked.CompareExchange(ref field, result, null)
                    //field = result != null ? Interlocked.CompareExchange(ref field, result, null)
                    field.refObj = result;
                }
            }
            return result;
        }
        protected GetRedAtZero_2231<T extends SyntaxNode>(field: { refObj: T }): T {
            var result = field.refObj;
            if (result == null) {
                var green = this.Green.GetSlot(0);
                if (green != null) {
                    result = <T>green.CreateRed_9614(this, this.Position);
                    //result = Interlocked.CompareExchange(ref field, result, null)
                    //field = result != null ? Interlocked.CompareExchange(ref field, result, null)
                    field.refObj = result;
                }
            }
            return result;
        }
        public GetRedElement(element: { refObj: SyntaxNode }, slot: number): SyntaxNode {
            System.Diagnostics.Debug.Assert(this.IsList);
            var result = element.refObj;
            if (result == null) {
                var green = this.Green.GetSlot(slot);
                result = green.CreateRed_9614(this.Parent, this.GetChildPosition(slot));
                //               if (Interlocked.CompareExchange(ref element, result, null)
                //                   //element = result != null)
                //{
                //                   result = element.refObj;
                //               }
                element.refObj = result;
            }
            return result;
        }
        public GetRedElementIfNotToken(element: { refObj: SyntaxNode }): SyntaxNode {
            System.Diagnostics.Debug.Assert(this.IsList);
            var result = element.refObj;
            if (result == null) {
                var green = this.Green.GetSlot(1);
                if (!green.IsToken) {
                    result = green.CreateRed_9614(this.Parent, this.GetChildPosition(1));
                    //                   if (Interlocked.CompareExchange(ref element, result, null)
                    //                   //element = result != null)
                    //{
                    //                       result = element.refObj;
                    //                   }
                    element.refObj = result;
                }
            }
            return result;
        }
        public GetWeakRedElement(slot: { refObj: System.WeakReference<SyntaxNode> }, index: number): SyntaxNode {
            var value: SyntaxNode = null;
            if (slot.refObj != null) {
                var value_ref0 = { refObj: value };
                var ret_val__52 = slot.refObj.TryGetTarget(value_ref0);
                value = value_ref0.refObj;
                if (ret_val__52) {
                    return value;
                }
            }
            //if (slot.refObj ? (() => {
            //    var value_ref0 = { refObj: value };
            //    var ret_val__52 =  .TryGetTarget(value_ref0);

            //    value = value_ref0.refObj;
            //    return ret_val__52;
            //})() == true)
            //{
            //    return value;
            //}
            return this.CreateWeakItem(slot, index);
        }
        private CreateWeakItem(slot: { refObj: System.WeakReference<SyntaxNode> }, index: number): SyntaxNode {
            var greenChild = this.Green.GetSlot(index);
            var newNode = greenChild.CreateRed_9614(this.Parent, this.GetChildPosition(index));
            var newWeakReference = new System.WeakReference<SyntaxNode>(newNode);
            while (true) {
                var previousNode: SyntaxNode = null;
                var previousWeakReference: System.WeakReference<SyntaxNode> = slot.refObj;
                var refPreviousNode = { refObj: previousNode };
                //if (previousWeakReference!=null&& previousWeakReference.TryGetTarget(out previousNode) == true)
                if (previousWeakReference != null && previousWeakReference.TryGetTarget(refPreviousNode) == true) {
                    previousNode = refPreviousNode.refObj;
                    return previousNode;
                }

                if (slot.refObj == previousWeakReference) {
                    slot.refObj = previousWeakReference;
                    return newNode;
                }

                //if ((() => {
                //    var slot_ref0 = { refObj: slot.refObj };
                //    var ret_val_ = System.Threading.Interlocked.CompareExchange(slot_ref0, newWeakReference, previousWeakReference);

                //    slot.refObj = slot_ref0.refObj;
                //    return ret_val_;
                //})() == previousWeakReference) {
                //    return newNode;
                //}
            }
        }
        public ToString(): string { throw new Error('not implemented'); }
        public ToFullString(): string { throw new Error('not implemented'); }
        public WriteTo(writer: System.IO.TextWriter): void { throw new Error('not implemented'); }
        public GetText(encoding: System.Text.Encoding = null, checksumAlgorithm: Text.SourceHashAlgorithm = Text.SourceHashAlgorithm.Sha1): Text.SourceText {
            var builder = new System.Text.StringBuilder();
            this.WriteTo(new System.IO.StringWriter(builder));
            return new Text.StringBuilderText().ctor_1446(builder, encoding, checksumAlgorithm);
        }
        public IsEquivalentTo_9689(other: SyntaxNode): boolean {
            return this.EquivalentToCore(other);
        }
        public get IsMissing(): boolean {
            return this.Green.IsMissing;
        }
        public IsPartOfStructuredTrivia(): boolean {
            for (var node = this; node != null; node = node.Parent) {
                if (node.IsStructuredTrivia)
                    return true;
            }
            return false;
        }
        public get IsStructuredTrivia(): boolean {
            return this.Green.IsStructuredTrivia;
        }
        public get HasStructuredTrivia(): boolean {
            return this.Green.ContainsStructuredTrivia && !this.Green.IsStructuredTrivia;
        }
        public get ContainsSkippedText(): boolean {
            return this.Green.ContainsSkippedText;
        }
        public get ContainsDirectives(): boolean {
            return this.Green.ContainsDirectives;
        }
        public get ContainsDiagnostics(): boolean {
            return this.Green.ContainsDiagnostics;
        }
        public get HasLeadingTrivia(): boolean {
            return this.Green.HasLeadingTrivia;
        }
        public get HasTrailingTrivia(): boolean {
            return this.Green.HasTrailingTrivia;
        }
        public GetCachedSlot(index: number): SyntaxNode { throw new Error('not implemented'); }
        public GetChildIndex(slot: number): number {
            var index: number = 0;
            for (var i: number = 0; i < slot; i++) {
                var item = this.Green.GetSlot(i);
                if (item != null) {
                    if (item.IsList) {
                        index += item.SlotCount;
                    }
                    else {
                        index++;
                    }
                }
            }
            return index;
        }
        public GetChildPosition(index: number): number {
            var offset: number = 0;
            var green = this.Green;
            while (index > 0) {
                index--;
                var prevSibling = this.GetCachedSlot(index);
                if (prevSibling != null) {
                    return prevSibling.EndPosition + offset;
                }
                var greenChild = green.GetSlot(index);
                if (greenChild != null) {
                    offset += greenChild.FullWidth;
                }
            }
            return this.Position + offset;
        }
        public GetLocation(): Location {
            return this.SyntaxTree.GetLocation(this.Span);
        }
        public GetDiagnostics(): System.Collections.Generic.IEnumerable<Diagnostic> {
            return this.SyntaxTree.GetDiagnostics_1067(this);
        }
        public GetReference(): SyntaxReference {
            return this.SyntaxTree.GetReference(this);
        }

        public getParent(): SyntaxNode {
            return this.parent;
        }


        public get Parent(): SyntaxNode {
            return this.parent;
        }
        public get ParentTrivia(): SyntaxTrivia {
            return structDefault(SyntaxTrivia);
        }

        public getParentOrStructuredTriviaParent(): SyntaxNode {
            return SyntaxNode.GetParent(this,/*ascendOutOfTrivia:*/true);
        }
        public get ParentOrStructuredTriviaParent(): SyntaxNode {
            return SyntaxNode.GetParent(this,/*ascendOutOfTrivia:*/true);
        }
        public ChildNodesAndTokens(): ChildSyntaxList {
            return new ChildSyntaxList().ctor_5028(this);
        }
        public ChildThatContainsPosition(position: number): SyntaxNodeOrToken { throw new Error('not implemented'); }
        public GetNodeSlot(slot: number): SyntaxNode { throw new Error('not implemented'); }
        public ChildNodes(): System.Collections.Generic.IEnumerable<SyntaxNode> {
            var __result = new Array<SyntaxNode>();
            // for each
            var nodeOrTokenEnumerator = this.ChildNodesAndTokens().GetEnumerator();
            try {
                while (nodeOrTokenEnumerator.MoveNext()) {
                    var nodeOrToken = nodeOrTokenEnumerator.Current;
                    // foreach block
                    if (nodeOrToken.IsNode) {
                        __result.push(nodeOrToken.AsNode());
                        //yield return nodeOrToken.AsNode();
                    }
                }
            } finally {
                if (nodeOrTokenEnumerator !== null) nodeOrTokenEnumerator.Dispose();

            }    
            // end foreach
            return __result;
        }
        public Ancestors(ascendOutOfTrivia: boolean = true): System.Collections.Generic.IEnumerable<SyntaxNode> {
            if (this.Parent == null) {
                return Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxNode>();
            }

            var result = this.Parent.AncestorsAndSelf(ascendOutOfTrivia);

            return result != null ? result : Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxNode>();
            //return this.Parent ?
            //    .AncestorsAndSelf(ascendOutOfTrivia) != null ? this.Parent ?
            //    .AncestorsAndSelf(ascendOutOfTrivia) : Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxNode>();
        }
        public AncestorsAndSelf(ascendOutOfTrivia: boolean = true): System.Collections.Generic.IEnumerable<SyntaxNode> {
            var __result = new Array<SyntaxNode>();
            for (var node = this; node != null; node = SyntaxNode.GetParent(node, ascendOutOfTrivia)) {
                __result.push(node);
                //yield return node;
            }
            return __result;
        }
        private static GetParent(node: SyntaxNode, ascendOutOfTrivia: boolean): SyntaxNode {
            var parent = node.Parent;
            if (parent == null && ascendOutOfTrivia) {
                //var structuredTrivia = __as__(node, IStructuredTriviaSyntax);
                var structuredTrivia = <IStructuredTriviaSyntax>node;

                if (structuredTrivia.ParentTrivia === void 0) {
                    structuredTrivia = null;
                }

                if (structuredTrivia != null) {
                    parent = structuredTrivia.ParentTrivia.Token.Parent;
                }
            }
            return parent;
        }
        public FirstAncestorOrSelf<TNode extends SyntaxNode>(type: { prototype: TNode }, predicate: (_: TNode) => boolean = null, ascendOutOfTrivia: boolean = true): TNode {
            for (var node = this; node != null; node = SyntaxNode.GetParent(node, ascendOutOfTrivia)) {
                //var tnode = __as__(node, TNode);
                var tnode = <TNode>node;
                if (!__classOfType(tnode, type)) {
                    tnode = null;
                }

                if (tnode != null && (predicate == null || predicate(tnode))) {
                    return tnode;
                }
            }
            return null;
        }
        public DescendantNodes_1576(descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxNode> {
            return this.DescendantNodesImpl(this.FullSpan, descendIntoChildren, descendIntoTrivia,/*includeSelf:*/false);
        }
        public DescendantNodes_9625(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxNode> {
            return this.DescendantNodesImpl(span, descendIntoChildren, descendIntoTrivia,/*includeSelf:*/false);
        }
        public DescendantNodesAndSelf_4808(descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxNode> {
            return this.DescendantNodesImpl(this.FullSpan, descendIntoChildren, descendIntoTrivia,/*includeSelf:*/true);
        }
        public DescendantNodesAndSelf_5609(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxNode> {
            return this.DescendantNodesImpl(span, descendIntoChildren, descendIntoTrivia,/*includeSelf:*/true);
        }
        public DescendantNodesAndTokens_1161(descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken> {
            return this.DescendantNodesAndTokensImpl(this.FullSpan, descendIntoChildren, descendIntoTrivia,/*includeSelf:*/false);
        }
        public DescendantNodesAndTokens_3345(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken> {
            return this.DescendantNodesAndTokensImpl(span, descendIntoChildren, descendIntoTrivia,/*includeSelf:*/false);
        }
        public DescendantNodesAndTokensAndSelf_1678(descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken> {
            return this.DescendantNodesAndTokensImpl(this.FullSpan, descendIntoChildren, descendIntoTrivia,/*includeSelf:*/true);
        }
        public DescendantNodesAndTokensAndSelf_4591(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken> {
            return this.DescendantNodesAndTokensImpl(span, descendIntoChildren, descendIntoTrivia,/*includeSelf:*/true);
        }
        public FindNode(span: Text.TextSpan, findInsideTrivia: boolean = false, getInnermostNodeForTie: boolean = false): SyntaxNode {
            if (!this.FullSpan.Contains_1915(span)) {
                throw new System.ArgumentOutOfRangeException("span");
            }
            var node = this.FindToken(span.Start, findInsideTrivia).Parent.FirstAncestorOrSelf<SyntaxNode>(a => a.FullSpan.Contains_1915(span));
            var cuRoot = node.SyntaxTree != null ? node.SyntaxTree.GetRoot() : null;
            if (!getInnermostNodeForTie) {
                while (true) {
                    var parent = node.Parent;
                    if (parent == null || parent.FullWidth != node.FullWidth)
                        break;
                    if (parent == cuRoot)
                        break;
                    node = parent;
                }
            }
            return node;
        }
        public FindToken(position: number, findInsideTrivia: boolean = false): SyntaxToken {
            return this.FindTokenCore_1334(position, findInsideTrivia);
        }
        public GetFirstToken(includeZeroWidth: boolean = false, includeSkipped: boolean = false, includeDirectives: boolean = false, includeDocumentationComments: boolean = false): SyntaxToken {
            return this.Navigator.GetFirstToken_1312(this, includeZeroWidth, includeSkipped, includeDirectives, includeDocumentationComments);
        }
        public GetLastToken(includeZeroWidth: boolean = false, includeSkipped: boolean = false, includeDirectives: boolean = false, includeDocumentationComments: boolean = false): SyntaxToken {
            return this.Navigator.GetLastToken_4205(this, includeZeroWidth, includeSkipped, includeDirectives, includeDocumentationComments);
        }
        public ChildTokens(): System.Collections.Generic.IEnumerable<SyntaxToken> {
            var __result = new Array<SyntaxToken>();
            // for each
            var nodeOrTokenEnumerator = this.ChildNodesAndTokens().GetEnumerator();
            try {
                while (nodeOrTokenEnumerator.MoveNext()) {
                    var nodeOrToken = nodeOrTokenEnumerator.Current;
                    // foreach block
                    if (nodeOrToken.IsToken) {
                        __result.push(nodeOrToken.AsToken());
                        //yield return nodeOrToken.AsToken();
                    }
                }
            } finally {
                if (nodeOrTokenEnumerator !== null) nodeOrTokenEnumerator.Dispose();

            }    
            // end foreach
            return __result;
        }
        public DescendantTokens_9785(descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxToken> {
            return System.Linq.Enumerable.Select(System.Linq.Enumerable.Where(this.DescendantNodesAndTokens_1161(descendIntoChildren, descendIntoTrivia),
                sn => sn.IsToken),
                sn => sn.AsToken());
        }
        public DescendantTokens_9576(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxToken> {
            return System.Linq.Enumerable.Select(System.Linq.Enumerable.Where(this.DescendantNodesAndTokens_3345(span, descendIntoChildren, descendIntoTrivia),
                sn => sn.IsToken),
                sn => sn.AsToken());
        }
        public GetLeadingTrivia(): SyntaxTriviaList {
            return this.GetFirstToken(/*includeZeroWidth:*/true, false, false, false).LeadingTrivia;
        }
        public GetTrailingTrivia(): SyntaxTriviaList {
            return this.GetLastToken(/*includeZeroWidth:*/true, false, false, false).TrailingTrivia;
        }
        public FindTrivia(position: number, findInsideTrivia: boolean = false): SyntaxTrivia {
            return this.FindTriviaCore(position, findInsideTrivia);
        }
        public DescendantTrivia_7298(descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxTrivia> {
            return this.DescendantTriviaImpl(this.FullSpan, descendIntoChildren, descendIntoTrivia);
        }
        public DescendantTrivia_9080(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxTrivia> {
            return this.DescendantTriviaImpl(span, descendIntoChildren, descendIntoTrivia);
        }
        public get ContainsAnnotations(): boolean {
            return this.Green.ContainsAnnotations;
        }
        public HasAnnotations_4203(annotationKind: string): boolean {
            return this.Green.HasAnnotations_4203(annotationKind);
        }
        public HasAnnotations_9693(annotationKinds: System.Collections.Generic.IEnumerable<string>): boolean {
            return this.Green.HasAnnotations_9693(annotationKinds);
        }
        public HasAnnotation(annotation: SyntaxAnnotation): boolean {
            return this.Green.HasAnnotation(annotation);
        }
        public GetAnnotations_1417(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            return this.Green.GetAnnotations_1417(annotationKind);
        }
        public GetAnnotations_2034(annotationKinds: System.Collections.Generic.IEnumerable<string>): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            return this.Green.GetAnnotations_2034(annotationKinds);
        }
        public GetAnnotations_1741(): SyntaxAnnotation[] {
            return this.Green.GetAnnotations_1741();
        }
        public GetAnnotatedNodesAndTokens_1420(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken> {
            return System.Linq.Enumerable.Where(this.DescendantNodesAndTokensAndSelf_1678(n => n.ContainsAnnotations,/*descendIntoTrivia:*/true),
                t => t.HasAnnotations_4203(annotationKind));
        }
        public GetAnnotatedNodesAndTokens_6260(...annotationKinds: string[]): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken> {
            return System.Linq.Enumerable.Where(this.DescendantNodesAndTokensAndSelf_1678(n => n.ContainsAnnotations,/*descendIntoTrivia:*/true),
                t => t.HasAnnotations_9693(annotationKinds));
        }
        public GetAnnotatedNodesAndTokens_1187(annotation: SyntaxAnnotation): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken> {
            return System.Linq.Enumerable.Where(this.DescendantNodesAndTokensAndSelf_1678(n => n.ContainsAnnotations,/*descendIntoTrivia:*/true),
                t => t.HasAnnotation(annotation));
        }
        public GetAnnotatedNodes_9485(syntaxAnnotation: SyntaxAnnotation): System.Collections.Generic.IEnumerable<SyntaxNode> {
            return System.Linq.Enumerable.Select(System.Linq.Enumerable.Where(this.GetAnnotatedNodesAndTokens_1187(syntaxAnnotation),
                n => n.IsNode),
                n => n.AsNode());
        }
        public GetAnnotatedNodes_1519(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxNode> {
            return System.Linq.Enumerable.Select(System.Linq.Enumerable.Where(this.GetAnnotatedNodesAndTokens_1420(annotationKind),
                n => n.IsNode),
                n => n.AsNode());
        }
        public GetAnnotatedTokens_1936(syntaxAnnotation: SyntaxAnnotation): System.Collections.Generic.IEnumerable<SyntaxToken> {
            return System.Linq.Enumerable.Select(System.Linq.Enumerable.Where(this.GetAnnotatedNodesAndTokens_1187(syntaxAnnotation),
                n => n.IsToken),
                n => n.AsToken());
        }
        public GetAnnotatedTokens_4443(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxToken> {
            return System.Linq.Enumerable.Select(System.Linq.Enumerable.Where(this.GetAnnotatedNodesAndTokens_1420(annotationKind),
                n => n.IsToken),
                n => n.AsToken());
        }
        public GetAnnotatedTrivia_1911(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxTrivia> {
            return System.Linq.Enumerable.Where(this.DescendantTrivia_7298(n => n.ContainsAnnotations,/*descendIntoTrivia:*/true),
                tr => tr.HasAnnotations_4203(annotationKind));
        }
        public GetAnnotatedTrivia_1609(...annotationKinds: string[]): System.Collections.Generic.IEnumerable<SyntaxTrivia> {
            return System.Linq.Enumerable.Where(this.DescendantTrivia_7298(n => n.ContainsAnnotations,/*descendIntoTrivia:*/true),
                tr => tr.HasAnnotations_1739_Arr(annotationKinds));
        }
        public GetAnnotatedTrivia_1355(annotation: SyntaxAnnotation): System.Collections.Generic.IEnumerable<SyntaxTrivia> {
            return System.Linq.Enumerable.Where(this.DescendantTrivia_7298(n => n.ContainsAnnotations,/*descendIntoTrivia:*/true),
                tr => tr.HasAnnotation(annotation));
        }
        public WithAdditionalAnnotationsInternal(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxNode {
            return GreenNodeExtensions.WithAdditionalAnnotationsGreen(this.Green,
                annotations).CreateRed_5702();
        }
        public GetNodeWithoutAnnotations(annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): SyntaxNode {
            return GreenNodeExtensions.WithoutAnnotationsGreen(this.Green,
                annotations).CreateRed_5702();
        }
        public CopyAnnotationsTo<T extends SyntaxNode>(node: T): T {
            if (node == null) {
                return null;
            }
            var annotations = this.Green.GetAnnotations_1741();
            if (annotations != null && annotations.length > 0)
            {
                return <T>(GreenNodeExtensions.WithAdditionalAnnotationsGreen(node.Green,
                    annotations)).CreateRed_5702();
            }
            return node;
        }
        public IsEquivalentTo_2068(node: SyntaxNode, topLevel: boolean = false): boolean {
            return this.IsEquivalentToCore(node, topLevel);
        }
        public SerializeTo(stream: System.IO.Stream, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): void { throw new Error('not implemented'); }
        protected  EquivalentToCore(other: SyntaxNode): boolean { throw new Error('not implemented'); }
        public SyntaxTreeCore: SyntaxTree;
        protected  FindTokenCore_1334(position: number, findInsideTrivia: boolean): SyntaxToken { throw new Error('not implemented'); }
        protected  FindTokenCore_1204(position: number, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken { throw new Error('not implemented'); }
        protected  FindTriviaCore(position: number, findInsideTrivia: boolean): SyntaxTrivia { throw new Error('not implemented'); }
        public ReplaceCore<TNode extends SyntaxNode>(nodes: System.Collections.Generic.IEnumerable<TNode> = null, computeReplacementNode: (_: TNode, __: TNode) => SyntaxNode = null, tokens: System.Collections.Generic.IEnumerable<SyntaxToken> = null, computeReplacementToken: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken = null, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia> = null, computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia = null): SyntaxNode { throw new Error('not implemented'); }
        public ReplaceNodeInListCore(originalNode: SyntaxNode, replacementNodes: System.Collections.Generic.IEnumerable<SyntaxNode>): SyntaxNode { throw new Error('not implemented'); }
        public InsertNodesInListCore(nodeInList: SyntaxNode, nodesToInsert: System.Collections.Generic.IEnumerable<SyntaxNode>, insertBefore: boolean): SyntaxNode { throw new Error('not implemented'); }
        public ReplaceTokenInListCore(originalToken: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxNode { throw new Error('not implemented'); }
        public InsertTokensInListCore(originalToken: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>, insertBefore: boolean): SyntaxNode { throw new Error('not implemented'); }
        public ReplaceTriviaInListCore(originalTrivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxNode { throw new Error('not implemented'); }
        public InsertTriviaInListCore(originalTrivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, insertBefore: boolean): SyntaxNode { throw new Error('not implemented'); }
        public RemoveNodesCore(nodes: System.Collections.Generic.IEnumerable<SyntaxNode>, options: SyntaxRemoveOptions): SyntaxNode { throw new Error('not implemented'); }
        public NormalizeWhitespaceCore(indentation: string, elasticTrivia: boolean): SyntaxNode { throw new Error('not implemented'); }
        protected  IsEquivalentToCore(node: SyntaxNode, topLevel: boolean = false): boolean { throw new Error('not implemented'); }
        
        // partial
        private DescendantNodesImpl(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean, descendIntoTrivia: boolean, includeSelf: boolean): System.Collections.Generic.IEnumerable<SyntaxNode> {
            return descendIntoTrivia ? System.Linq.Enumerable.Select(System.Linq.Enumerable.Where(this.DescendantNodesAndTokensImpl(span, descendIntoChildren, descendIntoTrivia, includeSelf),
                e => e.IsNode),
                e => e.AsNode()) : this.DescendantNodesOnly(span, descendIntoChildren, includeSelf);
        }
        private DescendantNodesAndTokensImpl(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean, descendIntoTrivia: boolean, includeSelf: boolean): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken> {
            return descendIntoTrivia ? this.DescendantNodesAndTokensIntoTrivia(span, descendIntoChildren, includeSelf) : this.DescendantNodesAndTokensOnly(span, descendIntoChildren, includeSelf);
        }
        private DescendantTriviaImpl(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean = null, descendIntoTrivia: boolean = false): System.Collections.Generic.IEnumerable<SyntaxTrivia> {
            return descendIntoTrivia ? this.DescendantTriviaIntoTrivia(span, descendIntoChildren) : this.DescendantTriviaOnly(span, descendIntoChildren);
        }
        public static IsInSpan(span: { refObj: Text.TextSpan }, childSpan: Text.TextSpan): boolean {
            return span.refObj.OverlapsWith(childSpan) || (childSpan.Length == 0 && span.refObj.IntersectsWith_1989(childSpan));
        }
        private DescendantNodesOnly(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean, includeSelf: boolean): System.Collections.Generic.IEnumerable<SyntaxNode> {
            var __result = new Array<SyntaxNode>();
            if (includeSelf && (() => {
                var span_ref0 = { refObj: span };
                var ret_val__811 = SyntaxNode.IsInSpan(span_ref0, this.FullSpan);

                span = span_ref0.refObj;
                return ret_val__811;
            })()) {
                __result.push(this);
                //yield return this;
            }
            var stack = new SyntaxNode.ChildSyntaxListEnumeratorStack().ctor_1506(this, descendIntoChildren)
            try
            {
                while (stack.IsNotEmpty) {
                    var span_ref0 = { refObj: span };
                    var ret_val__547 = stack.TryGetNextAsNodeInSpan(span_ref0);

                    span = span_ref0.refObj;
                    var nodeValue: SyntaxNode = ret_val__547;
                    if (nodeValue != null) {
                        stack.PushChildren_1656(nodeValue, descendIntoChildren);
                        __result.push(nodeValue);
                        //yield return nodeValue;
                    }
                }
            }
            finally {
                if (stack != null) stack.Dispose();
            }
            return __result;
        }
        private DescendantNodesAndTokensOnly(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean, includeSelf: boolean): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken> {
            var __result = new Array<SyntaxNodeOrToken>();
            if (includeSelf && (() => {
                var span_ref0 = { refObj: span };
                var ret_val__880 = SyntaxNode.IsInSpan(span_ref0, this.FullSpan);

                span = span_ref0.refObj;
                return ret_val__880;
            })()) {
                __result.push(SyntaxNodeOrToken.op_Implicit_1792(this));
                //yield return this;
            }
            var stack = new SyntaxNode.ChildSyntaxListEnumeratorStack().ctor_1506(this, descendIntoChildren)
            try
            {
                while (stack.IsNotEmpty) {
                    var value: SyntaxNodeOrToken = structDefault(SyntaxNodeOrToken);
                    var span_ref0 = { refObj: span };
                    var value_ref1 = { refObj: value };
                    var ret_val__14 = stack.TryGetNextInSpan(span_ref0, value_ref1);

                    span = span_ref0.refObj;

                    value = value_ref1.refObj;
                    if (ret_val__14) {
                        var nodeValue = value.AsNode();
                        if (nodeValue != null) {
                            stack.PushChildren_1656(nodeValue, descendIntoChildren);
                        }
                        __result.push(value);
                        //yield return value;
                    }
                }
            }
            finally {
                if (stack != null) stack.Dispose();
            }
            return __result;
        }
        private DescendantNodesAndTokensIntoTrivia(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean, includeSelf: boolean): System.Collections.Generic.IEnumerable<SyntaxNodeOrToken> {
            var __result = new Array<SyntaxNodeOrToken>();
            if (includeSelf && (() => {
                var span_ref0 = { refObj: span };
                var ret_val__856 = SyntaxNode.IsInSpan(span_ref0, this.FullSpan);

                span = span_ref0.refObj;
                return ret_val__856;
            })()) {
                __result.push(SyntaxNodeOrToken.op_Implicit_1792(this));
                //yield return this;
            }
            var stack = new SyntaxNode.ThreeEnumeratorListStack().ctor_4049(this, descendIntoChildren)
            try
            {
                while (stack.IsNotEmpty) {
                    switch (stack.PeekNext()) {
                        case SyntaxNode.ThreeEnumeratorListStack.Which.Node:
                            var value: SyntaxNodeOrToken = structDefault(SyntaxNodeOrToken);
                            var span_ref0 = { refObj: span };
                            var value_ref1 = { refObj: value };
                            var ret_val__703 = stack.TryGetNextInSpan(span_ref0, value_ref1);

                            span = span_ref0.refObj;

                            value = value_ref1.refObj;
                            if (ret_val__703) {
                                if (value.IsNode) {
                                    stack.PushChildren(value.AsNode(), descendIntoChildren);
                                }
                                else if (value.IsToken) {
                                    var token = value.AsToken();
                                    if (token.HasStructuredTrivia) {
                                        if (token.HasTrailingTrivia) {
                                            var token_ref0 = { refObj: token };
                                            stack.PushTrailingTrivia(token_ref0);

                                            token = token_ref0.refObj;;
                                        }
                                        var value_ref0 = { refObj: value };
                                        stack.PushToken(value_ref0);

                                        value = value_ref0.refObj;;
                                        if (token.HasLeadingTrivia) {
                                            var token_ref0 = { refObj: token };
                                            stack.PushLeadingTrivia(token_ref0);

                                            token = token_ref0.refObj;;
                                        }
                                        break;
                                    }
                                }
                                __result.push(value);
                                //yield return value;
                            }
                            break;
                        case SyntaxNode.ThreeEnumeratorListStack.Which.Trivia:
                            var trivia: SyntaxTrivia = structDefault(SyntaxTrivia);
                            var trivia_ref0 = { refObj: trivia };
                            var ret_val__264 = stack.TryGetNext(trivia_ref0);

                            trivia = trivia_ref0.refObj;
                            if (ret_val__264) {
                                if (trivia.HasStructure && (() => {
                                    var span_ref0 = { refObj: span };
                                    var ret_val__564 = SyntaxNode.IsInSpan(span_ref0, trivia.FullSpan);

                                    span = span_ref0.refObj;
                                    return ret_val__564;
                                })()) {
                                    var structureNode = trivia.GetStructure();
                                    stack.PushChildren(structureNode, descendIntoChildren);
                                    __result.push(SyntaxNodeOrToken.op_Implicit_1792(structureNode));
                                    //yield return structureNode;
                                }
                            }
                            break;
                        case SyntaxNode.ThreeEnumeratorListStack.Which.Token:
                            __result.push(stack.PopToken());
                            //yield return stack.PopToken();
                            break;
                    }
                }
            }
            finally {
                if (stack != null) stack.Dispose();
            }
            return __result;
        }
        private DescendantTriviaOnly(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean): System.Collections.Generic.IEnumerable<SyntaxTrivia> {
            var __result = new Array<SyntaxTrivia>();
            var stack = new SyntaxNode.ChildSyntaxListEnumeratorStack().ctor_1506(this, descendIntoChildren)
            try
            {
                var value: SyntaxNodeOrToken = structDefault(SyntaxNodeOrToken);
                while (stack.IsNotEmpty) {
                    var span_ref0 = { refObj: span };
                    var value_ref1 = { refObj: value };
                    var ret_val__207 = stack.TryGetNextInSpan(span_ref0, value_ref1);

                    span = span_ref0.refObj;

                    value = value_ref1.refObj;
                    if (ret_val__207) {
                        if (value.IsNode) {
                            var nodeValue = value.AsNode();
                            stack.PushChildren_1656(nodeValue, descendIntoChildren);
                        }
                        else if (value.IsToken) {
                            var token = value.AsToken();
                            // for each
                            var triviaEnumerator = token.LeadingTrivia.GetEnumerator();
                            try {
                                while (triviaEnumerator.MoveNext()) {
                                    var trivia = triviaEnumerator.Current;
                                    // foreach block
                                    var span_ref0 = { refObj: span };
                                    var ret_val__684 = SyntaxNode.IsInSpan(span_ref0, trivia.FullSpan);

                                    span = span_ref0.refObj;
                                    if (ret_val__684) {
                                        __result.push(trivia);
                                        //yield return trivia;
                                    }
                                }
                            } finally {
                                if (triviaEnumerator !== null) triviaEnumerator.Dispose();

                            }    
                            // end foreach
                            // for each
                            var triviaEnumerator = token.TrailingTrivia.GetEnumerator();
                            try {
                                while (triviaEnumerator.MoveNext()) {
                                    var trivia = triviaEnumerator.Current;
                                    // foreach block
                                    var span_ref0 = { refObj: span };
                                    var ret_val__192 = SyntaxNode.IsInSpan(span_ref0, trivia.FullSpan);

                                    span = span_ref0.refObj;
                                    if (ret_val__192) {
                                        __result.push(trivia);
                                        //yield return trivia;
                                    }
                                }
                            } finally {
                                if (triviaEnumerator !== null) triviaEnumerator.Dispose();

                            }    
                            // end foreach
                        }
                    }
                }
            }
            finally {
                if (stack != null) stack.Dispose();
            }
            return __result;
        }
        private DescendantTriviaIntoTrivia(span: Text.TextSpan, descendIntoChildren: (_: SyntaxNode) => boolean): System.Collections.Generic.IEnumerable<SyntaxTrivia> {
            var __result = new Array<SyntaxTrivia>();
            var stack = new SyntaxNode.TwoEnumeratorListStack().ctor_3899(this, descendIntoChildren)
            try
            {
                while (stack.IsNotEmpty) {
                    switch (stack.PeekNext()) {
                        case SyntaxNode.TwoEnumeratorListStack.Which.Node:
                            var value: SyntaxNodeOrToken = structDefault(SyntaxNodeOrToken);
                            var span_ref0 = { refObj: span };
                            var value_ref1 = { refObj: value };
                            var ret_val__351 = stack.TryGetNextInSpan(span_ref0, value_ref1);

                            span = span_ref0.refObj;

                            value = value_ref1.refObj;
                            if (ret_val__351) {
                                if (value.IsNode) {
                                    var nodeValue = value.AsNode();
                                    stack.PushChildren(nodeValue, descendIntoChildren);
                                }
                                else if (value.IsToken) {
                                    var token = value.AsToken();
                                    if (token.HasTrailingTrivia) {
                                        var token_ref0 = { refObj: token };
                                        stack.PushTrailingTrivia(token_ref0);

                                        token = token_ref0.refObj;;
                                    }
                                    if (token.HasLeadingTrivia) {
                                        var token_ref0 = { refObj: token };
                                        stack.PushLeadingTrivia(token_ref0);

                                        token = token_ref0.refObj;;
                                    }
                                }
                            }
                            break;
                        case SyntaxNode.TwoEnumeratorListStack.Which.Trivia:
                            var trivia: SyntaxTrivia = structDefault(SyntaxTrivia);
                            var trivia_ref0 = { refObj: trivia };
                            var ret_val__968 = stack.TryGetNext(trivia_ref0);

                            trivia = trivia_ref0.refObj;
                            if (ret_val__968) {
                                if (trivia.HasStructure) {
                                    var structureNode = trivia.GetStructure();
                                    stack.PushChildren(structureNode, descendIntoChildren);
                                }
                                var span_ref0 = { refObj: span };
                                var ret_val__61 = SyntaxNode.IsInSpan(span_ref0, trivia.FullSpan);

                                span = span_ref0.refObj;
                                if (ret_val__61) {
                                    __result.push(trivia);
                                    //yield return trivia;
                                }
                            }
                            break;
                    }
                }
            }
            finally {
                if (stack != null) stack.Dispose();
            }
            return __result;
        }
        constructor() { }
    }
    export module SyntaxNode {
        export class ChildSyntaxListEnumeratorStack implements System.IDisposable, IStruct {
            private static StackPool: Roslyn.Utilities.ObjectPool<ChildSyntaxList.Enumerator[]> = new Roslyn.Utilities.ObjectPool<ChildSyntaxList.Enumerator[]>().ctor_3306(() => StructArray(ChildSyntaxList.Enumerator, 16));
            private stack: ChildSyntaxList.Enumerator[];
            private stackPtr: number = 0;
            ctor_1506(startingNode: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): ChildSyntaxListEnumeratorStack {
                if (descendIntoChildren == null || descendIntoChildren(startingNode)) {
                    this.stack = ChildSyntaxListEnumeratorStack.StackPool.Allocate();
                    this.stackPtr = 0;
                    this.stack[0].InitializeFrom(startingNode);
                }
                else {
                    this.stack = null;
                    this.stackPtr = -1;
                }
                return this;
            }
            public get IsNotEmpty(): boolean {
                return this.stackPtr >= 0;
            }
            public TryGetNextInSpan(span: { refObj: Text.TextSpan }, value: { refObj: SyntaxNodeOrToken }): boolean {
                value.refObj = structDefault(SyntaxNodeOrToken);
                while (this.stack[this.stackPtr].TryMoveNextAndGetCurrent(value)) {
                    if (SyntaxNode. IsInSpan(span, value.refObj.FullSpan)) {
                        return true;
                    }
                }
                this.stackPtr--;
                return false;
            }
            public TryGetNextAsNodeInSpan(span: { refObj: Text.TextSpan }): SyntaxNode {
                var nodeValue: SyntaxNode;
                while ((nodeValue = this.stack[this.stackPtr].TryMoveNextAndGetCurrentAsNode()) != null) {
                    if (SyntaxNode.IsInSpan(span, nodeValue.FullSpan)) {
                        return nodeValue;
                    }
                }
                this.stackPtr--;
                return null;
            }
            public PushChildren_4828(node: SyntaxNode): void {
                if (++this.stackPtr >= this.stack.length) {
                    var stack_ref0 = { refObj: this.stack };
                    TSArray.Resize(stack_ref0,(this.stackPtr * 2));

                    this.stack = stack_ref0.refObj;;
                }
                this.stack[this.stackPtr].InitializeFrom(node);
            }
            public PushChildren_1656(node: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): void {
                if (descendIntoChildren == null || descendIntoChildren(node)) {
                    this.PushChildren_4828(node);
                }
            }
            public Dispose(): void {
                if (this.stack != null && this.stack.length < 256)
                {
                    TSArray.Clear(this.stack, 0, this.stack.length);
                    ChildSyntaxListEnumeratorStack.StackPool.Free(this.stack);
                }
            }
            constructor() { }
        }
    }

    export module SyntaxNode {
        export class TriviaListEnumeratorStack implements System.IDisposable, IStruct {
            private static StackPool:
            Roslyn.Utilities.ObjectPool<SyntaxTriviaList.Enumerator[]> =
            new Roslyn.Utilities.ObjectPool<SyntaxTriviaList.Enumerator[]>().ctor_3306(() => StructArray(SyntaxTriviaList.Enumerator, 16));
            private stack: SyntaxTriviaList.Enumerator[];
            private stackPtr: number = 0;
            public TryGetNext(value: { refObj: SyntaxTrivia }): boolean {
                value.refObj = structDefault(SyntaxTrivia);
                if (this.stack[this.stackPtr].TryMoveNextAndGetCurrent(value)) {
                    return true;
                }
                this.stackPtr--;
                return false;
            }
            public PushLeadingTrivia(token: { refObj: SyntaxToken }): void {
                this.Grow();
                this.stack[this.stackPtr].InitializeFromLeadingTrivia(token);
            }
            public PushTrailingTrivia(token: { refObj: SyntaxToken }): void {
                this.Grow();
                this.stack[this.stackPtr].InitializeFromTrailingTrivia(token);
            }
            private Grow(): void {
                if (this.stack == null) {
                    this.stack = TriviaListEnumeratorStack.StackPool.Allocate();
                    this.stackPtr = -1;
                }
                if (++this.stackPtr >= this.stack.length) {
                    var stack_ref0 = { refObj: this.stack };
                    TSArray.Resize(stack_ref0,(this.stackPtr * 2));

                    this.stack = stack_ref0.refObj;;
                }
            }
            public Dispose(): void {
                //if (this.stack ?.length < 256)
                if (this.stack != null && this.stack.length < 256) 
                {
                    TSArray.Clear(this.stack, 0, this.stack.length);
                    TriviaListEnumeratorStack.StackPool.Free(this.stack);
                }
            }
            constructor() { }
        }
    }
    export module SyntaxNode {
        export class TwoEnumeratorListStack implements System.IDisposable, IStruct {
            private nodeStack: ChildSyntaxListEnumeratorStack = structDefault(ChildSyntaxListEnumeratorStack);
            private triviaStack: TriviaListEnumeratorStack = structDefault(TriviaListEnumeratorStack);
            private discriminatorStack: ArrayBuilder<TwoEnumeratorListStack.Which>;
            ctor_3899(startingNode: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): TwoEnumeratorListStack {
                this.nodeStack = new ChildSyntaxListEnumeratorStack().ctor_1506(startingNode, descendIntoChildren);
                this.triviaStack = new TriviaListEnumeratorStack();
                if (this.nodeStack.IsNotEmpty) {
                    this.discriminatorStack = ArrayBuilder.GetInstance_1997<TwoEnumeratorListStack.Which>();
                    ArrayBuilderExtensions.Push(this.discriminatorStack,
                        TwoEnumeratorListStack.Which.Node);
                }
                else {
                    this.discriminatorStack = null;
                }
                return this;
            }
            public get IsNotEmpty(): boolean {
                //return this.discriminatorStack ?.Count > 0;
                return this.discriminatorStack != null && this.discriminatorStack.Count > 0;
            }
            public PeekNext(): TwoEnumeratorListStack.Which {
                return ArrayBuilderExtensions.Peek(this.discriminatorStack);
            }
            public TryGetNextInSpan(span: { refObj: Text.TextSpan }, value: { refObj: SyntaxNodeOrToken }): boolean {
                if (this.nodeStack.TryGetNextInSpan(span, value)) {
                    return true;
                }
                ArrayBuilderExtensions.Pop(this.discriminatorStack);
                return false;
            }
            public TryGetNext(value: { refObj: SyntaxTrivia }): boolean {
                if (this.triviaStack.TryGetNext(value)) {
                    return true;
                }
                ArrayBuilderExtensions.Pop(this.discriminatorStack);
                return false;
            }
            public PushChildren(node: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): void {
                if (descendIntoChildren == null || descendIntoChildren(node)) {
                    this.nodeStack.PushChildren_4828(node);
                    ArrayBuilderExtensions.Push(this.discriminatorStack,
                        TwoEnumeratorListStack.Which.Node);
                }
            }
            public PushLeadingTrivia(token: { refObj: SyntaxToken }): void {
                this.triviaStack.PushLeadingTrivia(token);
                ArrayBuilderExtensions.Push(this.discriminatorStack,
                    TwoEnumeratorListStack.Which.Trivia);
            }
            public PushTrailingTrivia(token: { refObj: SyntaxToken }): void {
                this.triviaStack.PushTrailingTrivia(token);
                ArrayBuilderExtensions.Push(this.discriminatorStack,
                    TwoEnumeratorListStack.Which.Trivia);
            }
            public Dispose(): void {
                this.nodeStack.Dispose();
                this.triviaStack.Dispose();
                if (this.discriminatorStack != null) {
                    this.discriminatorStack.Free();
                }
            }
            constructor() { }
        }
        export module TwoEnumeratorListStack {
            export enum Which {
                Node,
                Trivia
            }
        }
    }
    export module SyntaxNode {
        export class ThreeEnumeratorListStack implements System.IDisposable, IStruct {
            private nodeStack: ChildSyntaxListEnumeratorStack = structDefault(ChildSyntaxListEnumeratorStack);
            private triviaStack: TriviaListEnumeratorStack = structDefault(TriviaListEnumeratorStack);
            private tokenStack: ArrayBuilder<SyntaxNodeOrToken>;
            private discriminatorStack: ArrayBuilder<ThreeEnumeratorListStack.Which>;
            ctor_4049(startingNode: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): ThreeEnumeratorListStack {
                this.nodeStack = new ChildSyntaxListEnumeratorStack().ctor_1506(startingNode, descendIntoChildren);
                this.triviaStack = new TriviaListEnumeratorStack();
                if (this.nodeStack.IsNotEmpty) {
                    this.tokenStack = ArrayBuilder.GetInstance_1997<SyntaxNodeOrToken>();
                    this.discriminatorStack = ArrayBuilder.GetInstance_1997<ThreeEnumeratorListStack.Which>();
                    ArrayBuilderExtensions.Push(this.discriminatorStack,
                        ThreeEnumeratorListStack.Which.Node);
                }
                else {
                    this.tokenStack = null;
                    this.discriminatorStack = null;
                }
                return this;
            }
            public get IsNotEmpty(): boolean {
                //return this.discriminatorStack ?.Count > 0;
                return this.discriminatorStack != null && this.discriminatorStack.Count > 0;
            }
            public PeekNext(): ThreeEnumeratorListStack.Which {
                return ArrayBuilderExtensions.Peek(this.discriminatorStack);
            }
            public TryGetNextInSpan(span: { refObj: Text.TextSpan }, value: { refObj: SyntaxNodeOrToken }): boolean {
                if (this.nodeStack.TryGetNextInSpan(span, value)) {
                    return true;
                }
                ArrayBuilderExtensions.Pop(this.discriminatorStack);
                return false;
            }
            public TryGetNext(value: { refObj: SyntaxTrivia }): boolean {
                if (this.triviaStack.TryGetNext(value)) {
                    return true;
                }
                ArrayBuilderExtensions.Pop(this.discriminatorStack);
                return false;
            }
            public PopToken(): SyntaxNodeOrToken {
                ArrayBuilderExtensions.Pop(this.discriminatorStack);
                return ArrayBuilderExtensions.Pop(this.tokenStack);
            }
            public PushChildren(node: SyntaxNode, descendIntoChildren: (_: SyntaxNode) => boolean): void {
                if (descendIntoChildren == null || descendIntoChildren(node)) {
                    this.nodeStack.PushChildren_4828(node);
                    ArrayBuilderExtensions.Push(this.discriminatorStack,
                        ThreeEnumeratorListStack.Which.Node);
                }
            }
            public PushLeadingTrivia(token: { refObj: SyntaxToken }): void {
                this.triviaStack.PushLeadingTrivia(token);
                ArrayBuilderExtensions.Push(this.discriminatorStack,
                    ThreeEnumeratorListStack.Which.Trivia);
            }
            public PushTrailingTrivia(token: { refObj: SyntaxToken }): void {
                this.triviaStack.PushTrailingTrivia(token);
                ArrayBuilderExtensions.Push(this.discriminatorStack,
                    ThreeEnumeratorListStack.Which.Trivia);
            }
            public PushToken(value: { refObj: SyntaxNodeOrToken }): void {
                ArrayBuilderExtensions.Push(this.tokenStack,
                    value.refObj);
                ArrayBuilderExtensions.Push(this.discriminatorStack,
                    ThreeEnumeratorListStack.Which.Token);
            }
            public Dispose(): void {
                this.nodeStack.Dispose();
                this.triviaStack.Dispose();
                if (this.tokenStack != null) {
                    this.tokenStack.Free();
                }
                if (this.discriminatorStack == null) {
                    this.discriminatorStack.Free();
                }
            }
            constructor() { }
        }
        export module ThreeEnumeratorListStack {
            export enum Which {
                Node,
                Trivia,
                Token
            }
        }
    }
}