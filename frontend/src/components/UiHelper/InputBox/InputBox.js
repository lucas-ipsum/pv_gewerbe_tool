import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField } from '@mui/material';

import './InputBox.css'

import ArrowUp from '../../../icons/arrow-up.png';
import ArrowDown from '../../../icons/arrow-down.png';

function InputBox(props) {   
const [value, setValue] = useState(props.default);

const change_Input = (e) => {
    //e.prevent.default();

    if (e.target.value === "") {
        setValue(0);
    }
    else if (!isNaN(e.target.value)) {
        setValue(parseInt(e.target.value))
    }
    else {
        console.log('NaN')
        //TODO nan_error();
    }
}
// ### Plus Minus Buttons
    const area_plus = () => {
        if (value <= props.max) {           
            setValue(value + props.step);
        }
    }
    const area_minus = () => {
        if (value - props.step >= props.min) {         
            setValue(value - props.step);
        }
        else {
            setValue(props.min)
        }
    }
// ### Return Function 
    useEffect(() => {
        props.return_Data(value)
    }, [value])
// ### Render Function 
return (
<Box sx={{textAlign: 'center'}}>
    <h4>{props.title}</h4>
    <Box sx={{
        gridArea: 'value', 
        display: 'flex',
        justifyContent: {xs: 'center', md: 'center'},
        alignItems: 'center'
    }}>
        <Box sx={{position: 'relative', right: '20px'}}>
            {props.icon}
        </Box>
        <Paper 
            sx={{
                width: 100, 
                height: 85,
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
                value= {value}
                onChange= {change_Input}
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
)
}

export default InputBox;