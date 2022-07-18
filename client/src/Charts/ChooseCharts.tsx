/* ------------------- Charts ------------------- */

import BarChart from "./BarChart";
import Bar100Chart from "./Bar100Chart";
import PieChart from "./PieChart";
import { ChartData } from 'chart.js'

/* ------------------- Styles ------------------- */

import "./Styles/ChooseCharts.css";

/* ------------------- Enum ------------------- */

import { dataChartTypeName } from '../enum/enum'


interface Props {
    testSuiteChoose: number;
    userDataBarChart: ChartData<dataChartTypeName.bar>;
    userDataPieChart: ChartData<dataChartTypeName.doughnut>;
    userDataBar100Chart: ChartData<dataChartTypeName.bar100>;
}



function ChooseCharts(props: Props) {

    return (
        props.testSuiteChoose !== 0 ?
            <div className="BarChart">
                <BarChart chartData={props.userDataBarChart} />
            </div>
            :
            <div className="main d-flex flex-row">
                <div className="PieChart">
                    <PieChart chartData={props.userDataPieChart} />
                </div>
                <div className="Bar100Chart">
                    <Bar100Chart chartData={props.userDataBar100Chart} />
                </div>
            </div>
    )
}

export default ChooseCharts;