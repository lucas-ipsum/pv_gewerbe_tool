import React from 'react'
import { Box } from '@mui/system';

import DisplayBox from '../../DetailBox/DetailBox';
import LineChart from '../../Charts/LineChart';
import ProductionVSConsumptionDay from './ProductionVSConsumptionDay';

function ProductionVSConsumption(props) {

var hours = []; 
for (let i = 0; i <= 24; i = i + 3 ) {
    hours.push(i)
}

// #### Chart Data #######
// ### Data PV Produktion in kWh monatlich (Ohne PV-System) #### 
let data_pv_prod = []
for (let i = 0; i < props.dataPv.pvProd3hrs.length; i++) {
    data_pv_prod.push(
        {
            "x" : hours[i],
            "y" : props.dataPv.pvProd3hrs[i], 
        }
    )
}

let data_consumption = []
for (let i = 0; i < props.dataPv.verbrauch3hr.length; i++) {
    data_consumption.push(
        {
            "x" : hours[i],
            "y" : props.dataPv.verbrauch3hr[i], 
        }
    )
}

const data = [
    {
        "id": "PV Produktion",
        data: data_pv_prod
    }, 
    {
        "id": "Verbrauch",
        data: data_consumption
    }
]

// ##### Chart Settings #####
const legendY = "kWh"

// ## Chart 2 -> Tagesverlauf 
let chart2 = ProductionVSConsumptionDay(props)
    // ## Infotext Tooltip
    // TODO tooltip text anpassen 
const infotext = "Der Autarkiegrad gibt den Anteil des Stromverbrauchs an, der durch das Photovoltaik-Speichersystem versorgt wird. Hierzu trägt entweder der zeitgleiche Direktverbrauch des erzeugten Solarstroms oder die Entladung des Batteriespeichers bei. Je höher der Autarkiegrad ist, desto weniger Energie wird aus dem Stromnetz bezogen."
return (
    <Box>
        <DisplayBox color={props.color} twoCharts={['Tagesverlauf','Jah­res­ver­lauf']} chartTypeSelect={true} title='Verbrauch vs. Erzeugung' value={null} infotext={infotext} chart={<LineChart data={data} legendY={legendY}/>} chart2={chart2}/>
    </Box>
)
}

export default ProductionVSConsumption;
