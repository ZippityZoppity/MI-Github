/**
 * @name AG_SL_ExposeItemData.js
 * 
 * @author Anchor Group : Benjamin Gagliardi <bgagliardi@anchorgroup.tech>
 * @version 1.0.0
 * @since 2024-8-23
 * 
 * @file file description
 * 
 * @NApiVersion 2.1
 * @NScriptType Suitelet
*/

define(["N/file", "N/search"],
function (file, search) {

    function onRequest(context) {

        var itemExports = file.load({
            id: '232151'
        }).getContents();
        log.audit('itemExports', itemExports);

        const response = {
            'data': itemExports,
            'Access-Control-Allow-Origin': '*'//context.request.headers.referer
        }
        context.response.write(JSON.stringify(response));
    }

    //Other functions

    return {
        onRequest: onRequest
    };
});