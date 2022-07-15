/* ------------------- React ------------------- */

import React, { useMemo } from "react";

/* ------------------- Librairies tierces ------------------- */

import { ChartOptions, ChartData } from 'chart.js'
import { Bar } from "react-chartjs-2"
import 'chart.js/auto'


interface Props {
    chartData: ChartData<'bar'>;
}


function BarChart({ chartData }: Props) {


    const options: ChartOptions<'bar'> = useMemo(() => {
        return {
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
    }, [])

    return (
        <Bar data={chartData} options={options} />
    );
}

export default BarChart;