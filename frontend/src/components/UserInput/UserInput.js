import React, {useEffect, useState} from 'react';
import axios from 'axios'; 

// Components
import Lastprofil from '../Lastprofil/Lastprofil';
import RoofSettings from '../RoofSettings/RoofSettings';
import DisplayLastProfil from '../DisplayLastProfil/DisplayLastProfil';

// MUI 
import { Box } from '@mui/system';

import './UserInput.css';
import EconomicUserInput from '../EconomicUserInput/EconomicUserInput';

function UserInput(props) {

// const [returnData, setReturnData] = useState()
// const [selectedLoadprofile, setSelectedLoadprofile] = useState();
const [userData, setUserData] = useState({
    type_loadprofile: null,
    loadprofile: null,
    consumption: null, 
    roof_data: null,
    economic_data: null, 
    unit: null, 
    mwhYear: null
});

// ###### Getting User Input Data ######
// Lastprofil 
const get_Loadprofile = (loadprofile) => {
    if (loadprofile) {
        setUserData(prev => ({...prev, type_loadprofile: loadprofile}))
        setUserData(prev => ({...prev, loadprofile: null}))
    }
}
const get_OwnLoadprofile = (loadprofile, unit, mwhYear) => {
    if (loadprofile) {
        if (unit == 'kW') {
            setUserData(prev => ({...prev, unit: unit}))
            setUserData(prev => ({...prev, mwhYear: mwhYear}))
        } else if(unit == 'kWh') {
            setUserData(prev => ({...prev, unit: unit}))
        }
        setUserData(prev => ({...prev, type_loadprofile: 'Eigenes Lastprofil'}))
        setUserData(prev => ({...prev, loadprofile: loadprofile}))
    }
}
const get_Consumption = (consumption) => {
    if (consumption) {
        setUserData(prev => ({...prev, consumption: consumption}))
    }
}

// RoofData 
const get_roofData = (roof_data) => {
    if(roof_data) {
        setUserData(prev => ({...prev, roof_data: roof_data}))
    }
}

// Economic Data ()
const get_EconomicData = (economic_data)  => {
    if (economic_data) {
        setUserData(prev => ({...prev, economic_data: economic_data}))
    }
}
// #### Return Function #####
useEffect(() => {
    props.getUserData(userData)
}, [userData])



// Render Function 
    return (
        <Box>
            <Lastprofil get_Loadprofile={get_Loadprofile} get_OwnLoadprofile={get_OwnLoadprofile} get_Consumption={get_Consumption}/>
            <RoofSettings get_roofData={get_roofData} />
            <EconomicUserInput get_EconomicData={get_EconomicData} /> 
        </Box>
    )

}

export default UserInput;