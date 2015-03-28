module Microsoft.CodeAnalysis {
    export class AnnotationExtensions {
        public static WithAdditionalAnnotations_6931<TNode extends SyntaxNode>(node: TNode, ...annotations: SyntaxAnnotation[]): TNode {
            return <TNode>node.WithAdditionalAnnotationsInternal(annotations);
        }
        public static WithAdditionalAnnotations_2071<TNode extends SyntaxNode>(node: TNode, annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): TNode {
            return <TNode>node.WithAdditionalAnnotationsInternal(annotations);
        }
        public static WithoutAnnotations_1188<TNode extends SyntaxNode>(node: TNode, ...annotations: SyntaxAnnotation[]): TNode {
            return <TNode>node.GetNodeWithoutAnnotations(annotations);
        }
        public static WithoutAnnotations_1188_Arr<TNode extends SyntaxNode>(node: TNode, annotations: SyntaxAnnotation[]): TNode {
            return <TNode>node.GetNodeWithoutAnnotations(annotations);
        }
        public static WithoutAnnotations_1837<TNode extends SyntaxNode>(node: TNode, annotations: System.Collections.Generic.IEnumerable<SyntaxAnnotation>): TNode {
            return <TNode>node.GetNodeWithoutAnnotations(annotations);
        }
        public static WithoutAnnotations_7581<TNode extends SyntaxNode>(node: TNode, annotationKind: string): TNode {
            if (node.HasAnnotations_4203(annotationKind)) {
                return AnnotationExtensions.WithoutAnnotations_1188_Arr(node,
                    System.Linq.Enumerable.ToArray(node.GetAnnotations_1417(annotationKind)));
            }
            else {
                return node;
            }
        }
    }
}