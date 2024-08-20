import { SetStateAction, useEffect, useState } from "react";
import "../style/MainTheme.scss";
import { formattedDescriptions } from "../data/FormattedDesc"
import FileBanner from "./FileBanner";
import HeaderBanner from "./HeaderBanner";
import ResultsTable from "./ResultsTable";
import FooterBanner from "./FooterBanner";

export default function MainApp() {
    
    const [uploadedFile, updateFile] = useState("");
    const [uploadedData, setUploadedData] = useState<Array<any>>([]);
    const [isSearching, updateIsSearching] = useState(false);
    const MEDICAL_INNOVATIONS_ENDPOINT = 'https://hclolpo3qzkqx4aufyxjgux2lu0hgarc.lambda-url.us-east-2.on.aws/'
    const NETSUITE_ENDPOINT = 'https://3696995-sb1.app.netsuite.com/core/media/media.nl?id=245503&c=3696995_SB1&h=ek8SfAo9RizheWgaiFfp1iD3gkvP7oXnzau-7HP_hZLnYOj2&_xt=.json'

    const get_our_descriptions = async function() {
        const response = await fetch(NETSUITE_ENDPOINT, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })
        if (response.status == 200) {
            const data = await response.json();
            console.log("data:", data);
        } else {
            console.log(response.text())
        }

    }

    // get_our_descriptions();

    const ourDescriptions = formattedDescriptions;

    const get_formatted_data = async function (prompt: any) {
        const response = await fetch(MEDICAL_INNOVATIONS_ENDPOINT, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({prompts: [prompt]})
        })
        if (response.status == 200) {
            const data = await response.json();
            return data.responses[0];
        } else {
            console.log(response.text())
        }
    }

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
                isSearching={isSearching}
                updateIsSearching={updateIsSearching}
            />
            <ResultsTable
                updateFile={(file: SetStateAction<string>) => updateFile(file)}
                setUploadedData={(data: SetStateAction<any[]>) => setUploadedData(data)}
                ourDescriptions={ourDescriptions}
                uploadedData={uploadedData}
                uploadedFile={uploadedFile}
                isSearching={isSearching}
                getFormattedData={get_formatted_data}
                updateIsSearching={updateIsSearching}
            />
            <FooterBanner allRowsSelected={checkRows()} uploadedData={uploadedData} />
        </div>
    );
}
