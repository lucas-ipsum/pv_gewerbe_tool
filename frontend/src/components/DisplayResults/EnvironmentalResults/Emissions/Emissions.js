import React from 'react'
import { Box } from '@mui/system';

import DisplayBox from '../../DetailBox/DetailBox';
import BarChart from '../../Charts/BarChart';

function Emissions(props) {
let data; 
let co2Year;
if (props.pvBat) {
    data = props.dataPvBat;
    co2Year = props.dataPvBat.emissions_pvBat.year
} else {
    data = props.dataPv;
    co2Year = props.dataPv.emissions_pv.year
}
// Display Value 
let displayVal; 
if (data.emissions_powermix.year > co2Year) {
    displayVal = co2Year - data.emissions_powermix.year;
    displayVal = displayVal.toFixed(2);
} else {
    displayVal = data.emissions_powermix.year - co2Year;
    displayVal = '+ ' + displayVal.toFixed(2);
}
// Data 
const emissionsData = [{
    "title": "Emissionen",
    "Ohne PV": props.dataPv.emissions_powermix.abs.toFixed(2),
    "PV": props.dataPv.emissions_pv.abs.toFixed(2),
    "PV + Bat": props.dataPvBat.emissions_pvBat.abs.toFixed(2),
}]
// Settings

let keys=['Ohne PV', 'PV', 'PV + Bat']
const indexBy = "title";

if (!props.pvBat) {
    delete emissionsData[0]["PV + Bat"]
    keys = ["Ohne PV", "PV"]
}

// ## Infotext Tooltip
// TODO tooltip text anpassen 
const infotext = "Der Autarkiegrad gibt den Anteil des Stromverbrauchs an, der durch das Photovoltaik-Speichersystem versorgt wird. Hierzu trägt entweder der zeitgleiche Direktverbrauch des erzeugten Solarstroms oder die Entladung des Batteriespeichers bei. Je höher der Autarkiegrad ist, desto weniger Energie wird aus dem Stromnetz bezogen."

// Render Function 
return (
    <Box>
        <DisplayBox color={props.color} title='CO&#x2082; Emissionen' unit={data.unit} value={displayVal} infotext={infotext} chart={<BarChart keys={keys} legendY='CO2äq in kg' layout='vertical' indexBy={indexBy} data={emissionsData}/>} />
    </Box>
)
}

export default Emissions;