module Microsoft.CodeAnalysis {
    export class ChildSyntaxList implements System.IEquatable<ChildSyntaxList>, System.Collections.Generic.IReadOnlyList<SyntaxNodeOrToken>, IStruct {
        private node: SyntaxNode;
        private count: number = 0;
        ctor_5028(node: SyntaxNode): ChildSyntaxList {
            this.node = node;
            this.count = ChildSyntaxList.CountNodes(node.Green);
            return this;
        }
        public get Count(): number {
            return this.count;
        }
        public static CountNodes(green: GreenNode): number {
            var n: number = 0;
            for (var i: number = 0, s = green.SlotCount; i < s; i++) {
                var child = green.GetSlot(i);
                if (child != null) {
                    if (!child.IsList) {
                        n++;
                    }
                    else {
                        n += child.SlotCount;
                    }
                }
            }
            return n;
        }
        public $get$(index: number): SyntaxNodeOrToken {
            if (((index >>>0) < <number>this.count)) {
                return ChildSyntaxList.ItemInternal(this.node, index);
            }
            throw new System.ArgumentOutOfRangeException("index");
        }
        public get Node(): SyntaxNode {
            return this.node;
        }
        private static Occupancy(green: GreenNode): number {
            return green.IsList ? green.SlotCount : 1;
        }
        public static ItemInternal(node: SyntaxNode, index: number): SyntaxNodeOrToken {
            var greenChild: GreenNode;
            var green = node.Green;
            var idx = index;
            var slotIndex = 0;
            var position = node.Position;
            while (true) {
                greenChild = green.GetSlot(slotIndex);
                if (greenChild != null) {
                    var currentOccupancy: number = ChildSyntaxList.Occupancy(greenChild);
                    if (idx < currentOccupancy) {
                        break;
                    }
                    idx -= currentOccupancy;
                    position += greenChild.FullWidth;
                }
                slotIndex++;
            }
            var red = node.GetNodeSlot(slotIndex);
            if (!greenChild.IsList) {
                if (red != null) {
                    return SyntaxNodeOrToken.op_Implicit_1792(red);
                }
            }
            else if (red != null) {
                var redChild = red.GetNodeSlot(idx);
                if (redChild != null) {
                    return SyntaxNodeOrToken.op_Implicit_1792(redChild);
                }
                greenChild = greenChild.GetSlot(idx);
                position = red.GetChildPosition(idx);
            }
            else {
                position += greenChild.GetSlotOffset(idx);
                greenChild = greenChild.GetSlot(idx);
            }
            return new SyntaxNodeOrToken().ctor_1484(node, greenChild, position, index);
        }
        public static ChildThatContainsPosition(node: SyntaxNode, targetPosition: number): SyntaxNodeOrToken {
            System.Diagnostics.Debug.Assert(node.FullSpan.Contains_2103(targetPosition));
            var red = node;
            var green = node.Green;
            var position = node.Position;
            var idx = 0;
            var dbgLoopCount: number = 0;
            do {
                System.Diagnostics.Debug.Assert(dbgLoopCount < 2, "A list of lists. Impossible!");
                dbgLoopCount++;
                for (var slotIndex: number = 0; ; slotIndex++) {
                    var greenChild: GreenNode = green.GetSlot(slotIndex);
                    if (greenChild != null) {
                        var endPosition = position + greenChild.FullWidth;
                        if (targetPosition < endPosition) {
                            if (red != null) {
                                red = red.GetNodeSlot(slotIndex);
                            }
                            green = greenChild;
                            break;
                        }
                        position = endPosition;
                        idx += ChildSyntaxList.Occupancy(greenChild);
                    }
                }
            }
            while (green.IsList);
            return red != null ? SyntaxNodeOrToken.op_Implicit_1792(red) : new SyntaxNodeOrToken().ctor_1484(node, green, position, idx);
        }
        public static ItemInternalAsNode(node: SyntaxNode, index: number): SyntaxNode {
            var greenChild: GreenNode;
            var green = node.Green;
            var idx = index;
            var slotIndex = 0;
            while (true) {
                greenChild = green.GetSlot(slotIndex);
                if (greenChild != null) {
                    var currentOccupancy: number = ChildSyntaxList.Occupancy(greenChild);
                    if (idx < currentOccupancy) {
                        break;
                    }
                    idx -= currentOccupancy;
                }
                slotIndex++;
            }
            var red = node.GetNodeSlot(slotIndex);
            if (greenChild.IsList && red != null) {
                return red.GetNodeSlot(idx);
            }
            return red;
        }
        private get Nodes(): SyntaxNodeOrToken[] {
            return System.Linq.Enumerable.ToArray<SyntaxNodeOrToken>(this);
        }
        public Any(): boolean {
            return this.count != 0;
        }
        public First(): SyntaxNodeOrToken {
            if (this.Any()) {
                return this.$get$(0);
            }
            throw new System.InvalidOperationException();
        }
        public Last(): SyntaxNodeOrToken {
            if (this.Any()) {
                return this.$get$(this.count - 1);
            }
            throw new System.InvalidOperationException();
        }
        public Reverse(): ChildSyntaxList.Reversed {
            return new ChildSyntaxList.Reversed().ctor_4304(this.node, this.count);
        }
        //public GetEnumerator(): ChildSyntaxList.Enumerator {
        //    if (this.node == null) {
        //        return structDefault(ChildSyntaxList.Enumerator);
        //    }
        //    return new ChildSyntaxList.Enumerator().ctor_2091(this.node, this.count);
        //}
        GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxNodeOrToken> {
            if (this.node == null) {
                return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxNodeOrToken>();
            }
            return new ChildSyntaxList.EnumeratorImpl().ctor_1716(this.node, this.count);
        }
        //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
        //    if (this.node == null) {
        //        return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxNodeOrToken>();
        //    }
        //    return new ChildSyntaxList.EnumeratorImpl().ctor_1716(this.node, this.count);
        //}
        public Equals(obj: Object): boolean {
            return obj instanceof ChildSyntaxList && this.Equals_4638(<ChildSyntaxList>obj);
        }
        public Equals_4638(other: ChildSyntaxList): boolean {
            return this.node == other.node;
        }
        public GetHashCode(): number {
            return this.node == null ? 0 : this.node.GetHashCode();
        }
        public op_Equality(list2: ChildSyntaxList): boolean {
            var list1 = this;
            return list1.Equals_4638(list2);
        }

        public op_Inequality(list2: ChildSyntaxList): boolean {
            var list1 = this;
            return !list1.Equals_4638(list2);
        }

        constructor() { }
    }


    export module ChildSyntaxList {
        export class Enumerator implements IStruct {
            private node: SyntaxNode;
            private count: number = 0;
            private childIndex: number = 0;
            ctor_2091(node: SyntaxNode, count: number): Enumerator {
                this.node = node;
                this.count = count;
                this.childIndex = -1;
                return this;
            }
            public InitializeFrom(node: SyntaxNode): void {
                this.node = node;
                this.count = ChildSyntaxList.CountNodes(node.Green);
                this.childIndex = -1;
            }
            public MoveNext(): boolean {
                var newIndex = this.childIndex + 1;
                if (newIndex < this.count) {
                    this.childIndex = newIndex;
                    return true;
                }
                return false;
            }
            public get Current(): SyntaxNodeOrToken {
                return ChildSyntaxList.ItemInternal(this.node, this.childIndex);
            }
            public Reset(): void {
                this.childIndex = -1;
            }
            public TryMoveNextAndGetCurrent(current: { refObj: SyntaxNodeOrToken }): boolean {
                if (!this.MoveNext()) {
                    return false;
                }
                current.refObj = ChildSyntaxList.ItemInternal(this.node, this.childIndex);
                return true;
            }
            public TryMoveNextAndGetCurrentAsNode(): SyntaxNode {
                while (this.MoveNext()) {
                    var nodeValue = ChildSyntaxList.ItemInternalAsNode(this.node, this.childIndex);
                    if (nodeValue != null) {
                        return nodeValue;
                    }
                }
                return null;
            }
            constructor() { }
        }
    }
    export module ChildSyntaxList {
        export class EnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxNodeOrToken>
        {
            private enumerator: Enumerator = structDefault(Enumerator);
            ctor_1716(node: SyntaxNode, count: number): EnumeratorImpl {
                this.enumerator = new Enumerator().ctor_2091(node, count);
                return this;
            }
            public get Current(): SyntaxNodeOrToken {
                return this.enumerator.Current;
            }
            //get Current(): Object {
            //    return this.enumerator.Current;
            //}
            public MoveNext(): boolean {
                return this.enumerator.MoveNext();
            }
            public Reset(): void {
                this.enumerator.Reset();
            }
            public Dispose(): void {

            }
            constructor() { }
        }

        export class Reversed implements System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>, System.IEquatable<Reversed>, IStruct {
            private node: SyntaxNode;
            private count: number = 0;
            ctor_4304(node: SyntaxNode, count: number): Reversed {
                this.node = node;
                this.count = count;
                return this;
            }
            //public GetEnumerator(): Reversed.Enumerator {
            //    return new Reversed.Enumerator().ctor_2091(this.node, this.count);
            //}
            GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxNodeOrToken> {
                if (this.node == null) {
                    return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxNodeOrToken>();
                }
                return new Reversed.EnumeratorImpl().ctor_1716(this.node, this.count);
            }
            //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
            //    if (this.node == null) {
            //        return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxNodeOrToken>();
            //    }
            //    return new Reversed.EnumeratorImpl().ctor_1716(this.node, this.count);
            //}
            public GetHashCode(): number {
                return this.node != null ? Roslyn.Utilities.Hash.Combine_1641(this.node.GetHashCode(), this.count) : 0;
            }
            public Equals(obj: Object): boolean {
                return (obj instanceof Reversed) && this.Equals_1958(<Reversed>obj);
            }
            public Equals_1958(other: Reversed): boolean {
                return this.node == other.node && this.count == other.count;
            }
            constructor() { }
        }
        export module Reversed {
            export class Enumerator implements IStruct {
                private node: SyntaxNode;
                private count: number = 0;
                private childIndex: number = 0;
                ctor_2091(node: SyntaxNode, count: number): Enumerator {
                    this.node = node;
                    this.count = count;
                    this.childIndex = count;
                    return this;
                }
                public MoveNext(): boolean {
                    return --this.childIndex >= 0;
                }
                public get Current(): SyntaxNodeOrToken {
                    return ChildSyntaxList.ItemInternal(this.node, this.childIndex);
                }
                public Reset(): void {
                    this.childIndex = this.count;
                }
                constructor() { }
            }
        }
        export module Reversed {
            export class EnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxNodeOrToken>
            {
                private enumerator: Enumerator = structDefault(Enumerator);
                ctor_1716(node: SyntaxNode, count: number): EnumeratorImpl {
                    this.enumerator = new Enumerator().ctor_2091(node, count);
                    return this;
                }
                public get Current(): SyntaxNodeOrToken {
                    return this.enumerator.Current;
                }
                //get Current(): Object {
                //    return this.enumerator.Current;
                //}
                public MoveNext(): boolean {
                    return this.enumerator.MoveNext();
                }
                public Reset(): void {
                    this.enumerator.Reset();
                }
                public Dispose(): void {

                }
                constructor() { }
            }
        }
    }
}