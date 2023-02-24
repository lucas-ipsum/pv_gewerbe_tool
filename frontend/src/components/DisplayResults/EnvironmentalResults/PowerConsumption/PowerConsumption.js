import React, { useEffect, useState } from 'react'

// MUI 
import { Box } from '@mui/system';
import { Paper, Chip } from '@mui/material';

function PowerConsumption(props) {
const [unit, setUnit] = useState('kWh'); 
const [consumption_year, setConsumptionYear] = useState(props.data);
// Helper Decimal Points and length of output value 
const decimal = (num) => {
    var number = Math.round(num);

    num = number.toString();   
    // Test controll max length                                             // TODO maybe more checks for to long values > 14 char overflows ui element
    if (num.length > 8) {
        setUnit('MWh');
        number = number / 1000;
        if (num.length > 13) {
            number = number / 1000;
            setUnit('GWh')
        }
        number = Math.round(number)
        num = number.toString();
    } 
    num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ".")  
    return num;
}
// var consumption_year = decimal(238924892843)
useEffect(() => {
    setConsumptionYear(decimal(props.data))
    // consumption_year = decimal(props.data);
}, [props.data])
// ### Render Function ### 
// if (props) {
    return (
        <Box sx={{textAlign: 'center', justifyContent: 'center', display: 'grid'}}>
            <h4>Vebrauch</h4>
            <Paper 
                    sx={{
                        width: 105, 
                        height: 105,
                        backgroundColor: 'var(--focus-bg-color)',
                        border: 'white',
                        color: 'var(--primary-text-color)',
                        fontSize: 16,
                        fontWeight: 600,
                        textAlign: 'center',
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'
                        }}
                    elevation={5}
                    >
                        <p style={{margin: 0}}>{consumption_year}</p>
                        <p className='unit'>{unit} / Jahr</p>
                      
                </Paper>
        </Box>
    )
// }

}

export default PowerConsumption;