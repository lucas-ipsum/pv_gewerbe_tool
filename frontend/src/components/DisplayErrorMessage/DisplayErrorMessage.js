import React from 'react'

// MUI 
import Alert from '@mui/material/Alert';

function DisplayErrorMessage(props) {
    // alert(props.message)

    return (
        <div>
            <Alert severity={props.type}>{props.message}</Alert>
        </div>
    )
}

export default DisplayErrorMessage;