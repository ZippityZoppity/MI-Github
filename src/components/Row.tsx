import Button from "./Button";
export default function Row(props: { data: any }) {
    let selected =
        props.data.our_descriptions.find((desc: { selected: any }) => {
            return desc.selected;
        }) || props.data.our_descriptions[0];

    return (
        <tr id={"row-id-" + props.data.id}>
            <td>{props.data.manufacturer}</td>
            <td>{props.data.item_code}</td>
            <td>{props.data.comp_description}</td>
            <td>{selected.text}</td>
            <td>{selected.match}</td>
            <td>
                <Button title={"Selection"} buttonOnClick={() => {}} buttonClass={"button-cell"} />
            </td>
        </tr>
    );
}
