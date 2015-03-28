module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class CSharpPragmaWarningStateMap extends CodeAnalysis.Syntax.AbstractWarningStateMap {
        ctor_1595(syntaxTree: SyntaxTree): CSharpPragmaWarningStateMap {
            super.ctor_9031(syntaxTree);
            return this;
        }
        protected  CreateWarningStateMapEntries(syntaxTree: SyntaxTree): CodeAnalysis.Syntax.AbstractWarningStateMap.WarningStateMapEntry[] {
            var directives = ArrayBuilder.GetInstance_1997<PragmaWarningDirectiveTriviaSyntax>();
            CSharpPragmaWarningStateMap.GetAllPragmaWarningDirectives(syntaxTree, directives);
            return CSharpPragmaWarningStateMap.CreatePragmaWarningStateEntries(directives.ToImmutableAndFree());
        }
        private static GetAllPragmaWarningDirectives(syntaxTree: SyntaxTree, directiveList: ArrayBuilder<PragmaWarningDirectiveTriviaSyntax>): void {
            // for each
            var dEnumerator = CSharpExtensions.GetDirectives(syntaxTree.GetRoot()).GetEnumerator();
            try {
                while (dEnumerator.MoveNext()) {
                    var d = dEnumerator.Current;
                    // foreach block
                    if (d.Kind == SyntaxKind.PragmaWarningDirectiveTrivia) {
                        var w = __as__<PragmaWarningDirectiveTriviaSyntax>(d, PragmaWarningDirectiveTriviaSyntax);
                        if (!w.DisableOrRestoreKeyword.IsMissing && !w.WarningKeyword.IsMissing && w.IsActive)
                            directiveList.Add(w);
                    }
                }
            } finally {
                if (dEnumerator !== null) dEnumerator.Dispose();

            }    
            // end foreach
        }
        private static CreatePragmaWarningStateEntries(directiveList: System.Collections.Immutable.ImmutableArray<PragmaWarningDirectiveTriviaSyntax>): CodeAnalysis.Syntax.AbstractWarningStateMap.WarningStateMapEntry[] {
            var entries = StructArray(CodeAnalysis.Syntax.AbstractWarningStateMap.WarningStateMapEntry, directiveList.Length + 1);
            var current = new CodeAnalysis.Syntax.AbstractWarningStateMap.WarningStateMapEntry().ctor_1499(0, ReportDiagnostic.Default, null);
            var index = 0;
            entries[index] = current;
            var accumulatedGeneralWarningState = ReportDiagnostic.Default;
            var accumulatedSpecificWarningState = System.Collections.Immutable.ImmutableDictionary.Create<string, ReportDiagnostic>();
            while (index < directiveList.Length) {
                var currentDirective = directiveList.$get$(index);
                var directiveState = CSharpExtensions.CSharpKind_1238(currentDirective.DisableOrRestoreKeyword) == SyntaxKind.DisableKeyword ? ReportDiagnostic.Suppress : ReportDiagnostic.Default;
                if (currentDirective.ErrorCodes.Count == 0) {
                    accumulatedGeneralWarningState = directiveState;
                    accumulatedSpecificWarningState = System.Collections.Immutable.ImmutableDictionary.Create<string, ReportDiagnostic>();
                }
                else {
                    for (var x: number = 0; x < currentDirective.ErrorCodes.Count; x++) {
                        var currentErrorCode = currentDirective.ErrorCodes.$get$(x);
                        if (currentErrorCode.IsMissing || currentErrorCode.ContainsDiagnostics)
                            continue;
                        var errorId = System.String.Empty;
                        if (currentErrorCode.Kind == SyntaxKind.NumericLiteralExpression) {
                            var token = (__as__<LiteralExpressionSyntax>(currentErrorCode, LiteralExpressionSyntax)).Token;
                            errorId = MessageProvider.Instance.GetIdForErrorCode(<number>(<number>token.Value | 0));
                        }
                        else if (currentErrorCode.Kind == SyntaxKind.IdentifierName) {
                            errorId = (__as__<IdentifierNameSyntax>(currentErrorCode, IdentifierNameSyntax)).Identifier.ValueText;
                        }
                        if (!System.String.IsNullOrWhiteSpace(errorId)) {
                            accumulatedSpecificWarningState = accumulatedSpecificWarningState.SetItem(errorId, directiveState);
                        }
                    }
                }
                current = new CodeAnalysis.Syntax.AbstractWarningStateMap.WarningStateMapEntry().ctor_1499(currentDirective.Location.SourceSpan.End, accumulatedGeneralWarningState, accumulatedSpecificWarningState);
                ++index;
                entries[index] = current;
            }
            for (var i: number = 1; i < entries.length - 1; ++i) {
                System.Diagnostics.Debug.Assert(entries[i].CompareTo(entries[i + 1]) < 0);
            }
            return entries;
        }
        constructor() { super(); }
    }
}