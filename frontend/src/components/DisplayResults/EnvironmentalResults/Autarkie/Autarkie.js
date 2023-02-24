import React from 'react'
import { Box } from '@mui/system';

import PieChart from '../../Charts/PieChart';
import DisplayBox from '../../DetailBox/DetailBox';

function Autarkie(props) {

// Data 
// Data Autarkiegrad Chart 
// TODO change colors to something more context specific 

    const autarkie = [
        {
            "id": "Direktverbrauch",
            "label": "Direktverbrauch",
            "value": props.data.direktversorgung
        }, 
        {
            "id": "Netzbezug", 
            "label": "Netzbezug",
            "value": props.data.netzbezug
        },
        {
            "id": "Batterieentladung", 
            "label": "Batterieentladung",
            "value": props.data.batterieentladung
        }
    ]
    // ## Infotext Tooltip
    const infotext = "Der Autarkiegrad gibt den Anteil des Stromverbrauchs an, der durch das Photovoltaik-Speichersystem versorgt wird. Hierzu trägt entweder der zeitgleiche Direktverbrauch des erzeugten Solarstroms oder die Entladung des Batteriespeichers bei. Je höher der Autarkiegrad ist, desto weniger Energie wird aus dem Stromnetz bezogen."
return (
    <Box>
        <DisplayBox color={props.color} unit={props.data.unit} title='Autarkiegrad' value={props.data.autarkiegrad} infotext={infotext} chart={<PieChart data={autarkie} />} /> 
    </Box>
)
}

export default Autarkie