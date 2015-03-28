module CSharpSyntaxGenerator {
    export class Kind {
        public Name: string;
        constructor($node: JQuery) {
            this.Name = $node.attr("Name");
        }
    }
}