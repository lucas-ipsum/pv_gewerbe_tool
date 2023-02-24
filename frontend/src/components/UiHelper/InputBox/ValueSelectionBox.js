import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField } from '@mui/material';

import './InputBox.css'

import ArrowUp from '../../../icons/arrow-up.png';
import ArrowDown from '../../../icons/arrow-down.png';

function InputBox(props) {   
const [position, setPosition] = useState(props.default)
const [value, setValue] = useState(props.values[props.default]);

// ### Plus Minus Buttons
    const area_plus = () => {
       if (position < props.values.length - 1) {           
            setPosition(position + 1);
        }
    }
    const area_minus = () => {
        if (position > 0) {         
            setPosition(position - 1);

        }

    }

// ##Set Value with selected array position from input  
useEffect(() => {
    setValue(props.values[position])
}, [position])

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
                width: 105, 
                height: 85,
                backgroundColor: 'var(--focus-bg-color)',
                color: 'var(--primary-text-color)',
                fontSize:16,
                fontWeight: 600,
                lineHeight: '80px', 
                alignItems: 'center',
                display: 'flex',
                }}
            elevation={5}
            >
            <Box sx={{width: '100%', textAlign: 'center'}}>  
                <p>{value}</p>
            </Box>
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