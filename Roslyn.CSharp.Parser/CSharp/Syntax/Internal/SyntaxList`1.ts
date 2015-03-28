module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxList<TNode extends CSharpSyntaxNode> implements System.IEquatable<SyntaxList<TNode>>, IStruct {
        private node: CSharpSyntaxNode;
        ctor_1319(node: CSharpSyntaxNode): SyntaxList<TNode> {
            this.node = node;
            return this;
        }
        public get Node(): CSharpSyntaxNode {
            return this.node;
        }
        public get Count(): number {
            return this.node == null ? 0 : (this.node.IsList ? this.node.SlotCount : 1);
        }
        public $get$(index: number): TNode {
            if (this.node == null) {
                return null;
            }
            else if (this.node.IsList) {
                System.Diagnostics.Debug.Assert(index >= 0);
                System.Diagnostics.Debug.Assert(index <= this.node.SlotCount);
                return <TNode>this.node.GetSlot(index);
            }
            else if (index == 0) {
                return <TNode>this.node;
            }
            else {
                throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
            }
        }
        public Any_2111(): boolean {
            return this.node != null;
        }
        public Any_1043(kind: SyntaxKind): boolean {
            // for each
            var elementEnumerator = this.GetEnumerator();

            while (elementEnumerator.MoveNext()) {
                var element = elementEnumerator.Current;
                // foreach block
                if (element.Kind == kind) {
                    return true;
                }
            }    
            // end foreach
            return false;
        }
        private get Nodes(): TNode[] {
            var arr = new Array(this.Count);
            for (var i: number = 0; i < this.Count; i++) {
                arr[i] = this.$get$(i);
            }
            return arr;
        }
        public GetEnumerator(): SyntaxList.Enumerator<TNode> {
            return new SyntaxList.Enumerator<TNode>().ctor_4311(this);
        }
        public CopyTo(offset: number, array: ArrayElement<CSharpSyntaxNode>[], arrayOffset: number, count: number): void {
            for (var i: number = 0; i < count; i++) {
                array[arrayOffset + i].Value = this.$get$(i + offset);
            }
        }
        public op_Equality(right: SyntaxList<TNode>): boolean {
            var left = this;
            return left.node == right.node;
        }

        public op_Inequality(right: SyntaxList<TNode>): boolean {
            var left = this;
            return left.node != right.node;
        }

        public Equals_1466(other: SyntaxList<TNode>): boolean {
            return this.node == other.node;
        }
        public Equals(obj: Object): boolean {
            return (obj instanceof SyntaxList) && this.Equals_1466(<SyntaxList<TNode>>obj);
        }
        public GetHashCode(): number {
            return this.node != null ? this.node.GetHashCode() : 0;
        }
        public AsSeparatedList<TOther extends CSharpSyntaxNode>(): SeparatedSyntaxList<TOther> {
            return new SeparatedSyntaxList<TOther>().ctor_9176(SyntaxList.op_Implicit_8343<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(this));
        }
        public static op_Implicit_5999<TNode extends CSharpSyntaxNode>(node: TNode): SyntaxList<TNode> {
            return new SyntaxList<TNode>().ctor_1319(node);
        }
        public static op_Implicit_8623<TNode extends CSharpSyntaxNode>(nodes: SyntaxList<CSharpSyntaxNode>): SyntaxList<TNode> {
            return new SyntaxList<TNode>().ctor_1319(nodes.node);
        }
        public static op_Implicit_8343<TNode extends CSharpSyntaxNode>(nodes: SyntaxList<TNode>): SyntaxList<CSharpSyntaxNode> {
            return new SyntaxList<CSharpSyntaxNode>().ctor_1319(nodes.Node);
        }
        constructor() { }
    }

    export module SyntaxList {
        export class Enumerator<TNode extends CSharpSyntaxNode> implements IStruct {
            private list: SyntaxList<TNode> = structDefault(SyntaxList);
            private index: number = 0;
            ctor_4311(list: SyntaxList<TNode>): Enumerator<TNode> {
                this.list = list;
                this.index = -1;
                return this;
            }
            public MoveNext(): boolean {
                var newIndex = this.index + 1;
                if (newIndex < this.list.Count) {
                    this.index = newIndex;
                    return true;
                }
                return false;
            }
            public get Current(): TNode {
                return this.list.$get$(this.index);
            }
            constructor() { }
        }
    }
}