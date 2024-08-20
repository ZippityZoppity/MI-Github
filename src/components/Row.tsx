import { useState } from "react";
import Button from "./Button";
export default function Row(props: {
    manufacturer: string;
    item_code: string;
    comp_description: string;
    our_description: {
        text: string;
        match: string;
    };
    selected: boolean;
    selectCellClick: Function;
    id: Number;
    index: Number;
    subrows: Array<any>;
    rowSelected: Number;
    updateRowSelected: Function;
}) {
    let isNewRow = props.id == 8888;
    let buttonTitle = props.selected ? "Selection" : "Choose";
    let buttonClass = props.selected ? "button-cell" : "button-cell-unset"
    let subButtonTitle = "Use This";
    let subButtonClass = "button-cell-usethis"
    let comp_placeholder = '';
    let comp_desc_class = '';
    let cellContainerClass = (props.rowSelected === props.index) ? "table-cell-container-selected" : "table-cell-container-unselected";

    const [newDescription, setDescription] = useState('');
    const onClick = (index: Number) => {
        if (isNewRow) {
            props.selectCellClick(newDescription)
        } else if (props.rowSelected !== props.index) {
            props.updateRowSelected(props.index)
        } else if (index !== -1) {
            props.selectCellClick(props.id, index)
        }
    }

    if (isNewRow) {
        subButtonTitle = "Add New";
        subButtonClass = 'button-cell-new'
        comp_desc_class = "comp-desc-cell-new";
        comp_placeholder = 'Enter a Competitor Description to search...'
    }

    return (
        <tr>
            <td colSpan={1}><div className="table-cell-container"><p>{props.manufacturer}</p></div></td>
            <td colSpan={1}><div className="table-cell-container"><p>{props.item_code}</p></div></td>
            <td colSpan={3} className={comp_desc_class}>
                <div className={cellContainerClass}>
                    <textarea
                        placeholder={comp_placeholder}
                        defaultValue={props.comp_description}
                        onChange={(e) => {setDescription(e.target.value)}}    
                    />
                </div>
            </td>
            <td colSpan={4}>
                <div className={cellContainerClass}>
                    {
                        props.selected ? 
                        <></> :
                        (<p></p>)
                    }
                    {
                        props.subrows.map((subrow, index) => {
                            return (<p key={subrow.text + "-" + index}>{subrow.text.toString()}</p>);
                        })
                    }
                </div>
            </td>
            <td colSpan={1}>
                <div className={cellContainerClass}>
                    {
                        props.selected ? 
                        <></> :
                        (<p></p>)
                    }
                    {
                        props.subrows.map((subrow, index) => {
                            return (<p key={"bestmatch-" + index}>{isNewRow ? " " : subrow.match + "/10"}</p>)
                        })
                    }
                </div>
            </td>
            <td colSpan={1}>
                <div className={cellContainerClass}>
                {
                    (props.selected || isNewRow) ? 
                    <></> :
                        <div className="cell-button-container" key={"subrow-button-" + 999}>
                        <div
                            onClick={() => onClick(-1)}
                            className={buttonClass}
                            style={{ cursor: "pointer" }}
                        >
                            {buttonTitle}
                        </div>
                    </div>
                }
                {
                    props.subrows.map((subrow, index) => {
                        if (subrow.selected) {
                            return <div className="cell-button-container" key={"subrow-button-" + index}>
                                <div
                                    onClick={() => onClick(index)}
                                    className={buttonClass}
                                    style={{ cursor: "pointer" }}
                                >
                                    {buttonTitle}
                                </div>
                            </div>
                        } else {
                            return <div className="cell-button-container" key={"subrow-button-" + index}>
                                <div
                                    onClick={() => onClick(index)}
                                    className={subButtonClass}
                                    style={{ cursor: "pointer" }}
                                >
                                    {subButtonTitle}
                                </div>
                            </div>
                        }
                    })
                }
                </div>
            </td>
        </tr>
    );
}
