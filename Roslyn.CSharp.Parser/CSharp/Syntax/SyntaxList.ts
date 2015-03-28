module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxListBase extends CSharpSyntaxNode {
        ctor_4023(green: Syntax.InternalSyntax.SyntaxListBase, parent: SyntaxNode, position: number): SyntaxListBase {
            super.ctor_6242(green, parent, position);
            return this;
        }
        constructor() { super(); }
    }

    export module SyntaxListBase {
        export class SeparatedWithManyChildren extends SyntaxListBase {
            private children: SyntaxNode[];
            ctor_2725(green: Syntax.InternalSyntax.SyntaxListBase, parent: SyntaxNode, position: number): SeparatedWithManyChildren {
                super.ctor_4023(green, parent, position);
                this.children = new Array<SyntaxNode>((green.SlotCount + 1) >> 1);
                return this;
            }
            public GetNodeSlot(i: number): SyntaxNode {
                if ((i & 1) != 0) {
                    return null;
                }
                var Value_ref0 = { refObj: this.children[i >> 1] };
                var ret_val__570 = this.GetRedElement(Value_ref0, i);

                this.children[i >> 1] = Value_ref0.refObj;
                return ret_val__570;
            }
            public GetCachedSlot(i: number): SyntaxNode {
                if ((i & 1) != 0) {
                    return null;
                }
                return this.children[i >> 1];
            }
            public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
                throw new System.NotImplementedException();
            }
            public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
                throw new System.NotImplementedException();
            }
            constructor() { super(); }
        }

        export class WithManyChildren extends SyntaxListBase {
            private children: SyntaxNode[];
            ctor_3902(green: Syntax.InternalSyntax.SyntaxListBase, parent: SyntaxNode, position: number): WithManyChildren {
                super.ctor_4023(green, parent, position);
                this.children = new Array<SyntaxNode>(green.SlotCount);
                return this;
            }
            public GetNodeSlot(index: number): SyntaxNode {
                var Value_ref0 = { refObj: this.children[index] };
                var ret_val__696 = this.GetRedElement(Value_ref0, index);

                this.children[index] = Value_ref0.refObj;
                return ret_val__696;
            }
            public GetCachedSlot(index: number): SyntaxNode {
                return this.children[index];
            }
            public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
                throw new System.NotImplementedException();
            }
            public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
                throw new System.NotImplementedException();
            }
            constructor() { super(); }
        }

        export class WithManyWeakChildren extends SyntaxListBase {
            private children: System.WeakReference<SyntaxNode>[];
            private childPositions: number[];
            ctor_1559(green: Syntax.InternalSyntax.SyntaxListBase.WithManyChildrenBase, parent: SyntaxNode, position: number): WithManyWeakChildren {
                super.ctor_4023(green, parent, position);
                var count: number = green.SlotCount;
                this.children = new Array<System.WeakReference<SyntaxNode>>(count);
                var childOffsets = <any>StructArray(Number, count);
                var childPosition: number = position;
                var greenChildren = green.children;
                for (var i: number = 0; i < childOffsets.length; ++i) {
                    childOffsets[i] = childPosition;
                    childPosition += greenChildren[i].FullWidth;
                }
                this.childPositions = childOffsets;
                return this;
            }
            public GetChildPosition(index: number): number {
                return this.childPositions[index];
            }
            public GetNodeSlot(index: number): SyntaxNode {
                var Value_ref0 = { refObj: this.children[index] };
                var ret_val__23 = this.GetWeakRedElement(Value_ref0, index);

                this.children[index] = Value_ref0.refObj;
                return ret_val__23;
            }
            public GetCachedSlot(index: number): SyntaxNode {
                var value: SyntaxNode = null;

                if (this.children[index] != null) {
                    var value_ref0 = { refObj: value };
                    var ret_val__54 = this.children[index].TryGetTarget(value_ref0);

                    value = value_ref0.refObj;
                }
               
                return value;
            }
            public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
                throw new System.NotImplementedException();
            }
            public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
                throw new System.NotImplementedException();
            }
            constructor() { super(); }
        }

        export class WithThreeChildren extends SyntaxListBase {
            private child0: SyntaxNode;
            private child1: SyntaxNode;
            private child2: SyntaxNode;
            ctor_9136(green: Syntax.InternalSyntax.SyntaxListBase, parent: SyntaxNode, position: number): WithThreeChildren {
                super.ctor_4023(green, parent, position);
                return this;
            }
            public GetNodeSlot(index: number): SyntaxNode {
                switch (index) {
                    case 0:
                        var child0_ref0 = { refObj: this.child0 };
                        var ret_val__53 = this.GetRedElement(child0_ref0, 0);

                        this.child0 = child0_ref0.refObj;
                        return ret_val__53;
                    case 1:
                        var child1_ref0 = { refObj: this.child1 };
                        var ret_val__611 = this.GetRedElementIfNotToken(child1_ref0);

                        this.child1 = child1_ref0.refObj;
                        return ret_val__611;
                    case 2:
                        var child2_ref0 = { refObj: this.child2 };
                        var ret_val__402 = this.GetRedElement(child2_ref0, 2);

                        this.child2 = child2_ref0.refObj;
                        return ret_val__402;
                    default:
                        return null;
                }
            }
            public GetCachedSlot(index: number): SyntaxNode {
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
            public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
                throw new System.NotImplementedException();
            }
            public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
                throw new System.NotImplementedException();
            }
            constructor() { super(); }
        }


        export class WithTwoChildren extends SyntaxListBase {
            private child0: SyntaxNode;
            private child1: SyntaxNode;
            ctor_1567(green: Syntax.InternalSyntax.SyntaxListBase, parent: SyntaxNode, position: number): WithTwoChildren {
                super.ctor_4023(green, parent, position);
                return this;
            }
            public GetNodeSlot(index: number): SyntaxNode {
                switch (index) {
                    case 0:
                        var child0_ref0 = { refObj: this.child0 };
                        var ret_val__838 = this.GetRedElement(child0_ref0, 0);

                        this.child0 = child0_ref0.refObj;
                        return ret_val__838;
                    case 1:
                        var child1_ref0 = { refObj: this.child1 };
                        var ret_val__190 = this.GetRedElementIfNotToken(child1_ref0);

                        this.child1 = child1_ref0.refObj;
                        return ret_val__190;
                    default:
                        return null;
                }
            }
            public GetCachedSlot(index: number): SyntaxNode {
                switch (index) {
                    case 0:
                        return this.child0;
                    case 1:
                        return this.child1;
                    default:
                        return null;
                }
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