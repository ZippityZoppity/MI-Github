import Button from "./Button";
export default function Row(props: {
    manufacturer: string;
    item_code: string;
    comp_description: string;
    our_description: any;
    selected: boolean;
    selectCellClick: Function;
    id: Number;
    index: Number;
}) {
    return (
        <tr>
            <td colSpan={1}>{props.manufacturer}</td>
            <td colSpan={1}>{props.item_code}</td>
            <td colSpan={3}>{props.comp_description}</td>
            <td colSpan={3}>{props.our_description.text}</td>
            <td colSpan={1}>{props.our_description.match}/10</td>
            <td colSpan={1}>
                <Button
                    title={props.selected ? "Selection" : "Choose"}
                    buttonOnClick={() =>
                        props.selectCellClick(props.id, props.index)
                    }
                    buttonClass={
                        props.selected ? "button-cell" : "button-cell-unset"
                    }
                />
            </td>
        </tr>
    );
}
