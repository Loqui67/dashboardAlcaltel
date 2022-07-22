/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Enum ------------------- */

import { dataChartTypeName } from "../toolbox/enum";

/* ------------------- Types And Interfaces ------------------- */

import { BarChartProps } from "../toolbox/typeAndInterface";

/* ------------------- Librairies tierces ------------------- */

import { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function BarChart({ chartData }: BarChartProps) {
  const options: ChartOptions<dataChartTypeName.bar> = useMemo(() => {
    //voir la docu pour les options
    return {
      layout: {
        padding: 0,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxHeight: 20,
            font: {
              size: 16,
            },
          },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          ticks: {
            font: {
              size: 18,
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
    };
  }, []);

  return <Bar data={chartData} options={options} />;
}

export default BarChart;
