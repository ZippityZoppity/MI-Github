import Row from "./Row";

import "../style/TableTheme.scss";
import { ReactElement } from "react";

export default function ResultsTable(props: {
    updateFile: Function;
    setUploadedData: Function;
    uploadedData: Array<any>;
    uploadedFile: any;
}) {
    const selectCellClick = (e: any) => {
        if (e.field === "selection") {
        }
    };

    let rows: Array<ReactElement> = [];
    for (const data of props.uploadedData) {
        rows.push(<Row data={data} />);
    }

    return (
        <table className="item-table">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Item Code</th>
                    <th>Competitor Description</th>
                    <th>Our Description</th>
                    <th>Best Match</th>
                    <th>Selection</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
