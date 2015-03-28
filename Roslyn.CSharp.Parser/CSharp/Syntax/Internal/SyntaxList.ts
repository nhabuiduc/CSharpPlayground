///<reference path="../SyntaxKind.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxListBase extends CSharpSyntaxNode {
        ctor_2679(): SyntaxListBase {
            super.ctor_1907(SyntaxKind.List);
            return this;
        }
        ctor_1542(reader: Roslyn.Utilities.ObjectReader): SyntaxListBase {
            super.ctor_4942(reader);
            return this;
        }
        public static List_7470(child: CSharpSyntaxNode): CSharpSyntaxNode {
            return child;
        }
        public static List_1257(child0: CSharpSyntaxNode, child1: CSharpSyntaxNode): SyntaxListBase.WithTwoChildren {
            System.Diagnostics.Debug.Assert(child0 != null);
            System.Diagnostics.Debug.Assert(child1 != null);
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__122 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.List, child0, child1, hash_ref0);

            hash = hash_ref0.refObj;
            var cached: GreenNode = ret_val__122;
            if (cached != null)
                return <SyntaxListBase.WithTwoChildren>cached;
            var result = new SyntaxListBase.WithTwoChildren().ctor_1839(child0, child1);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static List_1258(child0: CSharpSyntaxNode, child1: CSharpSyntaxNode, child2: CSharpSyntaxNode): SyntaxListBase.WithThreeChildren {
            System.Diagnostics.Debug.Assert(child0 != null);
            System.Diagnostics.Debug.Assert(child1 != null);
            System.Diagnostics.Debug.Assert(child2 != null);
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__256 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.List, child0, child1, child2, hash_ref0);

            hash = hash_ref0.refObj;
            var cached: GreenNode = ret_val__256;
            if (cached != null)
                return <SyntaxListBase.WithThreeChildren>cached;
            var result = new SyntaxListBase.WithThreeChildren().ctor_1749(child0, child1, child2);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static List_2130(nodes: CSharpSyntaxNode[]): CSharpSyntaxNode {
            return SyntaxListBase.List_8641(nodes, nodes.length);
        }
        public static List_8641(nodes: CSharpSyntaxNode[], count: number): CSharpSyntaxNode {
            var array = new Array<CSharpSyntaxNode>(count);
            for (var i: number = 0; i < count; i++) {
                System.Diagnostics.Debug.Assert(nodes[i] != null);
                array[i] = nodes[i];
            }
            return SyntaxListBase.List_2015(array);
        }
        public static List_2015(children: CSharpSyntaxNode[]): SyntaxListBase {
            if (children.length < 10) {
                return new SyntaxListBase.WithManyChildren().ctor_6732(children);
            }
            else {
                return new SyntaxListBase.WithLotsOfChildren().ctor_6338(children);
            }
        }
        public static List_1405(builder: SyntaxListBaseBuilder): CSharpSyntaxNode {
            if (builder != null) {
                return builder.ToListNode();
            }
            return null;
        }
        public CopyTo(array: CSharpSyntaxNode[], offset: number): void { throw new Error('not implemented'); }
        public static Concat(left: CSharpSyntaxNode, right: CSharpSyntaxNode): CSharpSyntaxNode {
            if (left == null) {
                return right;
            }
            if (right == null) {
                return left;
            }
            var leftList = __as__<SyntaxListBase>(left, SyntaxListBase);
            var rightList = __as__<SyntaxListBase>(right, SyntaxListBase);
            if (leftList != null) {
                if (rightList != null) {
                    var tmp = new Array<CSharpSyntaxNode>(left.SlotCount + right.SlotCount);
                    leftList.CopyTo(tmp, 0);
                    rightList.CopyTo(tmp, left.SlotCount);
                    return SyntaxListBase.List_2015(tmp);
                }
                else {
                    var tmp = new Array<CSharpSyntaxNode>(left.SlotCount + 1);
                    leftList.CopyTo(tmp, 0);
                    tmp[left.SlotCount] = right;
                    return SyntaxListBase.List_2015(tmp);
                }
            }
            else if (rightList != null) {
                var tmp = new Array<CSharpSyntaxNode>(rightList.SlotCount + 1);
                tmp[0] = left;
                rightList.CopyTo(tmp, 1);
                return SyntaxListBase.List_2015(tmp);
            }
            else {
                return SyntaxListBase.List_1257(left, right);
            }
        }
        public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
            throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
        }
        public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
            throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
        }
        constructor() { super(); }
    }


    export module SyntaxListBase {
        export class WithManyChildrenBase extends SyntaxListBase {
            public children: CSharpSyntaxNode[];
            ctor_1434(children: CSharpSyntaxNode[]): WithManyChildrenBase {
                super.ctor_2679();
                this.children = children;
                this.InitializeChildren();
                return this;
            }
            private InitializeChildren(): void {
                var n: number = this.children.length;
                if (n < Byte.MaxValue) {
                    this.SlotCount = <number>n;
                }
                else {
                    this.SlotCount = Byte.MaxValue;
                }
                for (var i: number = 0; i < this.children.length; i++) {
                    this.AdjustFlagsAndWidth(this.children[i]);
                }
            }
            ctor_9311(reader: Roslyn.Utilities.ObjectReader): WithManyChildrenBase {
                super.ctor_1542(reader);
                this.children = <CSharpSyntaxNode[]>reader.ReadValue();
                this.InitializeChildren();
                return this;
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
                writer.WriteValue(this.children);
            }
            protected  GetSlotCount(): number {
                return this.children.length;
            }
            public GetSlot(index: number): GreenNode {
                return this.children[index];
            }
            public CopyTo(array: CSharpSyntaxNode[], offset: number): void {
                TSArray.Copy(this.children, 0, array, offset, this.children.length);
            }
            public CreateRed_9614(parent: SyntaxNode, position: number): SyntaxNode {
                var p = parent;
                if (p != null && p instanceof CSharp.Syntax.BlockSyntax) {
                    var gp = p.Parent;
                    if (gp != null && (gp instanceof CSharp.Syntax.MemberDeclarationSyntax || gp instanceof CSharp.Syntax.AccessorDeclarationSyntax)) {
                        System.Diagnostics.Debug.Assert(!this.GetSlot(0).IsToken);
                        return new CSharp.Syntax.SyntaxListBase.WithManyWeakChildren().ctor_1559(this, parent, position);
                    }
                }
                if (this.SlotCount > 1 && this.HasNodeTokenPattern()) {
                    return new CSharp.Syntax.SyntaxListBase.SeparatedWithManyChildren().ctor_2725(this, parent, position);
                }
                else {
                    return new CSharp.Syntax.SyntaxListBase.WithManyChildren().ctor_3902(this, parent, position);
                }
            }
            private HasNodeTokenPattern(): boolean {
                for (var i: number = 0; i < this.SlotCount; i++) {
                    if (this.GetSlot(i).IsToken == ((i & 1) == 0)) {
                        return false;
                    }
                }
                return true;
            }
            public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
                throw new System.NotImplementedException();
            }
            public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
                throw new System.NotImplementedException();
            }
            constructor() { super(); }
        }
    }
    export module SyntaxListBase {
        export class WithManyChildren extends WithManyChildrenBase {
            ctor_6732(children: CSharpSyntaxNode[]): WithManyChildren {
                super.ctor_1434(children);
                return this;
            }
            ctor_1296(reader: Roslyn.Utilities.ObjectReader): WithManyChildren {
                super.ctor_9311(reader);
                return this;
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new WithManyChildren().ctor_1296(r);
            }
            constructor() { super(); }
        }
    }

    export module SyntaxListBase {
        export class WithLotsOfChildren extends WithManyChildrenBase {
            private childOffsets: number[];
            ctor_6338(children: CSharpSyntaxNode[]): WithLotsOfChildren {
                super.ctor_1434(children);
                this.childOffsets = WithLotsOfChildren.CalculateOffsets(children);
                return this;
            }
            ctor_6590(reader: Roslyn.Utilities.ObjectReader): WithLotsOfChildren {
                super.ctor_9311(reader);
                this.childOffsets = WithLotsOfChildren.CalculateOffsets(this.children);
                return this;
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new WithLotsOfChildren().ctor_6590(r);
            }
            public GetSlotOffset(index: number): number {
                return this.childOffsets[index];
            }
            private static CalculateOffsets(children: CSharpSyntaxNode[]): number[] {
                var n: number = children.length;
                var childOffsets = <any>StructArray(Number, n);
                var offset: number = 0;
                for (var i: number = 0; i < n; i++) {
                    childOffsets[i] = offset;
                    offset += children[i].FullWidth;
                }
                return childOffsets;
            }
            constructor() { super(); }
        }
    }
     
    export module SyntaxListBase {
        export class WithThreeChildren extends SyntaxListBase {
            private child0: CSharpSyntaxNode;
            private child1: CSharpSyntaxNode;
            private child2: CSharpSyntaxNode;
            ctor_1749(child0: CSharpSyntaxNode, child1: CSharpSyntaxNode, child2: CSharpSyntaxNode): WithThreeChildren {
                super.ctor_2679();
                this.SlotCount = 3;
                this.AdjustFlagsAndWidth(child0);
                this.child0 = child0;
                this.AdjustFlagsAndWidth(child1);
                this.child1 = child1;
                this.AdjustFlagsAndWidth(child2);
                this.child2 = child2;
                return this;
            }
            ctor_1600(reader: Roslyn.Utilities.ObjectReader): WithThreeChildren {
                super.ctor_1542(reader);
                this.SlotCount = 3;
                this.child0 = <CSharpSyntaxNode>reader.ReadValue();
                this.AdjustFlagsAndWidth(this.child0);
                this.child1 = <CSharpSyntaxNode>reader.ReadValue();
                this.AdjustFlagsAndWidth(this.child1);
                this.child2 = <CSharpSyntaxNode>reader.ReadValue();
                this.AdjustFlagsAndWidth(this.child2);
                return this;
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
                writer.WriteValue(this.child0);
                writer.WriteValue(this.child1);
                writer.WriteValue(this.child2);
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new WithThreeChildren().ctor_1600(r);
            }
            public GetSlot(index: number): GreenNode {
                switch (index) {
                    case 0:
                        return this.child0;
                    case 1:
                        return this.child1;
                    case 2:
                        return this.child2;
                    default:
                        return null;
                }
            }
            public CopyTo(array: CSharpSyntaxNode[], offset: number): void {
                array[offset] = this.child0;
                array[offset + 1] = this.child1;
                array[offset + 2] = this.child2;
            }
            public CreateRed_9614(parent: SyntaxNode, position: number): SyntaxNode {
                return new CSharp.Syntax.SyntaxListBase.WithThreeChildren().ctor_9136(this, parent, position);
            }
            public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
                throw new System.NotImplementedException();
            }
            public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
                throw new System.NotImplementedException();
            }
            constructor() { super(); }
        }
    }

    export module SyntaxListBase {
        export class WithTwoChildren extends SyntaxListBase {
            private child0: CSharpSyntaxNode;
            private child1: CSharpSyntaxNode;
            ctor_1839(child0: CSharpSyntaxNode, child1: CSharpSyntaxNode): WithTwoChildren {
                super.ctor_2679();
                this.SlotCount = 2;
                this.AdjustFlagsAndWidth(child0);
                this.child0 = child0;
                this.AdjustFlagsAndWidth(child1);
                this.child1 = child1;
                return this;
            }
            ctor_1505(reader: Roslyn.Utilities.ObjectReader): WithTwoChildren {
                super.ctor_1542(reader);
                this.SlotCount = 2;
                this.child0 = <CSharpSyntaxNode>reader.ReadValue();
                this.AdjustFlagsAndWidth(this.child0);
                this.child1 = <CSharpSyntaxNode>reader.ReadValue();
                this.AdjustFlagsAndWidth(this.child1);
                return this;
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
                writer.WriteValue(this.child0);
                writer.WriteValue(this.child1);
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new WithTwoChildren().ctor_1505(r);
            }
            public GetSlot(index: number): GreenNode {
                switch (index) {
                    case 0:
                        return this.child0;
                    case 1:
                        return this.child1;
                    default:
                        return null;
                }
            }
            public CopyTo(array: CSharpSyntaxNode[], offset: number): void {
                array[offset] = this.child0;
                array[offset + 1] = this.child1;
            }
            public CreateRed_9614(parent: SyntaxNode, position: number): SyntaxNode {
                return new CSharp.Syntax.SyntaxListBase.WithTwoChildren().ctor_1567(this, parent, position);
            }
            public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
                throw new System.NotImplementedException();
            }
            public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
                throw new System.NotImplementedException();
            }
            constructor() { super(); }
        }
    }
}