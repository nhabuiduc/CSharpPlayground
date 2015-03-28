module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class CSharpLineDirectiveMap extends LineDirectiveMap<DirectiveTriviaSyntax>
    {
        ctor_1559(syntaxTree: SyntaxTree): CSharpLineDirectiveMap {
            super.ctor_1651(syntaxTree);
            return this;
        }
        protected  ShouldAddDirective(directive: DirectiveTriviaSyntax): boolean {
            return directive.IsActive && directive.Kind == SyntaxKind.LineDirectiveTrivia;
        }
        protected  GetEntry(directiveNode: DirectiveTriviaSyntax, sourceText: Text.SourceText, previous: LineDirectiveMap.LineMappingEntry): LineDirectiveMap.LineMappingEntry {
            System.Diagnostics.Debug.Assert(this.ShouldAddDirective(directiveNode));
            var directive = <LineDirectiveTriviaSyntax>directiveNode;
            var directiveLineNumber = sourceText.Lines.IndexOf(directive.SpanStart) + 1;
            var unmappedLine = directiveLineNumber;
            var mappedLine = previous.MappedLine + directiveLineNumber - previous.UnmappedLine;
            var mappedPathOpt = previous.MappedPathOpt;
            var state: LineDirectiveMap.PositionState = LineDirectiveMap.PositionState.Unmapped;
            var lineToken: SyntaxToken = directive.Line;
            if (!lineToken.IsMissing) {
                switch (CSharpExtensions.CSharpKind_1238(lineToken)) {
                    case SyntaxKind.HiddenKeyword:
                        state = LineDirectiveMap.PositionState.Hidden;
                        break;
                    case SyntaxKind.DefaultKeyword:
                        mappedLine = unmappedLine;
                        mappedPathOpt = null;
                        state = LineDirectiveMap.PositionState.Unmapped;
                        break;
                    case SyntaxKind.NumericLiteralToken:
                        if (!lineToken.ContainsDiagnostics) {
                            var value: Object = lineToken.Value;
                            if (typeof value === 'number') {
                                mappedLine = (<number>(<number>value | 0)) - 1;
                            }
                            if (CSharpExtensions.CSharpKind_1238(directive.File) == SyntaxKind.StringLiteralToken) {
                                mappedPathOpt = <string>directive.File.Value;
                            }
                            state = LineDirectiveMap.PositionState.Remapped;
                        }
                        break;
                }
            }
            return new LineDirectiveMap.LineMappingEntry().ctor_1477(unmappedLine, mappedLine, mappedPathOpt, state);
        }
        protected  InitializeFirstEntry(): LineDirectiveMap.LineMappingEntry {
            return new LineDirectiveMap.LineMappingEntry().ctor_1477(0, 0, null, LineDirectiveMap.PositionState.Unmapped);
        }
        public GetLineVisibility(sourceText: Text.SourceText, position: number): LineVisibility {
            var unmappedPos = sourceText.Lines.GetLinePosition(position);
            if (this.Entries.length == 1) {
                System.Diagnostics.Debug.Assert(this.Entries[0].State == LineDirectiveMap.PositionState.Unmapped);
                return LineVisibility.Visible;
            }
            var index = this.FindEntryIndex(unmappedPos.Line);
            var entry = this.Entries[index];
            System.Diagnostics.Debug.Assert(entry.State != LineDirectiveMap.PositionState.Unknown && entry.State != LineDirectiveMap.PositionState.RemappedAfterHidden && entry.State != LineDirectiveMap.PositionState.RemappedAfterUnknown);
            switch (entry.State) {
                case LineDirectiveMap.PositionState.Unmapped:
                    if (index == 0) {
                        return LineVisibility.BeforeFirstLineDirective;
                    }
                    else {
                        return LineVisibility.Visible;
                    }
                case LineDirectiveMap.PositionState.Remapped:
                    return LineVisibility.Visible;
                case LineDirectiveMap.PositionState.Hidden:
                    return LineVisibility.Hidden;
                default:
                    throw Roslyn.Utilities.ExceptionUtilities.UnexpectedValue(entry.State);
            }
        }
        public TranslateSpanAndVisibility(sourceText: Text.SourceText, treeFilePath: string, span: Text.TextSpan, isHiddenPosition: { refObj: boolean }): FileLinePositionSpan {
            var lines = sourceText.Lines;
            var unmappedStartPos = lines.GetLinePosition(span.Start);
            var unmappedEndPos = lines.GetLinePosition(span.End);
            if (this.Entries.length == 1) {
                System.Diagnostics.Debug.Assert(this.Entries[0].State == LineDirectiveMap.PositionState.Unmapped);
                System.Diagnostics.Debug.Assert(this.Entries[0].MappedLine == this.Entries[0].UnmappedLine);
                System.Diagnostics.Debug.Assert(this.Entries[0].MappedLine == 0);
                System.Diagnostics.Debug.Assert(this.Entries[0].MappedPathOpt == null);
                isHiddenPosition.refObj = false;
                return new FileLinePositionSpan().ctor_1503(treeFilePath, unmappedStartPos, unmappedEndPos);
            }
            var entry = this.FindEntry(unmappedStartPos.Line);
            System.Diagnostics.Debug.Assert(entry.State != LineDirectiveMap.PositionState.Unknown && entry.State != LineDirectiveMap.PositionState.RemappedAfterHidden && entry.State != LineDirectiveMap.PositionState.RemappedAfterUnknown);
            isHiddenPosition.refObj = entry.State == LineDirectiveMap.PositionState.Hidden;
            return this.TranslateSpan_1274(entry, treeFilePath, unmappedStartPos, unmappedEndPos);
        }
        constructor() { super(); }
    }
}