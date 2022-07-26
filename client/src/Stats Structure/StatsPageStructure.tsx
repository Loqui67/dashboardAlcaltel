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
    testStateCountType,
    testStateCountWithDateType,
    testStateType,
    clientType,
    clientVersionType,
    clientVersionChooseType,
    versionType,
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
    const [testStateCount, setTestStateCount] = useState<testStateCountType>(
        []
    );
    const [testStateCountWithDate, setTestStateCountWithDate] =
        useState<testStateCountWithDateType>([]);
    const [testState, setTestState] = useState<testStateType>([]);
    const [client, setClient] = useState<clientType>([]);
    const [clientVersion, setClientVersion] = useState<clientVersionType>([]);
    const [clientVersionChoose, setClientVersionChoose] =
        useState<clientVersionChooseType>(0);
    const [allClientID, setAllClientID] = useState<allClientIDType>([]);
    const [version, setVersion] = useState<versionType>([]);
    const [date, setDate] = useState<dateType>([]);
    const [dateWithTS, setDateWithTS] = useState<dateWithTSType>([]);
    const [dateChoose, setDateChoose] = useState<dateChooseType>("");

    const [clientModel, setClientModel] = useState<Array<{ model: string }>>(
        []
    );
    const [modelChoose, setModelChoose] = useState<string>("");

    const allDateRequest = useCallback(async () => {
        let idNumber: number;
        id !== undefined ? (idNumber = parseInt(id)) : (idNumber = 0);
        const query = new GetFromDatabase(idNumber, clientChoose, dateChoose);
        if (await query.checkJWT()) {
            if (dateChoose !== "") {
                setTestStateCountWithDate(
                    await query.getTestStateCountWithDate()
                );
            }
            setTestSuiteFromVersionWithDate(
                await query.getTestSuitesFromVersionWithDate()
            );
            setDate(await query.getDate());
        }
    }, [dateChoose, id, clientChoose]);

    const allRequest = useCallback(async () => {
        let idNumber: number;
        id !== undefined ? (idNumber = parseInt(id)) : (idNumber = 0);
        const query = new GetFromDatabase(idNumber, clientChoose, "");
        if (await query.checkJWT()) {
            setClientVersion(await query.getClientVersion(clientChoose));
            setTestSuiteFromVersion(await query.getTestSuitesFromVersion());
            setTestStateCount(await query.getTestStateCount());
            setTestState(await query.getTestState());
            setClient(await query.getClient());
            setVersion(await query.getVersion());
            setTestSuite(await query.getTestSuites());
            setDateWithTS(await query.getDateWithTS());
            setClientModel(await query.getClientModel());
        }
    }, [id, clientChoose]);

    useEffect(() => {
        allRequest();
    }, [id, clientChoose, allRequest]);

    useEffect(() => {
        allDateRequest();
    }, [dateChoose, id, clientChoose, allDateRequest]);

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
                version,
                testState,
                client,
                testSuite,
                allClientID,
                clientVersion,
                setTestSuiteChoose,
                testSuiteChoose,
                testStateCount,
                testSuiteFromVersion,
                dateChoose,
                setDateChoose,
                date,
                dateWithTS,
                testSuiteFromVersionWithDate,
                testStateCountWithDate,
                clientVersionChoose,
                setClientVersionChoose,
                clientModel,
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
