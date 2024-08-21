import CsvDownloader from "react-csv-downloader";
import checkIcon from "../assets/icons8-check-48.png";
import errIcon from "../assets/icons8-error-48.png";
import "../style/FooterTheme.scss";

export default function FooterBanner(props: {
    allRowsSelected: boolean;
    uploadedData: Array<any>;
}) {
    const getSelectedData = () => {
        let data: {
            our_description: any;
        }[] = [];
        props.uploadedData.forEach((item) => {
            console.log("item:", item);
            for (const desc of item.our_descriptions) {
                if (desc.selected) {
                    data.push({
                        our_description: desc.text
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
                columns={[{id: "our_description", displayName: "Item Selections"}]}
                datas={getSelectedData}
                extension=".csv"
                separator=";"
                wrapColumnChar="'"
                className={props.allRowsSelected ? "footer-button" : "footer-button-disabled"}
                text="Download Results"
                disabled={!props.allRowsSelected}
            />
        </div>
    );
}
