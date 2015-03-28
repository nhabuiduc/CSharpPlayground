module Roslyn.Utilities {
    export class TextChangeRangeExtensions {
        public static Accumulate(accumulatedTextChangeSoFar: Microsoft.CodeAnalysis.Text.TextChangeRange, changesInNextVersion: System.Collections.Generic.IEnumerable<Microsoft.CodeAnalysis.Text.TextChangeRange>): Microsoft.CodeAnalysis.Text.TextChangeRange {
            if (!System.Linq.Enumerable.Any(changesInNextVersion)) {
                return accumulatedTextChangeSoFar;
            }
            var newChange = Microsoft.CodeAnalysis.Text.TextChangeRange.Collapse(changesInNextVersion);
            if (accumulatedTextChangeSoFar == null) {
                return newChange;
            }
            var currentStart = accumulatedTextChangeSoFar.Span.Start;
            var currentOldEnd = accumulatedTextChangeSoFar.Span.End;
            var currentNewEnd = accumulatedTextChangeSoFar.Span.Start + accumulatedTextChangeSoFar.NewLength;
            if (newChange.Span.Start < currentStart) {
                currentStart = newChange.Span.Start;
            }
            if (currentNewEnd > newChange.Span.End) {
                currentNewEnd = currentNewEnd + newChange.NewLength - newChange.Span.Length;
            }
            else {
                currentOldEnd = currentOldEnd + newChange.Span.End - currentNewEnd;
                currentNewEnd = newChange.Span.Start + newChange.NewLength;
            }
            return new Microsoft.CodeAnalysis.Text.TextChangeRange()
                .ctor_4786(Microsoft.CodeAnalysis.Text.TextSpan.FromBounds(currentStart, currentOldEnd), currentNewEnd - currentStart);
        }
    }
}