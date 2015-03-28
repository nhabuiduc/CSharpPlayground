module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class ChildSyntaxList implements IStruct {
        private node: GreenNode;
        private count: number = 0;
        ctor_9473(node: GreenNode): ChildSyntaxList {
            this.node = node;
            this.count = -1;
            return this;
        }
        public get Count(): number {
            if (this.count == -1) {
                this.count = this.CountNodes();
            }
            return this.count;
        }
        private CountNodes(): number {
            var n: number = 0;
            var enumerator = this.GetEnumerator();
            while (enumerator.MoveNext()) {
                n++;
            }
            return n;
        }
        private get Nodes(): GreenNode[] {
            var result = new Array(this.Count);
            var i = 0;
            // for each
            var nEnumerator = this.GetEnumerator();

            while (nEnumerator.MoveNext()) {
                var n = nEnumerator.Current;
                // foreach block
                result[i++] = n;
            }    
            // end foreach
            return result;
        }
        public GetEnumerator(): ChildSyntaxList.Enumerator {
            return new ChildSyntaxList.Enumerator().ctor_2154(this.node);
        }
        public Reverse(): ChildSyntaxList.Reversed {
            return new ChildSyntaxList.Reversed().ctor_2096(this.node);
        }
        constructor() { }
    }


    export module ChildSyntaxList {
        export class Enumerator implements IStruct {
            private node: GreenNode;
            private childIndex: number = 0;
            private list: GreenNode;
            private listIndex: number = 0;
            private currentChild: GreenNode;
            ctor_2154(node: GreenNode): Enumerator {
                this.node = node;
                this.childIndex = -1;
                this.listIndex = -1;
                this.list = null;
                this.currentChild = null;
                return this;
            }
            public MoveNext(): boolean {
                if (this.node != null) {
                    if (this.list != null) {
                        this.listIndex++;
                        if (this.listIndex < this.list.SlotCount) {
                            this.currentChild = this.list.GetSlot(this.listIndex);
                            return true;
                        }
                        this.list = null;
                        this.listIndex = -1;
                    }
                    while (true) {
                        this.childIndex++;
                        if (this.childIndex == this.node.SlotCount) {
                            break;
                        }
                        var child = this.node.GetSlot(this.childIndex);
                        if (child == null) {
                            continue;
                        }
                        if (<SyntaxKind>child.RawKind == SyntaxKind.List) {
                            this.list = child;
                            this.listIndex++;
                            if (this.listIndex < this.list.SlotCount) {
                                this.currentChild = this.list.GetSlot(this.listIndex);
                                return true;
                            }
                            else {
                                this.list = null;
                                this.listIndex = -1;
                                continue;
                            }
                        }
                        else {
                            this.currentChild = child;
                        }
                        return true;
                    }
                }
                this.currentChild = null;
                return false;
            }
            public get Current(): GreenNode {
                return this.currentChild;
            }
            constructor() { }
        }
    }

    export module ChildSyntaxList {
        export class Reversed implements IStruct {
            private node: GreenNode;
            ctor_2096(node: GreenNode): Reversed {
                this.node = node;
                return this;
            }
            public GetEnumerator(): Reversed.Enumerator {
                return new Reversed.Enumerator().ctor_2154(this.node);
            }
            private get Nodes(): GreenNode[] {
                var result = new System.Collections.Generic.List<GreenNode>();
                // for each
                var nEnumerator = this.GetEnumerator();

                while (nEnumerator.MoveNext()) {
                    var n = nEnumerator.Current;
                    // foreach block
                    result.Add(n);
                }    
                // end foreach
                return result.ToArray();
            }
            constructor() { }
        }

        export module Reversed {
            export class Enumerator implements IStruct {
                private node: GreenNode;
                private childIndex: number = 0;
                private list: GreenNode;
                private listIndex: number = 0;
                private currentChild: GreenNode;
                ctor_2154(node: GreenNode): Enumerator {
                    if (node != null) {
                        this.node = node;
                        this.childIndex = node.SlotCount;
                        this.listIndex = -1;
                    }
                    else {
                        this.node = null;
                        this.childIndex = 0;
                        this.listIndex = -1;
                    }
                    this.list = null;
                    this.currentChild = null;
                    return this;
                }
                public MoveNext(): boolean {
                    if (this.node != null) {
                        if (this.list != null) {
                            if (--this.listIndex >= 0) {
                                this.currentChild = this.list.GetSlot(this.listIndex);
                                return true;
                            }
                            this.list = null;
                            this.listIndex = -1;
                        }
                        while (--this.childIndex >= 0) {
                            var child = this.node.GetSlot(this.childIndex);
                            if (child == null) {
                                continue;
                            }
                            if (child.IsList) {
                                this.list = child;
                                this.listIndex = this.list.SlotCount;
                                if (--this.listIndex >= 0) {
                                    this.currentChild = this.list.GetSlot(this.listIndex);
                                    return true;
                                }
                                else {
                                    this.list = null;
                                    this.listIndex = -1;
                                    continue;
                                }
                            }
                            else {
                                this.currentChild = child;
                            }
                            return true;
                        }
                    }
                    this.currentChild = null;
                    return false;
                }
                public get Current(): GreenNode {
                    return this.currentChild;
                }
                constructor() { }
            }
        }
    }
}