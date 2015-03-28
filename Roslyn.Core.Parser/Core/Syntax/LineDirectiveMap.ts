module Microsoft.CodeAnalysis {
    export class LineDirectiveMap<TDirective extends SyntaxNode>
    {
        protected  Entries: LineDirectiveMap.LineMappingEntry[];
        protected  ShouldAddDirective(directive: TDirective): boolean { throw new Error('not implemented'); }
        protected  GetEntry(directive: TDirective, sourceText: Text.SourceText, previous: LineDirectiveMap.LineMappingEntry): LineDirectiveMap.LineMappingEntry { throw new Error('not implemented'); }
        protected  InitializeFirstEntry(): LineDirectiveMap.LineMappingEntry { throw new Error('not implemented'); }
        ctor_1651(syntaxTree: SyntaxTree): LineDirectiveMap<TDirective> {
            var syntaxRoot = SyntaxNodeOrToken.op_Implicit_1792(syntaxTree.GetRoot());
            var directives: System.Collections.Generic.IEnumerable<TDirective> = syntaxRoot.GetDirectives_1318<TDirective>(/*filter:*/this.ShouldAddDirective.bind(this));
            System.Diagnostics.Debug.Assert(directives != null);
            this.Entries = this.CreateEntryMap(syntaxTree.GetText(), directives);
            return this;
        }
        public TranslateSpan_2705(sourceText: Text.SourceText, treeFilePath: string, span: Text.TextSpan): FileLinePositionSpan {
            var unmappedStartPos = sourceText.Lines.GetLinePosition(span.Start);
            var unmappedEndPos = sourceText.Lines.GetLinePosition(span.End);
            var entry = this.FindEntry(unmappedStartPos.Line);
            return this.TranslateSpan_1274(entry, treeFilePath, unmappedStartPos, unmappedEndPos);
        }
        protected TranslateSpan_1274(entry: LineDirectiveMap.LineMappingEntry, treeFilePath: string, unmappedStartPos: Text.LinePosition, unmappedEndPos: Text.LinePosition): FileLinePositionSpan {
            var path: string = entry.MappedPathOpt != null ? entry.MappedPathOpt : treeFilePath;
            var mappedStartLine: number = unmappedStartPos.Line - entry.UnmappedLine + entry.MappedLine;
            var mappedEndLine: number = unmappedEndPos.Line - entry.UnmappedLine + entry.MappedLine;
            return new FileLinePositionSpan().ctor_1079(path, new Text.LinePositionSpan().ctor_1348((mappedStartLine == -1) ? new Text.LinePosition().ctor_9638(unmappedStartPos.Character) : new Text.LinePosition().ctor_1367(mappedStartLine, unmappedStartPos.Character),(mappedEndLine == -1) ? new Text.LinePosition().ctor_9638(unmappedEndPos.Character) : new Text.LinePosition().ctor_1367(mappedEndLine, unmappedEndPos.Character)),/*hasMappedPath:*/entry.MappedPathOpt != null);
        }
        public GetLineVisibility(sourceText: Text.SourceText, position: number): LineVisibility { throw new Error('not implemented'); }
        public TranslateSpanAndVisibility(sourceText: Text.SourceText, treeFilePath: string, span: Text.TextSpan, isHiddenPosition: { refObj: boolean }): FileLinePositionSpan { throw new Error('not implemented'); }
        public HasAnyHiddenRegions(): boolean {
            return System.Linq.Enumerable.Any(this.Entries,
                e => e.State == LineDirectiveMap.PositionState.Hidden);
        }
        protected FindEntry(lineNumber: number): LineDirectiveMap.LineMappingEntry {
            var r: number = this.FindEntryIndex(lineNumber);
            return this.Entries[r];
        }
        protected FindEntryIndex(lineNumber: number): number {
            var r: number = TSArray.BinarySearch(this.Entries, new LineDirectiveMap.LineMappingEntry().ctor_9372(lineNumber));
            return r >= 0 ? r : ((~r) - 1);
        }
        private CreateEntryMap(sourceText: Text.SourceText, directives: System.Collections.Generic.IEnumerable<TDirective>): LineDirectiveMap.LineMappingEntry[] {
            var entries = StructArray(LineDirectiveMap.LineMappingEntry, System.Linq.Enumerable.Count(directives) + 1);
            var current = this.InitializeFirstEntry();
            var index = 0;
            entries[index] = current;
            // for each
            var directiveEnumerator = directives.GetEnumerator();
            try {
                while (directiveEnumerator.MoveNext()) {
                    var directive = directiveEnumerator.Current;
                    // foreach block
                    current = this.GetEntry(directive, sourceText, current);
                    ++index;
                    entries[index] = current;
                }
            } finally {
                if (directiveEnumerator !== null) directiveEnumerator.Dispose();

            }    
            // end foreach
            for (var i: number = 0; i < entries.length - 1; ++i) {
                System.Diagnostics.Debug.Assert(entries[i].CompareTo(entries[i + 1]) < 0);
            }
            return entries;
        }
        constructor() { }
    }


    export module LineDirectiveMap {
        export enum PositionState {
            Unknown,
            Unmapped,
            Remapped,
            RemappedAfterUnknown,
            RemappedAfterHidden,
            Hidden
        }
    }
    export module LineDirectiveMap {
        export class LineMappingEntry implements System.Generic.IComparable<LineMappingEntry>, IStruct {
            public UnmappedLine: number = 0;
            public MappedLine: number = 0;
            public MappedPathOpt: string;
            public State: PositionState = 0;
            ctor_9372(unmappedLine: number): LineMappingEntry {
                this.UnmappedLine = unmappedLine;
                this.MappedLine = unmappedLine;
                this.MappedPathOpt = null;
                this.State = PositionState.Unmapped;
                return this;
            }
            ctor_1477(unmappedLine: number, mappedLine: number, mappedPathOpt: string, state: PositionState): LineMappingEntry {
                this.UnmappedLine = unmappedLine;
                this.MappedLine = mappedLine;
                this.MappedPathOpt = mappedPathOpt;
                this.State = state;
                return this;
            }
            public CompareTo(other: LineMappingEntry): number {
                return this.UnmappedLine.CompareTo(other.UnmappedLine);
            }
            constructor() { }
        }
    }
}