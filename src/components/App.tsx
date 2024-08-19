import { SetStateAction, useState } from "react";
import "../style/MainTheme.scss";
import { formattedDescriptions } from "../data/FormattedDesc"
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
    const ourDescriptions = formattedDescriptions;

    const MEDICAL_INNOVATIONS_ENDPOINT = 'https://hclolpo3qzkqx4aufyxjgux2lu0hgarc.lambda-url.us-east-2.on.aws/'

    const get_formatted_data = (prompt: any) => {
        let formatted_data = {};
        fetch(MEDICAL_INNOVATIONS_ENDPOINT, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "prompts": prompt
            })
        })
        .then((res) => {
            console.log("res:", res);
            return res.json()
        })
        .then((data) => {
            formatted_data = data;
            console.log('data', data);
        })
        .catch((e) => console.log('e', e));
        return formatted_data;
    }

    // get_formatted_data("Micropore w/dispenser 2' x 10yds 12rls/bx 10bx/cs");


    const [uploadedFile, updateFile] = useState("");
    const [uploadedData, setUploadedData] = useState<Array<any>>([]);

    const checkRows = () => {
        //if rows are empty return false
        let allRowsSelected = (uploadedData.length !== 0);
        for (const row of uploadedData) {            
            let subrowSelected = false;
            for (const subrow of row.our_descriptions) {
                if (subrow.selected) subrowSelected = true;
            }
            if (!subrowSelected) allRowsSelected = false;
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
                ourDescriptions={ourDescriptions}
                getFormattedData={get_formatted_data}
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
