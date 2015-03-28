module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxEquivalence {
        public static AreEquivalent_6608(before: SyntaxTree, after: SyntaxTree, ignoreChildNode: (_: SyntaxKind) => boolean, topLevel: boolean): boolean {
            if (before == after) {
                return true;
            }
            if (before == null || after == null) {
                return false;
            }
            return SyntaxEquivalence.AreEquivalent_1123(before.GetRoot(), after.GetRoot(), ignoreChildNode, topLevel);
        }
        public static AreEquivalent_1123(before: SyntaxNode, after: SyntaxNode, ignoreChildNode: (_: SyntaxKind) => boolean, topLevel: boolean): boolean {
            System.Diagnostics.Debug.Assert(!topLevel || ignoreChildNode == null);
            if (before == null || after == null) {
                return before == after;
            }
            return SyntaxEquivalence.AreEquivalentRecursive(before.Green, after.Green, ignoreChildNode,/*topLevel:*/topLevel);
        }
        public static AreEquivalent_1097(before: SyntaxTokenList, after: SyntaxTokenList): boolean {
            return SyntaxEquivalence.AreEquivalentRecursive(before.Node, after.Node,/*ignoreChildNode:*/null,/*topLevel:*/false);
        }
        public static AreEquivalent_8521(before: SyntaxToken, after: SyntaxToken): boolean {
            return before.RawKind == after.RawKind && (before.Node == null || SyntaxEquivalence.AreTokensEquivalent(before.Node, after.Node));
        }
        private static AreTokensEquivalent(before: GreenNode, after: GreenNode): boolean {
            System.Diagnostics.Debug.Assert(before.RawKind == after.RawKind);
            if (before.IsMissing != after.IsMissing) {
                return false;
            }
            switch (<SyntaxKind>before.RawKind) {
                case SyntaxKind.IdentifierToken:
                    return (<InternalSyntax.SyntaxToken>before).ValueText == (<InternalSyntax.SyntaxToken>after).ValueText;
                case SyntaxKind.NumericLiteralToken:
                case SyntaxKind.CharacterLiteralToken:
                case SyntaxKind.StringLiteralToken:
                    return (<InternalSyntax.SyntaxToken>before).Text == (<InternalSyntax.SyntaxToken>after).Text;
            }
            return true;
        }
        private static AreEquivalentRecursive(before: GreenNode, after: GreenNode, ignoreChildNode: (_: SyntaxKind) => boolean, topLevel: boolean): boolean {
            if (before == after) {
                return true;
            }
            if (before == null || after == null) {
                return false;
            }
            if (before.RawKind != after.RawKind) {
                return false;
            }
            if (before.IsToken) {
                System.Diagnostics.Debug.Assert(after.IsToken);
                return SyntaxEquivalence.AreTokensEquivalent(before, after);
            }
            if (topLevel) {
                if (<SyntaxKind>before.RawKind == SyntaxKind.Block) {
                    return true;
                }
                if (<SyntaxKind>before.RawKind == SyntaxKind.FieldDeclaration) {
                    var fieldBefore = <InternalSyntax.FieldDeclarationSyntax>before;
                    var fieldAfter = <InternalSyntax.FieldDeclarationSyntax>after;
                    var isConstBefore = fieldBefore.Modifiers.Any_1043(SyntaxKind.ConstKeyword);
                    var isConstAfter = fieldAfter.Modifiers.Any_1043(SyntaxKind.ConstKeyword);
                    if (!isConstBefore && !isConstAfter) {
                        ignoreChildNode = childKind => childKind == SyntaxKind.EqualsValueClause;
                    }
                }
            }
            if (ignoreChildNode != null) {
                var e1 = (<InternalSyntax.CSharpSyntaxNode>before).ChildNodesAndTokens().GetEnumerator();
                var e2 = (<InternalSyntax.CSharpSyntaxNode>after).ChildNodesAndTokens().GetEnumerator();
                while (true) {
                    var child1: GreenNode = null;
                    var child2: GreenNode = null;
                    while (e1.MoveNext()) {
                        var c = e1.Current;
                        if (c != null && (c.IsToken || !ignoreChildNode(<SyntaxKind>c.RawKind))) {
                            child1 = c;
                            break;
                        }
                    }
                    while (e2.MoveNext()) {
                        var c = e2.Current;
                        if (c != null && (c.IsToken || !ignoreChildNode(<SyntaxKind>c.RawKind))) {
                            child2 = c;
                            break;
                        }
                    }
                    if (child1 == null || child2 == null) {
                        return child1 == child2;
                    }
                    if (!SyntaxEquivalence.AreEquivalentRecursive(child1, child2, ignoreChildNode, topLevel)) {
                        return false;
                    }
                }
            }
            else {
                var slotCount: number = before.SlotCount;
                if (slotCount != after.SlotCount) {
                    return false;
                }
                for (var i: number = 0; i < slotCount; i++) {
                    var child1 = before.GetSlot(i);
                    var child2 = after.GetSlot(i);
                    if (!SyntaxEquivalence.AreEquivalentRecursive(child1, child2, ignoreChildNode, topLevel)) {
                        return false;
                    }
                }
                return true;
            }
        }
    }
}