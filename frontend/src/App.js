import React, { useState, createContext, useEffect } from 'react';

import axios from 'axios';

// MUI 
import { Box } from '@mui/material';

// Components
import Header from './components/Header/Header';
import UserInput from './components/UserInput/UserInput';
import DisplayResults from './components/DisplayResults/DisplayResults';
import StepperPages from './components/StepperPages/StepperPages';

import './App.css';

function App() {
  const [userPage, setUserPage] = useState(true);
  const [resultPage, setResultPage] = useState(false);
  const [userDataSubmitted, setUserDataSubmitted] = useState(false)
  const [userData, setUserData] = useState();
  const [resultsData, setResultsData] = useState(); 
  const [isFormValid, setIsFormValid] = useState(false); 

// #### Start Backend Communication ####
// TODO add consumption to backend call 
const handle_Backend_call = (userData) => {
  var data = { 
      data_list: userData.loadprofile,
      type_loadprofile: userData.type_loadprofile,
      roof_data: userData.roof_data,
      economic_data: userData.economic_data,
      unit: userData.unit, 
      mwhYear: userData.mwhYear,
      consumption_absolute: userData.consumption_absolute,
      consumption: userData.consumption
  }

  // api call 
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  let res;
  axios.post("http://localhost:5000/api/lastprofil/data", data)
          .then(res => catch_response(res))
          .catch(err => console.warn(err));
}

// Response
const catch_response = (res) => {
  setResultsData(res.data);
}
// #### End Backend Communication ####


// Handle Pagination (UserInput, Results)
  const get_curr_Page = (page) => {
    if (page === 0) {
      setUserPage(true); 
      setResultPage(false);
    } else {
      setUserPage(false); 
      // TODO call getUserData
      setResultPage(true);
    }
  }

  // Call on open ResultsPage
  const setDataSubmitted = (submitted) => {
    if(submitted) {
      handle_Backend_call(userData); 
    }
  }
  const getUserData = (data) => {
    setUserData(data);
    if (data.type_loadprofile) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
//    handle_Backend_call()
  }
  const checkFormValidation = () => {
    return isFormValid;
  }

  useEffect(() => {
    checkFormValidation();
  }, [isFormValid])
  return (
    <Box sx={{
      display: 'grid',
      gap: 10, 
    }}>
      <Header />
      {userPage && <UserInput userDataSubmitted={userDataSubmitted} getUserData={getUserData}/>}
      {resultPage && <DisplayResults resultsData={resultsData}/>}
      <StepperPages isFormValid={isFormValid} checkFormValidation={checkFormValidation} setDataSubmitted={setDataSubmitted} get_curr_Page={get_curr_Page} /> 
    </Box>
  );
}

export default App;


/*
      display: 'grid',
      gap: 10, 
      alignItems: 'center', 
      justifyContent: 'center',



*/