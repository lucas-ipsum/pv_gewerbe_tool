import React, {useEffect, useState} from 'react'

// MUI
import { Box } from '@mui/material';


import CompassDirection from './CompassDirection/CompassDirection';
import RoofArea from './RoofArea/RoofArea';
import RoofAngle from './RoofAngle/RoofAngle';
import InputBox from '../UiHelper/InputBox/InputBox';
// Icons 
import RoofingIcon from '@mui/icons-material/Roofing';
import AngleIcon from '../../icons/angle.png';

function RoofSettings(props) {
// TODO Default Settings global
const [roofSettings, setRoofSettings] = useState({
    direction: "Süd",
    area: 150,
    angle: 45
})
// Getter 
    const get_Direction = (direction) => {
        setRoofSettings(prevState => {
            return {...prevState, direction: direction}
        });
    }
    const get_Area = (area) => {
        setRoofSettings(prevState => {
            return {...prevState, area: area}
        });    }
    const get_Angle = (angle) => {
        setRoofSettings(prevState => {
            return {...prevState, angle: angle}
        });
    }

// Return Function 
    useEffect(() => {
        props.get_roofData(roofSettings);
    }, [roofSettings])
// Render Function 
    return (
        <div>
                <h3>Dachfläche bestimmen</h3>
                <hr/>
                <Box sx={{
                    display: 'grid', 
                    gap: 5, 
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridTemplateAreas: {
                        xs: `"direction direction direction direction"
                        "roofArea roofArea roofArea roofArea"
                        "angle angle angle angle"`,
                        sm: `"direction direction direction direction"
                        "roofArea roofArea angle angle"
                        `
                    }
                }}>
                    <Box sx={{gridArea: 'direction'}}>
                        <CompassDirection get_Direction={get_Direction} />
                    </Box>
                    <Box sx={{gridArea: 'roofArea'}}>
                        <InputBox return_Data={get_Area} title="Dachfläche in m&sup2;" default={400} max={10000} min={5} step={5} icon={<RoofingIcon sx={{fontSize: '65px'}}/>}/> 
                    </Box>
                    <Box sx={{gridArea: 'angle'}}>
                        <InputBox return_Data={get_Angle} title="Dachneigung in &deg;" default={45} max={90} min={0} step={5} icon={<img src={AngleIcon} width="65px" height="65px" alt="Angle Icon" />}/> 
                    </Box>

                </Box>
        </div>
    )
}
//                         <InputBox return_Data={return_Data_Invest_Costs} title={"Strompreis-Szenario"} max={100000} step={100} default={1000} min={100} icon={<EuroIcon />}/>

export default RoofSettings; 