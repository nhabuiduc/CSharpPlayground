module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SeparatedSyntaxList<TNode extends CSharpSyntaxNode> implements System.IEquatable<SeparatedSyntaxList<TNode>>, IStruct {
        private list: SyntaxList<CSharpSyntaxNode> = structDefault(SyntaxList);
        ctor_9176(list: SyntaxList<CSharpSyntaxNode>): SeparatedSyntaxList<TNode> {
            SeparatedSyntaxList.Validate(list);
            this.list = list;
            return this;
        }
        private static Validate(list: SyntaxList<CSharpSyntaxNode>): void {
            for (var i: number = 0; i < list.Count; i++) {
                var item: CSharpSyntaxNode = list.$get$(i);
                if ((i & 1) == 0) {
                    System.Diagnostics.Debug.Assert(!(item instanceof SyntaxToken), "even elements of a separated list must be nodes");
                }
                else {
                    System.Diagnostics.Debug.Assert(item instanceof SyntaxToken, "odd elements of a separated list must be tokens");
                }
            }
        }
        public get Node(): CSharpSyntaxNode {
            return this.list.Node;
        }
        public get Count(): number {
            return (this.list.Count + 1) >> 1;
        }
        public get SeparatorCount(): number {
            return this.list.Count >> 1;
        }
        public $get$(index: number): TNode {
            return <TNode>this.list.$get$(index << 1);
        }
        public GetSeparator(index: number): SyntaxToken {
            return <SyntaxToken>this.list.$get$((index << 1) + 1);
        }
        public GetWithSeparators(): SyntaxList<CSharpSyntaxNode> {
            return this.list;
        }
        public op_Equality(right: SeparatedSyntaxList<TNode>): boolean {
            var left = this;
            return left.Equals_1373(right);
        }

        public op_Inequality(right: SeparatedSyntaxList<TNode>): boolean {
            var left = this;
            return !left.Equals_1373(right);
        }

        public Equals_1373(other: SeparatedSyntaxList<TNode>): boolean {
            return this.list.op_Equality(other.list);
        }
        public Equals(obj: Object): boolean {
            return (obj instanceof SeparatedSyntaxList) && this.Equals_1373(<SeparatedSyntaxList<TNode>>obj);
        }
        public GetHashCode(): number {
            return this.list.GetHashCode();
        }
        private get Nodes(): TNode[] {
            var count: number = this.Count;
            var array: TNode[] = new Array(count);
            for (var i: number = 0; i < count; i++) {
                array[i] = this.$get$(i);
            }
            return array;
        }
        constructor() { }
    }
}