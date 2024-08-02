import { Box } from "@chakra-ui/react"
import Button from './Button'
import headerLogo from '../assets/mi-logo.png'
import "../style/HeaderTheme.css";

export default function HeaderBanner(props) {

    const resetButton = () => {
        props.updateNumItems(0);
        props.updateFile('')
        props.updateJSON([]);
        sessionStorage.setItem('itemData', '[]');
        sessionStorage.setItem('uploadedJSON', '[]');
        sessionStorage.setItem('numItemResults', '0');
        sessionStorage.setItem('numSelected', '0');
    }

    return (
        <Box className="header-banner">
            <Box>
                <img
                    src={headerLogo}
                    alt="company-logo-icon"
                    className="medical-inno-logo"
                />
            </Box>
            <Box className="product-conversion-tool-title">Product Conversion Tool</Box>
            <Box className="start-over-button">
                <Button type={'HeaderButton'} onClick={resetButton}></Button>
            </Box>
        </Box>
    )
}