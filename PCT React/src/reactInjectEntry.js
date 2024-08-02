/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 *@NAmdConfig ./ReactLibConfig.json
 */
define(["N/ui/serverWidget"], function (serverWidget) {
    function onRequest(context) {
        if (context.request.method === "GET") {
            // Add a form
            var form = serverWidget.createForm({
                title: "Test Render",
            });
            // Add an inline HTML field
            var field = form.addField({
                id: "custom_inline",
                type: serverWidget.FieldType.INLINEHTML,
                label: "Inline",
            });
            // Add the html
            field.defaultValue =
            '<div id="root"></div><script id="testid" src="https://feb0-134-215-146-147.ngrok-free.app/index.js">"</script>'
            context.response.writePage(form);
        }
    }
    return {
        onRequest: onRequest,
    };
});
