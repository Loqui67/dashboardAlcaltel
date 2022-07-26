/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Enum ------------------- */

import { dataChartTypeName } from "../toolbox/enum";

/* ------------------- Types And Interfaces ------------------- */

import { PieChartProps } from "../toolbox/typeAndInterface";

/* ------------------- Librairies tierces ------------------- */

import { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

function PieChart({ chartData }: PieChartProps) {
    const options: ChartOptions<dataChartTypeName.doughnut> = useMemo(() => {
        //voir la docu pour les options
        return {
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        boxHeight: 20,
                        font: {
                            size: 16,
                        },
                        usePointStyle: true,
                    },
                },
            },
            maintainAspectRatio: false,
            responsive: true,
        };
    }, []);

    return <Doughnut data={chartData} options={options} />;
}

export default PieChart;
