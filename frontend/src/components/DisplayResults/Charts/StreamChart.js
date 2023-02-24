import React from 'react'
import { Box } from '@mui/system'
import { ResponsiveStream } from '@nivo/stream'

function StreamChart(props) {
const data = [
    {"PV": 10, "PV_Bat": 13},
    {"PV": 12, "PV_Bat": 15},
    {"PV": 11, "PV_Bat": 14},
    {"PV": 8, "PV_Bat": 17},
]
// Render Function 
return (
<Box sx={{height: '350px'}}>
    <ResponsiveStream
            theme={{
                "textColor": "#ffffff",
                "tooltip": {
                    "container": {  
                        "color": "#333333"                      // TODO Textcolor Tooltip -> change to header color 
                    }
                }
            }}
    data={data}
    keys={[
        'PV',
        'PV_Bat'
    ]}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Monat',
        legendOffset: 36
    }}
    axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: -40
    }}
    enableGridX={true}
    enableGridY={false}
    offsetType="diverging"
    colors={{ scheme: 'nivo' }}
    fillOpacity={0.85}
    borderColor={{ theme: 'background' }}
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#2c998f',
            size: 4,
            padding: 2,
            stagger: true
        },
        {
            id: 'squares',
            type: 'patternSquares',
            background: 'inherit',
            color: '#e4c912',
            size: 6,
            padding: 2,
            stagger: true
        }
    ]}
    fill={[
        {
            match: {
                id: 'Paul'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'Marcel'
            },
            id: 'squares'
        }
    ]}
    dotSize={8}
    dotColor={{ from: 'color' }}
    dotBorderWidth={2}
    dotBorderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.7
            ]
        ]
    }}
    legends={[
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000000'
                    }
                }
            ]
        }
    ]}
    />
</Box>
)
}

export default StreamChart;