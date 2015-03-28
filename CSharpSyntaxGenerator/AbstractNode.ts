///<reference path='TreeType.ts'/>
module CSharpSyntaxGenerator {
    export class AbstractNode extends TreeType {
        public Fields: Array<Field>;
        public InternalConstructors: string[];
        public Constructors: string[];
        public UpdateName: string;
        public InternalUpdateName: string;
        constructor($node: JQuery) {
            if ($node === void 0) {
                return;
            }         
            super($node);
            this.Fields = new Array<Field>();
            $.each($node.children("Field"),(index: number, value: any) => {
                var $child = $(value);
                this.Fields.push(new Field($child));
            });

            this.InternalConstructors = new Array<string>();
           
            var att = <string>$node.attr("InternalConstructors");
            if (att) {
                this.InternalConstructors = att.split(';');
            }

            this.Constructors = new Array<string>();

            var att = <string>$node.attr("Constructors");
            if (att) {
                this.Constructors = att.split(';');
            }

            this.UpdateName = <string>$node.attr("UpdateName");
            this.InternalUpdateName = <string>$node.attr("InternalUpdateName");
        }
    }
}