module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxNodeOrTokenListBuilder {
        private nodes: Syntax.InternalSyntax.CSharpSyntaxNode[];
        private count: number = 0;
        ctor_2261(size: number): SyntaxNodeOrTokenListBuilder {
            this.nodes = new Array(size);
            this.count = 0;
            return this;
        }
        public get Count(): number {
            return this.count;
        }
        public Clear(): void {
            this.count = 0;
        }
        public $get$(index: number): SyntaxNodeOrToken {
            var innerNode = this.nodes[index];
            var tk = __as__<Syntax.InternalSyntax.SyntaxToken>(innerNode, Syntax.InternalSyntax.SyntaxToken);
            if (tk != null) {
                return new SyntaxNodeOrToken().ctor_1484(null, tk, 0, 0);
            }
            else {
                return SyntaxNodeOrToken.op_Implicit_1792(innerNode.CreateRed_5702());
            }
        }
        public $set$(index: number, value: SyntaxNodeOrToken): void {
            this.nodes[index] = <Syntax.InternalSyntax.CSharpSyntaxNode>value.UnderlyingNode;
        }
        public Add_9827(item: Syntax.InternalSyntax.CSharpSyntaxNode): void {
            if (this.nodes == null || this.count >= this.nodes.length) {
                this.Grow(this.count == 0 ? 8 : this.nodes.length * 2);
            }
            this.nodes[this.count++] = item;
        }
        public Add_1846(item: SyntaxNodeOrToken): void {
            this.Add_9827(<Syntax.InternalSyntax.CSharpSyntaxNode>item.UnderlyingNode);
        }
        public Add_2125(list: SyntaxNodeOrTokenList): void {
            this.Add_1317(list, 0, list.Count);
        }
        public Add_1317(list: SyntaxNodeOrTokenList, offset: number, length: number): void {
            if (this.nodes == null || this.count + length > this.nodes.length) {
                this.Grow(this.count + length);
            }
            list.CopyTo(offset, this.nodes, this.count, length);
            this.count += length;
        }
        public Add_1490(nodeOrTokens: System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>): void {
            // for each
            var nEnumerator = nodeOrTokens.GetEnumerator();
            try {
                while (nEnumerator.MoveNext()) {
                    var n = nEnumerator.Current;
                    // foreach block
                    this.Add_1846(n);
                }
            } finally {
                if (nEnumerator !== null) nEnumerator.Dispose();

            }    
            // end foreach
        }
        public RemoveLast(): void {
            this.count--;
            this.nodes[this.count] = null;
        }
        private Grow(size: number): void {
            var tmp = new Array(size);
            TSArray.Copy(this.nodes, tmp, this.nodes.length);
            this.nodes = tmp;
        }
        public ToList(): SyntaxNodeOrTokenList {
            if (this.count > 0) {
                switch (this.count) {
                    case 1:
                        if (this.nodes[0].IsToken) {
                            return new SyntaxNodeOrTokenList().ctor_1240(Syntax.InternalSyntax.SyntaxListBase.List_2130(new Array(this.nodes[0])).CreateRed_5702(),/*index:*/0);
                        }
                        else {
                            return new SyntaxNodeOrTokenList().ctor_1240(this.nodes[0].CreateRed_5702(),/*index:*/0);
                        }
                    case 2:
                        return new SyntaxNodeOrTokenList().ctor_1240(Syntax.InternalSyntax.SyntaxListBase.List_1257(this.nodes[0], this.nodes[1]).CreateRed_5702(),/*index:*/0);
                    case 3:
                        return new SyntaxNodeOrTokenList().ctor_1240(Syntax.InternalSyntax.SyntaxListBase.List_1258(this.nodes[0], this.nodes[1], this.nodes[2]).CreateRed_5702(),/*index:*/0);
                    default:
                        var tmp = new Array<Syntax.InternalSyntax.CSharpSyntaxNode> (this.count);
                        for (var i: number = 0; i < this.count; i++) {
                            tmp[i] = this.nodes[i];
                        }
                        return new SyntaxNodeOrTokenList().ctor_1240(Syntax.InternalSyntax.SyntaxListBase.List_2015(tmp).CreateRed_5702(),/*index:*/0);
                }
            }
            else {
                return structDefault(SyntaxNodeOrTokenList);
            }
        }
        constructor() { }
    }
}