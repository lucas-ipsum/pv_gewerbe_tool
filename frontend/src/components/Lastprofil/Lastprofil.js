import React, {useEffect, useState} from 'react';
//import ThreeDRotation from '@mui/icons-material/ThreeDRotation'; TODO remove
import ProfilBtn from '../ProfilBtn/ProfilBtn';
import UploadLastProfil from '../UploadLastProfil/UploadLastProfil';
// Material
import Grid from '@mui/material/Grid';
// Icons 
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import BoltIcon from '@mui/icons-material/Bolt';

import './Lastprofil.css'
import SelectOwnLastprofil from '../SelectOwnLastprofil/SelectOwnLastprofil';
import LastprofilConsumption from './LastprofilConsumption';
import InputBox from '../UiHelper/InputBox/InputBox';

function Lastprofil(props) {
    const [consumeInput, setConsumeInput] = useState(false);
    const [latestSelected, setLatestSelected] = useState('');
    const [btnStatus, setBtnStatus] = useState(
        {                                                       // TODO UI Selected on Eigenes Lastprofil
            'Supermarkt': false, 
            'Landwirtschaft': false,
            'Metall': false,
            'Schule': false,
            'Sonstige Gewerbe': false,
            'Büro': false, 
            'Eigenes Lastprofil': false
        }
    );

// Function for returning selected Item from Child (ProfilBtn)
// Display Selected Element and safe in btnStatus
    const selected = (btn) => {
        var tmp_selected = btnStatus;
        for (const key in tmp_selected) {
            if(latestSelected === '' && key === btn) {
                tmp_selected[key] = true;
            }
            else if (key === btn && latestSelected !== btn){
                tmp_selected[latestSelected] = false; 
                tmp_selected[key] = true; 
            }
            else if (key === btn && latestSelected === btn){
                tmp_selected[key] = !tmp_selected[key];
            }
            else {
                tmp_selected[key] = false; 
            }
        } 
        // Check if yearly energy consumption user input is needed 
        if (btn !== 'Eigenes Lastprofil') {
            setConsumeInput(true); 
        }
        else {
            setConsumeInput(false);
        }
        setLatestSelected(btn);             // Set Value to last selected Button 
        setBtnStatus(tmp_selected);         // Set Value Pairs of Buttons and Status 
        return_Selected(btn); 
        return btnStatus;
    }

// Get Own Loadprofile 
    const get_own_Loadprofile = (own_loadprofile, unit, mwhYear) => {
        return_ownLoadprofile(own_loadprofile, unit, mwhYear);
    }

// Get Consumption per year 
const data_year_Consumption = (consumption) => {
    props.get_Consumption(consumption);
}

// Return Data 
    const return_Selected = (loadprofile) => {
        props.get_Loadprofile(loadprofile); 
    }

    const return_ownLoadprofile = (own_loadprofile, unit, mwhYear) => {
        props.get_OwnLoadprofile(own_loadprofile, unit, mwhYear);
    }

// Render Function 
        return (
            <div>
                <h3>Lastprofil auswählen</h3>
                <hr/>
                <Grid className='lastprofil_input' container rowSpacing={4}>
                    <Grid item xs={12} sm={12}>
                        <SelectOwnLastprofil gewerbe_typ="Eigenes Lastprofil" btn_status={btnStatus["Eigenes Lastprofil"]} selected={selected} get_own_Loadprofile={get_own_Loadprofile} icon={<DriveFolderUploadOutlinedIcon fontSize="large" />} />                    
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <ProfilBtn gewerbe_typ="Supermarkt" btn_status={btnStatus["Supermarkt"]} selected={selected} icon={<LocalGroceryStoreOutlinedIcon fontSize="large" />} />                    
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <ProfilBtn gewerbe_typ="Büro" btn_status={btnStatus["Büro"]} selected={selected} icon={<ComputerOutlinedIcon fontSize="large" />} />                    
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <ProfilBtn gewerbe_typ="Landwirtschaft" btn_status={btnStatus["Landwirtschaft"]} selected={selected} icon={<AgricultureOutlinedIcon fontSize="large" />} />                    
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <ProfilBtn gewerbe_typ="Metall" btn_status={btnStatus["Metall"]} selected={selected} icon={<ConstructionOutlinedIcon fontSize="large" />} />                    
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <ProfilBtn gewerbe_typ="Schule" btn_status={btnStatus["Schule"]} selected={selected} icon={<SchoolOutlinedIcon fontSize="large" />} />                    
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <ProfilBtn gewerbe_typ="Sonstige Gewerbe" btn_status={btnStatus["Sonstige Gewerbe"]} selected={selected} icon={<StoreOutlinedIcon fontSize="large" />} />                    
                    </Grid>
                    {
                    consumeInput && 
                    <Grid item xs={12} sm={12}>
                        <InputBox return_Data={data_year_Consumption} title={"Verbrauch pro Jahr in MWh"} max={2000} step={5} default={50} min={1} icon={<BoltIcon sx={{fontSize: '80px'}} />}/>
                    </Grid>
                    }

                </Grid>
                
            </div>

        )
    }

export default Lastprofil; 