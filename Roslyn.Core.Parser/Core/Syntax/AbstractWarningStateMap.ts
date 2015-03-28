module Microsoft.CodeAnalysis.Syntax {
    export class AbstractWarningStateMap {
        private warningStateMapEntries: AbstractWarningStateMap.WarningStateMapEntry[];
        ctor_9031(syntaxTree: SyntaxTree): AbstractWarningStateMap {
            this.warningStateMapEntries = this.CreateWarningStateMapEntries(syntaxTree);
            return this;
        }
        protected  CreateWarningStateMapEntries(syntaxTree: SyntaxTree): AbstractWarningStateMap.WarningStateMapEntry[] { throw new Error('not implemented'); }
        public GetWarningState(id: string, position: number): ReportDiagnostic {
            var entry = this.GetEntryAtOrBeforePosition(position);
            var state: ReportDiagnostic = 0;
            var state_ref0 = { refObj: state };
            var ret_val__652 = entry.SpecificWarningOption.TryGetValue(id, state_ref0);

            state = state_ref0.refObj;
            if (ret_val__652) {
                return state;
            }
            return entry.GeneralWarningOption;
        }
        private GetEntryAtOrBeforePosition(position: number): AbstractWarningStateMap.WarningStateMapEntry {
            System.Diagnostics.Debug.Assert(this.warningStateMapEntries != null && this.warningStateMapEntries.length > 0);
            var r: number = TSArray.BinarySearch(this.warningStateMapEntries, new AbstractWarningStateMap.WarningStateMapEntry().ctor_1040(position));
            return this.warningStateMapEntries[r >= 0 ? r : ((~r) - 1)];
        }
        constructor() { }
    }
    export module AbstractWarningStateMap {
        export class WarningStateMapEntry implements System.Generic.IComparable<WarningStateMapEntry>, IStruct {
            public Position: number = 0;
            public GeneralWarningOption: ReportDiagnostic = 0;
            public SpecificWarningOption: System.Collections.Immutable.ImmutableDictionary<string, ReportDiagnostic>;
            ctor_1040(position: number): WarningStateMapEntry {
                this.Position = position;
                this.GeneralWarningOption = ReportDiagnostic.Default;
                this.SpecificWarningOption = System.Collections.Immutable.ImmutableDictionary.Create<string, ReportDiagnostic>();
                return this;
            }
            ctor_1499(position: number, general: ReportDiagnostic, specific: System.Collections.Immutable.ImmutableDictionary<string, ReportDiagnostic>): WarningStateMapEntry {
                this.Position = position;
                this.GeneralWarningOption = general;
                this.SpecificWarningOption = specific != null ? specific : System.Collections.Immutable.ImmutableDictionary.Create<string, ReportDiagnostic>();
                return this;
            }
            public CompareTo(other: WarningStateMapEntry): number {
                return this.Position - other.Position;
            }
            constructor() { }
        }
    }
}