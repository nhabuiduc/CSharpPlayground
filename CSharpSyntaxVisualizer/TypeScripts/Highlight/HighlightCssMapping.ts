//<reference path="HighlightSyntaxKind">
module Playground {
    export class Mapping {
        public static highlightCss: Highlight.HighlightCssMapping = <any>new Object();    
    }

    Mapping.highlightCss[Playground.Highlight.HighlightSyntaxKind.Keyword] = 'hl-syntax-keyword';
    Mapping.highlightCss[Playground.Highlight.HighlightSyntaxKind.ClassName] = 'hl-syntax-classname';       
}

module Playground.Highlight {
    export interface HighlightCssMapping {
        [kind: number]: string;
    }              
}



