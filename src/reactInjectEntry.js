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
            '<iframe scrolling="no" frameborder="0" style="height: 150vh; overflow:scroll; width: 100%" src="https://main.d1l6dhpcrlds15.amplifyapp.com/" title=""></iframe>'
            // '<div id="root"></div><script id="testid" crossorigin="anonymous" src="https://main.d1l6dhpcrlds15.amplifyapp.com"></script>'
            context.response.writePage(form);
        }
    }
    return {
        onRequest: onRequest,
    };
});
// fetch('https://main.d1l6dhpcrlds15.amplifyapp.com/', {
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//         'Accept': 'application/json'
//     }
// }).then(res => res.text()).then(data => console.log(data))