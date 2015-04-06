//<reference path="HighlightSyntaxKind">
module Playground {
    export class Mapping {
        public static highlightCss: Highlight.HighlightCssMapping = <any>new Object();    
        public static getHighlight(kind: Playground.Highlight.HighlightSyntaxKind) {
            return Mapping.highlightCss[kind] || null;
        }
    }

    Mapping.highlightCss[Playground.Highlight.HighlightSyntaxKind.Keyword] = 'keyword';
    Mapping.highlightCss[Playground.Highlight.HighlightSyntaxKind.ClassName] = 'class';       
}

module Playground.Highlight {
    export interface HighlightCssMapping {
        [kind: number]: string;
    }              
}



