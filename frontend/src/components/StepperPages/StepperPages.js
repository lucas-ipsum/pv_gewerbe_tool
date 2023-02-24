import React, { useEffect, useState } from 'react'

// MUI 
import { Box, Stepper, Step, StepButton, StepLabel, Button } from '@mui/material';

import './StepperPages.css';
import DisplayErrorMessage from '../DisplayErrorMessage/DisplayErrorMessage';

function StepperPages(props) {

  const [activeStep, setActiveStep] = useState(0);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false); 
  const [allowDataSubmition, setAllowDataSubtmition] = useState();

  var steps = ["Eingabe", "Ergebnisse"]

// EVent Listener Btn 
  const set_Step_Fwd = () => {
    var valid = props.checkFormValidation();
    if(activeStep <= steps.length) {
      if (props.isFormValid) {
        setAllowDataSubtmition(true);
        setActiveStep(activeStep + 1);
      } else {
        setAllowDataSubtmition(false);
      }
    }
  }
  const set_Step_Back = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  } 

// Check for Last & First ELement 
  useEffect(() => {
    if (activeStep === steps.length - 1) {
      setIsLastStep(true); 
      setIsFirstStep(false);
    //  handleSubmitData(); 
    } 
    else if (activeStep === 0) {
      setIsFirstStep(true);
      setIsLastStep(false); 
    }
    else {
      setIsFirstStep(false); 
      setIsLastStep(false); 
    } 
  }, [activeStep])

  useEffect(() => {
    props.setDataSubmitted(isLastStep)
  }, [isLastStep])
  useEffect(() => {
    props.get_curr_Page(activeStep)
  }, [activeStep])
// Render Function 
return (
  <Box>
    {(allowDataSubmition == false && !props.isFormValid) && <Box sx={{mb: '20px'}}><DisplayErrorMessage type='error' message='Fehler: Bitte wählen Sie ein Lastprofil aus!'/></Box>}
  <Box sx={{
    color: 'white',
    display: 'grid',
    width: '100%',
    justifyContent: 'center'
  }}>
    <Box sx={{
        color: 'white',
        display: 'flex',
        width: '100%',
      }}>
          <Stepper
            activeStep={activeStep}
            sx={{
              color: 'white'
            }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
        ))}
          </Stepper>
    </Box>
    <Box>
      { isFirstStep && <Box sx={{display: 'flex', justifyContent:'flex-end'}}><Button onClick={set_Step_Fwd}>Weiter</Button></Box> }
      { isLastStep && <Button onClick={set_Step_Back}>Zurück</Button> }
  
    </Box>
  </Box>
  </Box>
)
}

export default StepperPages; 