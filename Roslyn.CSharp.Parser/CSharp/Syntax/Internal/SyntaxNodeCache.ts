module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class GreenStats {
        public static NoteGreen(node: GreenNode): void {

        }
        public static ItemAdded(): void {

        }
        public static ItemCacheable(): void {

        }
        public static CacheHit(): void {

        }
        constructor() { }
    }
    export class SyntaxNodeCache {
        private static CacheSizeBits: number = 16;
        public static CacheSize: number = 1 << SyntaxNodeCache.CacheSizeBits;
        private static CacheMask: number = SyntaxNodeCache.CacheSize - 1;
        public static cache: SyntaxNodeCache.Entry[]; //= StructArray(SyntaxNodeCache.Entry, SyntaxNodeCache.CacheSize);
        public static AddNode(node: GreenNode, hash: number): void {
            if (SyntaxNodeCache.AllChildrenInCache(node) && !node.IsMissing) {
                GreenStats.ItemAdded();
                System.Diagnostics.Debug.Assert(node.GetCacheHash() == hash);
                var idx = hash & SyntaxNodeCache.CacheMask;
                SyntaxNodeCache.cache[idx] = new SyntaxNodeCache.Entry().ctor_1165(hash, node);
            }
        }
        private static CanBeCached_1810(child1: GreenNode): boolean {
            return child1 == null || child1.IsCacheable;
        }
        private static CanBeCached_1252(child1: GreenNode, child2: GreenNode): boolean {
            return SyntaxNodeCache.CanBeCached_1810(child1) && SyntaxNodeCache.CanBeCached_1810(child2);
        }
        private static CanBeCached_3507(child1: GreenNode, child2: GreenNode, child3: GreenNode): boolean {
            return SyntaxNodeCache.CanBeCached_1810(child1) && SyntaxNodeCache.CanBeCached_1810(child2) && SyntaxNodeCache.CanBeCached_1810(child3);
        }
        private static ChildInCache(child: GreenNode): boolean {
            if (child == null || child.SlotCount == 0)
                return true;
            var hash: number = child.GetCacheHash();
            var idx: number = hash & SyntaxNodeCache.CacheMask;
            return SyntaxNodeCache.cache[idx].node == child;
        }
        private static AllChildrenInCache(node: GreenNode): boolean {
            var cnt = node.SlotCount;
            for (var i: number = 0; i < cnt; i++) {
                if (!SyntaxNodeCache.ChildInCache(<GreenNode>node.GetSlot(i))) {
                    return false;
                }
            }
            return true;
        }
        public static TryGetNode_5499(kind: number, child1: GreenNode, hash: { refObj: number }): GreenNode {
            return SyntaxNodeCache.TryGetNode_8916(kind, child1, SyntaxNodeCache.GetFlags_1397(), hash);
        }
        public static TryGetNode_1444(kind: number, child1: GreenNode, context: SyntaxFactoryContext, hash: { refObj: number }): GreenNode {
            return SyntaxNodeCache.TryGetNode_8916(kind, child1, SyntaxNodeCache.GetFlags_1410(context), hash);
        }
        private static TryGetNode_8916(kind: number, child1: GreenNode, flags: GreenNode.NodeFlags, hash: { refObj: number }): GreenNode {
            if (SyntaxNodeCache.CanBeCached_1810(child1)) {
                GreenStats.ItemCacheable();
                var h: number = hash.refObj = SyntaxNodeCache.GetCacheHash_1225(kind, flags, child1);
                var idx: number = h & SyntaxNodeCache.CacheMask;
                var e = SyntaxNodeCache.cache[idx];
                if (e.hash == h && e.node != null && e.node.IsCacheEquivalent_1054(kind, flags, child1)) {
                    GreenStats.CacheHit();
                    return e.node;
                }
            }
            else {
                hash.refObj = -1;
            }
            return null;
        }
        public static TryGetNode_1376(kind: number, child1: GreenNode, child2: GreenNode, hash: { refObj: number }): GreenNode {
            return SyntaxNodeCache.TryGetNode_2028(kind, child1, child2, SyntaxNodeCache.GetFlags_1397(), hash);
        }
        public static TryGetNode_2745(kind: number, child1: GreenNode, child2: GreenNode, context: SyntaxFactoryContext, hash: { refObj: number }): GreenNode {
            return SyntaxNodeCache.TryGetNode_2028(kind, child1, child2, SyntaxNodeCache.GetFlags_1410(context), hash);
        }
        private static TryGetNode_2028(kind: number, child1: GreenNode, child2: GreenNode, flags: GreenNode.NodeFlags, hash: { refObj: number }): GreenNode {
            if (SyntaxNodeCache.CanBeCached_1252(child1, child2)) {
                GreenStats.ItemCacheable();
                var h: number = hash.refObj = SyntaxNodeCache.GetCacheHash_6622(kind, flags, child1, child2);
                var idx: number = h & SyntaxNodeCache.CacheMask;
                var e = SyntaxNodeCache.cache[idx];
                if (e.hash == h && e.node != null && e.node.IsCacheEquivalent_1226(kind, flags, child1, child2)) {
                    GreenStats.CacheHit();
                    return e.node;
                }
            }
            else {
                hash.refObj = -1;
            }
            return null;
        }
        public static TryGetNode_1765(kind: number, child1: GreenNode, child2: GreenNode, child3: GreenNode, hash: { refObj: number }): GreenNode {
            return SyntaxNodeCache.TryGetNode_1996(kind, child1, child2, child3, SyntaxNodeCache.GetFlags_1397(), hash);
        }
        public static TryGetNode_1394(kind: number, child1: GreenNode, child2: GreenNode, child3: GreenNode, context: SyntaxFactoryContext, hash: { refObj: number }): GreenNode {
            return SyntaxNodeCache.TryGetNode_1996(kind, child1, child2, child3, SyntaxNodeCache.GetFlags_1410(context), hash);
        }
        private static TryGetNode_1996(kind: number, child1: GreenNode, child2: GreenNode, child3: GreenNode, flags: GreenNode.NodeFlags, hash: { refObj: number }): GreenNode {
            if (SyntaxNodeCache.CanBeCached_3507(child1, child2, child3)) {
                GreenStats.ItemCacheable();
                var h: number = hash.refObj = SyntaxNodeCache.GetCacheHash_3104(kind, flags, child1, child2, child3);
                var idx: number = h & SyntaxNodeCache.CacheMask;
                var e = SyntaxNodeCache.cache[idx];
                if (e.hash == h && e.node != null && e.node.IsCacheEquivalent_5779(kind, flags, child1, child2, child3)) {
                    GreenStats.CacheHit();
                    return e.node;
                }
            }
            else {
                hash.refObj = -1;
            }
            return null;
        }
        private static GetFlags_1397(): GreenNode.NodeFlags {
            return GreenNode.NodeFlags.IsNotMissing;
        }
        private static GetFlags_1410(context: SyntaxFactoryContext): GreenNode.NodeFlags {
            var flags: GreenNode.NodeFlags = SyntaxNodeCache.GetFlags_1397();
            flags = CSharpSyntaxNode.SetFactoryContext_4391(flags, context);
            return flags;
        }
        private static GetCacheHash_1225(kind: number, flags: GreenNode.NodeFlags, child1: GreenNode): number {
            var code: number = <number>(flags) ^ kind;
            code = Roslyn.Utilities.Hash.Combine_1641(System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(child1), code);
            return code & System.Int32.MaxValue;
        }
        private static GetCacheHash_6622(kind: number, flags: GreenNode.NodeFlags, child1: GreenNode, child2: GreenNode): number {
            var code: number = <number>(flags) ^ kind;
            if (child1 != null) {
                code = Roslyn.Utilities.Hash.Combine_1641(System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(child1), code);
            }
            if (child2 != null) {
                code = Roslyn.Utilities.Hash.Combine_1641(System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(child2), code);
            }
            return code & System.Int32.MaxValue;
        }
        private static GetCacheHash_3104(kind: number, flags: GreenNode.NodeFlags, child1: GreenNode, child2: GreenNode, child3: GreenNode): number {
            var code: number = <number>(flags) ^ kind;
            if (child1 != null) {
                code = Roslyn.Utilities.Hash.Combine_1641(System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(child1), code);
            }
            if (child2 != null) {
                code = Roslyn.Utilities.Hash.Combine_1641(System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(child2), code);
            }
            if (child3 != null) {
                code = Roslyn.Utilities.Hash.Combine_1641(System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(child3), code);
            }
            return code & System.Int32.MaxValue;
        }
        constructor() { }
    }
    export module SyntaxNodeCache {
        export class Entry implements IStruct {
            public hash: number = 0;
            public node: GreenNode;
            ctor_1165(hash: number, node: GreenNode): Entry {
                this.hash = hash;
                this.node = node;
                return this;
            }
            constructor() { }
        }
    }

    SyntaxNodeCache.cache = StructArray(SyntaxNodeCache.Entry, SyntaxNodeCache.CacheSize);
}