import { Box } from "@chakra-ui/react"
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CsvDownloader from 'react-csv-downloader';
import Papa from 'papaparse';
import Button from './Button';
import { columns, data } from '../data/CSVTemplateData'

import queryIcon from '../assets/icons8-hourglass-80.png'
import resultsIcon from '../assets/icons8-checkmark-96.png'
import "../style/BannerTheme.css";

export default function FileBanner(props) {

    const [isSearching, updateIsSearching] = useState(false);

    //  BUTTON FUNCTION DEFINITIONS  //

    /**
     * Updates file with user upload on drag and drop
     * @param {*} e target file
     */
    const onDrop = useCallback(acceptedFiles => {
        console.log("acceptedFiles:", acceptedFiles);
        if (acceptedFiles[0].type === 'text/csv') {
            props.updateFile(acceptedFiles[0])
        } else {
            alert('File must be of type CSV (Comma Seperated Value)!');
        }
    }, [])
    const { getRootProps, acceptedFiles, getInputProps, isDragActive, } = useDropzone({ onDrop })

    /**
     * Function that runs on Upload click, that parses a csv
     * file into a JSON object and updates state variables
     */
    const uploadCSVButton = (e) => {
        updateIsSearching(true);
        let uploadedJSON = {}
        Papa.parse(props.uploadedFile, {
            header: true,
            complete: (results) => {
                uploadedJSON = results.data;
                uploadedJSON.forEach((item, index) => {
                    item.id = index;
                    item.selection = props.buttonConstants.S_FALSE;
                    console.log("item.selection:", item.selection);
                    // v filler test data remove this v //
                    item.best_match = '1/10';
                    item.our_description = 'test desc'
                    // ^ filler test data remove this ^ //
                });
                for (let i = 1; i < uploadedJSON.length; i++) {
                    if (i % 5 === 0 || i === uploadedJSON.length == 1) {
                        let temp_item = {
                            id: i + uploadedJSON.length,
                            selection: props.buttonConstants.S_GET,
                            best_match: '',
                            comp_description: '',
                            our_description: ''
                        }
                        let temp_array = [...uploadedJSON.slice(0, i), temp_item, ...uploadedJSON.slice(i)]
                        uploadedJSON = temp_array;
                        i++;
                    }
                }
                props.updateJSON(uploadedJSON);
                props.updateNumItems(uploadedJSON.length)
                sessionStorage.setItem('uploadedJSON', JSON.stringify(uploadedJSON));
                sessionStorage.setItem('numItemResults', JSON.stringify(uploadedJSON.length));
            }
        })
        updateIsSearching(false);
    }

    //      ///////////////////     //

    return (
        <Box className="file-banner">
            <Box className="grid-container">
                <Box className="csv-button-container">
                    <Button
                        type={'CSVButton'}
                        onClick={uploadCSVButton} 
                        isDisabled = {(props.uploadedFile === '')}
                    />
                </Box>
                <Box className="query-icon-container">
                    {
                        (!props.isSearching) ? 
                            <></>
                            :
                            <img src={queryIcon} alt="Hourglass icon" className="query-icon" />
                    }
                </Box>
                <Box className="results-icon-container">
                    {
                        props.numItems === 0 ?
                        <>
                            <Box className="pre-results-text">
                                Upload a File to Identify Items
                            </Box>
                        </>
                        :
                        <>
                            <Box className="results-icon-text">
                                {props.numItems} Items Identified
                            </Box>
                            <img src={resultsIcon} alt="Checkmark icon" className="results-icon" />
                        </>
                    }
                </Box>
                <Box className="dnd-text-container">
                    <Box className="drop-zone" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            (props.uploadedFile === '') ?
                            <Box className="dnd-text">Drag and Drop File</Box>
                            :
                            <Box className="dnd-text">{props.uploadedFile.name}</Box>
                        }
                    </Box>
                </Box>
                <Box className="temp-button-container">
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
                </Box>
            </Box>
        </Box>
    )
}