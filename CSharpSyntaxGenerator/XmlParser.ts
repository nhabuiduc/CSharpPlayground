module CSharpSyntaxGenerator {
    export class XmlParser {
        public static Parse($xml: JQuery): Tree {
            var tree = new Tree();
            var treeTypes = new Array<TreeType>();
            tree.Root = "SyntaxNode";
            var $children = $xml.children()[0].children;
            $.each($children,  (index: number, value: any) => {
                var $child = $(value);
                var node = XmlParser.GetTreeType($child);
                treeTypes.push(node);
            });

            tree.Types = treeTypes;
            return tree;
        }

        public static GetTreeType($node: JQuery): TreeType {
            var tagName = $node.prop("tagName");
            if (tagName == "AbstractNode") {
                return new AbstractNode($node);
            }
            if (tagName == "PredefinedNode") {
                return new PredefinedNode($node);
            }
            if (tagName == "Node") {
                return new Node($node);
            }
            throw new Error();
        }
    }


}