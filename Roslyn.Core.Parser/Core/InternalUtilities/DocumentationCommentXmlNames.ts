module Roslyn.Utilities {
    export class DocumentationCommentXmlNames {
        public static CElementName: string = "c";
        public static CodeElementName: string = "code";
        public static CompletionListElementName: string = "completionlist";
        public static ExampleElementName: string = "example";
        public static ExceptionElementName: string = "exception";
        public static IncludeElementName: string = "include";
        public static ListElementName: string = "list";
        public static ParaElementName: string = "para";
        public static ParameterElementName: string = "param";
        public static ParameterReferenceElementName: string = "paramref";
        public static PermissionElementName: string = "permission";
        public static RemarksElementName: string = "remarks";
        public static ReturnsElementName: string = "returns";
        public static SeeElementName: string = "see";
        public static SeeAlsoElementName: string = "seealso";
        public static SummaryElementName: string = "summary";
        public static TypeParameterElementName: string = "typeparam";
        public static TypeParameterReferenceElementName: string = "typeparamref";
        public static ValueElementName: string = "value";
        public static CrefAttributeName: string = "cref";
        public static NameAttributeName: string = "name";
        public static FileAttributeName: string = "file";
        public static PathAttributeName: string = "path";
        public static TypeAttributeName: string = "type";
        public static ElementEquals(name1: string, name2: string, fromVb: boolean = false): boolean {
            return System.String.Equals(name1, name2, fromVb ? System.StringComparison.Ordinal : System.StringComparison.OrdinalIgnoreCase);
        }
        public static AttributeEquals(name1: string, name2: string): boolean {
            return System.String.Equals(name1, name2, System.StringComparison.Ordinal);
        }
        public static Equals(left: Object, right: Object): boolean {
            return left == right;
        }
    }
}