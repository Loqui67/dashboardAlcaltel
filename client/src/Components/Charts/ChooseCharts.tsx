/* ------------------- React ------------------- */

import { useState, useCallback, useEffect, useMemo } from "react";

/* ------------------- Charts ------------------- */

import BarChart from "./BarChart";
import Bar100Chart from "./Bar100Chart";
import PieChart from "./PieChart";

/* ------------------- Styles ------------------- */

import "./Styles/ChooseCharts.css";

/* ------------------- Classes ------------------- */

import UserDataChart from "../../classes/UserDataChart";
import GetFromDatabase from "../../classes/GetFromDatabase";

/* ------------------- Types Interfaces Contexts ------------------- */

import {
    testStateCountType,
    testStateCountWithDateType,
} from "../../tools/typeAndInterface";
import { useStatsPageStructureContext } from "../../tools/context";

/* ------------------- librairies tierces ------------------- */

import { useParams } from "react-router-dom";

function ChooseCharts(): JSX.Element {
    //choix du graph à afficher en fonction de la TS

    let { id, client } = useParams<string>();

    const {
        testSuiteFromVersion,
        testState,
        testSuiteChoose,
        dateChoose,
        testSuiteFromVersionWithDate,
        allClientID,
        clientVersionChoose,
        modelChoose,
    } = useStatsPageStructureContext();

    const [testStateCount, setTestStateCount] = useState<testStateCountType>(
        []
    );
    const [testStateCountWithDate, setTestStateCountWithDate] =
        useState<testStateCountWithDateType>([]);

    const getTestStateCount = useCallback(async () => {
        const query = new GetFromDatabase(
            id === undefined ? 0 : parseInt(id),
            client === undefined ? "" : client,
            ""
        );
        setTestStateCount(await query.getTestStateCount());
    }, [id, client]);

    useEffect(() => {
        getTestStateCount();
    }, [getTestStateCount]);

    const getTestStateCountWithDate = useCallback(async () => {
        const query = new GetFromDatabase(
            id === undefined ? 0 : parseInt(id),
            client === undefined ? "" : client,
            dateChoose
        );
        setTestStateCountWithDate(await query.getTestStateCountWithDate());
    }, [id, client, dateChoose]);

    useEffect((): void => {
        if (dateChoose !== "") {
            getTestStateCountWithDate();
        }
    }, [getTestStateCountWithDate, dateChoose]);

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
