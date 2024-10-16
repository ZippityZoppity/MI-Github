import CsvDownloader from "react-csv-downloader";
import checkIcon from "../assets/check-48.png";
import errIcon from "../assets/error-48.png";
import "../style/FooterTheme.scss";

export default function FooterBanner(props: {
    allRowsSelected: boolean;
    uploadedData: Array<any>;
}) {
//our_item_code: any, comp_item_code: any
    // const buildMatchJSON = async (our_item_code: any, comp_item_code: any) => {
    //     let item_found = false;
    //     for (const item of ITEM_CODE_MATCHES) {
    //         if (item.id == our_item_code) {
    //             let match_found = false;
    //             for (const match of item.matches) {
    //                 if (match == our_item_code) {
    //                     match_found = true;
    //                 }
    //             }
    //             item_found = true;
    //             if (!match_found) item.matches.push(our_item_code)
    //         }
    //     }
    //     if (!item_found) {
    //         ITEM_CODE_MATCHES.push({
    //             id: our_item_code,
    //             matches: [comp_item_code]
    //         })
    //     }
    //     console.log("ITEM_CODE_MATCHES:", ITEM_CODE_MATCHES);
    //     // const element = document.currentElement('a'); 
    //     // console.log("element:", element);
    //     // const file = new Blob((ITEM_CODE_MATCHES), {
    //     //     type:"text/plain;charset=utf-8"
    //     // });
    //     // console.log("file:", file);
    //     // element.href = URL.createObjectURL(file);
    //     // element.download = "NewMatches.txt";
    //     // element.click();
    // }

    const getSelectedData = () => {
        let data: {
            comp_manufacturer: any;
            comp_item_code: any;
            comp_description: any;
            our_description: any;
            our_manufacturer: any;
            our_item_code: any;
            uom: any;
            pricelevel: any;
            price: any;
        }[] = [];
        props.uploadedData.forEach((item) => {
            for (const desc of item.our_descriptions) {
                if (desc.selected) {
                    // buildMatchJSON(desc.id, item.item_code)
                    data.push({
                        comp_manufacturer: item.manufacturer,
                        comp_item_code: item.item_code,
                        comp_description: item.comp_description,
                        our_description: desc.text,
                        our_manufacturer: desc.manufacturer,
                        our_item_code: desc.id,
                        uom: desc.uom,
                        pricelevel: desc.pricelevel,
                        price: desc.unitprice
                    });
                }
            }
        });
        return data;
    };

    let footerMessage = "All items have a selection";
    let showErrorIcon = false;
    let messageClass = "all-items-selected";

    if (props.uploadedData.length === 0) {
        footerMessage = "No data found";
        showErrorIcon = true;
        messageClass = "missing-items";
    } else if (!props.allRowsSelected) {
        footerMessage = "Items are missing a selection";
        showErrorIcon = true;
        messageClass = "missing-items";
    }

    return (
        <div className="footer-banner">
            <div className="footer-message ">
                <p className={messageClass}>{footerMessage}</p>
                <img src={showErrorIcon ? errIcon : checkIcon} className="footer-icon" />
            </div>
            {/* <button onClick={getSelectedData}>TEST</button> */}
            <CsvDownloader
                filename="Selected_items"
                columns={[
                    { id: "comp_manufacturer", displayName: "Competitor Manufacturer" },
                    { id: "comp_item_code", displayName: "Competitor Item Code" },
                    { id: "comp_description", displayName: "Competitor Description" },
                    { id: "our_manufacturer", displayName: "Our Manufacturer" },
                    { id: "our_item_code", displayName: "Our Item Code" },
                    { id: "our_description", displayName: "Our Description" },
                    { id: "uom", displayName: "UOM"},
                    { id: "pricelevel", displayName: "Price Level"},
                    { id: "price", displayName: "Price"},
                ]}
                datas={getSelectedData}
                extension=".csv"
                separator=";"
                wrapColumnChar="'"
                className={(props.uploadedData.length !== 0) ? "footer-button" : "footer-button-disabled"}
                disabled={(props.uploadedData.length === 0)}
                text="Download Results"
            />
        </div>
    );
}
