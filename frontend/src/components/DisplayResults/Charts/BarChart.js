import { Box } from '@mui/system';
import React, {useState} from 'react'

import { ResponsiveBar } from '@nivo/bar'

function BarChart(props) {
/**
 * Usage BarChart
 * required props: data, keys, indexBy
 * 
 */

// #### Default Settings ####
var height = "350px";
var interactive = true;
var legendX = null;
var legendY = null; 
var layout = 'horizontal'
var margin = { top: 50, right: 130, bottom: 50, left: 80 }
var innerPadding = 30;
var width = "100%";
var padding = 0.1;
var enableGridY = true;
var axisLeft = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: legendY,
    legendPosition: 'middle',
    legendOffset: -40
}
var axisBottom = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: legendX,
    legendPosition: 'middle',
    legendOffset: -40
}
// ## Legend Default
var legend = [
    {
        dataFrom: 'keys',
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 61,
        translateY: 42,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 10,
        effects: [
            {
                on: 'hover',
                style: {
                    itemOpacity: 1
                }
            }
        ]
    }
]

// #### Settings Preview Chart ####
if (props.preview) {
    enableGridY = false;
    interactive = false;
    legend = []
    height = "100px";
    axisLeft = null; 
    axisBottom = null;
    innerPadding = 5; 
    padding = 0.4
    margin={ top: 0, right: 30, bottom: 0, left: 30 }
    width="99%"
}

// #### Props Settings ###
if (props.layout) {
    layout = props.layout;
}
if (props.legendY) {legendY = props.legendY}
return(
<Box sx={{height: height, width:width}}>
<ResponsiveBar
        data={props.data}
        theme={{
            "textColor": "#ffffff",
            "tooltip": {
                "container": {  
                    "color": "#333333"                      // TODO Textcolor Tooltip -> change to header color 
                }
            },
            "legends": {
                "text": {
                    "fill": "#ffffff"
                }
            }
        }}
        keys={props.keys}
        /*
        keys={[
            'PV',
            'PV + Bat',
            'Ohne'
        ]}*/
        isInteractive={interactive}
        enableLabel={false}
        enableGridY={enableGridY}
        indexBy={props.indexBy}
        layout={layout}
        // margin={{ top: 50, right: 130, bottom: 50, left: 80 }}
        margin={margin}
        padding={padding}
        innerPadding={innerPadding}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={legend}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
</Box>
)
}

export default BarChart; 

/* TODO legend dosnt work correctly 


*/ 