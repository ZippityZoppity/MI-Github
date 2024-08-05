import { useState } from "react";
import { Box } from '@chakra-ui/react';
import '../style/MainTheme.css';
import FileBanner from './FileBanner';
import HeaderBanner from './HeaderBanner';
import ResultsTable from './ResultsTable';
import FooterBanner from './FooterBanner';

function MainApp() {

  // Set default sessionStorage values
  (!sessionStorage.getItem('itemData')) && sessionStorage.setItem('itemData', '[]');
  (!sessionStorage.getItem('uploadedJSON')) && sessionStorage.setItem('uploadedJSON', '[]');
  (!sessionStorage.getItem('numItemResults')) && sessionStorage.setItem('numItemResults', '0');
  (!sessionStorage.getItem('numSelected')) && sessionStorage.setItem('numSelected', '0');
  //let ItemDetails = {};
  
  // fetch("https://3696995-sb1.app.netsuite.com/core/media/media.nl?id=245503&c=3696995_SB1&h=ek8SfAo9RizheWgaiFfp1iD3gkvP7oXnzau-7HP_hZLnYOj2&_xt=.json")
  //   .then((res) => {
  //     console.log("res:", res);
  //     res.text()
  //   }).then((text) => {
  //     console.log("text:", text);
  //     // ItemDetails = JSON.parse(text)// do something with "text"
  //   })
  //   .catch((e) => console.error(e));
  
  const [numItems, updateNumItems] = useState(parseInt(sessionStorage.getItem('numItemResults')));
  const [numSelected, updateNumSelected] = useState(parseInt(sessionStorage.getItem('numSelected')));
  const [uploadedFile, updateFile] = useState('');
  const [uploadedJSON, updateJSON] = useState(JSON.parse(sessionStorage.getItem('uploadedJSON')));

  const buttonConstants = {
    S_TRUE: 1,
    S_FALSE: 2,
    S_GET: 3,
  }

  return (
    <Box className="MainApp">
      <HeaderBanner
        updateNumItems={updateNumItems}
        updateFile={updateFile} 
        updateJSON={updateJSON}
      />
      <FileBanner 
        numItems={numItems}
        updateNumItems={updateNumItems}
        uploadedFile={uploadedFile}
        updateFile={updateFile}
        updateJSON={updateJSON}
        buttonConstants={buttonConstants}
      />
      {/* <ResultsTable /> */}
      <Box className="item-table">
        <ResultsTable 
          uploadedJSON={uploadedJSON}
          updateJSON={updateJSON}
          numSelected={numSelected}
          updateNumSelected={updateNumSelected}
          buttonConstants={buttonConstants}
        />
      </Box>
      <FooterBanner
          numItems={uploadedJSON.length}
          selectedItems={numSelected}
      />
    </Box>
  );
}

export default MainApp;
