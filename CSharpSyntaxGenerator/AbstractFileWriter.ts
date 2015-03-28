module CSharpSyntaxGenerator {
    export class AbstractFileWriter {
        private writer: System.IO.TextWriter;
        private tree: Tree;
        private parentMap: System.Collections.Generic.IDictionary<string, string>;
        protected nodeAbstractNodeMap: System.Collections.Generic.IDictionary<string, TreeType>;
        //private childMap: ILookup<string, string>;
        private nodeMap: System.Collections.Generic.IDictionary<string, Node>;
        private static INDENT_SIZE: number = 4;
        private indentLevel: number = 0;
        private needIndent: boolean = true;
        ctor_4434(writer: System.IO.TextWriter, tree: Tree): AbstractFileWriter {
            this.writer = writer;
            this.tree = tree;
            this.Correct();
            //this.nodeMap = tree.Types.OfType<Node>().ToDictionary(n => n.Name);
            this.nodeMap = this.GetDictionaryNode();
            //this.parentMap = tree.Types.ToDictionary(n => n.Name, n => n.Base);
            this.parentMap = this.GetDictionaryNodeBase();
            this.parentMap.Add(tree.Root, null);
            this.nodeAbstractNodeMap = this.GetDictionarNodeAbstractNodeMap();
            //this.childMap = tree.Types.ToLookup(n => n.Base, n => n.Name);
            return this;
        }

        private Correct() {
            var found = <Node>System.Linq.Enumerable.First(this.tree.Types, f => f.Name == "LetClauseSyntax");
            found.InternalConstructors[1] = "ctor_2126_C";

            found = <Node>System.Linq.Enumerable.First(this.tree.Types, f => f.Name == "XmlPrefixSyntax");
            found.InternalConstructors[0] = "ctor_1733_C";

            found = <Node>System.Linq.Enumerable.First(this.tree.Types, f => f.Name == "XmlCommentSyntax");
            found.InternalConstructors[3] = "ctor_1732_C";

            found = <Node>System.Linq.Enumerable.First(this.tree.Types, f => f.Name == "CaseSwitchLabelSyntax");
            found.Constructors[0] = "ctor_1688_C";
        }

        private GetDictionarNodeAbstractNodeMap() {
            var dic = new System.Collections.Generic.Dictionary<string, TreeType>();
            for (var i = 0; i < this.tree.Types.length; i++) {
                var typeNode = this.tree.Types[i];
                if ((typeNode instanceof Node || typeNode instanceof AbstractNode)) {
                   // continue;
                    dic.Add(typeNode.Name, <TreeType>typeNode);
                }
                
            }
            return dic;
        }

        protected GetDictionaryNodeBase(): System.Collections.Generic.IDictionary<string, string> {

            var dic = new System.Collections.Generic.Dictionary<string, string>();
            for (var i = 0; i < this.tree.Types.length; i++) {
                var typeNode = this.tree.Types[i];
                dic.Add(typeNode.Name, typeNode.Base);
            }

            return dic;
        }

        protected GetDictionaryNode(): System.Collections.Generic.IDictionary<string, Node> {

            var dic = new System.Collections.Generic.Dictionary<string, Node>();
            for (var i = 0; i < this.tree.Types.length; i++) {
                var typeNode = this.tree.Types[i];
                if (!(typeNode instanceof Node)) {
                    continue;
                }
                dic.Add(typeNode.Name, <Node>typeNode);
            }

            return dic;
        }

        protected get ParentMap(): System.Collections.Generic.IDictionary<string, string> {
            return this.parentMap;
        }
        

        //protected get ChildMap(): ILookup<string, string> {
        //    return this.childMap;
        //}
        protected get Tree(): Tree {
            return this.tree;
        }
        protected Indent(): void {
            this.indentLevel++;
        }
        protected Unindent(): void {
            if (this.indentLevel <= 0) {
                throw new System.InvalidOperationException("Cannot unindent from base level");
            }
            this.indentLevel--;
        }
        protected Write_1360(msg: string): void {
            this.WriteIndentIfNeeded();
            this.writer.WriteString(msg);
        }
        protected Write_1709(msg: string, ...args: Object[]): void {
            args = __unWrapArray(args);
            this.WriteIndentIfNeeded();
         
            this.writer.WriteString(msg, args);
        }
        protected WriteLine_1675(): void {
            this.WriteLine_5116("");
        }
        protected WriteLine_5116(msg: string): void {
            this.WriteIndentIfNeeded();
            this.writer.WriteLine(msg);
            this.needIndent = true;
        }
        protected WriteLine_1126(msg: string, ...args: Object[]): void {
            args = __unWrapArray(args);
            this.WriteIndentIfNeeded();
            
            this.writer.WriteLine(msg, args);
            this.needIndent = true;
        }
        private WriteIndentIfNeeded(): void {
            if (this.needIndent) {
                this.writer.WriteString(Gb.StringFromChar(' ', this.indentLevel * AbstractFileWriter.INDENT_SIZE));
                this.needIndent = false;
            }
        }
        protected OpenBlock(): void {
            this.WriteLine_5116("{");
            this.Indent();
        }
        protected CloseBlock(): void {
            this.Unindent();
            this.WriteLine_5116("}");
        }
        protected static OverrideOrNewModifier(field: Field): string {
            return AbstractFileWriter.IsOverride(field) ? "override " : AbstractFileWriter.IsNew(field) ? "new " : "";
        }
        protected static CanBeField(field: Field): boolean {
            return field.Type != "SyntaxToken" && !this.IsAnyList(field.Type) && !AbstractFileWriter.IsOverride(field) && !AbstractFileWriter.IsNew(field);
        }
        protected static GetFieldType(field: Field): string {
            if (this.IsAnyList(field.Type))
                return "CSharpSyntaxNode";
            return field.Type;
        }
        protected IsDerivedOrListOfDerived(baseType: string, derivedType: string): boolean {
            return this.IsDerivedType(baseType, derivedType) || ((AbstractFileWriter.IsNodeList(derivedType) || AbstractFileWriter.IsSeparatedNodeList(derivedType)) && this.IsDerivedType(baseType, AbstractFileWriter.GetElementType(derivedType)));
        }
        protected static IsSeparatedNodeList(typeName: string): boolean {
            return typeName.StartsWith("SeparatedSyntaxList<");
        }
        protected static IsNodeList(typeName: string): boolean {
            return typeName.StartsWith("SyntaxList<");
        }
        protected static IsAnyNodeList(typeName: string): boolean {
            return AbstractFileWriter.IsNodeList(typeName) || AbstractFileWriter.IsSeparatedNodeList(typeName);
        }
        protected IsNodeOrNodeList(typeName: string): boolean {
            return this.IsNode(typeName) || AbstractFileWriter.IsNodeList(typeName) || AbstractFileWriter.IsSeparatedNodeList(typeName) || typeName == "SyntaxNodeOrTokenList";
        }
        protected static GetElementType(typeName: string): string {
            if (typeName.indexOf("<") < 0)
                return System.String.Empty;
            var iStart: number = typeName.indexOf('<');
            var iEnd: number = typeName.indexOf('>', iStart + 1);
            if (iEnd < iStart)
                return System.String.Empty;
            var sub = typeName.substr(iStart + 1, iEnd - iStart - 1);
            return sub;
        }
        protected static IsAnyList(typeName: string): boolean {
            return AbstractFileWriter.IsNodeList(typeName) || AbstractFileWriter.IsSeparatedNodeList(typeName) || typeName == "SyntaxNodeOrTokenList";
        }
        protected IsDerivedType(typeName: string, derivedTypeName: string): boolean {
            if (typeName == derivedTypeName)
                return true;
            var baseType: string;
            if (derivedTypeName != null && (() => {
                var baseType_ref0 = { refObj: baseType };
                var ret_val__424 = this.parentMap.TryGetValue(derivedTypeName, baseType_ref0);

                baseType = baseType_ref0.refObj;
                return ret_val__424;
            })()) {
                return this.IsDerivedType(typeName, baseType);
            }
            return false;
        }
        protected static IsRoot(n: Node): boolean {
            return n.Root != null && System.String.Compare(n.Root, "true", true) == 0;
        }
        protected IsNode(typeName: string): boolean {
            return this.parentMap.ContainsKey(typeName);
        }
        protected GetNode(typeName: string): Node {
            var node: Node;
            return (() => {
                var node_ref0 = { refObj: node };
                var ret_val__974 = this.nodeMap.TryGetValue(typeName, node_ref0);

                node = node_ref0.refObj;
                return ret_val__974;
            })() ? node : null;
        }
        protected static IsOptional(f: Field): boolean {
            return f.Optional != null && System.String.Compare(f.Optional, "true", true) == 0;
        }
        protected static IsOverride(f: Field): boolean {
            return f.Override != null && System.String.Compare(f.Override, "true", true) == 0;
        }
        protected static IsNew(f: Field): boolean {
            return f.New != null && System.String.Compare(f.New, "true", true) == 0;
        }
        protected static HasErrors(n: Node): boolean {
            return n.Errors == null || System.String.Compare(n.Errors, "true", true) == 0;
        }
        protected static CamelCase(name: string): string {
            if (System.String.IsUpper(name[0])) {
                name = System.String.ToLower(name[0]) + name.substr(1);
            }
            return AbstractFileWriter.FixKeyword(name);
        }
        protected static FixKeyword(name: string): string {
            if (AbstractFileWriter.IsKeyword(name)) {
                return "$" + name;
            }
            return name;
        }
        protected StripNode(name: string): string {
            return (this.tree.Root.EndsWith("Node")) ? this.tree.Root.substr(0, this.tree.Root.length - 4) : this.tree.Root;
        }
        protected StripRoot(name: string): string {
            var root = this.StripNode(this.tree.Root);
            if (name.EndsWith(root)) {
                return name.substr(0, name.length - root.length);
            }
            return name;
        }
        protected static StripPost(name: string, post: string): string {
            return name.EndsWith(post) ? name.substr(0, name.length - post.length) : name;
        }
        protected static IsKeyword(name: string): boolean {
            switch (name) {
                case "bool":
                case "byte":
                case "sbyte":
                case "short":
                case "ushort":
                case "int":
                case "uint":
                case "long":
                case "ulong":
                case "double":
                case "float":
                case "decimal":
                case "string":
                case "char":
                case "object":
                case "typeof":
                case "sizeof":
                case "null":
                case "true":
                case "false":
                case "if":
                case "else":
                case "while":
                case "for":
                case "foreach":
                case "do":
                case "switch":
                case "case":
                case "default":
                case "lock":
                case "try":
                case "throw":
                case "catch":
                case "finally":
                case "goto":
                case "break":
                case "continue":
                case "return":
                case "public":
                case "private":
                case "internal":
                case "protected":
                case "static":
                case "readonly":
                case "sealed":
                case "const":
                case "new":
                case "override":
                case "abstract":
                case "virtual":
                case "partial":
                case "ref":
                case "out":
                case "in":
                case "where":
                case "params":
                case "this":
                case "base":
                case "namespace":
                case "using":
                case "class":
                case "struct":
                case "interface":
                case "delegate":
                case "checked":
                case "get":
                case "set":
                case "add":
                case "remove":
                case "operator":
                case "implicit":
                case "explicit":
                case "fixed":
                case "extern":
                case "event":
                case "enum":
                case "unsafe":
                    return true;
                default:
                    return false;
            }
        }
        constructor() { }
    }
}