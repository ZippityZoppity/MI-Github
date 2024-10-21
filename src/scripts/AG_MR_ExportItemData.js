/**
 * @name AG_MR_Export_Item_Data.js
 * 
 * @author Anchor Group : Benjamin Gagliardi <bgagliardi@anchorgroup.tech>
 * @version 1.0.0
 * @since 2024-8-26
 * 
 * @file Finds and exports all item descriptions into a JSON file
 * 
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
*/

define(["N/search", "N/file", "N/runtime", "N/https"],
function (search, file, runtime, https) {

    function get_formatted_data(prompt) {
        const MEDICAL_INNOVATIONS_ENDPOINT = 'https://hclolpo3qzkqx4aufyxjgux2lu0hgarc.lambda-url.us-east-2.on.aws/'
        const headerObj = {
            "Content-Type": "application/json"
        }
        try {
            const response = https.post({
                url: MEDICAL_INNOVATIONS_ENDPOINT,
                body: JSON.stringify({prompts: [prompt]}),
                headers: headerObj,
            });
            const responseBody = JSON.parse(response.body).responses[0];
            log.audit('responseBody', responseBody);
            return responseBody;
        } catch (error) {
            log.error('error', error);
        }
    }

    function getInputData(inputContext) {

        const items = search.create({
            type: 'item',
            filters:
            [
                ["description","isnotempty",""]
            ],
            columns: [
                "itemid",
                "displayname",
                "salesdescription",
                "manufacturer",
                "saleunit",
            ],
        });
        return items;
    }

    function map(results) {
        const NETSUITE_FOLDER_ID = runtime.getCurrentScript().getParameter({name: 'custscript_ag_exports_folder_id'});
        const NETSUITE_FILEPATH = '/SuiteScripts/LLM Assisted Product Conversion Tool/Item Exports/ItemExports.JSON'
        let fullJSON = {};

        let key = results.key;
        let itemResult = JSON.parse(results.value).values
        let pricelevel = itemResult["pricelevel.pricing"].text;

        if (!!itemResult) {
            let newItem = {
                [key]: {
                    desc: itemResult.salesdescription,
                    id: itemResult.itemid,
                    manufacturer: itemResult.manufacturer,
                    uom: itemResult.saleunit.text,
                    unitprice: itemResult["unitprice.pricing"]
                }
            };

            try {
                const existingFile = file.load({
                    id: NETSUITE_FILEPATH
                });
                log.audit('existingFile', existingFile);
                fullJSON = JSON.parse(existingFile.getContents());

                if (!fullJSON[key]) {
                    newItem[key].formatted_desc = get_formatted_data(itemResult.salesdescription);
                    newItem[key].pricelevel = [pricelevel]
                } else {
                    newItem[key].formatted_desc = fullJSON[key].formatted_desc;
                    newItem[key].pricelevel = fullJSON[key].pricelevel
                    let isNewPriceLevel = true;
                    //make sure there are no duplicates
                    for (const level of newItem[key].pricelevel) {
                        if (pricelevel == level) isNewPriceLevel = false;
                    }
                    isNewPriceLevel && newItem[key].pricelevel.push(pricelevel)
                }

                log.audit('newItem', newItem);
            } catch (error) {
                if (error.name == "RCRD_DSNT_EXIST") {
                    newItem[key].formatted_desc = get_formatted_data(itemResult.salesdescription);
                    newItem[key].pricelevel = [pricelevel]
                } else {
                    log.error('error', error);
                }
            }
            fullJSON[key] = newItem[key];
            log.audit('fullJSON', fullJSON);
            const jsonFile = file.create({
                name: 'ItemExports.JSON',
                fileType: file.Type.JSON,
                contents: JSON.stringify(fullJSON),
                description: "JSON object containing every item's purchase description",
                encoding: file.Encoding.UTF8,
                folder: NETSUITE_FOLDER_ID,
                isOnline: true,
            });
            log.audit('jsonFile', jsonFile);
            jsonFile.save();
        }
    }

    return {
        getInputData: getInputData,
        map: map
    };
});