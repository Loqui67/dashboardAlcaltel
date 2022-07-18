/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Enum ------------------- */

import { dataChartTypeName } from '../enum/enum'

/* ------------------- Librairies tierces ------------------- */

import { ChartOptions, ChartData } from 'chart.js'
import { Bar } from "react-chartjs-2"
import 'chart.js/auto'


interface Props {
    chartData: ChartData<dataChartTypeName.bar>;
}


function BarChart({ chartData }: Props) {


    const options: ChartOptions<dataChartTypeName.bar> = useMemo(() => {
        return {
            layout: {
                padding: 0
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxHeight: 20,
                        font: {
                            size: 16
                        }
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 18,
                        }
                    }
                },
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