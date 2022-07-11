/* ------------------- React ------------------- */

import React from "react";

/* ------------------- Librairies tierces ------------------- */

import { ChartOptions, ChartData } from 'chart.js'
import {Bar} from "react-chartjs-2"
import 'chart.js/auto'


const options : ChartOptions<'bar'> = {
    layout: {
        padding: 0
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                precision: 0
            }
        }
    }
}

interface Props {
    chartData : ChartData<'bar'>;
}


function BarChart({chartData} : Props) {
    return (
        <Bar data={chartData} options={options}/>
    );
}

export default BarChart;