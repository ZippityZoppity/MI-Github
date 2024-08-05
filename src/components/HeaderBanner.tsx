import Button from "./Button";
import "../style/HeaderTheme.scss";
import headerLogo from "../assets/mi-logo.png";

export default function HeaderBanner(props: {
    updateFile: Function;
    setUploadedData: Function;
}) {
    const resetButton = () => {
        props.updateFile("");
        props.setUploadedData([]);
        sessionStorage.setItem("uploadedData", "[]");
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
