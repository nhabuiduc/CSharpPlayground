module Microsoft.CodeAnalysis {
    export class GreenNodeExtensions {
        public static WithAnnotationsGreen<TNode extends GreenNode>(node: TNode, annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): TNode {
            var newAnnotations = ArrayBuilder.GetInstance_1997<SyntaxAnnotation>();
            // for each
            var candidateEnumerator = annotations.GetEnumerator();
            try {
                while (candidateEnumerator.MoveNext()) {
                    var candidate = candidateEnumerator.Current;
                    // foreach block
                    if (!newAnnotations.Contains(candidate)) {
                        newAnnotations.Add(candidate);
                    }
                }
            } finally {
                if (candidateEnumerator !== null) candidateEnumerator.Dispose();

            }    
            // end foreach
            if (newAnnotations.Count == 0) {
                newAnnotations.Free();
                var existingAnnotations = node.GetAnnotations_1741();
                if (existingAnnotations == null || existingAnnotations.length == 0) {
                    return node;
                }
                else {
                    return <TNode>node.SetAnnotations(null);
                }
            }
            else {
                return <TNode>node.SetAnnotations(newAnnotations.ToArrayAndFree());
            }
        }
        public static WithAdditionalAnnotationsGreen<TNode extends GreenNode>(node: TNode, annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): TNode {
            var existingAnnotations = node.GetAnnotations_1741();
            if (annotations == null) {
                return node;
            }
            var newAnnotations = ArrayBuilder.GetInstance_1997<SyntaxAnnotation>();
            newAnnotations.AddRange_1745(existingAnnotations, existingAnnotations.length);
            // for each
            var candidateEnumerator = annotations.GetEnumerator();
            try {
                while (candidateEnumerator.MoveNext()) {
                    var candidate = candidateEnumerator.Current;
                    // foreach block
                    if (!newAnnotations.Contains(candidate)) {
                        newAnnotations.Add(candidate);
                    }
                }
            } finally {
                if (candidateEnumerator !== null) candidateEnumerator.Dispose();

            }    
            // end foreach
            if (newAnnotations.Count == existingAnnotations.length) {
                newAnnotations.Free();
                return node;
            }
            else {
                return <TNode>node.SetAnnotations(newAnnotations.ToArrayAndFree());
            }
        }
        public static WithoutAnnotationsGreen<TNode extends GreenNode>(node: TNode, annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): TNode {
            var existingAnnotations = node.GetAnnotations_1741();
            if (annotations == null || existingAnnotations.length == 0) {
                return node;
            }
            var removalAnnotations = ArrayBuilder.GetInstance_1997<SyntaxAnnotation>();
            removalAnnotations.AddRange_6776(annotations);
            try
            {
                if (removalAnnotations.Count == 0) {
                    return node;
                }
                var newAnnotations = ArrayBuilder.GetInstance_1997<SyntaxAnnotation>();
                // for each
                var candidateEnumerator = existingAnnotations.GetEnumerator();
                try {
                    while (candidateEnumerator.MoveNext()) {
                        var candidate = candidateEnumerator.Current;
                        // foreach block
                        if (!removalAnnotations.Contains(candidate)) {
                            newAnnotations.Add(candidate);
                        }
                    }
                } finally {
                    if (candidateEnumerator !== null) candidateEnumerator.Dispose();

                }    
                // end foreach
                return <TNode>node.SetAnnotations(newAnnotations.ToArrayAndFree());
            }

            finally {
                removalAnnotations.Free();
            }
        }
        public static WithDiagnosticsGreen<TNode extends GreenNode>(node: TNode, diagnostics: DiagnosticInfo[]): TNode {
            return <TNode>node.SetDiagnostics(diagnostics);
        }
        public static WithoutDiagnosticsGreen<TNode extends GreenNode>(node: TNode): TNode {
            var current = node.GetDiagnostics();
            if (current == null || current.length == 0) {
                return node;
            }
            return <TNode>node.SetDiagnostics(null);
        }
    }
}