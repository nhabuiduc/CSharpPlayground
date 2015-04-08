declare class GoldenLayout {
    constructor(config: any);
    registerComponent(name: string, func: any);
    on(event: string, func: any);
}
var config = {
    settings: {
        showPopoutIcon: false,
        showMaximiseIcon: false,
        showCloseIcon: false
    },

    content: [{
        type: 'row',
        content: [{
            type: 'component',
            title: 'Syntax Tree',
            width:25,
            componentName: 'tabEditor',
            isClosable:false,
            componentState: { templateId: 'TreeTemplate' }
        }, {
                type: 'column',
                content: [{
                    type: 'component',
                    title: 'Editor',
                    componentName: 'tabEditor',
                    isClosable: false,
                    componentState: { templateId: 'EditorTemplate' }
                }, {
                        type: 'component',
                        title: 'Issues',
                        height:25,
                        componentName: 'tabEditor',
                        isClosable: false,
                        componentState: { templateId:'IssuesTemplate'  }
                    }]
            }]
    }]
};

var myLayout = new GoldenLayout(config);
myLayout.registerComponent('tabEditor', function (container, state) {
    if (!state.templateId) return;
    var templateHtml = $('#' + state.templateId).html();
    container.getElement().html(templateHtml);
   // container.getElement().html('<h2>' + componentState.label + '</h2>');
});

myLayout.on('initialised', function () {

    angular.bootstrap(document.body, ['app']);
});