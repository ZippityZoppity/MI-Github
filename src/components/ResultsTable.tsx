import Row from "./Row";

import "../style/TableTheme.scss";
import { ReactElement } from "react";

export default function ResultsTable(props: {
    updateFile: Function;
    setUploadedData: Function;
    uploadedData: Array<any>;
    uploadedFile: any;
}) {
    const selectCellClick = (id: Number, index: any) => {
        let newData: Array<any> = props.uploadedData;

        let match = newData.find((data) => data.id === id);
        console.log("match b4:", match);
        
        //update selections
        match.our_descriptions[match.selection].selected = false;
        match.our_descriptions[index].selected = true;
        match.selection = index;
        console.log("match after:", match);

        console.log("newData", newData);
        props.setUploadedData(newData);
    };

    let rows: Array<ReactElement> = [];
    for (const data of props.uploadedData) {
        for (let index = 0; index < data.our_descriptions.length; index++) {
            const desc = data.our_descriptions[index];

            rows.push(
                <Row
                    manufacturer={desc.selected ? data.manufacturer : ""}
                    item_code={desc.selected ? data.item_code : ""}
                    comp_description={data.comp_description}
                    our_description={desc}
                    selected={desc.selected}
                    selectCellClick={selectCellClick}
                    id={data.id}
                    index={index}
                    key={data.id + "-" + index}
                />
            );
        }
    }
    rows.push(
        <Row
            manufacturer={""}
            item_code={""}
            comp_description={""}
            our_description={{ text: "", match: "" }}
            selected={false}
            selectCellClick={selectCellClick}
            id={8888}
            index={9999}
            key={"add-row"}
        />
    );

    return (
        <table className="item-table">
            <thead>
                <tr>
                    <th colSpan={1}>Manufacturer</th>
                    <th colSpan={1}>Item Code</th>
                    <th colSpan={3}>Competitor Description</th>
                    <th colSpan={4}>Our Description</th>
                    <th colSpan={1}>Best Match</th>
                    <th colSpan={1}>Selection</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
