import Row from "./Row";
import "../style/TableTheme.scss";
import { ReactElement, useState } from "react";

export default function ResultsTable(props: {
    updateFile: Function;
    setUploadedData: Function;
    uploadedData: Array<any>;
    uploadedFile: any;
    ourDescriptions: any;
    priceLevels: any;
    getFormattedData: Function;
    isSearching: boolean;
    updateIsSearching: Function;
}) {

    let rows: Array<ReactElement> = [];
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

    const removeRowClick = (index: any) => {
        const tempData = props.uploadedData;
        tempData.splice(index, 1);
        props.setUploadedData([...tempData])
        rows.splice(index, 1);
    }

    const addNewRowClick = async (description: String) => {

        let our_descriptions: Array<any> = [];
        let allDescriptions: any[] = [];

        props.updateIsSearching(true)
        let response = await props.getFormattedData(description);
        props.updateIsSearching(false)
        let formattedCompDesc = JSON.parse(response);

        for (const key in props.ourDescriptions) {
            let description = props.ourDescriptions[key].desc;
            let formatted_desc = props.ourDescriptions[key].formatted_desc;
            let matches = 0;
            let total = (formattedCompDesc.length > formatted_desc.length) ? formattedCompDesc.length : formatted_desc.length;
            for (const attribute of formattedCompDesc) {
                for (const value of formatted_desc) {
                    if (value == attribute) {
                        matches++;
                    } 
                }
            }
            let newNumerator = Math.floor(matches * (10 / total));
            allDescriptions.push({
                text: description,
                formatted_desc: formatted_desc,
                id: props.ourDescriptions[key].id,
                manufacturer: props.ourDescriptions[key].manufacturer,
                uom: props.ourDescriptions[key].uom,
                unitprice: props.ourDescriptions[key].unitprice,
                pricelevel: props.ourDescriptions[key].pricelevel,
                match: newNumerator,
                selected: false,
                bestMatch: false,
            })
        }
        allDescriptions.sort((a, b) => {
            return (a.match > b.match) ? -1 : 1;
        })

        for (let i = 0; i < allDescriptions.length - 1; i++) {
            if (our_descriptions.length >= 3) break;
            if (allDescriptions[i].match > 0) our_descriptions.push(allDescriptions[i])
        }
        
        let currentBest = 0;
        for (const desc of our_descriptions) {
            if (desc.match > currentBest) {
                currentBest = desc.match;
            }
        }
        let bestMatch: any = our_descriptions.find(
            (desc: { match: number }) => desc.match === currentBest
        );
        bestMatch.selected = false;
        bestMatch.bestMatch = true;

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

    props.uploadedData.forEach((data, dataIndex) => {
        let desc;
        if (data.our_descriptions <= 1) {
            desc = {selected: false, bestMatch: false}
        } else {
            desc = data.our_descriptions[0]
        }
        let key = data.id + dataIndex;
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
            removeRowClick={removeRowClick}
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
            removeRowClick={removeRowClick}
        />
    );
    return (
        <>
            <div className="pricelevel-selection-container">
                <select>
                    {
                        props.priceLevels.map((level: any) => {
                            return <option>{level}</option>
                        })
                    }
                    {/* <option>Online Price</option>
                    <option>Base Price</option>
                    <option>Website - Free Shipping	10.0%</option>
                    <option>Website - Free Shipping Over $100	6.0%</option>
                    <option>Website - Free Shipping Over $1000	-5.0%</option>
                    <option>Website - Free Shipping Over $350	0.0%</option> */}
                </select>
            </div>
            <table className="item-table">
                <thead>
                    <tr>
                        <th colSpan={1}>Competitor Manufacturer</th>
                        <th id="table-primary-column" colSpan={1}>Competitor Item Code</th>
                        <th colSpan={3}>Competitor Description</th>
                        <th id="table-primary-column" colSpan={1}>Our Manufacturer</th>
                        <th colSpan={1}>Our Item Code</th>
                        <th id="table-primary-column" colSpan={4}>Our Description</th>
                        <th colSpan={1}>UoM</th>
                        <th id="table-primary-column" colSpan={1}>Price</th>
                        <th colSpan={1}>Best Match</th>
                        <th id="table-primary-column" colSpan={1}>Selection</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </>
    );
}
