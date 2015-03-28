module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxListBaseBuilder {
        private nodes: CSharpSyntaxNode[];
        public Count: number = 0;
        ctor_1860(size: number): SyntaxListBaseBuilder {
            this.nodes = new Array<CSharpSyntaxNode> (size);
            return this;
        }
        public Clear(): void {
            this.Count = 0;
        }
        public $get$(index: number): CSharpSyntaxNode {
            return this.nodes[index];
        }
        public $set$(index: number, value: CSharpSyntaxNode): void {
            this.nodes[index]= value;
        }
        public Add(item: CSharpSyntaxNode): void {
            if (item == null)
                return
            if (item.IsList) {
                var slotCount: number = item.SlotCount;
                this.EnsureAdditionalCapacity(slotCount);
                for (var i: number = 0; i < slotCount; i++) {
                    this.Add(<CSharpSyntaxNode>item.GetSlot(i));
                }
            }
            else {
                this.EnsureAdditionalCapacity(1);
                this.nodes[this.Count++] = item;
            }
        }
        public AddRange_4255(items: CSharpSyntaxNode[]): void {
            this.AddRange_1279(items, 0, items.length);
        }
        public AddRange_1279(items: CSharpSyntaxNode[], offset: number, length: number): void {
            this.EnsureAdditionalCapacity(length - offset);
            var oldCount: number = this.Count;
            for (var i: number = offset; i < length; i++) {
                this.Add(items[i]);
            }
            this.Validate(oldCount, this.Count);
        }
        private Validate(start: number, end: number): void {
            for (var i: number = start; i < end; i++) {
                System.Diagnostics.Debug.Assert(this.nodes[i] != null);
            }
        }
        public AddRange_4610(list: SyntaxList<CSharpSyntaxNode>): void {
            this.AddRange_5295(list, 0, list.Count);
        }
        public AddRange_5295(list: SyntaxList<CSharpSyntaxNode>, offset: number, length: number): void {
            this.EnsureAdditionalCapacity(length - offset);
            var oldCount: number = this.Count;
            for (var i: number = offset; i < length; i++) {
                this.Add(list.$get$(i));
            }
            this.Validate(oldCount, this.Count);
        }
        public AddRange_2002<TNode extends CSharpSyntaxNode>(list: SyntaxList<TNode>): void {
            this.AddRange_4324(list, 0, list.Count);
        }
        public AddRange_4324<TNode extends CSharpSyntaxNode>(list: SyntaxList<TNode>, offset: number, length: number): void {
            this.AddRange_5295(new SyntaxList<CSharpSyntaxNode>().ctor_1319(list.Node), offset, length);
        }
        public RemoveLast(): void {
            this.Count--;
            this.nodes[this.Count] = null;
        }
        private EnsureAdditionalCapacity(additionalCount: number): void {
            var currentSize: number = this.nodes.length;
            var requiredSize: number = this.Count + additionalCount;
            if (requiredSize <= currentSize)
                return
            var newSize: number = requiredSize < 8 ? 8 : requiredSize >= ((Int32.MaxValue / 2 | 0)) ? Int32.MaxValue : System.Math.Max(requiredSize, currentSize * 2);
            System.Diagnostics.Debug.Assert(newSize >= requiredSize);
            var nodes_ref0 = { refObj: this.nodes };
            TSArray.Resize(nodes_ref0, newSize);

            this.nodes = nodes_ref0.refObj;;
        }
        public Any(kind: SyntaxKind): boolean {
            for (var i: number = 0; i < this.Count; i++) {
                if (this.nodes[i].Kind == kind) {
                    return true;
                }
            }
            return false;
        }
        public ToArray(): CSharpSyntaxNode[] {
            var array = new Array(this.Count);
            for (var i: number = 0; i < array.length; i++) {
                array[i] = this.nodes[i];
            }
            return array;
        }
        public ToListNode(): CSharpSyntaxNode {
            switch (this.Count) {
                case 0:
                    return null;
                case 1:
                    return this.nodes[0];
                case 2:
                    return SyntaxListBase.List_1257(this.nodes[0], this.nodes[1]);
                case 3:
                    return SyntaxListBase.List_1258(this.nodes[0],this.nodes[1], this.nodes[2]);
                default:
                    var tmp = new Array<CSharpSyntaxNode> (this.Count);
                    TSArray.Copy(this.nodes, tmp, this.Count);
                    return SyntaxListBase.List_2015(tmp);
            }
        }
        public static op_Implicit_1214(builder: SyntaxListBaseBuilder): SyntaxList<CSharpSyntaxNode> {
            if (builder == null) {
                return structDefault(SyntaxList);
            }
            return SyntaxListBuilderExtensions.ToList_1673(builder);
        }
        constructor() { }
    }
}