import { Box } from '@mui/system'
import React from 'react'

import { ResponsiveRadialBar } from '@nivo/radial-bar'

function RadialChart(props) {

return (
<Box sx={{height: "350px"}}>
<ResponsiveRadialBar
        theme={{
            "textColor": "#ffffff",
            "tooltip": {
                "container": {  
                    "color": "#333333"                      // TODO Textcolor Tooltip -> change to header color 
                }
            }
        }}
        data={props.data}
        colors={props.colors}
        valueFormat=">-.2f"
        padding={0.4}
        cornerRadius={2}
        margin={{ top: 25, right: 40, bottom: 40, left: 40 }}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 80,
                translateY: 46,
                itemsSpacing: 6,
                itemDirection: 'left-to-right',
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
</Box>
)
}

export default RadialChart;