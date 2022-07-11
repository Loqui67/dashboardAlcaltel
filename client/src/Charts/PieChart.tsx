/* ------------------- React ------------------- */

import React from "react";

/* ------------------- Librairies tierces ------------------- */

import { ChartOptions, ChartData } from 'chart.js'
import {Doughnut} from "react-chartjs-2"
import 'chart.js/auto'
  

const options: ChartOptions<'doughnut'>= {
    maintainAspectRatio: false,
    responsive: true,

}

interface Props {
    chartData : ChartData<'doughnut'>;
}

function PieChart({chartData} : Props) {
    return(
        <Doughnut data={chartData} options={options}/>
    );
}

export default PieChart;