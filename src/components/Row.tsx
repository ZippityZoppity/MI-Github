import { useState, useEffect } from "react";
import { itemDescriptions } from "../data/ItemExports"
import removeRowIcon from "../assets/trash-128.png"; 

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
    removeRowClick: Function;
}) {
    const allDescriptions: any = itemDescriptions;
    //set row types
    let isNewRow = props.id == 8888;
    let buttonTitle = props.selected ? "Selection" : "Choose";
    let buttonClass = props.selected ? "button-cell" : "button-cell-unset"
    let subButtonTitle = "Use This";
    let subButtonClass = "button-cell-usethis"
    let comp_placeholder = '';
    let comp_desc_class = '';
    let cellContainerClass = (props.rowSelected === props.index) ? "table-cell-container-selected" : "table-cell-container-unselected";

    const [newDescription, setDescription] = useState('');
    const [searchDescription, setSearch] = useState('');
    const [searchList, setList] = useState<Array<any>>([]);
    const onClick = (index: Number) => {
        if (isNewRow) {
            if (newDescription === '') return;
            props.selectCellClick(newDescription)
        } else if (props.rowSelected !== props.index) {
            props.updateRowSelected(props.index)
        } else if (index !== -1) {
            props.selectCellClick(props.id, index)
        }
    }

    const removeRow = () => {
        props.removeRowClick(props.index)
    }

    const addDescription = () => {
        let newRow = {
            bestMatch: false,
            formatted_desc: [],
            id: "-1",
            manufacturer: "",
            uom: "",
            unitprice: "",
            pricelevel: [],
            match: -1,
            selected: false,
            text: ""
        };
        for (const objDesc in allDescriptions) {
            if (searchDescription !== "" && allDescriptions[objDesc].desc.startsWith(searchDescription)) {
                newRow = {
                    bestMatch: true,
                    formatted_desc: allDescriptions[objDesc].formatted_desc,
                    id: objDesc,
                    manufacturer: allDescriptions[objDesc].manufacturer,
                    uom: allDescriptions[objDesc].uom,
                    unitprice: allDescriptions[objDesc].unitprice,
                    pricelevel: allDescriptions[objDesc].pricelevel,
                    match: 10,
                    selected: true,
                    text: allDescriptions[objDesc].desc
                }
                props.subrows.unshift(newRow);
                props.updateRowSelected(props.subrows.length - 1);
                break;
            }
        }
    }

    if (isNewRow) {
        subButtonTitle = "Add New";
        subButtonClass = 'button-cell-new'
        comp_desc_class = "comp-desc-cell-new";
        comp_placeholder = 'Enter a Competitor Description to search...'
    }

    useEffect(() => {
        let listArr: any = [];
        for (const objDesc in allDescriptions) {
            if (searchDescription !== "") {
                if (allDescriptions[objDesc].desc.toLowerCase().startsWith(searchDescription.toLowerCase())) {
                    listArr.push(allDescriptions[objDesc].desc)
                    if(listArr.length > 5) break;
                } else if (allDescriptions[objDesc].desc.toLowerCase().includes(searchDescription.toLowerCase())) {
                    listArr.push(allDescriptions[objDesc].desc)
                    if(listArr.length > 5) break;
                }
            }
        }
        setList([...listArr]);
    }, [searchDescription])

    return (
        <tr>
            {/* Competitor Manufacturer Column */}
            <td colSpan={1}><div className="table-cell-container"><p>{props.manufacturer}</p></div></td>

            {/* Competitor Item Code Column */}
            <td id="table-primary-column" colSpan={1}><div className="table-cell-container"><p>{props.item_code}</p></div></td>

            {/* Competitor Descriptions Column */}
            <td colSpan={3} className={comp_desc_class}>
                <form className={cellContainerClass}>
                    <textarea
                        id="newRowText"
                        placeholder={comp_placeholder}
                        defaultValue={props.comp_description}
                        onChange={(e) => {setDescription(e.target.value)}}    
                    />
                </form>
            </td>

            {/* Our Manufacturer Column */}
            <td id="table-primary-column" colSpan={1}><div className={cellContainerClass}>
                {
                    props.selected ? 
                    <></> :
                    (<p></p>)
                }
                {
                    props.subrows.map((subrow, index) => {
                        return (<p key={subrow.manufacturer + "-subrow" + index}>{subrow.manufacturer}</p>);
                    })
                }
            </div></td>

            {/* Our Item Code Column */}
            <td colSpan={1}><div className={cellContainerClass}>
                {
                    props.selected ? 
                    <></> :
                    (<p></p>)
                }
                {
                    props.subrows.map((subrow, index) => {
                        return (<p key={subrow.id + "-subrow" + index}>{subrow.id}</p>);
                    })
                }
            </div></td>

            {/* Our Descriptions Column */}
            <td id="table-primary-column" colSpan={4}>
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
                    {/* Search row */}
                    <div className="search-desc-container">
                        <label htmlFor="search-descriptions">Search Descriptions:</label>
                        <input 
                            type="search"
                            list={"our-descriptions-list" + props.index}
                            className={cellContainerClass}
                            onChange={(e) => {setSearch(e.target.value)}}
                            autoComplete="on"
                        />

                        <datalist id={"our-descriptions-list" + props.index}>
                            {
                                searchList.map((searchDesc) => {
                                    return (
                                        <option value={searchDesc} key={"options-" + searchDesc}></option>
                                    )
                                })
                            }
                        </datalist>
                    </div>
                </div>
            </td>

            {/* UOM Column */}
            <td colSpan={1}>
                <div className={cellContainerClass}>
                    {
                        props.selected ? 
                        <></> :
                        (<p></p>)
                    }
                    {
                        props.subrows.map((subrow, index) => {
                            return (<p key={subrow.uom + '-uomcol-' + index}>{subrow.uom}</p>);
                        })
                    }
                </div>
            </td>

            {/*Price Level Column */}
            <td id="table-primary-column" colSpan={1}>
                <div className={cellContainerClass}>
                    {
                        props.selected ? 
                        <></> :
                        (<p></p>)
                    }
                    {
                        props.subrows.map((subrow, index) => {
                            if (subrow.pricelevel) {
                                return (
                                    <div className="pricelevel-selection-col">
                                        <select name="pricelevel" id="pricelevel">
                                        {
                                            subrow.pricelevel?.map((level: any, ind: any) => {
                                                return (<option value={level} key={'pricelevel-options' + ind}>
                                                    {level}
                                                </option>);
                                                
                                            })
                                        }
                                        </select>
                                        <p className="unitprice-text-box" key={subrow.pricelevel + '-pricelevel-' + index}>
                                            ${
                                                subrow.unitprice
                                            }
                                        </p>
                                    </div>
                                );
                            } else {
                                return <></>
                            }
                            
                        })
                    }
                </div>
            </td>

            {/* Best Matches Column */}
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

            {/* Selection Column */}
            <td id="table-primary-column" colSpan={1}>
                <div className={cellContainerClass}>
                {
                    (props.selected || isNewRow) ? 
                    <></> :
                    <div className="cell-button-container" key={"subrow-button-" + 999}>
                        <div
                            onClick={() => {
                                onClick(-1); 
                            }}
                            className={buttonClass}
                            style={{ cursor: "pointer" }}
                        >
                            {buttonTitle}
                        </div>
                        <div className="remove-row-button" onClick={removeRow}>
                            <img src={removeRowIcon} className="remove-icon" />
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
                                <div className="remove-row-button" onClick={removeRow}>
                                    <img src={removeRowIcon} className="remove-icon" />
                                </div>
                            </div>
                        } else {
                            return <div className="cell-button-container" key={"subrow-button-" + index}>
                                <div
                                    onClick={() => {
                                        onClick(index)
                                    }}
                                    className={subButtonClass}
                                    style={{ cursor: "pointer" }}
                                >
                                    {subButtonTitle}
                                </div>
                            </div>
                        }
                    })
                }
                <div className="cell-button-container" key={"subrow-button-" + props.subrows.length}>
                    <div
                        onClick={() => addDescription()}
                        className={subButtonClass}
                        style={{ cursor: "pointer" }}
                    >
                        {subButtonTitle}
                    </div>
                    {
                        (props.selected || isNewRow) ? 
                        <></> :
                        <div className="remove-row-button" onClick={removeRow}>
                            <img src={removeRowIcon} className="remove-icon" />
                        </div>
                    }
                </div>
                </div>
            </td>
        </tr>
    );
}
