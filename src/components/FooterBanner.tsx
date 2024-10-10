import CsvDownloader from "react-csv-downloader";
import checkIcon from "../assets/check-48.png";
import errIcon from "../assets/error-48.png";
import "../style/FooterTheme.scss";

export default function FooterBanner(props: {
    allRowsSelected: boolean;
    uploadedData: Array<any>;
}) {
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
