import Button from "./Button";
import "../style/HeaderTheme.scss";
import headerLogo from "../assets/mi-logo.png";
import React from "react";

export default function HeaderBanner(props) {
    const resetButton = () => {
        props.updateNumItems(0);
        props.updateFile("");
        props.updateJSON([]);
        sessionStorage.setItem("itemData", "[]");
        sessionStorage.setItem("uploadedJSON", "[]");
        sessionStorage.setItem("numItemResults", "0");
        sessionStorage.setItem("numSelected", "0");
    };

    return (
        <div className="header-banner">
            <div>
                <img
                    src={headerLogo}
                    alt="company-logo-icon"
                    className="medical-inno-logo"
                />
            </div>
            <div className="product-conversion-tool-title">
                Product Conversion Tool
            </div>
            <Button
                title={"Start Over"}
                buttonOnClick={resetButton}
                buttonClass={"start-over-button"}
            ></Button>
        </div>
    );
}
