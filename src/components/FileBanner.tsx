import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CsvDownloader from "react-csv-downloader";
import Papa from "papaparse";
import Button from "./Button";
import Loading from "./Loading";
import { columns, data } from "../data/CSVTemplateData";

import resultsIcon from "../assets/checkmark-96.png";
import "../style/FileBanner.scss";

export default function FileBanner(props: {
    updateFile: Function;
    setUploadedData: Function;
    uploadedData: Array<any>;
    uploadedFile: any;
    ourDescriptions: any;
    getFormattedData: Function;
    isSearching: boolean;
    updateIsSearching: Function;
}) {

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
            delimiter: ';',
            complete: async (results) => {
                uploadedData = results.data;
                //add id
                uploadedData.forEach((item, index) => {
                    item.id = index;
                });
                //clean data
                for (const row of uploadedData) {
                    if (!row.comp_description || !row.item_code || !row.manufacturer) {
                        alert('CSV file formatted incorrectly! Please try again');
                        return;
                    }                    // call openai model //
                    props.updateIsSearching(true)
                    let response = await props.getFormattedData(row.comp_description);
                    props.updateIsSearching(false)
                    //                   //
                    let formattedCompDesc = JSON.parse(response);
                    row.comp_description = formattedCompDesc;
                    row.our_descriptions = []; 
                    let allDescriptions: any[] = [];

                    //parse our data
                    for (const key in props.ourDescriptions) {
                        let description = props.ourDescriptions[key].desc;
                        let formatted_desc = props.ourDescriptions[key].formatted_desc;
                        let matches = 0;
                        //calculate best matches out of bigger prompt
                        let total = (row.comp_description.length > formatted_desc.length) ? row.comp_description.length: formatted_desc.length;
                        for (const attribute of row.comp_description) {
                            for (const value of formatted_desc) {
                                if (value == attribute) matches++;
                            }
                        }
                        let newNumerator = Math.floor(matches * (10 / total));
                        allDescriptions.push({
                            text: description,
                            formatted_desc: formatted_desc,
                            id: props.ourDescriptions[key].id,
                            manufacturer: props.ourDescriptions[key].manufacturer,
                            uom: props.ourDescriptions[key].uom,
                            unitprice: props.ourDescriptions[key].unitprice,
                            pricelevel: props.ourDescriptions[key].pricelevel,
                            match: newNumerator,
                            selected: false,
                            bestMatch: false,
                        })
                    }
                    allDescriptions.sort((a, b) => {
                        return (a.match > b.match) ? -1 : 1;
                    })
                    for (let i = 0; i < allDescriptions.length - 1; i++) {
                        if (row.our_descriptions.length >= 3) break;
                        if (allDescriptions[i].match > 0) row.our_descriptions.push(allDescriptions[i])
                    }
                    console.log("row:", row);
                }

                // process data
                for (const data of uploadedData) {
                    if (data.our_descriptions.length >= 0) continue;
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

                props.setUploadedData([...props.uploadedData, ...uploadedData]);
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
                        wrapColumnChar=""
                        className="temp-button"
                        text="Download Template File"
                    />
                </div>
            </div>
            <div>{!props.isSearching ? <></> : <Loading />}</div>
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
