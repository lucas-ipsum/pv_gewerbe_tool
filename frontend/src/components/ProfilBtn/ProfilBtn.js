import { Badge } from '@mui/material';
import { Box } from '@mui/system';
import React, {useState, createRef, useEffect, useRef} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';

import Buttons from './Buttons'
import './ProfilBtn.css';

// TODO onTouch wie bei Css hover pseudo class
function ProfilBtn(props) {
const [invisible, setInvisible] = useState(!props.btn_status)
// Set Style current selected item 

    const btn_checked = (id) => {
        props.selected(id);
    }
// 
    useEffect(() => {
        setInvisible(!props.btn_status);
        if (props.btn_status) {
            document.getElementById(props.gewerbe_typ).className = 'btn btn_selected';
        }
        else {
            document.getElementById(props.gewerbe_typ).className = 'btn';
        }
    }, [props.btn_status])
// TEST Badge 
/*
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 0,
      top: 2,
    },
  }));
*/
// Render Method 
        return (

            <button onClick={() => {
                btn_checked(props.gewerbe_typ)
            }} id={props.gewerbe_typ} className='btn' >   
            <Badge 
            invisible={invisible}
            badgeContent={<CheckIcon />}
            color='primary'
            sx={{width: '100%'}}
        >   
                <Box sx={{width: '100%'}}>
                    <table className='btn-content'>
                            <tr>
                                <td className='center'>
                                    <form className='last_form'>
                                        <input value={props.btnSelected} id={props.gewerbe_typ} aria-label={props.gewerbe_typ} className='checkbox_Lastprofil' type="checkbox" />
                                        <h4>{props.gewerbe_typ}</h4>
                                        {props.icon}
                                    </form>
                                </td>
                            </tr>
                    </table>  
                </Box>  
                    </Badge>
                </button>  
        )
}
export default ProfilBtn;

//                 sx={{display: 'flex', justifyItems: 'center'}}
