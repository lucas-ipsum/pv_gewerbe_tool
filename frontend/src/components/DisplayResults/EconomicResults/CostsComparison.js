import React from 'react'
import { Box } from '@mui/system';

import DisplayBox from '../DetailBox/DetailBox';
import LineChart from '../Charts/LineChart';

function CostsComparison(props) {

let laufzeit = props.data.laufzeit                                       // TODO Laufzeit aus User Input beziehen 
let years = []

let data; 
let costsAvg;
// Check for selected System (PV / PvBat)
    if (props.pvBat) {
        data = props.dataPvBat;
        costsAvg = props.dataPvBat.costs_pvBat.avg;
    } else {
        data = props.dataPv;
        costsAvg = props.dataPv.costs_pv.avg;
    }

// Display Value 
let displayVal; 
if (data.costs_energy.avg > costsAvg) {
    displayVal = costsAvg - data.costs_energy.avg;
} else {
    displayVal = data.costs_energy.avg - costsAvg;
}

// List Years for Axis
let s = 0;
for (let i = 22; i <= (22 + (laufzeit)); i++) {
    years.push(i + "'")
}
// Display value 
let saved_costs;
if (props.data.costs_pv.avg > props.data.costs_energy.avg) {
    saved_costs = props.data.costs_pv.avg - props.data.costs_energy.avg;
} else {
    saved_costs = props.data.costs_pv.avg - props.data.costs_energy.avg 
}

// #### Chart Data #######
// ### Data Stromkosten Pv / Bat - System ###
let energy_cost_pvBat = []
for (let i = 0; i < props.dataPvBat.costs_pvBat.list.length; i = i + 2) {
    energy_cost_pvBat.push(
        {
            "x" : years[i],
            "y" : props.dataPvBat.costs_pvBat.list[i], 
        }
    )
}

// ### Data Stromkosten ohne PV - Bat System #### 
let energy_cost = []
for (let i = 0; i < props.dataPv.costs_energy.list.length; i = i + 2) {
    energy_cost.push(
        {
            "x" : years[i],
            "y" : props.dataPv.costs_energy.list[i], 
        }
    )
}

// ### Data Stromkosten mit PV-Anlage ### 
let energy_cost_pv = []

for (let i = 0; i < props.dataPv.costs_pv.list.length; i = i + 2) {
    energy_cost_pv.push(
        {
            "x" : years[i],
            "y" : props.dataPv.costs_pv.list[i], 
        }
    )
}

const chartData = [
    {
        "id": "Ohne PV",
        data: energy_cost
    },
    {
        "id": "PV",
        data: energy_cost_pv
    }, 
    {
        "id": "PV + Bat",
        data: energy_cost_pvBat
    }
]        
  
// Check if PVBat 
if (!props.pvBat) {
    chartData.pop()
}
    // ## Infotext Tooltip
    const infotext = "Der Autarkiegrad gibt den Anteil des Stromverbrauchs an, der durch das Photovoltaik-Speichersystem versorgt wird. Hierzu trägt entweder der zeitgleiche Direktverbrauch des erzeugten Solarstroms oder die Entladung des Batteriespeichers bei. Je höher der Autarkiegrad ist, desto weniger Energie wird aus dem Stromnetz bezogen."
return (
    <Box>
        <DisplayBox positiveTrend='down' avg={true} compare={true} color={props.color} unit={props.data.unit} title='Stromkosten' value={costsAvg} comparedValue={displayVal} infotext={infotext} chart={<LineChart data={chartData} legendX="Jahr" legendY="€"/>} /> 
    </Box>
)
}

export default CostsComparison;