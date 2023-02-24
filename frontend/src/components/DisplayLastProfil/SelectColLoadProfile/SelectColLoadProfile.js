import React, { Component, useEffect, useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectColLoadProfile(props) {
    var col_num;
    col_num = props.col;    

    const [col_Val, setColName] = useState('');

    const handleChange = (e) => {
        setColName(e.target.value);
    }

    const update = () => {
        let col = {
            num: col_num,
            val: col_Val
        }
        props.sendData(col)             // col contains value and position of the select field and returns it to parent (DisplayLAstProfil) 
      }

    // useEffect fixes problem that DisplayLastProfile gets updated while SelectColLoadProfile renders
    // only run update if col_num or colVal changes 
    useEffect(() => {
        update();
    }, [col_num, col_Val])

    return (
        <div>
        <FormControl>
            <Select 
                value={col_Val}    
                sx={{ minWidth: 150, border:'0.5px solid !important' }}
                onChange={handleChange}
                id='hii'
                >
                <MenuItem value={'date_time'}>Datum + Zeit</MenuItem>
                <MenuItem value={'value'}>Wert</MenuItem>
            </Select>
        </FormControl>
        </div>
    )
}
//       
export default SelectColLoadProfile