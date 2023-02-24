import { Box } from '@mui/system';
import React from 'react'

import PieChart from '../../Charts/PieChart';
import DisplayBox from '../../DetailBox/DetailBox';

function OwnConsumption(props) {
// Data 
// Data Autarkiegrad Chart 
// TODO change colors to something more context specific 

    const eigenverbrauch = [
        {
            "id": "Netzeinspeisung",
            "label": "Netzeinspeisung",
            "value": props.data.netzeinspeisung
        }, 
        {
            "id": "Direktverbrauch", 
            "label": "Direktverbrauch",
            "value": props.data.direktverbrauch
        },
        {
            "id": "Batterieladung", 
            "label": "Batterieladung",
            "value": props.data.batterieladung
        }
    ]
    // ## Infotext Tooltip
    const infotext = "Der Eigenverbrauchsanteil beschreibt den Anteil des erzeugten Solarstroms, der entweder zur Ladung des Energiespeichersystems oder durch die Stromverbraucher genutzt wird. Je höher der Eigenverbrauchsanteil ist, desto weniger Solarstrom wird in das Netz eingespeist."
return (
    <Box>
        <DisplayBox color={props.color} title='Eigenverbrauchsanteil' unit={props.data.unit} value={props.data.eigenverbrauchsanteil} infotext={infotext} chart={<PieChart data={eigenverbrauch} />} /> 
    </Box>
)
}

export default OwnConsumption;