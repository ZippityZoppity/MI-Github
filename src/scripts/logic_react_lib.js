/**
 * @NApiVersion 2.0
 * @NModuleScope public
 */
var logic_react_lib = {
    getReactIncludes: function () {
        return [
            '<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>',
            '<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>',
            '<script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>',
        ].join("\n");
    },
    getComponentScript: function (componentName, tagName, file) {
        switch (componentName) {
            case "RenderAPCTool":
                return [
                    "",
                    '<script type="text/babel">',
                    this.RenderAPCTool(file),
                    "   ReactDOM.render(",
                    "      <RenderAPCTool />,",
                    '      document.getElementById("{tagName}")'.replace(
                        "{tagName}",
                        tagName
                    ),
                    "   );",
                    "</script>",
                ].join("\n");
                break;
        }
    },
    RenderAPCTool: function (file) {
        var fileObj = file.load({
            id: "SuiteScripts/LLM Assisted Product Conversion Tool/Scripts/AG_SL_RenderAPCTool.js",
        });
        return fileObj.getContents();
    },
};
