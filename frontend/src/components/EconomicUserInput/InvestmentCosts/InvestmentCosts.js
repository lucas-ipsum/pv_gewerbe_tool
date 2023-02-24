import React, { useState } from 'react'

// MUI 
import { Box } from '@mui/system';
import { Grid, Paper, TextField } from '@mui/material';

function InvestmentCosts(props) {
const [maxInvestmentsCosts, setMaxInvestmentCosts] = useState(3533);
const change_Input = (e) => {
    e.prevent.default();
}
// ### Render Function 
return (
    <Box sx={{textAlign: 'center'}}>
    <h4>Investitionskosten</h4>
        <Box>
         <Grid sx={{justifyContent: 'center'}} container>
            <Grid item>
                <Paper 
                        sx={{
                            width: 80, 
                            height: 80,
                            backgroundColor: 'var(--focus-bg-color)',
                            color: 'var(--primary-text-color)',
                            fontSize:16,
                            fontWeight: 600,
                            lineHeight: '80px', 
                            alignItems: 'center',
                            display: 'flex'
                            }}
                        elevation={5}
                        >
                        <TextField sx={{
                                display: 'flex',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}
                            value= {maxInvestmentsCosts}
                            onChange= {change_Input}
                            inputProps={{
                                maxLength: 6,
                                style: { textAlign: 'center',
                                color: 'var(--primary-text-color)',
                                
                            }}}>
                        </TextField>
                </Paper>
           </Grid>
         </Grid>
        
        </Box>
    </Box>
)
}

export default InvestmentCosts