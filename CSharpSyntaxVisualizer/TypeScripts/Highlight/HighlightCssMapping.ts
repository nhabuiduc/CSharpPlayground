//<reference path="HighlightSyntaxKind">
module Playground {
    export class Mapping {
        public static highlightCss: Highlight.HighlightCssMapping = <any>new Object();    
        public static getHighlight(kind: Playground.Highlight.HighlightSyntaxKind) {
            return Mapping.highlightCss[kind] || null;
        }
    }

    Mapping.highlightCss[Highlight.HighlightSyntaxKind.Keyword] = 'keyword';
    Mapping.highlightCss[Highlight.HighlightSyntaxKind.ClassName] = 'class';
    Mapping.highlightCss[Highlight.HighlightSyntaxKind.Constructor] = 'constructor1';        

    Mapping.highlightCss[Highlight.HighlightSyntaxKind.Comment] = 'comment';
    Mapping.highlightCss[Highlight.HighlightSyntaxKind.XmlComment] = 'xml-comment';
    Mapping.highlightCss[Highlight.HighlightSyntaxKind.String] = 'string';
}

module Playground.Highlight {
    export interface HighlightCssMapping {
        [kind: number]: string;
    }              
}



