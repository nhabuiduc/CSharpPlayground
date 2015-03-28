module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxFactoryContext {
        public IsInAsync: boolean = false;
        public QueryDepth: number = 0;
        public get IsInQuery(): boolean {
            return this.QueryDepth > 0;
        }
        constructor() { }
    }
}