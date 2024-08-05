import React, { ReactElement } from "react";

export default function Row(props: { columns: Array<string> }) {
    let columns: Array<ReactElement> = [];
    for (const column of props.columns) {
        columns.push(<td>{column}</td>);
    }

    return <tr>{columns}</tr>;
}
