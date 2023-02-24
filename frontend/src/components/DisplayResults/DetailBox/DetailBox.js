import React, { useEffect, useState } from 'react'

import { Box } from '@mui/system';
import {Paper, Grid, Typography, Tooltip} from '@mui/material';

// Icons 
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import RadioBtn from '../../UiHelper/RadioBtn/RadioBtn';

function DisplayBox(props) {
const [selectedChart, setSelectedChart] = useState();
let color;
let value;
let comparedValue;

// Check for props 
if(props.value) {
    value = props.value;
    if(typeof(value) != 'string') {
        value = value.toFixed(2);        
    }
}
if(props.comparedValue) {
    comparedValue = props.comparedValue;
    color = checkTrend(props.comparedValue, props.positiveTrend)
    comparedValue = comparedValue.toFixed(2);
}
// Change Chart 
const getCallbackVal = (val) => {
    setSelectedChart(val);
}
// Render Function 
return (
    <Box
    sx={{
        width: {xs: "90vw", sm:"90vw", md:"780px", lg:"600px", xl: "750px"}, 
        height: {xs: "80vh", sm:"580px", md:"780px"}
    }}
    >
    <Paper 
    sx={{
        backgroundColor: 'var(--focus-bg-color)',
        border: 'white',
        color: 'var(--primary-text-color)',

        }}
    elevation={5}
    >
        <Box sx={{
            display: 'grid',
            width: '99%',
            my: 1
        }}>
            <Grid container spacing={0}>
                <Grid item xs={11}>
                    <Typography sx={{m:1}} variant='h3'>{props.title}</Typography>
                    {props.chartTypeSelect && <RadioBtn labels={props.twoCharts} callbackFunction={getCallbackVal}/>}
                    { !props.compare ? 
                        <Typography sx={{m:1, color: props.color}} variant='h3'>{props.avg && <>&#8709;</>} {props.value} {props.unit}</Typography>
                        : 
                        <>
                            <Typography sx={{m:1, color: props.color}} variant='h3'> {props.avg && <>&#8709;</>}{value} {props.unit}</Typography>
                            <Typography sx={{m:1, color: 'white'}} variant='h4'>
                            {comparedValue} {props.unit}     

                            { props.comparedValue > 0 ?
                                <TrendingUpIcon sx={{color: color, border: 'solid', borderRadius: '25px', padding:0.2, transform: 'translateY(6px)', ml: 1.3}}/>
                                :
                                <TrendingDownIcon sx={{color: color, border: 'solid', borderRadius: '25px', padding:0.2, transform: 'translateY(6px)', ml: 1.3}}/>
                            }   
                            </Typography>
                        </>

                    }
                </Grid>
                <Grid item xs={1} sx={{textAlign: 'right'}}>
                    <Tooltip title={props.infotext} sx={{mt:0.5, fontSize: '30px'}} placement="bottom-end">
                        <InfoOutlinedIcon /> 
                    </Tooltip>
                </Grid>
                <Grid xs={12} item>
                    {
                        props.chartTypeSelect &&  selectedChart == 'chart2' ? 
                            props.chart2 : 
                        props.chart
                    }
                </Grid>
            </Grid>
        </Box>

    </Paper>
</Box>
)
}

export default DisplayBox;

// Check for positive trend direction 
const checkTrend = (val, positiveTrend) => {
    var color;
    if (val > 0 && positiveTrend == 'up') {
        color = '#02ca0c'
    } else if (val < 0 && positiveTrend == 'down'){
        color = '#02ca0c'
    } else {
        color = '#d9371c'
    }
    return color;
}
