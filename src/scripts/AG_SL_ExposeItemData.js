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

define(["N/record", "N/search"],
function (record, search) {

    function onRequest(context) {
        const get_our_descriptions = async function() {
            const response = await fetch(NETSUITE_ENDPOINT, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "text/plain",
                },
            })
            log.error("response:", response);
            if (response.status == 200) {
                const data = await response.json();
                log.error("data:", data);
            } else {
                log.error('error', response.status)
            }
    
        }
        get_our_descriptions();

        return "hello world"
    }

    //Other functions

    return {
        onRequest: onRequest
    };
});