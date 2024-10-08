/**
 * @name AG_SL_RenderAPCTool.js
 * 
 * @author Anchor Group : Benjamin Gagliardi <bgagliardi@anchorgroup.tech>
 * @version 1.0.0
 * @since 2024-8-23
 * 
 * @file Renders the amplify application in a suitelet for the LLM APC Tool
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
 define(["N/ui/serverWidget", "N/https"], function (serverWidget, https) {
    function onRequest(context) {
        if (context.request.method === "GET") {

            const AMPLIFY_ENDPOINT = '"https://main.dcs39u2ltr5wa.amplifyapp.com/"'
            const NETSUITE_ENDPOINT = 'https://3696995-sb1.app.netsuite.com/core/media/media.nl?id=245503&c=3696995_SB1&h=ek8SfAo9RizheWgaiFfp1iD3gkvP7oXnzau-7HP_hZLnYOj2&_xt=.json'

            var response = https.get({
                url: NETSUITE_ENDPOINT,
                headers: {"Content-type": "application/json"}
            });
            log.error("response:", response.body);
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
            '<iframe marginheight="0px" marginwidth="0px" scrolling="auto" frameborder="0" style="height: calc(100vh - 55px); overflow:hidden; width: 100%" src=' + AMPLIFY_ENDPOINT + '?param1="value1" title=""></iframe>'
            context.response.writePage(form);
        }
    }
    return {
        onRequest: onRequest,
    };
});