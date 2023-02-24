import React, { useState, useEffect } from 'react'

// MUI 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/system';


function RadioBtn(props) {
// Hooks 
const [value, setValue] = useState('chart1');
// Get Props 
var labelChart1 = 'Test'; 
var labelChart2 = 'Test'; 

if (props.labels) {
    labelChart1 = props.labels[0];
    labelChart2 = props.labels[1];
}

// Event Listener
const handleChange = (e) => {
    setValue(e.target.value);

}

// Callback Function
useEffect(() => {
    props.callbackFunction(value)
}, [value])


// Render Function 
return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <FormControl>
            <RadioGroup 
            value={value}
            onChange={handleChange}
            row
            >
                <FormControlLabel value="chart1" control={<Radio />} label={labelChart1}/>
                <FormControlLabel value="chart2" control={<Radio />} label={labelChart2}/>
            </RadioGroup>
        </FormControl>
    </Box>
)
}

export default RadioBtn;