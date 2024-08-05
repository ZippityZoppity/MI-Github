import CsvDownloader from "react-csv-downloader";
import checkIcon from "../assets/icons8-check-48.png";
import errIcon from "../assets/icons8-error-48.png";
import "../style/FooterTheme.css";
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

    return (
        <div className="footer-banner">
            <div className="item-selection-info">
                <div>
                    {props.allRowsSelected ? (
                        <p className="all-items-selected">
                            All items have a selection
                        </p>
                    ) : (
                        <p className="missing-items">
                            Items are missing a selection
                        </p>
                    )}
                </div>
                <div>
                    <img
                        src={props.allRowsSelected ? checkIcon : errIcon}
                        className="footer-icon"
                    />
                </div>
            </div>
            <div className="download-button-container">
                <CsvDownloader
                    filename="Selected_items"
                    columns={CSV_COLUMNS}
                    datas={getSelectedData}
                    extension=".csv"
                    separator=";"
                    wrapColumnChar="'"
                    className="footer-button"
                    text="Download Results"
                />
            </div>
        </div>
    );
}
