
module Microsoft.CodeAnalysis {
    export class GreenNode implements Roslyn.Utilities.IObjectWritable, Roslyn.Utilities.IObjectReadable {
        public static ListKind: number = 1;
        private kind: number = 0;
        protected flags: GreenNode.NodeFlags = 0;
        private slotCount: number = 0;
        private fullWidth: number = 0;
        private static diagnosticsTable: System.Runtime.CompilerServices.ConditionalWeakTable<GreenNode, DiagnosticInfo[]> = new System.Runtime.CompilerServices.ConditionalWeakTable<GreenNode, DiagnosticInfo[]>();
        private static annotationsTable: System.Runtime.CompilerServices.ConditionalWeakTable<GreenNode, SyntaxAnnotation[]> = new System.Runtime.CompilerServices.ConditionalWeakTable<GreenNode, SyntaxAnnotation[]>();
        private static NoDiagnostics: DiagnosticInfo[] = Roslyn.Utilities.SpecializedCollections.EmptyArray<DiagnosticInfo>();
        private static NoAnnotations: SyntaxAnnotation[] = Roslyn.Utilities.SpecializedCollections.EmptyArray<SyntaxAnnotation>();
        private static NoAnnotationsEnumerable: System.Collections.Generic.IEnumerable<SyntaxAnnotation> = Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<SyntaxAnnotation>();
        ctor_1817(kind: number): GreenNode {
            this.kind = kind;
            return this;
        }
        ctor_1801(kind: number, fullWidth: number): GreenNode {
            this.kind = kind;
            this.fullWidth = fullWidth;
            return this;
        }
        ctor_1879(kind: number, diagnostics: DiagnosticInfo[], fullWidth: number): GreenNode {
            this.kind = kind;
            this.fullWidth = fullWidth;
            if (diagnostics != null && diagnostics.length > 0)
            {
                this.flags |= GreenNode.NodeFlags.ContainsDiagnostics;
                GreenNode.diagnosticsTable.Add(this, diagnostics);
            }
            return this;
        }
        ctor_1355(kind: number, diagnostics: DiagnosticInfo[]): GreenNode {
            this.kind = kind;
            if (diagnostics != null && diagnostics.length > 0)
            {
                this.flags |= GreenNode.NodeFlags.ContainsDiagnostics;
                GreenNode.diagnosticsTable.Add(this, diagnostics);
            }
            return this;
        }
        ctor_6664(kind: number, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): GreenNode {
            this.ctor_1355(kind, diagnostics);
            if (annotations != null && annotations .length > 0)
            {
                // for each
                var annotationEnumerator = annotations.GetEnumerator();
                try {
                    while (annotationEnumerator.MoveNext()) {
                        var annotation = annotationEnumerator.Current;
                        // foreach block
                        if (annotation ==null)
                            throw new System.ArgumentException(/*paramName:*/"annotations",/*message:*/"");
                    }
                } finally {
                    if (annotationEnumerator !== null) annotationEnumerator.Dispose();

                }    
                // end foreach
                this.flags |= GreenNode.NodeFlags.ContainsAnnotations;
                GreenNode.annotationsTable.Add(this, annotations);
            }
            return this;
        }
        ctor_7650(kind: number, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[], fullWidth: number): GreenNode {
            this.ctor_1879(kind, diagnostics, fullWidth);
            if (annotations != null && annotations .length > 0)
            {
                // for each
                var annotationEnumerator = annotations.GetEnumerator();
                try {
                    while (annotationEnumerator.MoveNext()) {
                        var annotation = annotationEnumerator.Current;
                        // foreach block
                        if (annotation ==null)
                            throw new System.ArgumentException(/*paramName:*/"annotations",/*message:*/"");
                    }
                } finally {
                    if (annotationEnumerator !== null) annotationEnumerator.Dispose();

                }    
                // end foreach
                this.flags |= GreenNode.NodeFlags.ContainsAnnotations;
                GreenNode.annotationsTable.Add(this, annotations);
            }
            return this;
        }
        protected AdjustFlagsAndWidth(node: GreenNode): void {
            System.Diagnostics.Debug.Assert(node != null, "PERF: caller must ensure that node!=null, we do not want to re-check that here.");
            this.flags |= (node.flags & GreenNode.NodeFlags.InheritMask);
            this.fullWidth += node.fullWidth;
        }
        public Language: string;
        public get RawKind(): number {
            return this.kind;
        }
        public get IsList(): boolean {
            return this.RawKind == GreenNode.ListKind;
        }
        public KindText: string;
        public get IsStructuredTrivia(): boolean {
            return false;
        }
        public get IsDirective(): boolean {
            return false;
        }
        public get IsToken(): boolean {
            return false;
        }
        public get SlotCount(): number {
            var count: number = this.slotCount;
            if (count == Byte.MaxValue) {
                count = this.GetSlotCount();
            }
            return count;
        }
        public set SlotCount(value: number) {
            this.slotCount = <number>value;
        }
        public GetSlot(index: number): GreenNode { throw new Error('not implemented'); }
        protected  GetSlotCount(): number {
            return this.slotCount;
        }
        public GetSlotOffset(index: number): number { throw new Error('not implemented'); }
        public get Flags(): GreenNode.NodeFlags {
            return this.flags;
        }
        public SetFlags(flags: GreenNode.NodeFlags): void {
            this.flags |= flags;
        }
        public ClearFlags(flags: GreenNode.NodeFlags): void {
            this.flags &= ~flags;
        }
        public get IsMissing(): boolean {
            return (this.flags & GreenNode.NodeFlags.IsNotMissing) == 0;
        }
        public get ParsedInAsync(): boolean {
            return (this.flags & GreenNode.NodeFlags.FactoryContextIsInAsync) != 0;
        }
        public get ParsedInQuery(): boolean {
            return (this.flags & GreenNode.NodeFlags.FactoryContextIsInQuery) != 0;
        }
        public get ParsedInIterator(): boolean {
            return (this.flags & GreenNode.NodeFlags.FactoryContextIsInIterator) != 0;
        }
        public get ContainsSkippedText(): boolean {
            return (this.flags & GreenNode.NodeFlags.ContainsSkippedText) != 0;
        }
        public get ContainsStructuredTrivia(): boolean {
            return (this.flags & GreenNode.NodeFlags.ContainsStructuredTrivia) != 0;
        }
        public get ContainsDirectives(): boolean {
            return (this.flags & GreenNode.NodeFlags.ContainsDirectives) != 0;
        }
        public get ContainsDiagnostics(): boolean {
            return (this.flags & GreenNode.NodeFlags.ContainsDiagnostics) != 0;
        }
        public get ContainsAnnotations(): boolean {
            return (this.flags & GreenNode.NodeFlags.ContainsAnnotations) != 0;
        }
        public get FullWidth(): number {
            return this.fullWidth;
        }
        public set FullWidth(value: number) {
            this.fullWidth = value;
        }
        public get Width(): number {
            return this.fullWidth - this.GetLeadingTriviaWidth() - this.GetTrailingTriviaWidth();
        }
        public GetLeadingTriviaWidth(): number {
            return this.FullWidth != 0 ? this.GetFirstTerminal().GetLeadingTriviaWidth() : 0;
        }
        public GetTrailingTriviaWidth(): number {
            return this.FullWidth != 0 ? this.GetLastTerminal().GetTrailingTriviaWidth() : 0;
        }
        public get HasLeadingTrivia(): boolean {
            return this.GetLeadingTriviaWidth() != 0;
        }
        public get HasTrailingTrivia(): boolean {
            return this.GetTrailingTriviaWidth() != 0;
        }
        private static ExtendedSerializationInfoMask: number = (<number>(1 << 15 | 0));
        ctor_1105(reader: Roslyn.Utilities.ObjectReader): GreenNode {
            var kindBits = reader.ReadUInt16();
            this.kind = <number>(kindBits & ~GreenNode.ExtendedSerializationInfoMask);
            if ((kindBits & GreenNode.ExtendedSerializationInfoMask) != 0) {
                var diagnostics = <DiagnosticInfo[]>reader.ReadValue();
                if (diagnostics != null && diagnostics.length > 0) {
                    this.flags |= GreenNode.NodeFlags.ContainsDiagnostics;
                    GreenNode.diagnosticsTable.Add(this, diagnostics);
                }
                var annotations = <SyntaxAnnotation[]>reader.ReadValue();
                if (annotations != null && annotations.length > 0) {
                    this.flags |= GreenNode.NodeFlags.ContainsAnnotations;
                    GreenNode.annotationsTable.Add(this, annotations);
                }
            }
            return this;
        }
        WriteTo(writer: Roslyn.Utilities.ObjectWriter): void {
            this.WriteTo_2123(writer);
        }
      
        public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
            var kindBits = <number>this.kind;
            var hasDiagnostics = this.GetDiagnostics().length > 0;
            var hasAnnotations = this.GetAnnotations_1741().length > 0;
            if (hasDiagnostics || hasAnnotations) {
                kindBits |= GreenNode.ExtendedSerializationInfoMask;
            }
            writer.WriteUInt16(kindBits);
            if (hasDiagnostics || hasAnnotations) {
                writer.WriteValue(hasDiagnostics ? this.GetDiagnostics() : null);
                writer.WriteValue(hasAnnotations ? this.GetAnnotations_1741() : null);
            }
        }
        //Roslyn.Utilities.IObjectReadable.GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
        //    return this.GetReader();
        //}
        public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object { throw new Error('not implemented'); }
        public HasAnnotations_4203(annotationKind: string): boolean {
            var annotations = this.GetAnnotations_1741();
            if (annotations == GreenNode.NoAnnotations) {
                return false;
            }
            // for each
            var aEnumerator = annotations.GetEnumerator();
            try {
                while (aEnumerator.MoveNext()) {
                    var a = aEnumerator.Current;
                    // foreach block
                    if (a.Kind == annotationKind) {
                        return true;
                    }
                }
            } finally {
                if (aEnumerator !== null) aEnumerator.Dispose();

            }    
            // end foreach
            return false;
        }
        public HasAnnotations_9693(annotationKinds: System.Collections.Generic.IEnumerable<string>): boolean {
            var annotations = this.GetAnnotations_1741();
            if (annotations == GreenNode.NoAnnotations) {
                return false;
            }
            // for each
            var aEnumerator = annotations.GetEnumerator();
            try {
                while (aEnumerator.MoveNext()) {
                    var a = aEnumerator.Current;
                    // foreach block
                    if (System.Linq.Enumerable.Contains(annotationKinds,
                        a.Kind)) {
                        return true;
                    }
                }
            } finally {
                if (aEnumerator !== null) aEnumerator.Dispose();

            }    
            // end foreach
            return false;
        }
        public HasAnnotation(annotation: SyntaxAnnotation): boolean {
            var annotations = this.GetAnnotations_1741();
            if (annotations == GreenNode.NoAnnotations) {
                return false;
            }
            // for each
            var aEnumerator = annotations.GetEnumerator();
            try {
                while (aEnumerator.MoveNext()) {
                    var a = aEnumerator.Current;
                    // foreach block
                    if (a.op_Equality(annotation)) {
                        return true;
                    }
                }
            } finally {
                if (aEnumerator !== null) aEnumerator.Dispose();

            }    
            // end foreach
            return false;
        }
        public GetAnnotations_1417(annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            if (System.String.IsNullOrWhiteSpace(annotationKind)) {
                throw new System.ArgumentNullException("annotationKind");
            }
            var annotations = this.GetAnnotations_1741();
            if (annotations == GreenNode.NoAnnotations) {
                return GreenNode.NoAnnotationsEnumerable;
            }
            return GreenNode.GetAnnotationsSlow_1547(annotations, annotationKind);
        }
        private static GetAnnotationsSlow_1547(annotations: SyntaxAnnotation[], annotationKind: string): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            var __result = new Array<SyntaxAnnotation>();
            // for each
            var annotationEnumerator = annotations.GetEnumerator();
            try {
                while (annotationEnumerator.MoveNext()) {
                    var annotation = annotationEnumerator.Current;
                    // foreach block
                    if (annotation.Kind == annotationKind) {
                        __result.push(annotation);
                        //yield return annotation;
                    }
                }
            } finally {
                if (annotationEnumerator !== null) annotationEnumerator.Dispose();

            }    
            // end foreach
            return __result;
        }
        public GetAnnotations_2034(annotationKinds: System.Collections.Generic.IEnumerable<string>): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            if (annotationKinds == null) {
                throw new System.ArgumentNullException("annotationKinds");
            }
            var annotations = this.GetAnnotations_1741();
            if (annotations == GreenNode.NoAnnotations) {
                return GreenNode.NoAnnotationsEnumerable;
            }
            return GreenNode.GetAnnotationsSlow_1032(annotations, annotationKinds);
        }
        private static GetAnnotationsSlow_1032(annotations: SyntaxAnnotation[], annotationKinds: System.Collections.Generic.IEnumerable<string>): System.Collections.Generic.IEnumerable<SyntaxAnnotation> {
            var __result = new Array<SyntaxAnnotation>();
            // for each
            var annotationEnumerator = annotations.GetEnumerator();
            try {
                while (annotationEnumerator.MoveNext()) {
                    var annotation = annotationEnumerator.Current;
                    // foreach block
                    if (System.Linq.Enumerable.Contains(annotationKinds,
                        annotation.Kind)) {
                        __result.push(annotation);
                        //yield return annotation;
                    }
                }
            } finally {
                if (annotationEnumerator !== null) annotationEnumerator.Dispose();

            }    
            // end foreach
            return __result;
        }
        public GetAnnotations_1741(): SyntaxAnnotation[] {
            if (this.ContainsAnnotations) {
                var annotations: SyntaxAnnotation[];
                var annotations_ref0 = { refObj: annotations };
                var ret_val__925 = GreenNode.annotationsTable.TryGetValue(this, annotations_ref0);

                annotations = annotations_ref0.refObj;
                if (ret_val__925) {
                    System.Diagnostics.Debug.Assert(annotations.length != 0, "we should return nonempty annotations or NoAnnotations");
                    return annotations;
                }
            }
            return GreenNode.NoAnnotations;
        }
        public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode { throw new Error('not implemented'); }
        public GetDiagnostics(): DiagnosticInfo[] {
            if (this.ContainsDiagnostics) {
                var diags: DiagnosticInfo[];
                var diags_ref0 = { refObj: diags };
                var ret_val__96 = GreenNode.diagnosticsTable.TryGetValue(this, diags_ref0);

                diags = diags_ref0.refObj;
                if (ret_val__96) {
                    return diags;
                }
            }
            return GreenNode.NoDiagnostics;
        }
        public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode { throw new Error('not implemented'); }
        public ToFullString(): string { throw new Error('not implemented'); }
        public WriteTo_1120(writer: System.IO.TextWriter): void {
            this.WriteTo_1077(writer, true, true);
        }
         public WriteTo_1077(writer: System.IO.TextWriter, leading: boolean, trailing: boolean): void {
            var first: boolean = true;
            var n: number = this.SlotCount;
            var lastIndex: number = n - 1;
            for (; lastIndex >= 0; lastIndex--) {
                var child = this.GetSlot(lastIndex);
                if (child != null) {
                    break;
                }
            }
            for (var i = 0; i < n; i++) {
                var child = this.GetSlot(i);
                if (child != null) {
                    child.WriteTo_1077(writer, leading || !first, trailing || (i < lastIndex));
                    first = false;
                }
            }
        }
        public get RawContextualKind(): number {
            return this.RawKind;
        }
        public GetValue(): Object {
            return null;
        }
        public GetValueText(): string {
            return System.String.Empty;
        }
        public GetLeadingTriviaCore(): GreenNode {
            return null;
        }
        public GetTrailingTriviaCore(): GreenNode {
            return null;
        }
        public Navigator: AbstractSyntaxNavigator;
        public WithLeadingTrivia(trivia: GreenNode): GreenNode {
            return this;
        }
        public WithTrailingTrivia(trivia: GreenNode): GreenNode {
            return this;
        }
        public GetFirstTerminal(): GreenNode {
            var node: GreenNode = this;
            do {
                var firstChild: GreenNode = null;
                for (var i: number = 0, n = node.SlotCount; i < n; i++) {
                    var child = node.GetSlot(i);
                    if (child != null) {
                        firstChild = child;
                        break;
                    }
                }
                node = firstChild;
            }
            while (node != null && node.slotCount > 0);
            return node;
        }
        public GetLastTerminal(): GreenNode {
            var node: GreenNode = this;
            do {
                var lastChild: GreenNode = null;
                for (var i: number = node.SlotCount - 1; i >= 0; i--) {
                    var child = node.GetSlot(i);
                    if (child != null) {
                        lastChild = child;
                        break;
                    }
                }
                node = lastChild;
            }
            while (node != null && node.slotCount > 0);
            return node;
        }
        public GetLastNonmissingTerminal(): GreenNode {
            var node: GreenNode = this;
            do {
                var nonmissingChild: GreenNode = null;
                for (var i: number = node.SlotCount - 1; i >= 0; i--) {
                    var child = node.GetSlot(i);
                    if (child != null && !child.IsMissing) {
                        nonmissingChild = child;
                        break;
                    }
                }
                node = nonmissingChild;
            }
            while (node != null && node.slotCount > 0);
            return node;
        }
        public IsEquivalentTo(other: GreenNode): boolean {
            if (this == other) {
                return true;
            }
            if (other == null) {
                return false;
            }
            return GreenNode.EquivalentToInternal(this, other);
        }
        private static EquivalentToInternal(node1: GreenNode, node2: GreenNode): boolean {
            if (node1.RawKind != node2.RawKind) {
                if (node1.IsList && node1.SlotCount == 1) {
                    node1 = node1.GetSlot(0);
                }
                if (node2.IsList && node2.SlotCount == 1) {
                    node2 = node2.GetSlot(0);
                }
                if (node1.RawKind != node2.RawKind) {
                    return false;
                }
            }
            if (node1.fullWidth != node2.fullWidth) {
                return false;
            }
            var n = node1.SlotCount;
            if (n != node2.SlotCount) {
                return false;
            }
            for (var i: number = 0; i < n; i++) {
                var node1Child = node1.GetSlot(i);
                var node2Child = node2.GetSlot(i);
                if (node1Child != null && node2Child != null && !node1Child.IsEquivalentTo(node2Child)) {
                    return false;
                }
            }
            return true;
        }
        public GetStructure(parentTrivia: SyntaxTrivia): SyntaxNode { throw new Error('not implemented'); }
        public CreateList(nodes: System.Collections.Generic.IEnumerable<GreenNode>, alwaysCreateListNode: boolean = false): GreenNode { throw new Error('not implemented'); }
        public CreateSeparator<TNode extends SyntaxNode>(element: SyntaxNode): SyntaxToken { throw new Error('not implemented'); }
        public IsTriviaWithEndOfLine(): boolean { throw new Error('not implemented'); }
        public CreateRed_5702(): SyntaxNode {
            return this.CreateRed_9614(null, 0);
        }
        public CreateRed_9614(parent: SyntaxNode, position: number): SyntaxNode { throw new Error('not implemented'); }
        public static MaxCachedChildNum: number = 3;
        public get IsCacheable(): boolean {
            return ((this.flags & GreenNode.NodeFlags.InheritMask) == GreenNode.NodeFlags.IsNotMissing) && this.SlotCount <= GreenNode.MaxCachedChildNum;
        }
        public GetCacheHash(): number {
            System.Diagnostics.Debug.Assert(this.IsCacheable);
            var code: number = <number>(this.flags) ^ this.RawKind;
            var cnt: number = this.SlotCount;
            for (var i: number = 0; i < cnt; i++) {
                var child = this.GetSlot(i);
                if (child != null) {
                    code = Roslyn.Utilities.Hash.Combine_1641(System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(child), code);
                }
            }
            return code & System.Int32.MaxValue;
        }
        public IsCacheEquivalent_1054(kind: number, flags: GreenNode.NodeFlags, child1: GreenNode): boolean {
            System.Diagnostics.Debug.Assert(this.IsCacheable);
            return this.RawKind == kind && this.flags == flags && this.GetSlot(0) == child1;
        }
        public IsCacheEquivalent_1226(kind: number, flags: GreenNode.NodeFlags, child1: GreenNode, child2: GreenNode): boolean {
            System.Diagnostics.Debug.Assert(this.IsCacheable);
            return this.RawKind == kind && this.flags == flags && this.GetSlot(0) == child1 && this.GetSlot(1) == child2;
        }
        public IsCacheEquivalent_5779(kind: number, flags: GreenNode.NodeFlags, child1: GreenNode, child2: GreenNode, child3: GreenNode): boolean {
            System.Diagnostics.Debug.Assert(this.IsCacheable);
            return this.RawKind == kind && this.flags == flags && this.GetSlot(0) == child1 && this.GetSlot(1) == child2 && this.GetSlot(2) == child3;
        }

        public ToString(): string {
            return this.ToString();
        }

        constructor() { }
    }
    export module GreenNode {
        export enum NodeFlags {
            None = 0,
            ContainsDiagnostics = 1 << 0,
            ContainsStructuredTrivia = 1 << 1,
            ContainsDirectives = 1 << 2,
            ContainsSkippedText = 1 << 3,
            ContainsAnnotations = 1 << 4,
            IsNotMissing = 1 << 5,
            FactoryContextIsInAsync = 1 << 6,
            FactoryContextIsInQuery = 1 << 7,
            FactoryContextIsInIterator = FactoryContextIsInQuery,
            FactoryContextMask = FactoryContextIsInAsync | FactoryContextIsInQuery,
            InheritMask = Byte.MaxValue & ~FactoryContextMask
        }
    }
}