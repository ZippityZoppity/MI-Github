import Row from "./Row";

import "../style/TableTheme.scss";
import { ReactElement, useState } from "react";

export default function ResultsTable(props: {
    updateFile: Function;
    setUploadedData: Function;
    uploadedData: Array<any>;
    uploadedFile: any;
}) {

    const [rowSelected, updateRowSelected] = useState(-1);

    const selectCellClick = (id: Number, index: any) => {
        updateRowSelected(-1);
        let newData: Array<any> = props.uploadedData;
        let match = newData.find((data) => data.id === id);
        //update selections
        match.our_descriptions[0].selected = false;
        match.our_descriptions[index].selected = true;
        let bestMatch = match.our_descriptions[index];
        match.our_descriptions.splice(index, 1);
        match.our_descriptions.unshift(bestMatch);

        props.setUploadedData([...newData]);
    };

    const addNewRowClick = (description: String) => {
        //temp add data to rows
        let our_descriptions = [
            {
                text: "McKesson Sterilization Wrap Blue 24 X 24 Inch Single Layer Cellulose Steam / EO Gas",
                match: Math.floor(Math.random() * 10),
            }
        ];
        let currentBest = 0;
        for (const description of our_descriptions) {
            if (description.match > currentBest) {
                currentBest = description.match;
            }
        }
        let bestMatch: any = our_descriptions.find(
            (desc: { match: number }) => desc.match === currentBest
        );
        bestMatch.selected = true;

        //set true if a match is 7 or higher
        if (bestMatch.match >= 7) bestMatch.bestMatch = true;
        let newRow = {
            manufacturer: '',
            item_code: '',
            comp_description: description,
            our_descriptions: our_descriptions,
            bestMatch: bestMatch,
            selection: our_descriptions.indexOf(bestMatch),
            id: props.uploadedData.length
        }
        let tableData = props.uploadedData;
        tableData.push(newRow);
        props.setUploadedData([...tableData]);
    }


    let rows: Array<ReactElement> = [];
    props.uploadedData.forEach((data, dataIndex) => {
        let desc = data.our_descriptions[0];
        let key = data.id + "-0";
        for (let index = 0; index < data.our_descriptions.length; index++) {
            if (data.our_descriptions[index].selected) {
                desc = data.our_descriptions[index];
                key = data.id + "-" + index;
            }
        }
        let row = <Row
            manufacturer={data.manufacturer}
            item_code={data.item_code}
            comp_description={data.comp_description}
            our_description={desc}
            selected={desc.selected}
            selectCellClick={selectCellClick}
            id={data.id}
            index={dataIndex}
            key={key}
            subrows={data.our_descriptions}
            rowSelected={rowSelected}
            updateRowSelected={updateRowSelected}
        />
        rows.push(row);
    });
    rows.push(
        <Row
            manufacturer={""}
            item_code={""}
            comp_description={""}
            our_description={{ text: "", match: "" }}
            selected={false}
            selectCellClick={addNewRowClick}
            id={8888}
            index={9999}
            subrows={[{ text: "", match: "" }]}
            key={"add-row"}
            rowSelected={rowSelected}
            updateRowSelected={updateRowSelected}
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
