import "../style/TableTheme.css";
import { useState } from "react";

export default function SelectionButton(props) {

    let buttonText = 'Button';
    let buttonTitle = 'Button';
    let buttonKey = '0';
    let buttonOnClick = () => console.log('button pressed');
    let buttonClass = '';
    let isDisabled = false;

    switch (props.type) {
        case 'HeaderButton':
            buttonText = 'Start Over';
            buttonTitle = props.type;
            buttonKey = Math.floor(Math.random() * 10);
            buttonOnClick = props.onClick;
            buttonClass = 'header-button';
            break;
        case 'CSVButton':
            buttonText = 'Upload CSV';
            buttonTitle = props.type;
            buttonKey = Math.floor(Math.random() * 10);
            buttonOnClick = props.onClick;
            buttonClass = 'csv-button';
            isDisabled = props.isDisabled
            break;
        default:
            break;
    }

    return (
        <button 
            title={buttonTitle}
            onClick={buttonOnClick}
            className={buttonClass}
            key={buttonKey}
            disabled={isDisabled}
            style={{cursor: 'pointer'}}
        >{buttonText}</button>
    )
}