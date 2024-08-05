import { DataGrid } from '@mui/x-data-grid';
import { COLUMN_HEADERS } from '../data/ColumnData';
import "../style/TableTheme.css";

export default function ResultsTable(props) {

    const selectCellClick = (e) => {
      console.log("e:", e);
      if (e.field === 'selection') {
        let newJSON = props.uploadedJSON;
        if (newJSON[e.id].selection === props.buttonConstants.S_FALSE) {
          props.updateNumSelected(props.numSelected - 1)
          newJSON[e.id].selection = props.buttonConstants.S_TRUE;
        } else if (newJSON[e.id].selection === props.buttonConstants.S_TRUE) {
          props.updateNumSelected(props.numSelected + 1)
          newJSON[e.id].selection = props.buttonConstants.S_FALSE;
        }
        // newJSON[e.id].selection ? props.updateNumSelected(props.numSelected - 1) : props.updateNumSelected(props.numSelected + 1)
        // newJSON[e.id].selection = !newJSON[e.id].selection;
        props.updateJSON(newJSON)
        sessionStorage.setItem('uploadedJSON', JSON.stringify(newJSON));
      }
    }
    
    return (
        <DataGrid
          rows={props.uploadedJSON}
          columns={COLUMN_HEADERS}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            },
          }}
          onCellClick={(e) => {selectCellClick(e)}}
          autoHeight
          onRowEditStart={console.log('test')}
        />
    );
}