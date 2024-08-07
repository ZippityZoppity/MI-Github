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
}) {
    let isNewRow = props.id == 8888;
    let buttonTitle = props.selected ? "Selection" : "Choose";

    if (isNewRow) buttonTitle = "Add New";
    return (
        <tr>
            <td colSpan={1}>{props.manufacturer}</td>
            <td colSpan={1}>{props.item_code}</td>
            <td colSpan={3}>
                <textarea value={props.comp_description} />
            </td>
            <td colSpan={4}>{props.our_description.text}</td>
            <td colSpan={1}>{isNewRow ? " " : props.our_description.match + "/10"}</td>
            <td colSpan={1}>
                <Button
                    title={buttonTitle}
                    buttonOnClick={() => props.selectCellClick(props.id, props.index)}
                    buttonClass={props.selected ? "button-cell" : "button-cell-unset"}
                />
            </td>
        </tr>
    );
}
