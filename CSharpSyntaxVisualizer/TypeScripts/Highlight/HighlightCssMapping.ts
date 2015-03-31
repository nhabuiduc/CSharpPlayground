module Playground.Highlight {
    export interface HighlightCssMapping {
        [kind: number]: string;
    }

    var highlightCss: Playground.Highlight.HighlightCssMapping = <any>new Object();
    highlightCss[HighlightSyntaxKind.Keyword] = 'hl-syntax-keyword';
}



