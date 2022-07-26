/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Composants ------------------- */

import ChooseCharts from "../Charts/ChooseCharts";
import SelectTS from "../Search Options-Results/SelectTS";
import SelectDate from "../Search Options-Results/SelectDate";
import SelectModel from "../Search Options-Results/SelectModel";
import Label from "../HTML components/Label";

/* ------------------- Classes ------------------- */

import UserDataChart from "../classes/UserDataChart";
import SelectClientVersion from "../Search Options-Results/SelectClientVersion";

/* ------------------- Types And Interfaces ------------------- */

import { StatsGraphPartStructureProps } from "../toolbox/typeAndInterface";

function StatsGraphPartStructure(props: StatsGraphPartStructureProps) {
    const userDataChart = useMemo(() => {
        return new UserDataChart(
            props.testStateCount,
            props.testSuiteFromVersion,
            props.testState,
            props.testSuiteChoose,
            props.dateChoose,
            props.testSuiteFromVersionWithDate,
            props.testStateCountWithDate,
            props.allClientID,
            props.clientVersionChoose,
            props.modelChoose
        );
    }, [
        props.testStateCount,
        props.testSuiteFromVersion,
        props.testState,
        props.testSuiteChoose,
        props.dateChoose,
        props.testSuiteFromVersionWithDate,
        props.testStateCountWithDate,
        props.allClientID,
        props.clientVersionChoose,
        props.modelChoose,
    ]);

    return (
        <div className="UpPart">
            <div className="d-flex flex-row padding">
                <div className="selectTS padding">
                    <Label text="Choose a test suite" />
                    <SelectTS
                        setTestSuiteChoose={props.setTestSuiteChoose}
                        testSuiteFromVersion={props.testSuiteFromVersion}
                        setDateChoose={props.setDateChoose}
                    />
                </div>
                <div className="selectDate padding">
                    <Label text="Choose a date" />
                    <SelectDate
                        date={props.date}
                        dateWithTS={props.dateWithTS}
                        testSuiteChoose={props.testSuiteChoose}
                        setDateChoose={props.setDateChoose}
                        dateChoose={props.dateChoose}
                    />
                </div>
                <div className="selectClientVersion padding">
                    <Label text="Choose a client version" />
                    <SelectClientVersion
                        clientVersion={props.clientVersion}
                        setClientVersionChoose={props.setClientVersionChoose}
                    />
                </div>
                <div className="selectModel padding">
                    <Label text="Choose a model" />
                    <SelectModel
                        clientModel={props.clientModel}
                        setModelChoose={props.setModelChoose}
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
    );
}

export default StatsGraphPartStructure;
