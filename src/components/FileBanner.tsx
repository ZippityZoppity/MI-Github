import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CsvDownloader from "react-csv-downloader";
import Papa from "papaparse";
import Button from "./Button";
import Loading from "./Loading";
import { columns, data } from "../data/CSVTemplateData";

import resultsIcon from "../assets/icons8-checkmark-96.png";
import "../style/FileBanner.scss";

export default function FileBanner(props: {
    updateFile: Function;
    setUploadedData: Function;
    uploadedData: Array<any>;
    uploadedFile: any;
    ourDescriptions: any;
    getFormattedData: Function;
}) {
    const [isSearching, updateIsSearching] = useState(false);

    /**
     * Updates file with user upload on drag and drop
     * @param {*} e target file
     */
    const onDrop = useCallback((acceptedFiles: any[]) => {
        if (acceptedFiles[0].type === "text/csv") {
            props.updateFile(acceptedFiles[0]);
            uploadCSV(acceptedFiles[0]);
        } else {
            alert("File must be of type CSV (Comma Seperated Value)!");
        }
    }, []);
    const { getRootProps, acceptedFiles, getInputProps, isDragActive } = useDropzone({ onDrop });

    /**
     * Function that runs on Upload click, that parses a csv
     * file into a JSON object and updates state variables
     */
    const uploadCSV = (acceptedFile: any) => {
        let uploadedData: Array<any> = [];

        Papa.parse(acceptedFile, {
            header: true,
            complete: async (results) => {
                uploadedData = results.data;

                //add id
                uploadedData.forEach((item, index) => {
                    item.id = index;
                });

                //clean data
                for (const row of uploadedData) {
                    // call openai model //
                    updateIsSearching(true)
                    let response = await props.getFormattedData(row.comp_description);
                    updateIsSearching(false)
                    //                   //
                    let formattedCompDesc = JSON.parse(response);
                    row.comp_description = formattedCompDesc;
                    row.item_code = row["'item_code'"];
                    row.manufacturer = row["'manufacturer'"];
                    row.our_descriptions = []; 
                    let allDescriptions: any[] = [];

                    //parse our data
                    props.ourDescriptions.forEach((description: Array<String>) => {
                        let matches = 0;
                        let total = description.length;
                        description.forEach(ourAttr => {
                            formattedCompDesc.forEach((compAttr: any) => {
                                if (compAttr == ourAttr) matches++;
                            })
                        })
                        let newNumerator = Math.floor(matches * (10 / total));
                        allDescriptions.push({
                            text: description,
                            match: newNumerator,
                            selected: false,
                            bestMatch: false,
                        })
                    });
                    allDescriptions.sort((a, b) => {
                        return (a.match > b.match) ? -1 : 1;
                    })
                    row.our_descriptions = allDescriptions.slice(0, 4)
                }

                //process data
                for (const data of uploadedData) {
                    //find best match
                    let currentBest = 0;
                    for (const description of data.our_descriptions) {
                        if (description.match > currentBest) {
                            currentBest = description.match;
                        }
                    }
                    let bestMatch = data.our_descriptions.find(
                        (desc: { match: number }) => desc.match === currentBest
                    );
                    bestMatch.selected = false;
                    bestMatch.bestMatch = true;
                    //set true if a match is 7 or higher
                    if (bestMatch.match >= 7) {
                        bestMatch.selected = true;
                    }
                    let bestMatchIndex = data.our_descriptions.indexOf(bestMatch);
                    data.our_descriptions.splice(bestMatchIndex, 1);
                    data.our_descriptions.unshift(bestMatch);
                    data.selection = 0;
                }

                props.setUploadedData(uploadedData);
            },
        });
    };

    return (
        <div className="file-banner">
            <div className="upload-buttons">
                <Button
                    title={"Upload CSV"}
                    buttonOnClick={() => {
                        document.getElementById("csv-upload-area")!.click(); //click drag and drop element
                    }}
                    buttonClass={"csv-button"}
                />
                <div className="dnd-text-container">
                    <div className="drop-zone" {...getRootProps()}>
                        <input {...getInputProps()} id="csv-upload-area" />
                        {props.uploadedFile === "" ? (
                            <div className="dnd-text">Drag and Drop File</div>
                        ) : (
                            <div className="dnd-text">{props.uploadedFile.name}</div>
                        )}
                    </div>
                </div>
                <div>
                    <CsvDownloader
                        filename="CSVTemplate"
                        columns={columns}
                        datas={data}
                        extension=".csv"
                        separator=";"
                        wrapColumnChar="'"
                        className="temp-button"
                        text="Download Template File"
                    />
                </div>
            </div>
            <div>{!isSearching ? <></> : <Loading />}</div>
            {props.uploadedData.length === 0 ? (
                <div className="results-text">Upload a File to Identify Items</div>
            ) : (
                <div className="results-text">
                    {props.uploadedData.length} Items Identified
                    <img src={resultsIcon} alt="Checkmark icon" className="results-icon" />
                </div>
            )}
        </div>
    );
}
