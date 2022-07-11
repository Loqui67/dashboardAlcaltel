/* ------------------- Librairies tierces ------------------- */

import {Bar} from "react-chartjs-2"
import { ChartOptions, ChartData, Chart } from 'chart.js'
import 'chart.js/auto'
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

interface Props {
    chartData : ChartData<'bar'>;
}

Chart.register(ChartjsPluginStacked100);

function Bar100Chart({chartData} : Props) {

    const options : ChartOptions<'bar'> = {
        indexAxis: 'x',
        plugins: {
            stacked100: {
                enable: true,
                replaceTooltipLabel: true,
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
            },
            y: {
                max:100,
                min: 0,
                stacked: true,
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    } 



    return (
        <Bar data={chartData} options={options} /* plugins={[ChartjsPluginStacked100]} *//>
    );
}

export default Bar100Chart;