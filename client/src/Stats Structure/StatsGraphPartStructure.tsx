/* ------------------- React ------------------- */

import { Dispatch, SetStateAction } from "react";

/* ------------------- Composants ------------------- */

import ChooseCharts from "../Charts/ChooseCharts";
import SelectTS from "../Search Options-Results/SelectTS"
import SelectDate from "../Search Options-Results/SelectDate";

/* ------------------- Classes ------------------- */

import UserDataChart from "../classes/UserDataChart";



interface Props {
    testStateCount: Array<{passed: number, failed: number, skipped: number}>;
    testSuiteFromVersion: Array<{id_testsSuites: number, testsSuites_name: string, id_client: number}>;
    testState: Array<{currentState: string, id_testsSuites: number, date: string, id_client: number}>;
    testSuiteChoose: number;
    dateChoose: string;
    testSuiteFromVersionWithDate: Array<{id_testsSuites: number, testsSuites_name: string, id_client: number}>;
    testStateCountWithDate: Array<{passed: number, failed: number, skipped: number}>;
    allClientID: Array<number>;
    clientVersionChoose: number;
    clientDistinct: Array<{id_client: number, client_name: string}>;
    date: Array<{date: string}>;
    dateWithTS: Array<{date: string, id_testsSuites: number}>;
    setClientChoose: Dispatch<SetStateAction<string>>;
    setTestSuiteChoose: Dispatch<SetStateAction<number>>;
    setDateChoose: Dispatch<SetStateAction<string>>;

}

function StatsGraphPartStructure(props: Props) {

    const userDataChart = new UserDataChart(
        props.testStateCount,
        props.testSuiteFromVersion,
        props.testState,
        props.testSuiteChoose,
        props.dateChoose,
        props.testSuiteFromVersionWithDate,
        props.testStateCountWithDate,
        props.allClientID,
        props.clientVersionChoose
    );


    return (
        <div className="UpPart">
            <div className="d-flex flex-row padding">
                <div className="selectTS padding">
                    <label>Choose a test suite</label>
                    <SelectTS
                        setTestSuiteChoose = {props.setTestSuiteChoose}
                        testSuiteFromVersion = {props.testSuiteFromVersion}
                        setDateChoose={props.setDateChoose}
                    />
                </div>
                <div className="selectDate padding">
                    <label>Choose a date</label>
                    <SelectDate
                        date={props.date}
                        dateWithTS={props.dateWithTS}
                        testSuiteChoose={props.testSuiteChoose}
                        setDateChoose={props.setDateChoose}
                        dateChoose={props.dateChoose}
                    />
                </div>
            </div>
            <div className="Graph padding">
                <ChooseCharts 
                    userDataBar100Chart={userDataChart.getUserDataBar100Chart()} 
                    userDataBarChart={userDataChart.getUserDataBarChart()} 
                    userDataPieChart={userDataChart.getUserDataPieChart()} 
                    testSuiteChoose={props.testSuiteChoose}
                />
            </div>
        </div>
    )





}

export default StatsGraphPartStructure;