/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Enum ------------------- */

import { dataChartTypeName } from '../toolbox/enum'

/* ------------------- Librairies tierces ------------------- */

import { ChartOptions, ChartData } from 'chart.js'
import { Doughnut } from "react-chartjs-2"
import 'chart.js/auto'




interface Props {
    chartData: ChartData<dataChartTypeName.doughnut>;
}

function PieChart({ chartData }: Props) {

    const options: ChartOptions<dataChartTypeName.doughnut> = useMemo(() => {
        return {
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxHeight: 20,
                        font: {
                            size: 16
                        },
                        usePointStyle: true
                    },
                }
            },
            maintainAspectRatio: false,
            responsive: true,
        }
    }, [])

    return (
        <Doughnut data={chartData} options={options} />
    );
}

export default PieChart;