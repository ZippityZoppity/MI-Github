/**
 * @name AG_SL_ExposeItemData.js
 * 
 * @author Anchor Group : Benjamin Gagliardi <bgagliardi@anchorgroup.tech>
 * @version 1.0.0
 * @since 2024-8-23
 * 
 * @file Script loads Matches Map and Item Exports Files and returns them to the Product Conversion Tool
 * 
 * @NApiVersion 2.1
 * @NScriptType Suitelet
*/

define(["N/file", "N/runtime"],
function (file, runtime) {
    function onRequest(context) {
    
        var script = runtime.getCurrentScript()
        var itemExports_id = script.getParameter({name: 'custscript_ag_item_exports_fileid	'});
        log.error('itemExports_id', itemExports_id);
        var matchMap_id = script.getParameter({name: 'custscript_ag_match_map_file_id'});
        log.error('matchMap_id', matchMap_id);
        var pct_url = script.getParameter({name: 'custscript_ag_prod_conversion_tool_url'});
        log.error('pct_url', pct_url);

        try {
            var itemExports = file.load({
                id: '232256'
            }).getContents();

            var matchMap = file.load({
                id: '232257'
            }).getContents();
    
            context.response.addHeader({
                name: 'Access-Control-Allow-Origin',
                value: 'https://3696995-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2315&deploy=1&compid=3696995_SB1&ns-at=AAEJ7tMQ_EHEkiFmKLPEuduplujesvc-Y7iyyaBdoUMzgALkxYg'
            })

            const response = {
                itemExports: itemExports,
                matchMap: matchMap
            }
            log.error('response', response);
            context.response.write(JSON.stringify(response));
        } catch (error) {
            log.error('error', error);
        }

    }

    //Other functions

    return {
        onRequest: onRequest
    };
}); 