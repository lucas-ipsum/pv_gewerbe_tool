import React, { useEffect, useState } from 'react'

// MUI
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

import InvestmentCosts from './InvestmentCosts/InvestmentCosts';
import InputBox from '../UiHelper/InputBox/InputBox';
import ValueSelectionBox from '../UiHelper/InputBox/ValueSelectionBox'

// Icons  
import EuroIcon from '@mui/icons-material/Euro';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function EconomicUserInput(props) {
    
// ### Input Object 
    const [economicUserInput, setEconomicUserInput] = useState({
        priceScenario: null,
        investmentPeriod: null, 
    });

// ### Get returned Data 
const return_Data_Invest_Costs = (data) => {
        if (data) {
            setEconomicUserInput(prev => ({...prev, investmentCosts: data}))
        }}
    const return_Data_Invest_Period = (data) => {
        if (data) {
            setEconomicUserInput(prev => ({...prev, investmentPeriod: data}))
        }}
const callbackFuncEnergyPriceScenario = (data) => {
    if (data) {
        setEconomicUserInput(prev => ({...prev, priceScenario: data}))
    }}
// ### User Data to parent
    useEffect(() => {
        props.get_EconomicData(economicUserInput)
    }, [economicUserInput])

// ### Render Function 
    return (
        <Box sx={{mt:8}}>
            <h3>Wirtschaftliche Eingaben</h3>
            <hr></hr>
            <Box>
                <Grid container spacing={2}> 
                    <Grid  item xs={12} sm={6}>
                        <ValueSelectionBox  return_Data={callbackFuncEnergyPriceScenario} title="Strompreis-Szenario" values={["Hochpreis", 'Erholung']} default={0} icon={<TrendingUpIcon sx={{fontSize: '65px'}}/>}/>
                    </Grid>
                    <Grid  item xs={12} sm={6}>
                        <InputBox return_Data={return_Data_Invest_Period} title={"Laufzeit in Jahren"} max={30} step={5} default={20} min={5} icon={<AccessTimeIcon sx={{fontSize: '65px'}}/>}/>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default EconomicUserInput;

//                         <InvestmentCosts />  
