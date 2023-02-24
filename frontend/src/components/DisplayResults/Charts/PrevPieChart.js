import React from 'react'

import { Box } from '@mui/system'
import { ResponsivePie } from '@nivo/pie'


function PrevPieChart(props) {
const data = [
    {
        "id": "Direktverbrauch",
        "label": "Direktverbrauch",
        "value": props.value,
    }, 
    {
        "id": "Netzbezug", 
        "label": "Netzbezug",
        "value": 100 - props.value,
    }
]
return (
    <Box sx={{height: "85px", width: "99%"}}>                
    <ResponsivePie
    data={data}
    colors={[props.color, '#d9d9d9']}
    margin={{ top: 1, right: 0, bottom: 1, left: 0 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    // colors={{ scheme: 'accent' }}
    borderWidth={1}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.2
            ]
        ]
    }}
    enableArcLinkLabels={false}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#ffffff"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
    enableArcLabels={false}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                2
            ]
        ]
    }}
    isInteractive={false}
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    /*
    fill={[
        {
            match: {
                id: 'ruby'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'c'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'go'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'python'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'scala'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'lisp'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'elixir'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'javascript'
            },
            id: 'lines'
        }
    ]} */
    legends={[]}
/>
</Box>
)
}

export default PrevPieChart;