import React, {useEffect, useState} from 'react';
import parse from "html-react-parser";

// MUI 
import { Box, spacing } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';

// MUI Imports Table 
import Table from '@mui/material/Table';
import { TableBody, TableCell, TableContainer, TableHead } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import SelectColLoadProfile from './SelectColLoadProfile/SelectColLoadProfile';
import DisplayErrorMessage from '../DisplayErrorMessage/DisplayErrorMessage';
import RadioBtn from '../UiHelper/RadioBtn/RadioBtn';
import TextField from '../UiHelper/TextInput/TextInput';

function DisplayLastProfil(props) {
    let headers = [];
    let row = [];
    let prev_table = [];
    let note_col_selecion = "Bitte wählen Sie die entsprechenden Spalten Ihres Lastprofils <b>(Datum + Uhrzeit, Wert)</b> sowie die <b>erste Zeile mit Datenpunkten</b> aus."; 

// Hooks
    const [isError, setIsError] = useState();      // Boolean DisplayErrorMessage
    const [errorMessage, setErrorMessage] = useState();
    const [table, setTable] = useState();
    const [colPrevOpened, setColPrevOpened] = useState(true);
    const [checked, setChecked] = useState();      // Selected FirstRow with DataPoints
    const [unit, setUnit] = useState();
    const [mwhYear, setMWhYear] = useState();

// Event Listeners
    const handleCheck = (e) => {
        if (e.target.value !== checked) {
            setChecked(parseInt(e.target.value));
        } else {
            setChecked();
        }
    }

    const sendData = (data) => {
        setTable(prevState => ({
            ...prevState,
            [data.num]: data.val
        }));
    }
        // headers.push('Markierung 1. Daten-Zeile')

// Mapping input data to 2d-array 
    Object.entries(props.data).map(([key, value]) => {

        // Body
        for (var i = 0; i < 6; i++) {                               // TODO catch error less then 6 entries in csv 
            row.push(
                <Checkbox 
                    onChange={handleCheck} 
                    value={i}
                    checked={(i === checked) ? true : false} 
                    sx={{p: 0}}
                />
            )
            for (var j = 0; j < value[i].length; j++) {
                row.push(value[i][j]);
            }
            prev_table.push(row);
            row = [];
        }
        // Add Select Menu to Table 
        var select = [''];  
        for (var i = 1; i < prev_table[0].length; i++) {
            select.push(
                <SelectColLoadProfile col={i} sendData={sendData}/>
            )
        }
        prev_table.push(select);
    })


// Submit Column Selection 
    const selected_cols = () => {
        var col_elements = [];
        if (checked) {
            col_elements.push("first_row")
        } else {
            for (let i = 0; i < col_elements.length; i++) {                 // TODO testing 
                if (col_elements[i] === "first_row") {
                    col_elements.splice(i, i);
                }
            }
        }
        var missing_values = "";
        var required_elements = ["date_time", "value", "first_row"];         // TODO complete list 
        var name_req_elements = ["Datum + Zeit", "Wert", "1. Reihe"];
        var complete = [];
        // check if required columns selected -> date, time 
        for (const key in table) {
            if (table[key] !== "") {
                col_elements.push(table[key]);                  // check for selected column elements
            }
        }
        for (let i = 0; i < required_elements.length; i++) {                                        // TODO check for doubles 
            if(col_elements.indexOf(required_elements[i]) == -1){      
                missing_values = missing_values + "<b>" + name_req_elements[i] + " </b>";           // TODO trennzeichen einfügen 
                complete.push(false); 
            }
            else {
                complete.push(true);    
            }
        }
        if (complete.indexOf(false) !== -1) {
            setErrorMessage("Fehler! Es müssen mindestens folgende Felder angegeben werden: " + missing_values) 
            setIsError(true);
        }
        else {
            setIsError(false);
            submit_selected_cols();
        }
        
        // TODO Sumbmit Column Selection 
    }
    // Submit data to parent (SelectOwnLastprofil)
    const submit_selected_cols = () => {
        props.returnData(table, checked, unit, mwhYear)
        setColPrevOpened(false);
    }

    // Abort Col Selection 
    const abort_cols_selection = () => {
        props.returnAbort(true);
    }

// Set colprevopened true on re-render 
    useEffect(() => {
        // setColPrevOpened(true);
    })
// Get Values From Radio Button 
const callbackFunctionUnit = (val) => {
    if (val == 'chart1') {
        setUnit('kW')
    } else {
        setUnit('kWh')
    }
} 
// Get MWh per Year 
const getCallbackMwhYear = (val) => {
    setMWhYear(val);
}
// Render Method 
    if (colPrevOpened) {
        return(
            <Box sx={{mt: '15px', display:'grid', width: 1}}>
                <TableContainer component={Paper}>
                {!isError && <DisplayErrorMessage type="info" message={parse(note_col_selecion)} /> }
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                    {prev_table.map((row) => (
                        <TableRow>                                           {/* sx={{ '&:first-child td, &:first-child th': { width: '0px' } }}*/}
                                {row.map((element) => (
                                <TableCell>{element}</TableCell>
                                ))}
                        </TableRow>
                        ))}
                    </TableBody>
                </Table> 
                <Box sx={{ display: 'flex', justifyContent: 'center', my: '5px', display: ''}}>
                    <Box>
                        <RadioBtn labels={['kW', 'kWh']} callbackFunction={callbackFunctionUnit} /> 
                    </Box>
                    {unit == 'kW' ? <Box sx={{justifyContent: 'center', display: 'flex'}}> <TextField callbackFunction={getCallbackMwhYear}/> </Box> : null }
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button sx={{mx: '10px'}} variant="outlined" color="error" onClick={abort_cols_selection}>Abbrechen</Button>
                        <Button sx={{mx: '10px'}} variant="outlined" color="success" onClick={selected_cols}>Bestätigen</Button> 
                    </Box>
    
                </Box>
                { isError && <DisplayErrorMessage type="error" message={parse(errorMessage)} /> }              
                </TableContainer> 
            </Box>
        )
    }
        else {
            return null
        }
    
}
export default DisplayLastProfil;


/*
                    <TableHead>
                        <TableRow>
                                <TableCell sx={{width: '40px'}}></TableCell>
                            {headers.map((header) => (
                                <TableCell component="th" scope="row">{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead> 
*/