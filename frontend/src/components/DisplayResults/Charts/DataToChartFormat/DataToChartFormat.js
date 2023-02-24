import React from 'react'
import LineChart from '../LineChart'

function DataToChartFormat(props) {
var res = []; 
var yAxes; 
const months_short = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]

if (props.yAxesType == "month") {
    yAxes = months_short;
}


const line_chart = (data, yAxes) => {

var tmp_data = [];

for (let i = 0; i < data.length; i++) {
    for (let s = 0; s < data[i].length; s++) {
        tmp_data.push({
            "x": yAxes[s],
            "y": data[i][s]
        })
    }
    res.push(
        {
            "id": props.ids[i],
            "data": tmp_data
        }
    )
    tmp_data = []
}
}

if (props["chart_type"] == "LineChart") {
    line_chart(props.data, yAxes);
}
// var res = 900
return res
}

export default DataToChartFormat;