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

define(["N/file", "N/runtime", "N/search"],
function (file, runtime, search) {
    function onRequest(context) {
    
        
        try {
            let script = runtime.getCurrentScript()
            const itemExports_id = script.getParameter({name: 'custscript_ag_item_exports_fileid'});
            const matchMap_id = script.getParameter({name: 'custscript_ag_match_map_file_id'});
            const pct_url = script.getParameter({name: 'custscript_ag_prod_conversion_tool_url'});
            let itemExports = file.load({
                id: itemExports_id
            }).getContents();

            let matchMap = file.load({
                id: matchMap_id
            }).getContents();
    
            context.response.addHeader({
                name: 'Access-Control-Allow-Origin',
                value: pct_url
            })
            context.response.addHeader({
                name: 'Access-Control-Allow-Methods',
                value: 'GET, OPTIONS'
            })

            let priceLevels = []
            search.create({
                type: 'pricelevel',
                filters: [],
                columns: [
                    'name',
                ],
            }).run().each(function (result) {
                priceLevels.push(result.getValue('name'))
                return true;
            });

            const response = {
                itemExports: itemExports,
                matchMap: matchMap,
                priceLevels: priceLevels
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