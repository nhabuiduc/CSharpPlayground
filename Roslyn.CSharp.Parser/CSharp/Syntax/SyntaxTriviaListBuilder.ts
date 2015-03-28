module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxTriviaListBuilder {
        private nodes: SyntaxTrivia[];
        private count: number = 0;
        private previous: SyntaxTrivia[];
        ctor_9798(size: number): SyntaxTriviaListBuilder {
            this.nodes = StructArray(SyntaxTrivia, size);
            return this;
        }
        public static Create(): SyntaxTriviaListBuilder {
            return new SyntaxTriviaListBuilder().ctor_9798(4);
        }
        public get Count(): number {
            return this.count;
        }
        public Clear(): void {
            this.count = 0;
        }
        public $get$(index: number): SyntaxTrivia {
            if (index < 0 || index > this.count) {
                throw new System.IndexOutOfRangeException();
            }
            return this.nodes[index];
        }
        public Add_1150(item: SyntaxTrivia): SyntaxTriviaListBuilder {
            if (this.nodes == null || this.count >= this.nodes.length) {
                this.Grow(this.count == 0 ? 8 : this.nodes.length * 2);
            }
            this.nodes[this.count++] = item;
            return this;
        }
        public Add_1125(items: SyntaxTrivia[]): void {
            this.Add_1449(items, 0, items.length);
        }
        public Add_1449(items: SyntaxTrivia[], offset: number, length: number): void {
            if (this.nodes == null || this.count + length > this.nodes.length) {
                this.Grow(this.count + length);
            }
            TSArray.Copy(items, offset, this.nodes, this.count, length);
            this.count += length;
        }
        public Add_1553(list: SyntaxTriviaList): void {
            this.Add_5102(list, 0, list.Count);
        }
        public Add_5102(list: SyntaxTriviaList, offset: number, length: number): void {
            if (this.nodes == null || this.count + length > this.nodes.length) {
                this.Grow(this.count + length);
            }
            list.CopyTo(offset, this.nodes, this.count, length);
            this.count += length;
        }
        private Grow(size: number): void {
            var tmp = StructArray(SyntaxTrivia, size);
            if (this.previous != null) {
                TSArray.Copy(this.previous, tmp, this.count);
                this.previous = null;
            }
            else {
                TSArray.Copy(this.nodes, tmp, this.nodes.length);
            }
            this.nodes = tmp;
        }
        public static op_Implicit_1293(builder: SyntaxTriviaListBuilder): SyntaxTriviaList {
            return builder.ToList();
        }
        public ToList(): SyntaxTriviaList {
            if (this.count > 0) {
                if (this.previous != null) {
                    this.Grow(this.count);
                }
                switch (this.count) {
                    case 1:
                        return new SyntaxTriviaList().ctor_5254(structDefault(SyntaxToken), this.nodes[0].UnderlyingNode,/*position:*/0,/*index:*/0);
                    case 2:
                        return new SyntaxTriviaList().ctor_5254(structDefault(SyntaxToken), Syntax.InternalSyntax.SyntaxListBase.List_1257(<Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[0].UnderlyingNode, <Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[1].UnderlyingNode),/*position:*/0,/*index:*/0);
                    case 3:
                        return new SyntaxTriviaList().ctor_5254(structDefault(SyntaxToken), Syntax.InternalSyntax.SyntaxListBase.List_1258(<Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[0].UnderlyingNode, <Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[1].UnderlyingNode, <Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[2].UnderlyingNode),/*position:*/0,/*index:*/0);
                    default:
                        {
                            var tmp = new Array<Syntax.InternalSyntax.CSharpSyntaxNode> (this.count);
                            for (var i: number = 0; i < this.count; i++) {
                                tmp[i] = <Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[i].UnderlyingNode;
                            }
                            return new SyntaxTriviaList().ctor_5254(structDefault(SyntaxToken), Syntax.InternalSyntax.SyntaxListBase.List_2015(tmp),/*position:*/0,/*index:*/0);
                        }
                }
            }
            else {
                return structDefault(SyntaxTriviaList);
            }
        }
        constructor() { }
    }
}