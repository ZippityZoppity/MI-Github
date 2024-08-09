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
    let buttonClass = props.selected ? "button-cell" : "button-cell-unset"
    let comp_placeholder = '';
    let comp_desc_class = ''

    if (isNewRow) {
        buttonTitle = "Add New";
        buttonClass = 'button-cell-new'
        comp_desc_class = "comp-desc-cell-new";
        comp_placeholder = 'Enter a Competitor Description to search...'
    }

    return (
        <tr>
            <td colSpan={1}>{props.manufacturer}</td>
            <td colSpan={1}>{props.item_code}</td>
            <td colSpan={3} className={comp_desc_class}>
                <textarea placeholder={comp_placeholder} defaultValue={props.comp_description} />
            </td>
            <td colSpan={4}>{props.our_description.text}</td>
            <td colSpan={1}>{isNewRow ? " " : props.our_description.match + "/10"}</td>
            <td colSpan={1}>
                <Button
                    title={buttonTitle}
                    buttonOnClick={() => props.selectCellClick(props.id, props.index)}
                    buttonClass={buttonClass}
                />
            </td>
        </tr>
    );
}
