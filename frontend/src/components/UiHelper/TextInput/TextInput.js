import React, { useEffect, useState } from 'react'
// MUI 
import { TextField } from '@mui/material';

function TextInput(props) {
// Hooks
const [value, setValue] = useState(50);
const [error, setError] = useState(false); 


// Event Listener 
const handleInput = (e) => {
    let num = parseFloat(e.target.value);
    if (isNaN(num)) {
        setError(true);
        setValue(null)
    } else {
        setError(false)
        setValue(num);

    }
}

// Callback Function 
useEffect(() => {
    props.callbackFunction(value)
}, [value])

// Render Function 
return (
    <TextField 
        error={error}
        sx={{border: '0.4px solid', mb: 1}}
        type="number"
        label="MWh / Jahr"
        value={value}
        onChange={handleInput}
    /> 
)
}

export default TextInput; 