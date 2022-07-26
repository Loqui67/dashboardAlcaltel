/* ------------------- Charts ------------------- */

import BarChart from "./BarChart";
import Bar100Chart from "./Bar100Chart";
import PieChart from "./PieChart";

/* ------------------- Styles ------------------- */

import "./Styles/ChooseCharts.css";

/* ------------------- Types And Interfaces ------------------- */

import { ChooseChartsProps } from "../toolbox/typeAndInterface";

function ChooseCharts(props: ChooseChartsProps) {
    //choix du graph à afficher en fonction de la TS
    return props.testSuiteChoose !== "" ? (
        <div className="BarChart">
            <BarChart chartData={props.userDataBarChart} />
        </div>
    ) : (
        <div className="main d-flex flex-row">
            <div className="PieChart">
                <PieChart chartData={props.userDataPieChart} />
            </div>
            <div className="Bar100Chart">
                <Bar100Chart chartData={props.userDataBar100Chart} />
            </div>
        </div>
    );
}

export default ChooseCharts;
