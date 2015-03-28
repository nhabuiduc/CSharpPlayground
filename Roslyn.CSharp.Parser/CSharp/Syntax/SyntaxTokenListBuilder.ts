module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxTokenListBuilder {
        private nodes: Syntax.InternalSyntax.CSharpSyntaxNode[];
        private count: number = 0;
        ctor_9494(size: number): SyntaxTokenListBuilder {
            this.nodes = new Array(size);
            this.count = 0;
            return this;
        }
        public static Create(): SyntaxTokenListBuilder {
            return new SyntaxTokenListBuilder().ctor_9494(8);
        }
        public get Count(): number {
            return this.count;
        }
        public Add_1167(item: SyntaxToken): void {
            this.Add_1167_NS(<Syntax.InternalSyntax.SyntaxToken>item.Node);
        }
        public Add_1167_NS(item: Syntax.InternalSyntax.SyntaxToken): void {
            this.CheckSpace(1);
            this.nodes[this.count++] = item;
        }
        public Add_3746(list: SyntaxTokenList): void {
            this.Add_1909(list, 0, list.Count);
        }
        public Add_1909(list: SyntaxTokenList, offset: number, length: number): void {
            this.CheckSpace(length);
            list.CopyTo(offset, this.nodes, this.count, length);
            this.count += length;
        }
        public Add_1573(list: SyntaxToken[]): void {
            this.Add_1911(list, 0, list.length);
        }
        public Add_1911(list: SyntaxToken[], offset: number, length: number): void {
            this.CheckSpace(length);
            for (var i: number = 0; i < length; i++) {
                this.nodes[this.count + i] = <InternalSyntax.SyntaxToken>list[offset + i].Node;
            }
            this.count += length;
        }
        private CheckSpace(delta: number): void {
            var requiredSize = this.count + delta;
            if (requiredSize > this.nodes.length) {
                this.Grow(requiredSize);
            }
        }
        private Grow(newSize: number): void {
            var tmp = new Array(newSize);
            TSArray.Copy(this.nodes, tmp, this.nodes.length);
            this.nodes = tmp;
        }
        public ToList(): SyntaxTokenList {
            if (this.count > 0) {
                switch (this.count) {
                    case 1:
                        return new SyntaxTokenList().ctor_9846(null, this.nodes[0], 0, 0);
                    case 2:
                        return new SyntaxTokenList().ctor_9846(null, Syntax.InternalSyntax.SyntaxListBase.List_1257(this.nodes[0], this.nodes[1]), 0, 0);
                    case 3:
                        return new SyntaxTokenList().ctor_9846(null, Syntax.InternalSyntax.SyntaxListBase.List_1258(this.nodes[0], this.nodes[1], this.nodes[2]), 0, 0);
                    default:
                        return new SyntaxTokenList().ctor_9846(null, Syntax.InternalSyntax.SyntaxListBase.List_8641(this.nodes, this.count), 0, 0);
                }
            }
            else {
                return structDefault(SyntaxTokenList);
            }
        }
        public static op_Implicit_2014(builder: SyntaxTokenListBuilder): SyntaxTokenList {
            return builder.ToList();
        }
        constructor() { }
    }
}