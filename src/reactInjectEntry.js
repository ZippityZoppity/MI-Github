/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 *@NAmdConfig ./ReactLibConfig.json
 */
define(["N/ui/serverWidget"], function (serverWidget) {
    function onRequest(context) {
        const PCT_APP_URL = '"https://main.dcs39u2ltr5wa.amplifyapp.com/"';

        if (context.request.method === "GET") {
            // Add a form
            var form = serverWidget.createForm({
                title: " ",
                hideNavBar: true
            });
            // Add an inline HTML field
            var field = form.addField({
                id: "custom_inline",
                type: serverWidget.FieldType.INLINEHTML,
                label: "Inline",
            });
            // Add the html
            field.defaultValue =
            '<iframe scrolling="no" frameborder="0" style="height: 150vh; overflow:scroll; width: 100%" src=' + PCT_APP_URL + ' title=""></iframe>'
            context.response.writePage(form);
        }
    }
    return {
        onRequest: onRequest,
    };
});