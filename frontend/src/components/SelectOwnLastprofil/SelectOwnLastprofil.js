import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Button, Alert, Badge} from '@mui/material';
import { Box } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';

import { useCSVReader } from 'react-papaparse';

import './SelectOwnLastprofil'
import DisplayLastProfil from '../DisplayLastProfil/DisplayLastProfil';


function SelectOwnLastprofil(props) {
    const [unit, setUnit] = useState();
    const [mwhYear, setMWhYear] = useState();
    const [invisible, setInvisible] = useState(true)
// Alert 
    const [showAlert, setShowAlert] = useState(false)
// Init CSV Reader 
    const { CSVReader } = useCSVReader();

// Hook for csv data upload 
    const [csv_data, setCsvData] = useState({
        data: null
    }); 
    const [uploadError, setUploadError] = useState();
// CSV Preview Popup
    const [open_csv, setCsvOpen] = useState(false);

// Hook 
    const [valueList, setValueList] = useState();

    const open_csv_prev = () => {
        if(csv_data.data !== null) {
            setShowAlert(false);
            setCsvOpen(true);
            handleClose();
        }
        else {
            setShowAlert(true); 
        }
    }

    const [selected, setSelected] = useState({
        clicked: "false",
    })
    
    const lastprofil_selected = (e)=> {
        setSelected(!selected)
    }
// Event Control Popup Window
    const [open, setOpen] = useState(false);
      
    const handleClickOpen = () => {
      setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
        setShowAlert(false);
    };

// user submited column selection 
    const returnData = (data, checked, unit, mwhYear) => {
        setUnit(unit)
        setMWhYear(mwhYear)
        var last_row = csv_data.data.length -1;
        var last_timestamp; 
        var first_row = checked;                                
        var val_col;

        for (const key in data) {
            // Check for runtime and timestamp 
            if (data[key] === "date_time") {
                // get last element -> necessary??? 
                last_timestamp = csv_data.data[last_row][key];
                while (last_timestamp === "") {
                    last_row--;
                    last_timestamp = csv_data.data[last_row][key];
                }
            }
            // Check for value column 
            else if (data[key] === "value") {           
                val_col = key - 1;                                                           // sets column position with values in csv_data.data (minus 1 cause the first column is for the select btn which isn't contained in the uploaded data set)
            }
            var tmp = []; 
            // create temporary array with values 
            for (let i = first_row; i <= last_row; i++) {       
                // Case Table Valuas are not numeric
                if (isNaN(csv_data.data[i][val_col])) {
                    if (csv_data.data[i][val_col]) {
                        var num = csv_data.data[i][val_col].replace(/,/, '.');              // parse float doesnt work with ,
                        tmp.push(parseFloat(num));
                   }
                } else {
                    tmp.push(parseFloat(csv_data.data[i][val_col]));
                } 
            }
            setValueList(tmp);                                                              // set Hook with value list 
            props.selected('Eigenes Lastprofil')
            // btn_checked('Eigenes Lastprofil')
        }
    }
// User Abort Col Selection 
const returnAbort = () => {
    setCsvOpen(false);
}
// Function passing data to parent (Lastprofil)
    useEffect(() => {
        props.get_own_Loadprofile(valueList, unit, mwhYear);
    }, [valueList])


// TEST 
// Set Style current selected item 
const btn_checked = (id) => {
    let selected = props.selected(id)
    for (const key in selected) {
        if (selected[key] === true) {
            document.getElementById(key).className = 'btn btn_selected';
        }
        else {
            document.getElementById(key).className = 'btn';
        }
    }
}

// 
useEffect(() => {
    setInvisible(!props.btn_status);
    if (props.btn_status) {
        document.getElementById(props.gewerbe_typ).className = 'btn btn_selected';
    }
    else {
        document.getElementById(props.gewerbe_typ).className = 'btn';
    }

}, [props.btn_status])


// Render Function 
        return (
            <Box sx={{display: 'grid', width: 1}}>
            <button 
                onClick={handleClickOpen} 
                id={props.gewerbe_typ} 
                className='btn' >   
                    <Badge 
                    invisible={invisible}
                    badgeContent={<CheckIcon />}
                    color='primary'
                    sx={{width: '100%'}}
                    >   
                        <Box sx={{width: '100%'}}>
                            <table className='btn-content'>
                                    <tr>
                                        <td className='center'>
                                            <form className='last_form'>
                                                <input value={props.btnSelected} id={props.gewerbe_typ} aria-label={props.gewerbe_typ} className='checkbox_Lastprofil' type="checkbox" />
                                                <h4>{props.gewerbe_typ}</h4>
                                                {props.icon}
                                            </form>
                                        </td>
                                    </tr>
                            </table>  
                        </Box>  
                    </Badge>
            </button>  
                {open_csv && <DisplayLastProfil returnAbort={returnAbort} returnData={returnData} data={csv_data}/> }     
                    <div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Eigenes Lastprofil hochladen"}
                            </DialogTitle>
                            <DialogContent>
                                <CSVReader
                                    accept='text/csv, .csv'                             // TODO note that only csv upload is supported 
                                    onUploadAccepted={(results) => {
                                        setCsvData({data: results.data});               // set new State with uploaded CSV Data as object 
                                        setUploadError(results.errors)
                                    }}
                                    >
                                    {({
                                        getRootProps,
                                        acceptedFile,
                                        ProgressBar,
                                        getRemoveFileProps,
                                    }) => (
                                        <>
                                        {/* TODO styling Popup Upload */}
                                        <div>
                                            <button type='button' {...getRootProps()}>
                                                Durchsuchen...
                                            </button>
                                            <div>
                                                {acceptedFile && acceptedFile.name}
                                            </div>
                                            <button {...getRemoveFileProps()}>
                                                Entfernen
                                            </button>
                                        </div>
                                        <ProgressBar />
                                        </>
                                    )}
                                </CSVReader>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="error" variant="outlined">
                                    Abbrechen
                                </Button>
                                <Button onClick={open_csv_prev} color="success" variant="outlined">
                                    Bestätigen
                                </Button>
                            </DialogActions>
                            {showAlert && <Alert severity="error">[Fehlende Eingabe] Lastprofil auswählen!</Alert>}
                        </Dialog>    
                    </div>
                    
                </Box>
        ) 
    }                                   

export default SelectOwnLastprofil;