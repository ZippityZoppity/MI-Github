import { Box } from "@chakra-ui/react"
import clsx from "clsx"

export const COLUMN_HEADERS = [
    //Sets class for header theme
    { field: 'manufacturer', headerName: 'Manufacturer', flex: 1, 
        cellClassName: (params) => {
        if (params.value == null) {
          return '';
        }
        return clsx('th')}
    },
    { field: 'item_code', headerName: 'Item Code', flex: 1 },
    { field: 'comp_description', headerName: 'Competitor Description', flex: 2 },
    { field: 'our_description', headerName: 'Our Description', flex: 2 },
    { field: 'best_match', headerName: 'Best Match', flex: 1 },
    { field: 'selection', headerName: 'Selection', flex: 1, align: 'center',
        renderCell: (params) => {
            return ((params.value === 1) ?
            <Box>Selected</Box>
            : (params.value === 2) ?
            <Box>Choose</Box>
            :
            <Box>Get Matches</Box>)
        },
        cellClassName: (params) => {
        return ((params.value === 1) ? clsx('button-cell'): (params.value === 2) ? clsx('button-cell-unset') : clsx('button-cell-match'))
        },
        disableClickEventBubbling: true,
    },
];

export const CSV_COLUMNS = [
    {
        id: 'manufacturer',
        displayName: 'Manufacturer',
    },
    {
        id: 'item_code',
        displayName: 'Item Code',
    },
    {
        id: 'our_description',
        displayName: 'Our Description',
    },
    {
        id: 'best_match',
        displayName: 'Best Match',
    },
]