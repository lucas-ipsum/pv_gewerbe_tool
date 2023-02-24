import React from 'react'
import LineChart from '../../Charts/LineChart'

function ProductionVSConsumptionDay(props) {
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
const months_short = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
    
    
// #### Chart Data #######
// ### Data PV Produktion in kWh monatlich (Ohne PV-System) #### 
let data_pv_prod = []
for (let i = 0; i < props.data.pv_prod_monatlich.length; i++) {
    data_pv_prod.push(
        {
            "x" : months_short[i],
            "y" : props.data.pv_prod_monatlich[i], 
        }
    )
}

let data_consumption = []
for (let i = 0; i < props.data.verbrauch_monatlich.length; i++) {
    data_consumption.push(
        {
            "x" : months_short[i],
            "y" : props.data.verbrauch_monatlich[i], 
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

// TODO change colors to something more context specific 

    // ## Infotext Tooltip
    // TODO tooltip text anpassen 
    const infotext = "Der Autarkiegrad gibt den Anteil des Stromverbrauchs an, der durch das Photovoltaik-Speichersystem versorgt wird. Hierzu trägt entweder der zeitgleiche Direktverbrauch des erzeugten Solarstroms oder die Entladung des Batteriespeichers bei. Je höher der Autarkiegrad ist, desto weniger Energie wird aus dem Stromnetz bezogen."
return (<LineChart data={data} legendY={legendY}/>)
} 
export default ProductionVSConsumptionDay;