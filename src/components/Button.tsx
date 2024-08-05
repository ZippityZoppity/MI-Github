import "../style/Button.scss";

export default function SelectionButton(props: {
    title: string;
    buttonOnClick: Function;
    buttonClass: string;
}) {
    return (
        <div
            onClick={() => props.buttonOnClick}
            className={"pct-button " + props.buttonClass}
            style={{ cursor: "pointer" }}
        >
            {props.title}
        </div>
    );
}
