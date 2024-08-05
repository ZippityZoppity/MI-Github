import { useState } from "react";
import "../style/MainTheme.scss";
import FileBanner from "./FileBanner";
import HeaderBanner from "./HeaderBanner";
import ResultsTable from "./ResultsTable";
import FooterBanner from "./FooterBanner";
import React from "react";

export default function MainApp() {
    // Set default sessionStorage values
    !sessionStorage.getItem("itemData") &&
        sessionStorage.setItem("itemData", "[]");
    !sessionStorage.getItem("uploadedData") &&
        sessionStorage.setItem("uploadedData", "[]");
    !sessionStorage.getItem("numItemResults") &&
        sessionStorage.setItem("numItemResults", "0");
    !sessionStorage.getItem("numSelected") &&
        sessionStorage.setItem("numSelected", "0");

    let ItemDetails = {};

    // fetch("https://3696995-sb1.app.netsuite.com/core/media/media.nl?id=245503&c=3696995_SB1&h=ek8SfAo9RizheWgaiFfp1iD3gkvP7oXnzau-7HP_hZLnYOj2&_xt=.json")
    //   .then((res) => {
    //     console.log("res:", res);
    //     res.text()
    //   }).then((text) => {
    //     console.log("text:", text);
    //     // ItemDetails = JSON.parse(text)// do something with "text"
    //   })
    //   .catch((e) => console.error(e));
    const [uploadedFile, updateFile] = useState("");
    const [uploadedData, setUploadedData] = useState(
        JSON.parse(sessionStorage.getItem("uploadedData") || "")
        

    return (
        <div className="MainApp">
            <HeaderBanner
                updateNumItems={updateNumItems}
                updateFile={updateFile}
                uploadedData={uploadedData}
            />
            <FileBanner
                numItems={numItems}
                updateNumItems={updateNumItems}
                uploadedFile={uploadedFile}
                updateFile={updateFile}
                uploadedData={uploadedData}
                buttonConstants={buttonConstants}
            />
            {/* <ResultsTable /> */}
            <Box className="item-table">
                <ResultsTable
                    uploadedJSON={uploadedJSON}
                    uploadedData={uploadedData}
                    numSelected={numSelected}
                    updateNumSelected={updateNumSelected}
                    buttonConstants={buttonConstants}
                />
            </Box>
            <FooterBanner
                numItems={uploadedJSON.length}
                selectedItems={numSelected}
            />
        </div>
    );
}
