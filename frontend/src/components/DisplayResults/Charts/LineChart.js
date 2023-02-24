import React from 'react'
import {useState, useEffect} from 'react';

import { ResponsiveLine } from '@nivo/line'
import { Box } from '@mui/system';

/**
 * Usage LineChart Component
 * @param {*} props 
 * @returns 
 */

function LineChart(props) {
// ## Display Size ##

const [width, setWidth]   = useState(window.innerWidth);
const updateDisplaySize = () => {
    setWidth(window.innerWidth);
}

useEffect(() => {
    window.addEventListener("resize", updateDisplaySize);
}, []) 
// ##### Default Settings Line Chart ##### 
var legendX = null;
var legendY = null;
var data = null;
var height = "400px";
var margin = { top: 50, right: 40, bottom: 50, left: 60 }


// #### Settings Line Chart ##### 
if(props.legendX) {legendX = props.legendX};
if(props.legendY) {legendY = props.legendY};
if(props.data) {data = props.data};

// #### Preview LineChart #####
if(props.preview) {
  height = '100px'
  margin = { top: 5, right: 5, bottom: 5, left: 5 }
}
  
return (
    <Box style={{ height: height, maxWidth: '99%'}}>
        <ResponsiveLine
                theme={{
                    "textColor": "#FFFFFF",                          // Text Color Chart    
                    "tooltip": {
                        "container": {  
                            "color": "#333333"                      // TODO Textcolor Tooltip -> change to header color 
                        }
                    }
                }}
                data={data}
                margin={margin}
                enableGridX={props.preview ? false : true }
                enableGridY={props.preview ? false : true }
                enablePoints={props.preview ? false : true }
                isInteractive={props.preview ? false : true }
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={
                  props.preview ? null :
                  {
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: legendX,
                    legendOffset: 36,
                    legendPosition: 'middle'
                  }
                }
                axisLeft={
                  props.preview ? null : 
                  {
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: legendY,
                    legendOffset: -50,
                    legendPosition: 'middle'
                  }
                }
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 30,
                        translateY: 50,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
    </Box>
)
}

export default LineChart; 