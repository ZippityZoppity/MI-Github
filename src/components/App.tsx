import { SetStateAction, useState } from "react";
import "../style/MainTheme.scss";
import FileBanner from "./FileBanner";
import HeaderBanner from "./HeaderBanner";
import ResultsTable from "./ResultsTable";
import FooterBanner from "./FooterBanner";

export default function MainApp() {
    // fetch(
    //     "https://3696995-sb1.app.netsuite.com/core/media/media.nl?id=245503&c=3696995_SB1&h=ek8SfAo9RizheWgaiFfp1iD3gkvP7oXnzau-7HP_hZLnYOj2&_xt=.json",
    //     {
    //         method: "Get",
    //         mode: "cors",
    //     }
    // )
    //     .then((res) => {
    //         console.log("res:", res);
    //         res.text();
    //     })
    //     .then((text) => {
    //         console.log("text:", text);
    //         // ItemDetails = JSON.parse(text)// do something with "text"
    //     })
    //     .catch((e) => console.error(e));

    const [uploadedFile, updateFile] = useState("");
    const [uploadedData, setUploadedData] = useState<Array<any>>([]);

    const checkRows = () => {
        //if rows are empty return false
        let allRowsSelected = (uploadedData.length !== 0);
        for (const row of uploadedData) {
            if (!row.selected) allRowsSelected = false;
        }
        return allRowsSelected;
    };

    return (
        <div className="MainApp">
            <HeaderBanner
                updateFile={(file: SetStateAction<string>) => updateFile(file)}
                setUploadedData={(data: SetStateAction<any[]>) => setUploadedData(data)}
            />
            <FileBanner
                updateFile={(file: SetStateAction<string>) => updateFile(file)}
                setUploadedData={(data: SetStateAction<any[]>) => setUploadedData(data)}
                uploadedData={uploadedData}
                uploadedFile={uploadedFile}
            />
            <ResultsTable
                updateFile={(file: SetStateAction<string>) => updateFile(file)}
                setUploadedData={(data: SetStateAction<any[]>) => setUploadedData(data)}
                uploadedData={uploadedData}
                uploadedFile={uploadedFile}
            />
            <FooterBanner allRowsSelected={checkRows()} uploadedData={uploadedData} />
        </div>
    );
}
