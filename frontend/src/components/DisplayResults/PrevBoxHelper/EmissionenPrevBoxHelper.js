import React from 'react'

function EmissionenPrevBoxHelper(props) {

let data; 
let co2Year;
// Check for selected System (PV / PvBat)
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
        displayVal = displayVal;
    } else {
        displayVal = data.emissions_powermix.year - co2Year;
        displayVal = displayVal;
    }

// Data Prev Box 
    let emissions_prev_data = [{
        "title": "Emissionen",
        "Ohne": props.dataPv.emissions_powermix.abs,
        "PV": props.dataPv.emissions_pv.abs,
        "PV + Bat": props.dataPvBat.emissions_pvBat.abs,
    }]
    let keys=["Ohne", "PV",'PV + Bat']
    const indexBy = "title";
    let legend_emissions = [
        {"color": "#e8c1a0", "title": "Ohne PV"},
        {"color": "#f47560", "title": "PV"},
        {"color": "#f1e15b", "title": "PV + Bat"}
    ]
    if (!props.pvBat) {
        delete emissions_prev_data[0]["PV + Bat"]
        legend_emissions.pop();
        keys = ['Ohne', 'PV']
    }
    let res = {
        'value': displayVal,
        'legend': legend_emissions,
        'indexBy': indexBy,
        'keys': keys, 
        'data': emissions_prev_data
    }
    return res;
}

export default EmissionenPrevBoxHelper;