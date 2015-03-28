module Microsoft.CodeAnalysis {
    export class SyntaxDiffer {
        private static InitialStackSize: number = 8;
        private static MaxSearchLength: number = 8;
        private oldNodes: System.Collections.Generic.Stack<SyntaxNodeOrToken> = new System.Collections.Generic.Stack<SyntaxNodeOrToken>(SyntaxDiffer.InitialStackSize);
        private newNodes: System.Collections.Generic.Stack<SyntaxNodeOrToken> = new System.Collections.Generic.Stack<SyntaxNodeOrToken>(SyntaxDiffer.InitialStackSize);
        private changes: System.Collections.Generic.List<SyntaxDiffer.ChangeRecord> = new System.Collections.Generic.List<SyntaxDiffer.ChangeRecord>();
        private oldSpan: Text.TextSpan = structDefault(Text.TextSpan);
        private computeNewText: boolean = false;
        private nodeSimilaritySet: System.Collections.Generic.HashSet<GreenNode> = new System.Collections.Generic.HashSet<GreenNode>();
        private tokenTextSimilaritySet: System.Collections.Generic.HashSet<string> = new System.Collections.Generic.HashSet<string>();
        ctor_1162(oldNode: SyntaxNode, newNode: SyntaxNode, computeNewText: boolean): SyntaxDiffer {
            this.oldNodes.Push(SyntaxNodeOrToken.op_Implicit_1792(oldNode));
            this.newNodes.Push(SyntaxNodeOrToken.op_Implicit_1792(newNode));
            this.oldSpan = oldNode.FullSpan;
            this.computeNewText = computeNewText;
            return this;
        }
        public static GetTextChanges_8869(before: SyntaxTree, after: SyntaxTree): System.Collections.Generic.IList<Text.TextChange> {
            if (before == after) {
                return Roslyn.Utilities.SpecializedCollections.EmptyList<Text.TextChange>();
            }
            else if (before == null) {
                return new Array(new Text.TextChange().ctor_1791(new Text.TextSpan().ctor_1506(0, 0), after.GetText().ToString()));
            }
            else if (after == null) {
                throw new System.ArgumentNullException("after");
            }
            else {
                return SyntaxDiffer.GetTextChanges_1735(before.GetRoot(), after.GetRoot());
            }
        }
        public static GetTextChanges_1735(oldNode: SyntaxNode, newNode: SyntaxNode): System.Collections.Generic.IList<Text.TextChange> {
            return new SyntaxDiffer().ctor_1162(oldNode, newNode,/*computeNewText:*/true).ComputeTextChangesFromOld();
        }
        private ComputeTextChangesFromOld(): System.Collections.Generic.IList<Text.TextChange> {
            this.ComputeChangeRecords();
            var reducedChanges = this.ReduceChanges(this.changes);
            return System.Linq.Enumerable.ToList(System.Linq.Enumerable.Select(reducedChanges,
                c => new Text.TextChange().ctor_1791(c.Range.Span, c.NewText)));
        }
        public static GetPossiblyDifferentTextSpans_6752(before: SyntaxTree, after: SyntaxTree): System.Collections.Generic.IList<Text.TextSpan> {
            if (before == after) {
                return Roslyn.Utilities.SpecializedCollections.EmptyList<Text.TextSpan>();
            }
            else if (before == null) {
                return new Array(new Text.TextSpan().ctor_1506(0, after.GetText().Length));
            }
            else if (after == null) {
                throw new System.ArgumentNullException("after");
            }
            else {
                return SyntaxDiffer.GetPossiblyDifferentTextSpans_1819(before.GetRoot(), after.GetRoot());
            }
        }
        public static GetPossiblyDifferentTextSpans_1819(oldNode: SyntaxNode, newNode: SyntaxNode): System.Collections.Generic.IList<Text.TextSpan> {
            return new SyntaxDiffer().ctor_1162(oldNode, newNode,/*computeNewText:*/false).ComputeSpansInNew();
        }
        private ComputeSpansInNew(): System.Collections.Generic.IList<Text.TextSpan> {
            this.ComputeChangeRecords();
            var reducedChanges = this.ReduceChanges(this.changes);
            var newSpans = new System.Collections.Generic.List<Text.TextSpan>();
            var delta: number = 0;
            // for each
            var changeEnumerator = reducedChanges.GetEnumerator();
            try {
                while (changeEnumerator.MoveNext()) {
                    var change = changeEnumerator.Current;
                    // foreach block
                    if (change.Range.NewLength > 0) {
                        var start: number = change.Range.Span.Start + delta;
                        newSpans.Add(new Text.TextSpan().ctor_1506(start, change.Range.NewLength));
                    }
                    delta += change.Range.NewLength - change.Range.Span.Length;
                }
            } finally {
                if (changeEnumerator !== null) changeEnumerator.Dispose();

            }    
            // end foreach
            return newSpans;
        }
        private ComputeChangeRecords(): void {
            while (true) {
                if (this.newNodes.Count == 0) {
                    if (this.oldNodes.Count > 0) {
                        this.RecordDeleteOld(this.oldNodes.Count);
                    }
                    break;
                }
                else if (this.oldNodes.Count == 0) {
                    if (this.newNodes.Count > 0) {
                        this.RecordInsertNew(this.newNodes.Count);
                    }
                    break;
                }
                else {
                    var action = this.GetNextAction();
                    switch (action.Operation) {
                        case SyntaxDiffer.DiffOp.SkipBoth:
                            SyntaxDiffer.RemoveFirst(this.oldNodes, action.Count);
                            SyntaxDiffer.RemoveFirst(this.newNodes, action.Count);
                            break;
                        case SyntaxDiffer.DiffOp.ReduceOld:
                            SyntaxDiffer.ReplaceFirstWithChildren(this.oldNodes);
                            break;
                        case SyntaxDiffer.DiffOp.ReduceNew:
                            SyntaxDiffer.ReplaceFirstWithChildren(this.newNodes);
                            break;
                        case SyntaxDiffer.DiffOp.ReduceBoth:
                            SyntaxDiffer.ReplaceFirstWithChildren(this.oldNodes);
                            SyntaxDiffer.ReplaceFirstWithChildren(this.newNodes);
                            break;
                        case SyntaxDiffer.DiffOp.InsertNew:
                            this.RecordInsertNew(action.Count);
                            break;
                        case SyntaxDiffer.DiffOp.DeleteOld:
                            this.RecordDeleteOld(action.Count);
                            break;
                        case SyntaxDiffer.DiffOp.ReplaceOldWithNew:
                            this.RecordReplaceOldWithNew(action.Count, action.Count);
                            break;
                    }
                }
            }
        }
        private GetNextAction(): SyntaxDiffer.DiffAction {
            var oldIsToken: boolean = this.oldNodes.Peek().IsToken;
            var newIsToken: boolean = this.newNodes.Peek().IsToken;
            var indexOfOldInNew: number = 0;
            var similarityOfOldInNew: number = 0;
            var indexOfNewInOld: number = 0;
            var similarityOfNewInOld: number = 0;
            var indexOfOldInNew_ref0 = { refObj: indexOfOldInNew };
            var similarityOfOldInNew_ref1 = { refObj: similarityOfOldInNew };
            this.FindBestMatch(this.newNodes, this.oldNodes.Peek(), indexOfOldInNew_ref0, similarityOfOldInNew_ref1);

            indexOfOldInNew = indexOfOldInNew_ref0.refObj;

            similarityOfOldInNew = similarityOfOldInNew_ref1.refObj;;
            var indexOfNewInOld_ref0 = { refObj: indexOfNewInOld };
            var similarityOfNewInOld_ref1 = { refObj: similarityOfNewInOld };
            this.FindBestMatch(this.oldNodes, this.newNodes.Peek(), indexOfNewInOld_ref0, similarityOfNewInOld_ref1);

            indexOfNewInOld = indexOfNewInOld_ref0.refObj;

            similarityOfNewInOld = similarityOfNewInOld_ref1.refObj;;
            if (indexOfOldInNew == 0 && indexOfNewInOld == 0) {
                if (SyntaxDiffer.AreIdentical(this.oldNodes.Peek(), this.newNodes.Peek())) {
                    return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.SkipBoth, 1);
                }
                else if (!oldIsToken && !newIsToken) {
                    return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.ReduceBoth, 1);
                }
                else {
                    return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.ReplaceOldWithNew, 1);
                }
            }
            else if (indexOfOldInNew >= 0 || indexOfNewInOld >= 0) {
                if (indexOfNewInOld < 0 || similarityOfOldInNew >= similarityOfNewInOld) {
                    if (indexOfOldInNew > 0) {
                        return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.InsertNew, indexOfOldInNew);
                    }
                    else if (!newIsToken) {
                        if (SyntaxDiffer.AreSimilar(this.oldNodes.Peek(), this.newNodes.Peek())) {
                            return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.ReduceBoth, 1);
                        }
                        else {
                            return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.ReduceNew, 1);
                        }
                    }
                    else {
                        return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.ReplaceOldWithNew, 1);
                    }
                }
                else {
                    if (indexOfNewInOld > 0) {
                        return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.DeleteOld, indexOfNewInOld);
                    }
                    else if (!oldIsToken) {
                        if (SyntaxDiffer.AreSimilar(this.oldNodes.Peek(), this.newNodes.Peek())) {
                            return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.ReduceBoth, 1);
                        }
                        else {
                            return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.ReduceOld, 1);
                        }
                    }
                    else {
                        return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.ReplaceOldWithNew, 1);
                    }
                }
            }
            else {
                if (!oldIsToken && !newIsToken) {
                    var sim = this.GetSimilarity(this.oldNodes.Peek(), this.newNodes.Peek());
                    if (sim >= System.Math.Max(this.oldNodes.Peek().FullSpan.Length, this.newNodes.Peek().FullSpan.Length)) {
                        return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.ReduceBoth, 1);
                    }
                }
                return new SyntaxDiffer.DiffAction().ctor_7831(SyntaxDiffer.DiffOp.ReplaceOldWithNew, 1);
            }
        }
        private static ReplaceFirstWithChildren(stack: System.Collections.Generic.Stack<SyntaxNodeOrToken>): void {
            var node = stack.Pop();
            var c: number = 0;
            var children = StructArray(SyntaxNodeOrToken, node.ChildNodesAndTokens().Count);
            // for each
            var childEnumerator = node.ChildNodesAndTokens().GetEnumerator();
            try {
                while (childEnumerator.MoveNext()) {
                    var child = childEnumerator.Current;
                    // foreach block
                    if (child.FullSpan.Length > 0) {
                        children[c] = child;
                        c++;
                    }
                }
            } finally {
                if (childEnumerator !== null) childEnumerator.Dispose();

            }    
            // end foreach
            for (var i: number = c - 1; i >= 0; i--) {
                stack.Push(children[i]);
            }
        }
        private FindBestMatch(stack: System.Collections.Generic.Stack<SyntaxNodeOrToken>, node: SyntaxNodeOrToken, index: { refObj: number }, similarity: { refObj: number }): void {
            index.refObj = -1;
            similarity.refObj = -1;
            var i: number = 0;
            // for each
            var listNodeEnumerator = stack.GetEnumerator();
            try {
                while (listNodeEnumerator.MoveNext()) {
                    var listNode = listNodeEnumerator.Current;
                    // foreach block
                    if (i >= SyntaxDiffer.MaxSearchLength) {
                        break;
                    }
                    if (SyntaxDiffer.AreIdentical(listNode, node)) {
                        var sim = node.FullSpan.Length;
                        if (sim > similarity.refObj) {
                            index.refObj = i;
                            similarity.refObj = sim;
                            return
                        }
                    }
                    else if (SyntaxDiffer.AreSimilar(listNode, node)) {
                        var sim = this.GetSimilarity(listNode, node);
                        if (sim == node.FullSpan.Length && node.IsToken) {
                            if (listNode.ToFullString() == node.ToFullString()) {
                                index.refObj = i;
                                similarity.refObj = sim;
                                return
                            }
                        }
                        if (sim > similarity.refObj) {
                            index.refObj = i;
                            similarity.refObj = sim;
                        }
                    }
                    else {
                        var j: number = 0;
                        // for each
                        var childEnumerator = listNode.ChildNodesAndTokens().GetEnumerator();
                        try {
                            while (childEnumerator.MoveNext()) {
                                var child = childEnumerator.Current;
                                // foreach block
                                if (j >= SyntaxDiffer.MaxSearchLength) {
                                    break;
                                }
                                j++;
                                if (SyntaxDiffer.AreIdentical(child, node)) {
                                    index.refObj = i;
                                    similarity.refObj = node.FullSpan.Length;
                                    return
                                }
                                else if (SyntaxDiffer.AreSimilar(child, node)) {
                                    var sim = this.GetSimilarity(child, node);
                                    if (sim > similarity.refObj) {
                                        index.refObj = i;
                                        similarity.refObj = sim;
                                    }
                                }
                            }
                        } finally {
                            if (childEnumerator !== null) childEnumerator.Dispose();

                        }    
                        // end foreach
                    }
                    i++;
                }
            } finally {
                if (listNodeEnumerator !== null) listNodeEnumerator.Dispose();

            }    
            // end foreach
        }
        private GetSimilarity(node1: SyntaxNodeOrToken, node2: SyntaxNodeOrToken): number {
            var w: number = 0;
            this.nodeSimilaritySet.Clear();
            this.tokenTextSimilaritySet.Clear();
            if (node1.IsToken && node2.IsToken) {
                var text1 = node1.ToString();
                var text2 = node2.ToString();
                if (text1 == text2) {
                    w += text1.length;
                }
                // for each
                var trEnumerator = node1.GetLeadingTrivia().GetEnumerator();
                try {
                    while (trEnumerator.MoveNext()) {
                        var tr = trEnumerator.Current;
                        // foreach block
                        this.nodeSimilaritySet.Add(tr.UnderlyingNode);
                    }
                } finally {
                    if (trEnumerator !== null) trEnumerator.Dispose();

                }    
                // end foreach
                // for each
                var trEnumerator = node1.GetTrailingTrivia().GetEnumerator();
                try {
                    while (trEnumerator.MoveNext()) {
                        var tr = trEnumerator.Current;
                        // foreach block
                        this.nodeSimilaritySet.Add(tr.UnderlyingNode);
                    }
                } finally {
                    if (trEnumerator !== null) trEnumerator.Dispose();

                }    
                // end foreach
                // for each
                var trEnumerator = node2.GetLeadingTrivia().GetEnumerator();
                try {
                    while (trEnumerator.MoveNext()) {
                        var tr = trEnumerator.Current;
                        // foreach block
                        if (this.nodeSimilaritySet.Contains(tr.UnderlyingNode)) {
                            w += tr.FullSpan.Length;
                        }
                    }
                } finally {
                    if (trEnumerator !== null) trEnumerator.Dispose();

                }    
                // end foreach
                // for each
                var trEnumerator = node2.GetTrailingTrivia().GetEnumerator();
                try {
                    while (trEnumerator.MoveNext()) {
                        var tr = trEnumerator.Current;
                        // foreach block
                        if (this.nodeSimilaritySet.Contains(tr.UnderlyingNode)) {
                            w += tr.FullSpan.Length;
                        }
                    }
                } finally {
                    if (trEnumerator !== null) trEnumerator.Dispose();

                }    
                // end foreach
            }
            else {
                // for each
                var n1Enumerator = node1.ChildNodesAndTokens().GetEnumerator();
                try {
                    while (n1Enumerator.MoveNext()) {
                        var n1 = n1Enumerator.Current;
                        // foreach block
                        this.nodeSimilaritySet.Add(n1.UnderlyingNode);
                        if (n1.IsToken) {
                            this.tokenTextSimilaritySet.Add(n1.ToString());
                        }
                    }
                } finally {
                    if (n1Enumerator !== null) n1Enumerator.Dispose();

                }    
                // end foreach
                // for each
                var n2Enumerator = node2.ChildNodesAndTokens().GetEnumerator();
                try {
                    while (n2Enumerator.MoveNext()) {
                        var n2 = n2Enumerator.Current;
                        // foreach block
                        if (this.nodeSimilaritySet.Contains(n2.UnderlyingNode)) {
                            w += n2.FullSpan.Length;
                        }
                        else if (n2.IsToken) {
                            var tokenText = n2.ToString();
                            if (this.tokenTextSimilaritySet.Contains(tokenText)) {
                                w += tokenText.length;
                            }
                        }
                    }
                } finally {
                    if (n2Enumerator !== null) n2Enumerator.Dispose();

                }    
                // end foreach
            }
            return w;
        }
        private static AreIdentical(node1: SyntaxNodeOrToken, node2: SyntaxNodeOrToken): boolean {
            return node1.UnderlyingNode == node2.UnderlyingNode;
        }
        private static AreSimilar(node1: SyntaxNodeOrToken, node2: SyntaxNodeOrToken): boolean {
            return node1.RawKind == node2.RawKind;
        }
        private RecordDeleteOld(oldNodeCount: number): void {
            var oldSpan = SyntaxDiffer.GetSpan(this.oldNodes, 0, oldNodeCount);
            var removedNodes = SyntaxDiffer.CopyFirst(this.oldNodes, oldNodeCount);
            SyntaxDiffer.RemoveFirst(this.oldNodes, oldNodeCount);
            this.RecordChange(new SyntaxDiffer.ChangeRecord().ctor_2028(new Text.TextChangeRange().ctor_4786(oldSpan, 0), removedNodes, null));
        }
        private RecordReplaceOldWithNew(oldNodeCount: number, newNodeCount: number): void {
            var oldSpan = SyntaxDiffer.GetSpan(this.oldNodes, 0, oldNodeCount);
            var removedNodes = SyntaxDiffer.CopyFirst(this.oldNodes, oldNodeCount);
            SyntaxDiffer.RemoveFirst(this.oldNodes, oldNodeCount);
            var newSpan = SyntaxDiffer.GetSpan(this.newNodes, 0, newNodeCount);
            var insertedNodes = SyntaxDiffer.CopyFirst(this.newNodes, newNodeCount);
            SyntaxDiffer.RemoveFirst(this.newNodes, newNodeCount);
            this.RecordChange(new SyntaxDiffer.ChangeRecord().ctor_2028(new Text.TextChangeRange().ctor_4786(oldSpan, newSpan.Length), removedNodes, insertedNodes));
        }
        private RecordInsertNew(newNodeCount: number): void {
            var newSpan = SyntaxDiffer.GetSpan(this.newNodes, 0, newNodeCount);
            var insertedNodes = SyntaxDiffer.CopyFirst(this.newNodes, newNodeCount);
            SyntaxDiffer.RemoveFirst(this.newNodes, newNodeCount);
            var start: number = this.oldNodes.Count > 0 ? this.oldNodes.Peek().Position : this.oldSpan.End;
            this.RecordChange(new SyntaxDiffer.ChangeRecord().ctor_2028(new Text.TextChangeRange().ctor_4786(new Text.TextSpan().ctor_1506(start, 0), newSpan.Length), null, insertedNodes));
        }
        private RecordChange(change: SyntaxDiffer.ChangeRecord): void {
            if (this.changes.Count > 0) {
                var last = this.changes.$get$(this.changes.Count - 1);
                if (last.Range.Span.End == change.Range.Span.Start) {
                    this.changes.$set$(this.changes.Count - 1, new SyntaxDiffer.ChangeRecord().ctor_2028(new Text.TextChangeRange().ctor_4786(new Text.TextSpan().ctor_1506(last.Range.Span.Start, last.Range.Span.Length + change.Range.Span.Length), last.Range.NewLength + change.Range.NewLength), SyntaxDiffer.Combine(last.OldNodes, change.OldNodes), SyntaxDiffer.Combine(last.NewNodes, change.NewNodes)));
                    return
                }
                System.Diagnostics.Debug.Assert(change.Range.Span.Start >= last.Range.Span.End);
            }
            this.changes.Add(change);
        }
        private static GetSpan(stack: System.Collections.Generic.Stack<SyntaxNodeOrToken>, first: number, length: number): Text.TextSpan {
            var start: number = -1, end = -1, i = 0;
            // for each
            var nEnumerator = stack.GetEnumerator();
            try {
                while (nEnumerator.MoveNext()) {
                    var n = nEnumerator.Current;
                    // foreach block
                    if (i == first) {
                        start = n.Position;
                    }
                    if (i == first + length - 1) {
                        end = n.EndPosition;
                        break;
                    }
                    i++;
                }
            } finally {
                if (nEnumerator !== null) nEnumerator.Dispose();

            }    
            // end foreach
            System.Diagnostics.Debug.Assert(start >= 0);
            System.Diagnostics.Debug.Assert(end >= 0);
            return Text.TextSpan.FromBounds(start, end);
        }
        private static Combine(first: System.Collections.Generic.Stack<SyntaxNodeOrToken>, next: System.Collections.Generic.Stack<SyntaxNodeOrToken>): System.Collections.Generic.Stack<SyntaxNodeOrToken> {
            if (first == null) {
                return next;
            }
            if (next == null) {
                return first;
            }
            var nodes = SyntaxDiffer.ToArray(first, first.Count);
            for (var i: number = 0; i < nodes.length; i++) {
                next.Push(nodes[i]);
            }
            return next;
        }
        private static CopyFirst(stack: System.Collections.Generic.Stack<SyntaxNodeOrToken>, n: number): System.Collections.Generic.Stack<SyntaxNodeOrToken> {
            if (n == 0) {
                return null;
            }
            var nodes = SyntaxDiffer.ToArray(stack, n);
            var newStack = new System.Collections.Generic.Stack<SyntaxNodeOrToken>(nodes);
            return newStack;
        }
        private static ToArray(stack: System.Collections.Generic.Stack<SyntaxNodeOrToken>, n: number): SyntaxNodeOrToken[] {
            var nodes = StructArray(SyntaxNodeOrToken, n);
            var i: number = n - 1;
            // for each
            var nodeEnumerator = stack.GetEnumerator();
            try {
                while (nodeEnumerator.MoveNext()) {
                    var node = nodeEnumerator.Current;
                    // foreach block
                    nodes[i] = node;
                    i--;
                    if (i < 0) {
                        break;
                    }
                }
            } finally {
                if (nodeEnumerator !== null) nodeEnumerator.Dispose();

            }    
            // end foreach
            return nodes;
        }
        private static RemoveFirst(stack: System.Collections.Generic.Stack<SyntaxNodeOrToken>, count: number): void {
            for (var i: number = 0; i < count; ++i) {
                stack.Pop();
            }
        }
        private ReduceChanges(changeRecords: System.Collections.Generic.List<SyntaxDiffer.ChangeRecord>): System.Collections.Generic.List<SyntaxDiffer.ChangeRangeWithText> {
            var textChanges = new System.Collections.Generic.List<SyntaxDiffer.ChangeRangeWithText>(changeRecords.Count);
            var oldText = new System.Text.StringBuilder();
            var newText = new System.Text.StringBuilder();
            // for each
            var crEnumerator = changeRecords.GetEnumerator();
            try {
                while (crEnumerator.MoveNext()) {
                    var cr = crEnumerator.Current;
                    // foreach block
                    if (cr.Range.Span.Length > 0 && cr.Range.NewLength > 0) {
                        var range = cr.Range;
                        SyntaxDiffer.CopyText(cr.OldNodes, oldText);
                        SyntaxDiffer.CopyText(cr.NewNodes, newText);
                        var commonLeadingCount: number = 0;
                        var commonTrailingCount: number = 0;
                        var commonLeadingCount_ref0 = { refObj: commonLeadingCount };
                        var commonTrailingCount_ref1 = { refObj: commonTrailingCount };
                        SyntaxDiffer.GetCommonEdgeLengths(oldText, newText, commonLeadingCount_ref0, commonTrailingCount_ref1);

                        commonLeadingCount = commonLeadingCount_ref0.refObj;

                        commonTrailingCount = commonTrailingCount_ref1.refObj;;
                        if (commonLeadingCount > 0 || commonTrailingCount > 0) {
                            range = new Text.TextChangeRange().ctor_4786(new Text.TextSpan().ctor_1506(range.Span.Start + commonLeadingCount, range.Span.Length - (commonLeadingCount + commonTrailingCount)), range.NewLength - (commonLeadingCount + commonTrailingCount));
                            if (commonTrailingCount > 0) {
                                newText.Remove(newText.Length - commonTrailingCount, commonTrailingCount);
                            }
                            if (commonLeadingCount > 0) {
                                newText.Remove(0, commonLeadingCount);
                            }
                        }
                        if (range.Span.Length > 0 || range.NewLength > 0) {
                            textChanges.Add(new SyntaxDiffer.ChangeRangeWithText().ctor_1862(range, this.computeNewText ? newText.ToString() : null));
                        }
                    }
                    else {
                        textChanges.Add(new SyntaxDiffer.ChangeRangeWithText().ctor_1862(cr.Range, this.computeNewText ? SyntaxDiffer.GetText(cr.NewNodes) : null));
                    }
                }
            } finally {
                if (crEnumerator !== null) crEnumerator.Dispose();

            }    
            // end foreach
            return textChanges;
        }
        private static GetCommonEdgeLengths(oldText: System.Text.StringBuilder, newText: System.Text.StringBuilder, commonLeadingCount: { refObj: number }, commonTrailingCount: { refObj: number }): void {
            var maxChars: number = System.Math.Min(oldText.Length, newText.Length);
            commonLeadingCount.refObj = 0;
            for (; commonLeadingCount.refObj < maxChars; commonLeadingCount.refObj++) {
                if (oldText.$get$(commonLeadingCount.refObj) != newText.$get$(commonLeadingCount.refObj)) {
                    break;
                }
            }
            maxChars = maxChars - commonLeadingCount.refObj;
            commonTrailingCount.refObj = 0;
            for (; commonTrailingCount.refObj < maxChars; commonTrailingCount.refObj++) {
                if (oldText.$get$(oldText.Length - commonTrailingCount.refObj - 1) != newText.$get$(newText.Length - commonTrailingCount.refObj - 1)) {
                    break;
                }
            }
        }
        private static GetText(stack: System.Collections.Generic.Stack<SyntaxNodeOrToken>): string {
            if (stack == null || stack.Count == 0) {
                return System.String.Empty;
            }
            var span = SyntaxDiffer.GetSpan(stack, 0, stack.Count);
            var builder = new System.Text.StringBuilder(span.Length);
            SyntaxDiffer.CopyText(stack, builder);
            return builder.ToString();
        }
        private static CopyText(stack: System.Collections.Generic.Stack<SyntaxNodeOrToken>, builder: System.Text.StringBuilder): void {
            builder.Length = 0;
            if (stack != null && stack.Count > 0) {
                var writer = new System.IO.StringWriter(builder);
                // for each
                var nEnumerator = stack.GetEnumerator();
                try {
                    while (nEnumerator.MoveNext()) {
                        var n = nEnumerator.Current;
                        // foreach block
                        n.WriteTo(writer);
                    }
                } finally {
                    if (nEnumerator !== null) nEnumerator.Dispose();

                }    
                // end foreach
                writer.Flush();
            }
        }
        constructor() { }
    }
    export module SyntaxDiffer {
        export enum DiffOp {
            None = 0,
            SkipBoth,
            ReduceOld,
            ReduceNew,
            ReduceBoth,
            InsertNew,
            DeleteOld,
            ReplaceOldWithNew
        }
    }
    export module SyntaxDiffer {
        export class DiffAction implements IStruct {
            public Operation: DiffOp = 0;
            public Count: number = 0;
            ctor_7831(operation: DiffOp, count: number): DiffAction {
                System.Diagnostics.Debug.Assert(count >= 0);
                this.Operation = operation;
                this.Count = count;
                return this;
            }
            constructor() { }
        }
    }
    export module SyntaxDiffer {
        export class ChangeRecord implements IStruct {
            public Range: Text.TextChangeRange = structDefault(Text.TextChangeRange);
            public OldNodes: System.Collections.Generic.Stack<SyntaxNodeOrToken>;
            public NewNodes: System.Collections.Generic.Stack<SyntaxNodeOrToken>;
            ctor_2028(range: Text.TextChangeRange, oldNodes: System.Collections.Generic.Stack<SyntaxNodeOrToken>, newNodes: System.Collections.Generic.Stack<SyntaxNodeOrToken>): ChangeRecord {
                this.Range = range;
                this.OldNodes = oldNodes;
                this.NewNodes = newNodes;
                return this;
            }
            constructor() { }
        }
    }
    export module SyntaxDiffer {
        export class ChangeRangeWithText implements IStruct {
            public Range: Text.TextChangeRange = structDefault(Text.TextChangeRange);
            public NewText: string;
            ctor_1862(range: Text.TextChangeRange, newText: string): ChangeRangeWithText {
                this.Range = range;
                this.NewText = newText;
                return this;
            }
            constructor() { }
        }
    }
}