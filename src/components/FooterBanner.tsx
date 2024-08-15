import CsvDownloader from "react-csv-downloader";
import checkIcon from "../assets/icons8-check-48.png";
import errIcon from "../assets/icons8-error-48.png";
import "../style/FooterTheme.scss";
import { CSV_COLUMNS } from "../data/ColumnData";

export default function FooterBanner(props: {
    allRowsSelected: boolean;
    uploadedData: Array<any>;
}) {
    const getSelectedData = () => {
        let data: {
            manufacturer: any;
            item_code: any;
            our_description: any;
            best_match: any;
        }[] = [];
        props.uploadedData.forEach((item) => {
            if (item.selection) {
                data.push({
                    manufacturer: item.manufacturer,
                    item_code: item.item_code,
                    our_description: item.our_description,
                    best_match: item.best_match,
                });
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
                columns={CSV_COLUMNS}
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
