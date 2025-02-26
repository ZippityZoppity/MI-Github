import { SetStateAction, useState, useEffect } from "react";
import { itemDescriptions } from "../data/ItemExports"
import "../style/MainTheme.scss";
import FileBanner from "./FileBanner";
import HeaderBanner from "./HeaderBanner";
import ResultsTable from "./ResultsTable";
import FooterBanner from "./FooterBanner";

export default function MainApp() {
    
    const [uploadedFile, updateFile] = useState("");
    const [uploadedData, setUploadedData] = useState<Array<any>>([]);
    const [isSearching, updateIsSearching] = useState(false);
    const MEDICAL_INNOVATIONS_ENDPOINT = 'https://hclolpo3qzkqx4aufyxjgux2lu0hgarc.lambda-url.us-east-2.on.aws/'
    const NETSUITE_ENDPOINT = 'https://3696995-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2322&deploy=1&compid=3696995_SB1&ns-at=AAEJ7tMQ5pcIkUw4lVTiK6MfLMVj_4Ps60p4kBNpiLZRkA-Id5A'
    // const ourDescriptions: Record<string, Object> = itemDescriptions;
    const [ourDescriptions, setDescriptions] = useState({});
    const [matchesMap, setMatchesMap] = useState({});
    const [priceLevels, setPriceLevels] = useState([]);

    const get_netsuite_data = async function() {
        try {
            const response = await fetch(NETSUITE_ENDPOINT, {
                method: "OPTIONS",
                mode: "cors",
                headers: {
                    "Content-Type": "text/plain",
                },
            })
            if (response.status == 200) {
                const data = await response.json();
                setDescriptions(data.itemExports);
                setMatchesMap(data.matchMap);
                setPriceLevels(data.priceLevels);
                return data;
            } else {
                console.log('status', response.status)
            }
        } catch (error) {
            console.log("error:", error);
        }

    }

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

    useEffect(() => {
        get_netsuite_data()
    }, []);

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
                priceLevels={priceLevels}
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
