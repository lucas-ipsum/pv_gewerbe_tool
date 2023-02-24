import React from 'react'

function PrevHelperKosten(props) {

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
        displayVal = displayVal;
    } else {
        displayVal = data.costs_energy.avg - costsAvg;
        displayVal = displayVal;
    }

// Chart Settings and Data 
// Data 
const costsPrevData = [{
    "title": "Kosten",
    "PV + Bat": props.dataPvBat.costs_pvBat.abs,
    "PV": props.dataPv.costs_pv.abs,
    "Ohne": props.dataPv.costs_energy.abs
}]
// Settings
let keys=['Ohne', "PV", 'PV + Bat']
const indexBy = "title";
let legendCosts = [
    {"color": "#e8c1a0", "title": "Ohne PV"},     
    {"color": "#f47560", "title": "PV"}, 
    {"color": "#f1e15b", "title": "PV + Bat"}
]

if(!props.pvBat) {
    keys = ['Ohne', 'PV']
    legendCosts.pop()
    delete costsPrevData[0]["PV + Bat"]
}

let res = {
    'value': displayVal,
    'legend': legendCosts,
    'indexBy': indexBy,
    'keys': keys, 
    'data': costsPrevData
}
    return res
}

export default PrevHelperKosten;