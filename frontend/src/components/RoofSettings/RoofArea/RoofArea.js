import React, {useState, useEffect} from 'react'

import './RoofArea.css'
// MUI 
import { Box } from '@mui/system';
import { Paper, TextField, Snackbar, Alert } from '@mui/material';

// Icons 
import ArrowUp from '../../../icons/arrow-up.png';
import ArrowDown from '../../../icons/arrow-down.png';
import RoofingIcon from '@mui/icons-material/Roofing';

function RoofArea(props) {
const [roofArea, setRoofArea] = useState(150);
const [openError, setOpenError] = useState(false);

// Event Listener 
const change_Roof_Area = (e) => {
    if (e.target.value === "") {
        setRoofArea(0);
    }
    else if (!isNaN(e.target.value)) {
        setRoofArea(parseInt(e.target.value))
    }
    else {
        nan_error();
    }
}

// Plus Minus Buttons
const area_plus = () => {
    if (roofArea <= 100000) {            // TODO maximum roof size ???
        setRoofArea(roofArea + 5);
    }
}
const area_minus = () => {
    if (roofArea >= 5) {                // TODO minimum roof size ??? 
        setRoofArea(roofArea - 5);
    }
}

// Error Message 
const handleClose = () => {
    setOpenError(false);
}
const nan_error = () => {
    setOpenError(true);
}

// Return Function 
    useEffect(() => {
        props.get_Area(roofArea);
    },[roofArea])

// Render Function 
return (    // Box justifyContent flex-start??? 
<Box>
    <h4 className='headerCentered'>Dachfläche</h4>
    <Box sx={{
        display: 'grid', 
        height: '60px',
        justifyContent: 'center',
        alignItems: 'center',
    }}>

        <Box sx={{
                    gridArea: 'value', 
                    display: 'flex',
                    justifyContent: {xs: 'center', md: 'center'},
                    alignItems: 'center'
                }}>
                    <Box sx={{position: 'relative', right: '20px'}}>
                        <RoofingIcon sx={{
                            fontSize: 60, 
                            gridArea: 'icon'
                        }} />
                    </Box>
                    <Paper 
                        sx={{
                            width: 80, 
                            height: 80,
                            backgroundColor: 'var(--focus-bg-color)',
                            color: 'var(--primary-text-color)',
                            fontSize:16,
                            fontWeight: 600,
                            lineHeight: '80px', 
                            alignItems: 'center',
                            display: 'flex'
                            }}
                        elevation={5}
                        >
                        <TextField sx={{
                                display: 'flex',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}
                            value= {roofArea}
                            onChange= {change_Roof_Area}
                            inputProps={{
                                maxLength: 6,
                                style: { textAlign: 'center',
                                color: 'var(--primary-text-color)',
                                
                            }}}>
                        </TextField>
                    </Paper>
                    <Box sx={{
                        position: 'relative',
                        left: '20px',
                        display: 'flex', 
                        flexDirection: 'column'
                    }}>
                        <button onClick={area_plus} className='arrow_btn'>
                            <img src={ArrowUp} height="40px" alt="" />
                        </button>
                        <button className='arrow_btn'>
                            <img onClick={area_minus} src={ArrowDown} height="40px" alt="" />
                        </button>
                    </Box>
        </Box>
    </Box>
    <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          <strong>[Eingabefehler!]</strong> Bitte numerische Werte verwenden
        </Alert>
    </Snackbar>
</Box>
)
}

export default RoofArea;