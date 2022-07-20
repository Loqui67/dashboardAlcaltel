/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Enum ------------------- */

import { dataChartTypeName } from '../toolbox/enum'

/* ------------------- Types And Interfaces ------------------- */

import { Bar100ChartProps } from '../toolbox/typeAndInterface'

/* ------------------- Librairies tierces ------------------- */

import { Bar } from "react-chartjs-2"
import { ChartOptions, Chart } from 'chart.js'
import 'chart.js/auto'
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";



Chart.register(ChartjsPluginStacked100);

function Bar100Chart({ chartData }: Bar100ChartProps) {

    const options: ChartOptions<dataChartTypeName.bar100> = useMemo(() => {
        return {
            indexAxis: 'x',
            plugins: {
                stacked100: {
                    enable: true,
                    replaceTooltipLabel: true,
                },
                legend: {
                    position: 'top',
                    labels: {
                        boxHeight: 20,
                        font: {
                            size: 16
                        },
                        usePointStyle: true,
                        
                    }
                },
                tooltip: {
                    titleFont: {
                      size: 18
                    },
                    bodyFont: {
                      size: 14
                    },
                    
                }
            },
            layout: {
                padding: 0
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        font: {
                            size: 14,
                        }
                    }
                },
                y: {
                    max: 100,
                    min: 0,
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        font: {
                            size: 12,
                        }
                    }
                }
            }
        }
    }, [])



    return (
        <Bar data={chartData} options={options} />
    );
}

export default Bar100Chart;