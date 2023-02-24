import React, {useState, useEffect} from 'react'

import './CompassDirection.css'
import compass_logo from './kompass.png'
// MUI 
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper'; 

const marks = [
    {
      value: 0,
      label: 'Nord',
    },
    {
      value: 25,
      label: 'West',
    },
    {
      value: 50,
      label: 'Süd',
    },
    {
    value: 75,
    label: 'Ost',
    },
    {
      value: 100,
      label: 'Nord',
    },
  ];
  const directionsList = [
    [0, 'Nord'],
    [12.5, 'Nordwest'],
    [25, 'West'],
    [37.5, 'Südwest'],
    [50, 'Süd'],
    [62.5, 'Südost'],
    [75, 'Ost'],
    [87.5, 'Nordost'],
    [100, 'Nord'],
  ]

// TODO Error Fixes: Slider -> onClick value not always correct, UI mobile not working

function CompassDirection(props) {
const [sliderVal, setSliderVal] = useState(50);
const [selectedDirection, setSelectedDirection] = useState('Süd');

// Mapping current value Slider to display value i.e. Nord 
    const displayDirection = () => {
        for (let i = 0; i < directionsList.length; i++) {
            if (directionsList[i][0] === sliderVal) {
                setSelectedDirection(directionsList[i][1]);
               //  setSelectedDirection(directionsList.filter((item) => item === sliderVal))
            }
        }
    }

// Event Listener Slider
    const handleSliderChange = (e) => {
        setSliderVal(e.target.value);
        displayDirection();
    }

// Return Function 
    useEffect(() => {
      props.get_Direction(selectedDirection);
    }, [selectedDirection])

// Render Function 
return (
    <Box sx={{textAlign: 'center'}}>
    <h4 sx={{mb: 0}}>Himmelsrichtung</h4>
    <Box sx={{ 
        justifyContent:'center', 
        alignItems: 'center',
        width: '100%',
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 
          {
            md: 'repeat(5, 1fr)',
            xs: 'repeat(2, 1fr)'
          },

        gridTemplateAreas: 
        {
          md:
              `"icon slider slider slider value"`,
          xs: `"icon value"
              "slider slider "`
        }
      }}>

      <Box sx={{ 
        gridArea: 'slider', 
        display: 'flex',
        mx: {xs: 3},
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Slider
          onChange={handleSliderChange}
          aria-label="Custom marks"
          defaultValue={50}
          track={false}
          step={12.5}
          marks={marks}
          size='20px'
          value={sliderVal}
        />
      </Box>
      
        <Box sx={{
            gridArea: 'value',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}
        >
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
                  {selectedDirection}
            </Paper>
        </Box>
        <Box sx={{
          gridArea: 'icon',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img src={compass_logo} width="60px" height="60px" alt="Compass" />
        </Box>
    </Box>
    </Box>
)
}

export default CompassDirection;