/* ------------------- React ------------------- */

import { useState, useCallback, useEffect } from "react";

/* ------------------- Composants ------------------- */

import StatsGraphPartStructure from "./StatsGraphPartStructure";
import TestInfoStructure from "../Search Options-Results/TestInfoSearchPartStructure";
import VersionTitle from "./VersionTitle";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../classes/GetFromDatabase";

/* ------------------- Types Interfaces Contexts ------------------- */

import {
    testSuiteType,
    testSuiteChooseType,
    testSuiteFromVersionType,
    testSuiteFromVersionWithDateType,
    testStateType,
    clientType,
    clientVersionChooseType,
    allClientIDType,
    dateType,
    dateWithTSType,
    dateChooseType,
} from "../toolbox/typeAndInterface";
import { useStatsContext, StatsPageStructureContext } from "../toolbox/context";

/* ------------------- Librairies tierces ------------------- */

import { Outlet, useParams } from "react-router-dom";

function StatsPageStructure() {
    let { id } = useParams<string>();
    const { clientChoose } = useStatsContext();

    const [testSuite, setTestSuite] = useState<testSuiteType>([]);
    const [testSuiteChoose, setTestSuiteChoose] =
        useState<testSuiteChooseType>("");
    const [testSuiteFromVersion, setTestSuiteFromVersion] =
        useState<testSuiteFromVersionType>([]);
    const [testSuiteFromVersionWithDate, setTestSuiteFromVersionWithDate] =
        useState<testSuiteFromVersionWithDateType>([]);
    const [testState, setTestState] = useState<testStateType>([]);
    const [client, setClient] = useState<clientType>([]);
    const [clientVersionChoose, setClientVersionChoose] =
        useState<clientVersionChooseType>(0);
    const [allClientID, setAllClientID] = useState<allClientIDType>([]);
    const [date, setDate] = useState<dateType>([]);
    const [dateWithTS, setDateWithTS] = useState<dateWithTSType>([]);
    const [dateChoose, setDateChoose] = useState<dateChooseType>("");

    const [modelChoose, setModelChoose] = useState<string>("");

    const allRequest = useCallback(async () => {
        let idNumber: number;
        id !== undefined ? (idNumber = parseInt(id)) : (idNumber = 0);
        const query = new GetFromDatabase(idNumber, clientChoose, "");
        setTestSuiteFromVersion(await query.getTestSuitesFromVersion());
        setTestState(await query.getTestState());
        setClient(await query.getClient());
        setTestSuite(await query.getTestSuites());
        setDateWithTS(await query.getDateWithTS());
        setTestSuiteFromVersionWithDate(
            await query.getTestSuitesFromVersionWithDate()
        );
        setDate(await query.getDate());
    }, [id, clientChoose]);

    useEffect(() => {
        allRequest();
    }, [id, clientChoose, allRequest]);

    useEffect(() => {
        const arr: Array<number> = [];
        client.forEach((client) => {
            if (client.client_name === clientChoose) {
                arr.push(client.id_client);
            }
        });
        setAllClientID(arr);
    }, [client, clientChoose]);

    return (
        <StatsPageStructureContext.Provider
            value={{
                testState,
                client,
                testSuite,
                allClientID,
                setTestSuiteChoose,
                testSuiteChoose,
                testSuiteFromVersion,
                dateChoose,
                setDateChoose,
                date,
                dateWithTS,
                testSuiteFromVersionWithDate,
                clientVersionChoose,
                setClientVersionChoose,
                modelChoose,
                setModelChoose,
            }}
        >
            <div className="StatsPageStructure">
                <div className="divider div-transparent" />
                <VersionTitle />
                <div className="divider div-transparent" />
                <StatsGraphPartStructure />
                <div className="divider div-transparent" />
                <div className="d-flex flex-row DownPart padding">
                    <TestInfoStructure />
                    <div className="dividerVertical div-transparentVertical" />
                    <Outlet
                    //TestAllInformation.tsx
                    />
                </div>
            </div>
        </StatsPageStructureContext.Provider>
    );
}

export default StatsPageStructure;
