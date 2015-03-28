module Microsoft.CodeAnalysis {
    export class DiagnosticBag {
        public lazyBag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = null;
        public get IsEmptyWithoutResolution(): boolean {
            var bag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = this.lazyBag;
            return bag == null || bag.IsEmpty;
        }
        public HasAnyErrors(): boolean {
            if (this.IsEmptyWithoutResolution) {
                return false;
            }
            // for each
            var diagnosticEnumerator = this.Bag.GetEnumerator();

            while (diagnosticEnumerator.MoveNext()) {
                var diagnostic = diagnosticEnumerator.Current;
                // foreach block
                if (diagnostic.Severity == DiagnosticSeverity.Error) {
                    return true;
                }
            }    
            // end foreach
            return false;
        }
        public Add(diag: Diagnostic): void {
            var bag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = this.Bag;
            bag.Enqueue(diag);
        }
        public AddRange_8543<T extends Diagnostic>(diagnostics: System.Collections.Immutable.ImmutableArray<T>): void {
            if (!diagnostics.IsDefaultOrEmpty) {
                var bag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = this.Bag;
                for (var i: number = 0; i < diagnostics.Length; i++) {
                    bag.Enqueue(diagnostics.$get$(i));
                }
            }
        }
        public AddRange_1233(diagnostics: System.Collections.Generic.IEnumerable<Diagnostic>): void {
            // for each
            var diagnosticEnumerator = diagnostics.GetEnumerator();

            while (diagnosticEnumerator.MoveNext()) {
                var diagnostic = diagnosticEnumerator.Current;
                // foreach block
                this.Bag.Enqueue(diagnostic);
            }    
            // end foreach
        }
        public AddRange_7045(bag: DiagnosticBag): void {
            if (!bag.IsEmptyWithoutResolution) {
                this.AddRange_1233(bag.Bag);
            }
        }
        public AddRangeAndFree(bag: DiagnosticBag): void {
            this.AddRange_7045(bag);
            bag.Free();
        }
        public ToReadOnlyAndFree_8611<TDiagnostic extends Diagnostic>(): System.Collections.Immutable.ImmutableArray<TDiagnostic> {
            var oldBag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = this.lazyBag;
            this.Free();
            return DiagnosticBag.ToReadOnlyCore<TDiagnostic>(oldBag);
        }
        public ToReadOnlyAndFree_9919(): System.Collections.Immutable.ImmutableArray<Diagnostic> {
            return this.ToReadOnlyAndFree_8611<Diagnostic>();
        }
        public ToReadOnly_6177<TDiagnostic extends Diagnostic>(): System.Collections.Immutable.ImmutableArray<TDiagnostic> {
            var oldBag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = this.lazyBag;
            return DiagnosticBag.ToReadOnlyCore<TDiagnostic>(oldBag);
        }
        public ToReadOnly_8964(): System.Collections.Immutable.ImmutableArray<Diagnostic> {
            return this.ToReadOnly_6177<Diagnostic>();
        }
        private static ToReadOnlyCore<TDiagnostic extends Diagnostic>(oldBag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic>): System.Collections.Immutable.ImmutableArray<TDiagnostic> {
            if (oldBag == null) {
                return System.Collections.Immutable.ImmutableArray.Empty;
            }
            var builder: ArrayBuilder<TDiagnostic> = ArrayBuilder.GetInstance_1997<TDiagnostic>();
            // for each
            var diagnosticEnumerator = oldBag.GetEnumerator();

            while (diagnosticEnumerator.MoveNext()) {
                var diagnostic = <TDiagnostic>diagnosticEnumerator.Current;
                // foreach block
                if (diagnostic.Severity != InternalDiagnosticSeverity.Void) {
                    System.Diagnostics.Debug.Assert(diagnostic.Severity != InternalDiagnosticSeverity.Unknown);
                    builder.Add(diagnostic);
                }
            }    
            // end foreach
            return builder.ToImmutableAndFree();
        }
        public AsEnumerable(): System.Collections.Generic.IEnumerable<Diagnostic> {
            var bag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = this.Bag;
            var foundVoid: boolean = false;
            // for each
            var diagnosticEnumerator = bag.GetEnumerator();

            while (diagnosticEnumerator.MoveNext()) {
                var diagnostic = diagnosticEnumerator.Current;
                // foreach block
                if (diagnostic.Severity == InternalDiagnosticSeverity.Void) {
                    foundVoid = true;
                    break;
                }
            }    
            // end foreach
            return foundVoid ? this.AsEnumerableFiltered() : bag;
        }
        private AsEnumerableFiltered(): System.Collections.Generic.IEnumerable<Diagnostic> {
            var __result = new Array<Diagnostic>();
            // for each
            var diagnosticEnumerator = this.Bag.GetEnumerator();

            while (diagnosticEnumerator.MoveNext()) {
                var diagnostic = diagnosticEnumerator.Current;
                // foreach block
                if (diagnostic.Severity != InternalDiagnosticSeverity.Void) {
                    System.Diagnostics.Debug.Assert(diagnostic.Severity != InternalDiagnosticSeverity.Unknown);
                    __result.push(diagnostic);
                    //yield return diagnostic;
                }
            }    
            // end foreach
            return __result;
        }
        public AsEnumerableWithoutResolution(): System.Collections.Generic.IEnumerable<Diagnostic> {
            return this.lazyBag != null ? this.lazyBag : Roslyn.Utilities.SpecializedCollections.EmptyEnumerable<Diagnostic>();
        }
        public ToString(): string {
            if (this.IsEmptyWithoutResolution) {
                return "<no errors>";
            }
            else {
                var builder: System.Text.StringBuilder = new System.Text.StringBuilder();
                // for each
                var diagEnumerator = this.Bag.GetEnumerator();

                while (diagEnumerator.MoveNext()) {
                    var diag = diagEnumerator.Current;
                    // foreach block
                    builder.AppendLine(diag.ToString());
                }    
                // end foreach
                return builder.ToString();
            }
        }
        private get Bag(): System.Collections.Concurrent.ConcurrentQueue<Diagnostic> {
            var bag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = this.lazyBag;
            if (bag != null) {
                return bag;
            }
            var newBag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = new System.Collections.Concurrent.ConcurrentQueue<Diagnostic>();
            this.lazyBag = newBag;
            return newBag;
            //return Interlocked.CompareExchange(ref this.lazyBag, newBag, null)
            //this.lazyBag = newBag != null ? Interlocked.CompareExchange(ref this.lazyBag, newBag, null)
            //this.lazyBag = newBag : newBag;
        }
        public Clear(): void {
            var bag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = this.lazyBag;
            if (bag != null) {
                this.lazyBag = null;
            }
        }
        public static GetInstance(): DiagnosticBag {
            var bag: DiagnosticBag = DiagnosticBag.poolInstance.Allocate();
            return bag;
        }
        public Free(): void {
            this.Clear();
            DiagnosticBag.poolInstance.Free(this);
        }
        private static poolInstance: Roslyn.Utilities.ObjectPool<DiagnosticBag> = DiagnosticBag.CreatePool(128);
        private static CreatePool(size: number): Roslyn.Utilities.ObjectPool<DiagnosticBag> {
            return new Roslyn.Utilities.ObjectPool<DiagnosticBag>().ctor_5203(() => new DiagnosticBag(), size);
        }
        private GetDebuggerDisplay(): string {
            var lazyBag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = this.lazyBag;
            return "Count = " + (lazyBag != null ? lazyBag.Count : 0);
        }
        constructor() { }
    }
    export module DiagnosticBag {
        export class DebuggerProxy {
            private bag: DiagnosticBag;
            ctor_2011(bag: DiagnosticBag): DebuggerProxy {
                this.bag = bag;
                return this;
            }
            public get Diagnostics(): Object[] {
                var lazyBag: System.Collections.Concurrent.ConcurrentQueue<Diagnostic> = this.bag.lazyBag;
                if (lazyBag != null) {
                    return lazyBag.ToArray();
                }
                else {
                    return Roslyn.Utilities.SpecializedCollections.EmptyObjects;
                }
            }
            constructor() { }
        }
    }
}