module Microsoft.CodeAnalysis {
    export class SeparatedSyntaxList<TNode extends SyntaxNode> implements System.IEquatable<SeparatedSyntaxList<TNode>>, System.Collections.Generic.IReadOnlyList<TNode>, IStruct {
        private list: SyntaxNodeOrTokenList = structDefault(SyntaxNodeOrTokenList);
        private count: number = 0;
        private separatorCount: number = 0;
        ctor_1274(list: SyntaxNodeOrTokenList): SeparatedSyntaxList<TNode> {
            //this.ctor_1472();
            SeparatedSyntaxList.Validate(list);
            var allCount: number = list.Count;
            this.count = (allCount + 1) >> 1;
            this.separatorCount = allCount >> 1;
            this.list = list;
            return this;
        }
        private static Validate(list: SyntaxNodeOrTokenList): void {
            for (var i: number = 0; i < list.Count; i++) {
                var item = list.$get$(i);
                if ((i & 1) == 0) {
                    System.Diagnostics.Debug.Assert(item.IsNode, "Node missing in separated list.");
                }
                else {
                    System.Diagnostics.Debug.Assert(item.IsToken, "Separator token missing in separated list.");
                }
            }
        }
        ctor_9044(node: SyntaxNode, index: number): SeparatedSyntaxList<TNode> {
            this.ctor_1274(new SyntaxNodeOrTokenList().ctor_1240(node, index));
            return this;
        }
        public get Node(): SyntaxNode {
            return this.list.Node;
        }
        public get Count(): number {
            return this.count;
        }
        public get SeparatorCount(): number {
            return this.separatorCount;
        }
        public $get$(index: number): TNode {
            var node = this.list.Node;
            if (node != null) {
                if (!node.IsList) {
                    if (index == 0) {
                        return <TNode>node;
                    }
                }
                else {
                    if (((index >>> 0) < <number>this.count)) {
                        return <TNode>node.GetNodeSlot(index << 1);
                    }
                }
            }
            throw new System.ArgumentOutOfRangeException("index");
        }
        public GetSeparator(index: number): SyntaxToken {
            var node = this.list.Node;
            if (node != null) {
                System.Diagnostics.Debug.Assert(node.IsList, "separated list cannot be a singleton separator");
                if (((index >>> 0) < <number>this.separatorCount)) {
                    index = (index << 1) + 1;
                    var green = node.Green.GetSlot(index);
                    System.Diagnostics.Debug.Assert(green.IsToken);
                    return new SyntaxToken().ctor_1108(node.Parent, green, node.GetChildPosition(index), this.list.index + index);
                }
            }
            throw new System.ArgumentOutOfRangeException("index");
        }
        public GetSeparators(): System.Collections.Generic.IEnumerable<SyntaxToken> {
            return System.Linq.Enumerable.Select(System.Linq.Enumerable.Where(this.list,
                n => n.IsToken),
                n => n.AsToken());
        }
        public get FullSpan(): Text.TextSpan {
            return this.list.FullSpan;
        }
        public get Span(): Text.TextSpan {
            return this.list.Span;
        }
        public ToString(): string {
            return this.list.ToString();
        }
        public ToFullString(): string {
            return this.list.ToFullString();
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
        public Contains(node: TNode): boolean {
            return this.IndexOf_1996(node) >= 0;
        }
        public IndexOf_1996(node: TNode): number {
            for (var i: number = 0, n = this.Count; i < n; i++) {
                if (this.$get$(i) == node) {
                    return i;
                }
            }
            return -1;
        }
        public IndexOf_1153(predicate: (_: TNode) => boolean): number {
            for (var i: number = 0, n = this.Count; i < n; i++) {
                if (predicate(this.$get$(i))) {
                    return i;
                }
            }
            return -1;
        }
        public IndexOf_9119(rawKind: number): number {
            for (var i: number = 0, n = this.Count; i < n; i++) {
                if (this.$get$(i).RawKind == rawKind) {
                    return i;
                }
            }
            return -1;
        }
        public LastIndexOf_2121(node: TNode): number {
            for (var i: number = this.Count - 1; i >= 0; i--) {
                if (this.$get$(i) == node) {
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
        public Any(): boolean {
            return this.list.Any();
        }
        public GetWithSeparators(): SyntaxNodeOrTokenList {
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
        public Add(node: TNode): SeparatedSyntaxList<TNode> {
            return this.Insert(this.Count, node);
        }
        public AddRange(nodes: System.Collections.Generic.IEnumerable<TNode>): SeparatedSyntaxList<TNode> {
            return this.InsertRange(this.Count, nodes);
        }
        public Insert(index: number, node: TNode): SeparatedSyntaxList<TNode> {
            if (node == null) {
                throw new System.ArgumentNullException("node");
            }
            return this.InsertRange(index, new Array(node));
        }
        public InsertRange(index: number, nodes: System.Collections.Generic.IEnumerable<TNode>): SeparatedSyntaxList<TNode> {
            if (nodes == null) {
                throw new System.ArgumentNullException("nodes");
            }
            if (index < 0 || index > this.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            var nodesWithSeps = this.GetWithSeparators();
            var insertionIndex: number = index < this.Count ? nodesWithSeps.IndexOf(SyntaxNodeOrToken.op_Implicit_1792(this.$get$(index))) : nodesWithSeps.Count;
            if (insertionIndex > 0 && insertionIndex < nodesWithSeps.Count) {
                var previous = nodesWithSeps.$get$(insertionIndex - 1);
                if (previous.IsToken && !SeparatedSyntaxList.KeepSeparatorWithPreviousNode(previous.AsToken())) {
                    insertionIndex--;
                }
            }
            var nodesToInsertWithSeparators = new System.Collections.Generic.List<SyntaxNodeOrToken>();
            // for each
            var itemEnumerator = nodes.GetEnumerator();
            try {
                while (itemEnumerator.MoveNext()) {
                    var item = itemEnumerator.Current;
                    // foreach block
                    if (item != null) {
                        if (nodesToInsertWithSeparators.Count > 0 || (insertionIndex > 0 && nodesWithSeps.$get$(insertionIndex - 1).IsNode)) {
                            nodesToInsertWithSeparators.Add(SyntaxNodeOrToken.op_Implicit_7398(item.Green.CreateSeparator<TNode>(item)));
                        }
                        nodesToInsertWithSeparators.Add(SyntaxNodeOrToken.op_Implicit_1792(item));
                    }
                }
            } finally {
                if (itemEnumerator !== null) itemEnumerator.Dispose();

            }    
            // end foreach
            if (insertionIndex < nodesWithSeps.Count && nodesWithSeps.$get$(insertionIndex).IsNode) {
                var node = nodesWithSeps.$get$(insertionIndex).AsNode();
                nodesToInsertWithSeparators.Add(SyntaxNodeOrToken.op_Implicit_7398(node.Green.CreateSeparator<TNode>(node)));
            }
            return new SeparatedSyntaxList<TNode>().ctor_1274(nodesWithSeps.InsertRange(insertionIndex, nodesToInsertWithSeparators));
        }
        private static KeepSeparatorWithPreviousNode(separator: SyntaxToken): boolean {
            // for each
            var trEnumerator = separator.TrailingTrivia.GetEnumerator();
            try {
                while (trEnumerator.MoveNext()) {
                    var tr = trEnumerator.Current;
                    // foreach block
                    if (tr.UnderlyingNode.IsTriviaWithEndOfLine()) {
                        return true;
                    }
                }
            } finally {
                if (trEnumerator !== null) trEnumerator.Dispose();

            }    
            // end foreach
            return false;
        }
        public RemoveAt(index: number): SeparatedSyntaxList<TNode> {
            if (index < 0 || index > this.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            return this.Remove(this.$get$(index));
        }
        public Remove(node: TNode): SeparatedSyntaxList<TNode> {
            var nodesWithSeps = this.GetWithSeparators();
            var index: number = nodesWithSeps.IndexOf(SyntaxNodeOrToken.op_Implicit_1792(node));
            if (index >= 0 && index <= nodesWithSeps.Count) {
                nodesWithSeps = nodesWithSeps.RemoveAt(index);
                if (index < nodesWithSeps.Count && nodesWithSeps.$get$(index).IsToken) {
                    nodesWithSeps = nodesWithSeps.RemoveAt(index);
                }
                else if (index > 0 && nodesWithSeps.$get$(index - 1).IsToken) {
                    nodesWithSeps = nodesWithSeps.RemoveAt(index - 1);
                }
                return new SeparatedSyntaxList<TNode>().ctor_1274(nodesWithSeps);
            }
            else {
                return this;
            }
        }
        public Replace(nodeInList: TNode, newNode: TNode): SeparatedSyntaxList<TNode> {
            if (newNode == null) {
                throw new System.ArgumentNullException("newNode");
            }
            var index = this.IndexOf_1996(nodeInList);
            if (index >= 0 && index < this.Count) {
                return new SeparatedSyntaxList<TNode>().ctor_1274(this.GetWithSeparators().Replace(SyntaxNodeOrToken.op_Implicit_1792(nodeInList), SyntaxNodeOrToken.op_Implicit_1792(newNode)));
            }
            else {
                throw new System.ArgumentException("nodeInList");
            }
        }
        public ReplaceRange(nodeInList: TNode, newNodes: System.Collections.Generic.IEnumerable<TNode>): SeparatedSyntaxList<TNode> {
            if (newNodes == null) {
                throw new System.ArgumentNullException("newNodes");
            }
            var index = this.IndexOf_1996(nodeInList);
            if (index >= 0 && index < this.Count) {
                var newNodeList = System.Linq.Enumerable.ToList(newNodes);
                if (newNodeList.Count == 0) {
                    return this.Remove(nodeInList);
                }
                var listWithFirstReplaced = this.Replace(nodeInList, newNodeList.$get$(0));
                if (newNodeList.Count > 1) {
                    newNodeList.RemoveAt(0);
                    return listWithFirstReplaced.InsertRange(index + 1, newNodeList);
                }
                else {
                    return listWithFirstReplaced;
                }
            }
            else {
                throw new System.ArgumentException("nodeInList");
            }
        }
        public ReplaceSeparator(separatorToken: SyntaxToken, newSeparator: SyntaxToken): SeparatedSyntaxList<TNode> {
            var nodesWithSeps = this.GetWithSeparators();
            var index = nodesWithSeps.IndexOf(SyntaxNodeOrToken.op_Implicit_7398(separatorToken));
            if (index < 0 || index >= this.Count) {
                throw new System.ArgumentException("separatorToken");
            }
            if (newSeparator.RawKind != nodesWithSeps.$get$(index).RawKind || newSeparator.Language != nodesWithSeps.$get$(index).Language) {
                throw new System.ArgumentException("newSeparator");
            }
            return new SeparatedSyntaxList<TNode>().ctor_1274(nodesWithSeps.Replace(SyntaxNodeOrToken.op_Implicit_7398(separatorToken), SyntaxNodeOrToken.op_Implicit_7398(newSeparator)));
        }
        private get Nodes(): TNode[] {
            return System.Linq.Enumerable.ToArray<TNode>(this);
        }
        private get NodesWithSeparators(): SyntaxNodeOrToken[] {
            return System.Linq.Enumerable.ToArray(this.list);
        }
        //public GetEnumerator(): SeparatedSyntaxList.Enumerator<TNode> {
        //    return new SeparatedSyntaxList.Enumerator<TNode>().ctor_1104(this);
        //}
        GetEnumerator(): System.Collections.Generic.IEnumerator<TNode> {
            if (this.Any()) {
                return new SeparatedSyntaxList.EnumeratorImpl<TNode>().ctor_7599(this);
            }
            return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<TNode>();
        }
        //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
        //    if (this.Any()) {
        //        return new SeparatedSyntaxList.EnumeratorImpl().ctor_7599(this);
        //    }
        //    return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<TNode>();
        //}
        constructor() { }
    }


    export module SeparatedSyntaxList {
        export class Enumerator<TNode extends SyntaxNode> implements IStruct {
            private list: SeparatedSyntaxList<TNode> = structDefault(SeparatedSyntaxList);
            private index: number = 0;
            ctor_1104(list: SeparatedSyntaxList<TNode>): Enumerator<TNode> {
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
                return this.list.$get$(this.index);
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
    export module SeparatedSyntaxList {
        export class EnumeratorImpl<TNode extends SyntaxNode> implements System.Collections.Generic.IEnumerator<TNode>
        {
            private e: Enumerator<TNode> = structDefault(Enumerator);
            ctor_7599(list: SeparatedSyntaxList<TNode>): EnumeratorImpl<TNode> {
                this.e = new Enumerator<TNode>().ctor_1104(list);
                return this;
            }
            public get Current(): TNode {
                return this.e.Current;
            }
            //get Current(): Object {
            //    return this.e.Current;
            //}
            public Dispose(): void {

            }
            public MoveNext(): boolean {
                return this.e.MoveNext();
            }
            public Reset(): void {
                this.e.Reset();
            }
            constructor() { }
        }
    }
}