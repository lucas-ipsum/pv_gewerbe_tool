import React from 'react';

// Material
import Button from '@mui/material/Button';

function UploadLastProfil(props) {
    const handleSubmit = () => {
    }
    return (
        <div>
            <input type="file" />
            <Button variant="outlined" onClick={handleSubmit}>
                Bestätigen
            </Button>
        </div>

        )
    }

export default UploadLastProfil;