import React, { useState, useEffect, useRef } from 'react';

import { Box } from '@mui/system';
import { Button, Grid, Paper, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import useResizeObserver from "use-resize-observer";

// Icons 
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import './PreviewBox.css';
import PrevPieChart from '../Charts/PrevPieChart';

function PreviewBox(props) {
    var color; 
    const [borderStyle, setBorderStyle] = useState()
    const [prev_box_Width, setPrev_box_Width] = useState()

// Dynamic resizing text 
    const [fontSizePrevBox, setFontSizePrevBox] = useState('30px');
    const { ref } = useResizeObserver({
        onResize: ({ width, height }) => {
            if (width < 730) {
                setFontSizePrevBox('25px')
            } else {
                setFontSizePrevBox('30px')
            }
        },
      });

// Settings 
if(props.compared) {
    color = checkTrend(props.value, props.positiveTrend)
} 

// Event Handler 
    const handleClick = () => {
        props.handleSelected(props.id)
    }

// Changing Selected Menu Point with state from parent component 
    useEffect(() => {
        if (props.selectedStatus) {
            setBorderStyle("1.2px solid var(--primary-header-color)")
        }
        else {
            setBorderStyle("")
        }
    }, [props.selectedStatus])

// ## Legend ##
const legend = []
if (props.legend) {
    for (let element of props.legend) {
        legend.push(<><CircleIcon fontSize='4px' sx={{color: element["color"]}}/> <span className='legend_title'> &nbsp; {element["title"]} &nbsp; </span> </>)
    }
} 

// Render Function 
    return (
    <Box sx={{
            my:1,
            display: 'flex',
            justifyContent: 'center'
        }}
        ref={ref}
        >
        <Box
            sx={{
                width: {xs: "90vw", sm:"90vw", md:"780px", lg:"40vw", xl:"600px"}, 
            }}
        >
            <Paper 
                className='prevBoxBtn'
                id={props.id}
                onClick={handleClick}
                sx={{
                    // width: 600, 
                    // height: 100,
                    minHeight: 100,
                    backgroundColor: 'var(--focus-bg-color)',
                    color: 'var(--primary-text-color)',
                    variant: 'outlined',
                    border: borderStyle
                    }}
                elevation={5}
                >
                <Box sx={{  
                    height: '100px', display: 'grid', alignItems: 'center' 
                    }}>
                    <Grid container>
                        <Grid sx={{display: {xs: 'none', sm:'block'}}} item xs={3}>
                            {props.chart}
                        </Grid>
                        <Grid item>
                            <Box sx={{height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center'}}>
                                <Box sx={{display: 'flex'}}>
                                    <Typography xs={3} sx={{p:1, fontSize: fontSizePrevBox}}>{props.title}</Typography>
                                    
                                    {
                                        props.compared ? 
                                        <Typography xs={3} sx={{p:1, color: props.color, fontSize: fontSizePrevBox}}>
                                            {props.value ? props.value.toFixed(0): null} {props.unit}

                                            {(props.value > 0 ) ? 
                                            <TrendingUpIcon sx={{color: color, border: 'solid 2.3px', borderRadius: '25px', padding:0.2, transform: 'translateY(6px)', ml: 1.2}}/>
                                            :
                                            <TrendingDownIcon sx={{color: color, border: 'solid 2.3px', borderRadius: '25px', padding:0.2, transform: 'translateY(6px)', ml: 1.2}}/>
                                            }
                                        </Typography>
                                         :
                                        <Typography xs={3} sx={{p:1, color: props.color, fontSize: fontSizePrevBox}}>{props.value ? props.value.toFixed(0): null} {props.unit}</Typography>
                                    }
                                </Box>
                                <Box sx={{display: {xs:"none", sm:"flex"}, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                                    {legend}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>

    </Box>
)
}

export default PreviewBox;


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