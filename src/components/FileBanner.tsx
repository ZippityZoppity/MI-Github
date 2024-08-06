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
        updateIsSearching(true);
        let uploadedData: Array<any> = [];

        Papa.parse(acceptedFile, {
            header: true,
            complete: (results) => {
                uploadedData = results.data;
                uploadedData.forEach((item, index) => {
                    item.id = index;
                });
                //temp add data to rows
                for (const row of uploadedData) {
                    row.our_descriptions = [
                        {
                            text: "test 1",
                            match: 1,
                            selected: false,
                        },
                        {
                            text: "test 2",
                            match: 5,
                            selected: false,
                        },
                        {
                            text: "test 3",
                            match: 9,
                            selected: true,
                        },
                    ];
                }
                props.setUploadedData(uploadedData);
                sessionStorage.setItem("uploadedData", JSON.stringify(uploadedData));
            },
        });
        updateIsSearching(false);
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
