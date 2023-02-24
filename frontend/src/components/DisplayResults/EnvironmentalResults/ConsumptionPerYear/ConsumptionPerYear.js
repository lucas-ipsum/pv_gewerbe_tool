import React, {useEffect, useState} from 'react'

import { Line } from 'react-chartjs-2';
// import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
// import {CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';

import Chart from 'chart.js/auto';
// MUI 
import { Box } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, Radio, RadioGroup } from '@mui/material';

const MONTHS = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember'
  ];
  const kw = []
  for (let i = 1; i <= 52; i++) {
    kw.push(i + " KW")
  }

function ConsumptionPerYear(props) {

const [value, setValue] = useState('monthly')
const [dataList, setDataList] = useState(null)
const [labels, setLabels] = useState(MONTHS);

// Check if props undefined
    if(props.data !== undefined && dataList === null) {
        setDataList(props.data['monthly_consumption'])
    }
// Event Listeners 
    const handleChange = (e) => {
        e.preventDefault();
        setValue(e.target.value)
    // Setting Chart Data on Radio  Btn Change 
        if(e.target.value == 'monthly') {
            setDataList(props.data['monthly_consumption'])
            setLabels(MONTHS);
        } else {
            setDataList(props.data['weekly_consumption']);
            setLabels(kw)
        }
    }

// Catch error 
    useEffect(() => {
        if (props.data !== undefined) {
            if(value === 'monthly') {
                setDataList(props.data['monthly_consumption'])
                setLabels(MONTHS);
            }
            else {
                setDataList(props.data['weekly_consumption']);
                setLabels(kw)
            }
        }
    }, [props])

// TODO set unit for y axes 
// Config and Data chartjs
    const data = {
        labels: labels,
        datasets: [{
            label: 'Verbrauch',
            data: dataList,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        }
    // TODO adding second data line (produced energy)
    // { }
        ]
    }
// Render Function 
return (
    <Box sx={{
        width: '100%',
        textAlign: 'center'
    }}>
        <h4>Verbrauch</h4>
        <FormControl>
            <RadioGroup 
                row
                onChange={handleChange}
                value={value}
            >
                <FormControlLabel value="monthly" control={<Radio />} label="Monatlich" />        
                <FormControlLabel value="weekly" control={<Radio />} label="Wöchentlich" />     
            </RadioGroup>
        </FormControl>
        <Box sx={{
            maxWidth: '99%',
        }}>
            <Line
                data={data}
                />
        </Box>
    </Box>
 )
}

export default ConsumptionPerYear;