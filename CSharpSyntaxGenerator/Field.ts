module CSharpSyntaxGenerator {
    export class Field {
        public Name: string;
        public Type: string;
        public Optional: string;
        public Override: string;
        public New: string;
        public Kinds: Array<Kind>;
        public PropertyComment: Comment;
        constructor($node: JQuery) {
            this.Name = $node.attr("Name");
            this.Type = $node.attr("Type");
            this.Optional = $node.attr("Optional");
            this.Override = $node.attr("Override");
            this.Kinds = new Array<Kind>();
            $.each($node.children("Kind"),(index: number, value: any) => {
                var $child = $(value);
                this.Kinds.push(new Kind($child));
            });
        }
    }
}