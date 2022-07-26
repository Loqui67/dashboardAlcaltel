/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Charts ------------------- */

import BarChart from "./BarChart";
import Bar100Chart from "./Bar100Chart";
import PieChart from "./PieChart";

/* ------------------- Styles ------------------- */

import "./Styles/ChooseCharts.css";

/* ------------------- Classes ------------------- */

import UserDataChart from "../classes/UserDataChart";

/* ------------------- Types Interfaces Contexts ------------------- */

import { useStatsPageStructureContext } from "../toolbox/context";

function ChooseCharts() {
    //choix du graph à afficher en fonction de la TS

    const {
        testStateCount,
        testSuiteFromVersion,
        testState,
        testSuiteChoose,
        dateChoose,
        testSuiteFromVersionWithDate,
        testStateCountWithDate,
        allClientID,
        clientVersionChoose,
        modelChoose,
    } = useStatsPageStructureContext();

    const userDataChart = useMemo(() => {
        return new UserDataChart(
            testStateCount,
            testSuiteFromVersion,
            testState,
            testSuiteChoose,
            dateChoose,
            testSuiteFromVersionWithDate,
            testStateCountWithDate,
            allClientID,
            clientVersionChoose,
            modelChoose
        );
    }, [
        testStateCount,
        testSuiteFromVersion,
        testState,
        testSuiteChoose,
        dateChoose,
        testSuiteFromVersionWithDate,
        testStateCountWithDate,
        allClientID,
        clientVersionChoose,
        modelChoose,
    ]);

    return testSuiteChoose !== "" ? (
        <div className="BarChart">
            <BarChart chartData={userDataChart.getUserDataBarChart()} />
        </div>
    ) : (
        <div className="main d-flex flex-row">
            <div className="PieChart">
                <PieChart chartData={userDataChart.getUserDataPieChart()} />
            </div>
            <div className="Bar100Chart">
                <Bar100Chart
                    chartData={userDataChart.getUserDataBar100Chart()}
                />
            </div>
        </div>
    );
}

export default ChooseCharts;
