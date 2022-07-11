/* ------------------- Charts ------------------- */

import BarChart from "./BarChart";
import Bar100Chart from "./Bar100Chart";
import PieChart from "./PieChart";
import { ChartData } from 'chart.js'

/* ------------------- Styles ------------------- */

import "./Styles/ChooseCharts.css";

interface Props {
    testSuiteChoose : number;
    userDataBarChart : ChartData<'bar'>;
    userDataPieChart : ChartData<'doughnut'>;
    userDataBar100Chart : ChartData<'bar'>;
}



function ChooseCharts(props : Props) {
 
    if (props.testSuiteChoose !== 0) {

        return (
            <div className="LineChart">
                <BarChart chartData={props.userDataBarChart}/>
            </div>
        );
    } 
    else {
        return (
            <div className={"main d-flex flex-row"}>
                <div className={"PieChart"}>
                    <PieChart chartData={props.userDataPieChart}/>
                </div>
                <div className="LineChart">
                    <Bar100Chart chartData={props.userDataBar100Chart}/>
                </div>
            </div>
        );
    }
}

export default ChooseCharts;