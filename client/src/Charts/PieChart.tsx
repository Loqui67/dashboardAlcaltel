/* ------------------- React ------------------- */

import React, { useMemo } from "react";

/* ------------------- Librairies tierces ------------------- */

import { ChartOptions, ChartData } from 'chart.js'
import { Doughnut } from "react-chartjs-2"
import 'chart.js/auto'




interface Props {
    chartData: ChartData<'doughnut'>;
}

function PieChart({ chartData }: Props) {

    const options: ChartOptions<'doughnut'> = useMemo(() => {
        return {
            maintainAspectRatio: false,
            responsive: true,
        }
    }, [])

    return (
        <Doughnut data={chartData} options={options} />
    );
}

export default PieChart;