import { Box } from "@chakra-ui/react";
import { CSV_COLUMNS } from '../data/ColumnData'
import CsvDownloader from 'react-csv-downloader';
import checkIcon from '../assets/icons8-check-48.png';
import errIcon from '../assets/icons8-error-48.png';
import "../style/FooterTheme.css";

export default function FooterBanner(props) {

    const getSelectedData = () => {
        let data = [];
        props.selectedItems.forEach(item => {
            if (item.selection) {
                data.push(
                    {
                        manufacturer: item.manufacturer,
                        item_code: item.item_code,
                        our_description: item.our_description,
                        best_match: item.best_match,
                    }
                )
            }
        });
        return data;
    }

    return (
        <Box className="footer-banner">
            <Box className="item-selection-info">
                <Box>
                    {
                        (props.selectedItems >= props.numItems) ? 
                        <p className="all-items-selected">All items have a selection</p>
                        :
                        <p className="missing-items">Items are missing a selection</p>
                    }
                </Box>
                <Box>
                    <img
                        src={
                            (props.selectedItems >= props.numItems) ? checkIcon : errIcon
                            }
                        className="footer-icon"
                    />
                </Box> 
            </Box>
            <Box className="download-button-container">
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
            </Box>
        </Box>
    )
}