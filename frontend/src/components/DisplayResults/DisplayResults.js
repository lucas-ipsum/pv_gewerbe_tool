import React, { useState } from 'react'

import axios from 'axios'; 

// MUI 
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Divider, FormControlLabel, FormGroup, FormLabel, Grid } from '@mui/material';
import Switch from '@mui/material/Switch';

// Components
import Emissions from './EnvironmentalResults/Emissions/Emissions';
import Autarkie from './EnvironmentalResults/Autarkie/Autarkie';
import ConsumptionPerYear from './EnvironmentalResults/ConsumptionPerYear/ConsumptionPerYear';
import OwnConsumption from './EnvironmentalResults/OwnConsumption/OwnConsumption';
import PowerConsumption from './EnvironmentalResults/PowerConsumption/PowerConsumption';
import ProductionVSConsumption from './EnvironmentalResults/ProductionVSConsumption/ProductionVSConsumption';
import CostsComparison from './EconomicResults/CostsComparison';

import LineChart from './Charts/LineChart';
import PieChart from './Charts/PieChart';
import RadialChart from './Charts/RadialChart';
import StreamChart from './Charts/StreamChart';
import PreviewBox from './PreviewBox/PreviewBox';
import PrevPieChart from './Charts/PrevPieChart';
import BarChart from './Charts/BarChart';

import DataToChartFormat from './Charts/DataToChartFormat/DataToChartFormat'
import PrevHelperKosten from './PrevBoxHelper/PrevHelperKosten';

import './DisplayResults.css'
import EmissionenPrevBoxHelper from './PrevBoxHelper/EmissionenPrevBoxHelper';

function DisplayResults(props) {

let resData;
const [pvBatChecked, setPvBatChecked] = useState(true);
const [latestSelected, setLatestSelected] = useState('');
// State Selected Detail Page
const [selectedDetailBox, setSelectedDetailBox] = useState(
    {
        "autarkiegrad": true,
        "eigenverbrauch": false,
        "emissionen": false,
        "verbrauch_vs_produktion": false,
        "costsComparison": false
    }
);

// Event Listener 
// Change Selected InputBox and Detail Box
const handleSelected = (selectedID) => {
    var tmp_selected = selectedDetailBox;
        for (const key in tmp_selected) {
            if(latestSelected === '' && key === selectedID) {
                tmp_selected[key] = true;
            }
            else if (key === selectedID && latestSelected !== selectedID){
                tmp_selected[latestSelected] = false; 
                tmp_selected[key] = true; 
            }
            else if (key === selectedID && latestSelected === selectedID){
                tmp_selected[key] = !tmp_selected[key];
            }
            else {
                tmp_selected[key] = false; 
            }
        } 
        setLatestSelected(selectedID);              // Set Value to last selected Button 
        setSelectedDetailBox(tmp_selected);                 // Set Value Pairs of Buttons and Status 
}
// Change Switch (PV / PvBat System)
const handleSwitch = (e) => {
    setPvBatChecked(e.target.checked)
}
// Render Function 
if (!props.resultsData) {

    return (
        <Box sx={{justifyContent: 'center'}}>
            <CircularProgress sx={{color: 'var(--primary-header-color)'}}/> 
        </Box>
    )
} 
else {
    if (pvBatChecked) {
        resData = props.resultsData.data.data
    } else {
        resData = props.resultsData.data_pv_only.data
    }
    let data = props.resultsData;

    // Data Prev Box 
    // TODO Daten an anderer Stelle platzieren

    const legend_prod_vs_consum = [
        {"color": "#e8c1a0", "title": "Erzeugung"},
        {"color": "#f47560", "title": "Vebrauch"},
    ]
    // Preview Data PV Produktion vs Verbrauch 
    let prev_verbrauch_vs_produktion = DataToChartFormat({
        "chart_type": "LineChart", 
        "data": [resData.verbrauch_vs_prod.pv_prod_monatlich, resData.verbrauch_vs_prod.verbrauch_monatlich],
        "ids": ["PV Erzeugung", "Verbrauch"],
        "yAxesType": "month"
    })
    // PrevBox Kosten 
    let kostenPrevData = PrevHelperKosten({"dataPvBat": data.data.data.economic_evaluation, "dataPv": data.data_pv_only.data.economic_evaluation, "pvBat": pvBatChecked});
    // PrevBox Emissionen 
    let emissionenPrevData = EmissionenPrevBoxHelper({"dataPvBat": data.data.data.emissionen, "dataPv": data.data_pv_only.data.emissionen, "pvBat": pvBatChecked })

    return (
        <Box>
            <Box sx={{textAlign: 'center'}}>
                <h2>Ergebnisse</h2>
            </Box>
            <hr/>
            <Box sx={{display: 'grid',justifyContent:'center'}}>
                <FormGroup>
                    <FormControlLabel
                        sx={{mb: 0}}
                        label="Speichersystem hinzufügen?"
                        labelPlacement='top'
                        control={                    
                            <Switch 
                                color='primary'
                                sx={{fontSize: '30px'}}
                                checked={pvBatChecked}
                                onChange={handleSwitch}
                                inputProps={{ 'aria-label': 'controlled' }}
                                size='30px'                    
                            />
                        }
                    >
                    </FormControlLabel>
                </FormGroup>
            </Box>
            <Grid container spacing={2}>
                <Grid item md={12} lg={6}>
                    <PreviewBox color="#fdc086" title='Autarkiegrad' id='autarkiegrad' unit={resData.autarkie.unit} selectedStatus={selectedDetailBox["autarkiegrad"]} handleSelected={handleSelected} chart={<PrevPieChart value={resData.autarkie.autarkiegrad} color="#fdc086"/>} value={resData.autarkie.autarkiegrad}/>
                    <PreviewBox color="#beaed4" title='Eigenverbauch' id='eigenverbrauch' unit={resData.eigenverbrauch.unit} selectedStatus={selectedDetailBox["eigenverbrauch"]} handleSelected={handleSelected} chart={<PrevPieChart value={resData.eigenverbrauch.eigenverbrauchsanteil} color="#beaed4"/>} value={resData.eigenverbrauch.eigenverbrauchsanteil}/>
                    <PreviewBox color="#000000" title='CO&#x2082; Emissionen' legend={emissionenPrevData.legend} id="emissionen" unit={resData.emissionen.unit} selectedStatus={selectedDetailBox["emissionen"]} handleSelected={handleSelected} chart={ <BarChart preview={true} indexBy={emissionenPrevData.indexBy} keys={emissionenPrevData.keys} data={emissionenPrevData.data} />} value={emissionenPrevData.value}/>
                    <PreviewBox color="#eed317" title='Kosten' compared={true} positiveTrend='down' id="costsComparison" value={kostenPrevData.value} unit={resData.economic_evaluation.unit} selectedStatus={selectedDetailBox["costsComparison"]} handleSelected={handleSelected} legend={kostenPrevData.legend} chart={<BarChart preview={true} data={kostenPrevData.data} indexBy={kostenPrevData.indexBy} keys={kostenPrevData.keys} /> }/>
                    <PreviewBox title='Verbrauch vs. Erzeugung' id="verbrauch_vs_produktion" unit={null} selectedStatus={selectedDetailBox["verbrauch_vs_produktion"]} handleSelected={handleSelected} value={null} legend={legend_prod_vs_consum} chart={<LineChart preview={true} data={prev_verbrauch_vs_produktion}/> }/>
                </Grid> 
                <Grid item xs={12} md={12} lg={6}>
                    {selectedDetailBox["autarkiegrad"] && <Autarkie color="#fdc086" data={resData.autarkie}/>}
                    {selectedDetailBox["eigenverbrauch"] && <OwnConsumption color="#beaed4" data={resData.eigenverbrauch}/>}
                    {selectedDetailBox["emissionen"] && <Emissions pvBat={pvBatChecked} color="#000000" dataPv={data.data_pv_only.data.emissionen} dataPvBat={data.data.data.emissionen} data={resData.emissionen}/>}
                    {selectedDetailBox["costsComparison"] && <CostsComparison pvBat={pvBatChecked} dataPv={data.data_pv_only.data.economic_evaluation} dataPvBat={data.data.data.economic_evaluation} color="#eed317" data={resData.economic_evaluation}/>}
                    {selectedDetailBox["verbrauch_vs_produktion"] && <ProductionVSConsumption color="#beaed4" dataPv={data.data_pv_only.data.verbrauch_vs_prod} data={resData.verbrauch_vs_prod}/>}
                </Grid>
            </Grid> 
        </Box>
    )
}

}

export default DisplayResults;
//                     <PreviewBox color="#000000" title='CO&#x2082; Emissionen' legend={legend_emissions} id="emissionen" unit={resData.emissionen.unit} selectedStatus={selectedDetailBox["emissionen"]} handleSelected={handleSelected} chart={ <BarChart preview={true} indexBy={indexBy} keys={keys} data={emissions_prev_data} />} value={resData.emissionen.co2äq_jahr}/>
