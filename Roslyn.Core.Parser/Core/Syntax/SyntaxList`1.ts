module Microsoft.CodeAnalysis {
    export class SyntaxList<TNode extends SyntaxNode> implements System.Collections.Generic.IReadOnlyList<TNode>, System.IEquatable<SyntaxList<TNode>>, IStruct {
        private node: SyntaxNode;
        ctor_6698(node: SyntaxNode): SyntaxList<TNode> {
            this.node = node;
            return this;
        }
        public get Node(): SyntaxNode {
            return this.node;
        }
        public get Count(): number {
            return this.node == null ? 0 : (this.node.IsList ? this.node.SlotCount : 1);
        }
        public $get$(index: number): TNode {
            if (this.node != null) {
                if (this.node.IsList) {
                    if (((index >>> 0) < <number>this.node.SlotCount)) {
                        return <TNode>this.node.GetNodeSlot(index);
                    }
                }
                else if (index == 0) {
                    return <TNode>this.node;
                }
            }
            throw new System.ArgumentOutOfRangeException();
        }
        public ItemInternal(index: number): SyntaxNode {
            if (this.node.IsList) {
                return this.node.GetNodeSlot(index);
            }
            System.Diagnostics.Debug.Assert(index == 0);
            return this.node;
        }
        public get FullSpan(): Text.TextSpan {
            if (this.Count == 0) {
                return structDefault(Text.TextSpan);
            }
            else {
                return Text.TextSpan.FromBounds(this.$get$(0).FullSpan.Start, this.$get$(this.Count - 1).FullSpan.End);
            }
        }
        public get Span(): Text.TextSpan {
            if (this.Count == 0) {
                return structDefault(Text.TextSpan);
            }
            else {
                return Text.TextSpan.FromBounds(this.$get$(0).Span.Start, this.$get$(this.Count - 1).Span.End);
            }
        }
        public ToString(): string {
            return this.node != null ? this.node.ToString() : System.String.Empty;
        }
        public ToFullString(): string {
            return this.node != null ? this.node.ToFullString() : System.String.Empty;
        }
        public Add(node: TNode): SyntaxList<TNode> {
            return this.Insert(this.Count, node);
        }
        public AddRange(nodes: System.Collections.Generic.IEnumerable<TNode>): SyntaxList<TNode> {
            return this.InsertRange(this.Count, nodes);
        }
        public Insert(index: number, node: TNode): SyntaxList<TNode> {
            if (node == null) {
                throw new System.ArgumentNullException("node");
            }
            return this.InsertRange(index, new Array(node));
        }
        public InsertRange(index: number, nodes: System.Collections.Generic.IEnumerable<TNode>): SyntaxList<TNode> {
            if (index < 0 || index > this.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            if (nodes == null) {
                throw new System.ArgumentNullException("nodes");
            }
            var list = System.Linq.Enumerable.ToList(this);
            list.InsertRange(index, nodes);
            if (list.Count == 0) {
                return this;
            }
            else {
                return SyntaxList.CreateList_6694(list.$get$(0).Green, list);
            }
        }
        public RemoveAt(index: number): SyntaxList<TNode> {
            if (index < 0 || index > this.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            return this.Remove(this.$get$(index));
        }
        public Remove(node: TNode): SyntaxList<TNode> {
            return SyntaxList.CreateList_1946(System.Linq.Enumerable.ToList(System.Linq.Enumerable.Where(this,
                x => x != node)));
        }
        public Replace(nodeInList: TNode, newNode: TNode): SyntaxList<TNode> {
            return this.ReplaceRange(nodeInList, new Array(newNode));
        }
        public ReplaceRange(nodeInList: TNode, newNodes: System.Collections.Generic.IEnumerable<TNode>): SyntaxList<TNode> {
            if (nodeInList == null) {
                throw new System.ArgumentNullException("nodeInList");
            }
            if (newNodes == null) {
                throw new System.ArgumentNullException("newNodes");
            }
            var index = this.IndexOf_1996(nodeInList);
            if (index >= 0 && index < this.Count) {
                var list = System.Linq.Enumerable.ToList(this);
                list.RemoveAt(index);
                list.InsertRange(index, newNodes);
                return SyntaxList.CreateList_1946(list);
            }
            else {
                throw new System.ArgumentException("nodeInList");
            }
        }
        private static CreateList_1946<TNode extends SyntaxNode>(items: System.Collections.Generic.List<TNode>): SyntaxList<TNode> {
            if (items.Count == 0) {
                return structDefault(SyntaxList);
            }
            else {
                return SyntaxList.CreateList_6694(items.$get$(0).Green, items);
            }
        }
        private static CreateList_6694<TNode extends SyntaxNode>(creator: GreenNode, items: System.Collections.Generic.List<TNode>): SyntaxList<TNode> {
            if (items.Count == 0) {
                return structDefault(SyntaxList);
            }
            var newGreen = creator.CreateList(System.Linq.Enumerable.Select(items,
                n => n.Green));
            return new SyntaxList<TNode>().ctor_6698(newGreen.CreateRed_5702());
        }
        public First(): TNode {
            return this.$get$(0);
        }
        public FirstOrDefault(): TNode {
            if (this.Any()) {
                return this.$get$(0);
            }
            else {
                return null;
            }
        }
        public Last(): TNode {
            return this.$get$(this.Count - 1);
        }
        public LastOrDefault(): TNode {
            if (this.Any()) {
                return this.$get$(this.Count - 1);
            }
            else {
                return null;
            }
        }
        public Any(): boolean {
            System.Diagnostics.Debug.Assert(this.node == null || this.Count != 0);
            return this.node != null;
        }
        private get Nodes(): TNode[] {
            return System.Linq.Enumerable.ToArray(this);
        }
        //public GetEnumerator(): SyntaxList.Enumerator {
        //    return new SyntaxList.Enumerator().ctor_4311(this);
        //}
        GetEnumerator(): System.Collections.Generic.IEnumerator<TNode> {
            if (this.Any()) {
                return new SyntaxList.EnumeratorImpl<TNode>().ctor_1415(this);
            }
            return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<TNode>();
        }
        //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
        //    if (this.Any()) {
        //        return new SyntaxList.EnumeratorImpl().ctor_1415(this);
        //    }
        //    return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<TNode>();
        //}
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
            return obj instanceof SyntaxList && this.Equals_1466(<SyntaxList<TNode>>obj);
        }
        public GetHashCode(): number {
            if (this.node == null) {
                return 0;
            }

            return this.node.GetHashCode();
            //return this.node ?.GetHashCode() != null ? this.node ?.GetHashCode() : 0;
        }
        public static op_Implicit_1229<TNode extends SyntaxNode>(nodes: SyntaxList<SyntaxNode>): SyntaxList<TNode> {
            return new SyntaxList<TNode>().ctor_6698(nodes.node);
        }
        public static op_Implicit_9594<TNode extends SyntaxNode>(nodes: SyntaxList<TNode>): SyntaxList<SyntaxNode> {
            return new SyntaxList<SyntaxNode>().ctor_6698(nodes.Node);
        }
        public IndexOf_1996(node: TNode): number {
            var index = 0;
            // for each
            var childEnumerator = this.GetEnumerator();
            try {
                while (childEnumerator.MoveNext()) {
                    var child = childEnumerator.Current;
                    // foreach block
                    if (child == node) {
                        return index;
                    }
                    index++;
                }
            } finally {
                if (childEnumerator !== null) childEnumerator.Dispose();

            }    
            // end foreach
            return -1;
        }
        public IndexOf_1153(predicate: (_: TNode) => boolean): number {
            var index = 0;
            // for each
            var childEnumerator = this.GetEnumerator();
            try {
                while (childEnumerator.MoveNext()) {
                    var child = childEnumerator.Current;
                    // foreach block
                    if (predicate(child)) {
                        return index;
                    }
                    index++;
                }
            } finally {
                if (childEnumerator !== null) childEnumerator.Dispose();

            }    
            // end foreach
            return -1;
        }
        public IndexOf_9119(rawKind: number): number {
            var index = 0;
            // for each
            var childEnumerator = this.GetEnumerator();
            try {
                while (childEnumerator.MoveNext()) {
                    var child = childEnumerator.Current;
                    // foreach block
                    if (child.RawKind == rawKind) {
                        return index;
                    }
                    index++;
                }
            } finally {
                if (childEnumerator !== null) childEnumerator.Dispose();

            }    
            // end foreach
            return -1;
        }
        public LastIndexOf_2121(node: TNode): number {
            for (var i: number = this.Count - 1; i >= 0; i--) {
                if (this.$get$(i) === node) {
                    return i;
                }
            }
            return -1;
        }
        public LastIndexOf_2446(predicate: (_: TNode) => boolean): number {
            for (var i: number = this.Count - 1; i >= 0; i--) {
                if (predicate(this.$get$(i))) {
                    return i;
                }
            }
            return -1;
        }
        constructor() { }
    }


    export module SyntaxList {
        export class Enumerator<TNode extends SyntaxNode> implements IStruct {
            private list: SyntaxList<TNode> = structDefault(SyntaxList);
            private index: number = 0;
            ctor_4311(list: SyntaxList<TNode>): Enumerator<TNode> {
                this.list = list;
                this.index = -1;
                return this;
            }
            public MoveNext(): boolean {
                var newIndex: number = this.index + 1;
                if (newIndex < this.list.Count) {
                    this.index = newIndex;
                    return true;
                }
                return false;
            }
            public get Current(): TNode {
                return <TNode>this.list.ItemInternal(this.index);
            }
            public Reset(): void {
                this.index = -1;
            }
            public Equals(obj: Object): boolean {
                throw new System.NotSupportedException();
            }
            public GetHashCode(): number {
                throw new System.NotSupportedException();
            }
            constructor() { }
        }
    }
    export module SyntaxList {
        export class EnumeratorImpl<TNode extends SyntaxNode> implements System.Collections.Generic.IEnumerator<TNode>
        {
            e: Enumerator<TNode> = structDefault(Enumerator);
            ctor_1415(list: SyntaxList<TNode>): EnumeratorImpl<TNode> {
                this.e = new Enumerator<TNode>().ctor_4311(list);
                return this;
            }
            public MoveNext(): boolean {
                return this.e.MoveNext();
            }
            public get Current(): TNode {
                return this.e.Current;
            }
            Dispose(): void {

            }
            //get Current(): Object {
            //    return this.e.Current;
            //}
            Reset(): void {
                this.e.Reset();
            }
            constructor() { }
        }
    }
}