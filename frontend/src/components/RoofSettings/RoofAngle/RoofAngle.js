import React, { useState, useEffect } from 'react'

import './RoofAngle.css';

// MUI 
import { Box } from '@mui/system';
import { Paper, Divider } from '@mui/material';

// Icons 
import AngleIcon from '../../../icons/angle.png';
import ArrowUp from '../../../icons/arrow-up.png';
import ArrowDown from '../../../icons/arrow-down.png';

function RoofAngle(props) {
const [selectedAngle, setSelectedAngle] = useState(45);

// Event Handlers 
    const angle_Up = (e) => {
        if (selectedAngle <= 85) {
            setSelectedAngle(selectedAngle + 5);
        }
    }

    const angle_Down = (e) => {
        if (selectedAngle >= 5) {
            setSelectedAngle(selectedAngle - 5);
        }
    }

// Return Function 
    useEffect(() => {
        props.get_Angle(selectedAngle);
    }, [selectedAngle])

// Render Function 
    return (
        <Box>
        <h4 className='headerCentered'>Dachneigung</h4>
            <Box sx={{
                display: 'grid',
                height: '60px', 
                gridTemplateColumns:{ 
                    xs: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)'
                },
                gridTemplateAreas: 
                {
                    xs: `"icon value ."`,
                    md: `". icon value ."`
                },
                alignItems: 'center',
                mx: {md: 5},
            }}
            >
                <Box sx={{
                    gridArea: 'icon',
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: {
                        xs: 'center',
                        md: 'flex-start'
                    },
                }}>
                    <img src={AngleIcon} width="60px" height="60px" alt="Angle Icon" />
                </Box>

                <Box sx={{
                    gridArea: 'value', 
                    display: 'flex',
                    justifyContent: {xs: 'center'}
                }}>
                    <Paper 
                        sx={{
                            width: 80, 
                            height: 80,
                            backgroundColor: 'var(--focus-bg-color)',
                            border: 'white',
                            color: 'var(--primary-text-color)',
                            fontSize:16,
                            fontWeight: 600,
                            textAlign: 'center',
                            lineHeight: '80px', 
                            }}
                        elevation={5}
                        >
                            <span>{selectedAngle}&deg;</span>
                    </Paper>
                    <Box sx={{
                        ml: 2,
                        display: 'flex', 
                        flexDirection: 'column'
                    }}>
                        <button onClick={angle_Up} className='arrow_btn'>
                            <img src={ArrowUp} height="40px" alt="" />
                        </button>
                        <button className='arrow_btn'>
                            <img onClick={angle_Down} src={ArrowDown} height="40px" alt="" />
                        </button>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default RoofAngle; 