module CSharpSyntaxGenerator {
    export class TreeType {
        public Name: string;
        public Base: string;
        public TypeComment: Comment;
        public FactoryComment: Comment;
        constructor($node: JQuery) {
            if ($node === void 0) {
                return;
            }
            this.Name = $node.attr("Name");
            this.Base = $node.attr("Base");
        }
    }
}