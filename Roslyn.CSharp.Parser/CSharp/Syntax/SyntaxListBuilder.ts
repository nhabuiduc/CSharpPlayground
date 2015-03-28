module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxListBaseBuilder {
        private nodes: GreenNode[];
        public Count: number = 0;
        ctor_1860(size: number): SyntaxListBaseBuilder {
            this.nodes = new Array<GreenNode> (size);
            this.Count = 0;
            return this;
        }
        public Clear(): void {
            this.Count = 0;
        }
        public Add(item: SyntaxNode): void {
            this.AddInternal(item.Green);
        }
        public AddInternal(item: GreenNode): void {
            if (item == null) {
                throw new System.ArgumentNullException();
            }
            if (this.nodes == null || this.Count >= this.nodes.length) {
                this.Grow(this.Count == 0 ? 8 : this.nodes.length * 2);
            }
            this.nodes[this.Count++] = item;
        }
        public AddRange_1539(items: SyntaxNode[]): void {
            this.AddRange_5502(items, 0, items.length);
        }
        public AddRange_5502(items: SyntaxNode[], offset: number, length: number): void {
            if (this.nodes == null || this.Count + length > this.nodes.length) {
                this.Grow(this.Count + length);
            }
            for (var i: number = offset, j = this.Count; i < offset + length; ++i, ++j) {
                this.nodes[j] = items[i].Green;
            }
            var start: number = this.Count;
            this.Count += length;
            this.Validate(start, this.Count);
        }
        private Validate(start: number, end: number): void {
            for (var i: number = start; i < end; i++) {
                if (this.nodes[i] == null) {
                    throw new System.ArgumentException("Cannot add a null CSharpSyntaxNode.");
                }
            }
        }
        public AddRange_1339(list: SyntaxList<SyntaxNode>): void {
            this.AddRange_6786(list, 0, list.Count);
        }
        public AddRange_6786(list: SyntaxList<SyntaxNode>, offset: number, count: number): void {
            if (this.nodes == null || this.Count + count > this.nodes.length) {
                this.Grow(this.Count + count);
            }
            var dst = this.Count;
            for (var i: number = offset, limit = offset + count; i < limit; i++) {
                this.nodes[dst] = list.ItemInternal(i).Green;
                dst++;
            }
            var start: number = this.Count;
            this.Count += count;
            this.Validate(start, this.Count);
        }
        public AddRange_2002<TNode extends SyntaxNode>(list: SyntaxList<TNode>): void {
            this.AddRange_4324(list, 0, list.Count);
        }
        public AddRange_4324<TNode extends SyntaxNode>(list: SyntaxList<TNode>, offset: number, count: number): void {
            this.AddRange_6786(new SyntaxList<SyntaxNode>().ctor_6698(list.Node), offset, count);
        }
        public AddRange_7508(list: SyntaxNodeOrTokenList): void {
            this.AddRange_6190(list, 0, list.Count);
        }
        public AddRange_6190(list: SyntaxNodeOrTokenList, offset: number, count: number): void {
            if (this.nodes == null || this.Count + count > this.nodes.length) {
                this.Grow(this.Count + count);
            }
            var dst = this.Count;
            for (var i: number = offset, limit = offset + count; i < limit; i++) {
                this.nodes[dst] = list.$get$(i).UnderlyingNode;
                dst++;
            }
            var start: number = this.Count;
            this.Count += count;
            this.Validate(start, this.Count);
        }
        public AddRange_1343(list: SyntaxTokenList): void {
            this.AddRange_3866(list, 0, list.Count);
        }
        public AddRange_3866(list: SyntaxTokenList, offset: number, length: number): void {
            this.AddRange_6786(new SyntaxList<SyntaxNode>().ctor_6698(list.Node.CreateRed_5702()), offset, length);
        }
        private Grow(size: number): void {
            var tmp = new Array<GreenNode> (size);
            TSArray.Copy(this.nodes, tmp, this.nodes.length);
            this.nodes = tmp;
        }
        public Any(kind: SyntaxKind): boolean {
            for (var i: number = 0; i < this.Count; i++) {
                if (this.nodes[i].RawKind == <number>kind) {
                    return true;
                }
            }
            return false;
        }
        public ToListNode(): Syntax.InternalSyntax.CSharpSyntaxNode {
            switch (this.Count) {
                case 0:
                    return null;
                case 1:
                    return <Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[0];
                case 2:
                    return Syntax.InternalSyntax.SyntaxListBase.List_1257(
                        <Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[0], <Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[1]);
                case 3:
                    return Syntax.InternalSyntax.SyntaxListBase.List_1258(<Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[0],
                        <Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[1],
                        <Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[2]);
                default:
                    var tmp = new Array<Syntax.InternalSyntax.CSharpSyntaxNode> (this.Count);
                    for (var i: number = 0; i < this.Count; i++) {
                        tmp[i] = <Syntax.InternalSyntax.CSharpSyntaxNode>this.nodes[i];
                    }
                    return Syntax.InternalSyntax.SyntaxListBase.List_2015(tmp);
            }
        }
        public static op_Implicit_5201(builder: SyntaxListBaseBuilder): SyntaxList<SyntaxNode> {
            if (builder == null) {
                return <SyntaxList<SyntaxNode>> structDefault(SyntaxList);
            }
            return SyntaxListBuilderExtensions.ToList(builder);
        }
        constructor() { }
    }
}