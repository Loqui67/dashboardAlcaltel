/* ------------------- React ------------------- */

import React, { useState, useCallback, useEffect } from "react";

/* ------------------- Composants ------------------- */

import StatsGraphPartStructure from "./StatsGraphPartStructure";
import TestInfoStructure from "../Search Options-Results/TestInfoSearchPartStructure";
import VersionTitle from "./VersionTitle";

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';

/* ------------------- Fonctions ------------------- */

import { useOutletCntxtStats } from "../Pages/Stats";

/* ------------------- Types And Interfaces ------------------- */

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
    stateType,
    dateChooseType,
    StatsPageStructureContextType
} from '../toolbox/typeAndInterface'

/* ------------------- Librairies tierces ------------------- */

import { Outlet, useParams, useOutletContext } from "react-router-dom";



function StatsPageStructure() {

    let { id } = useParams<string>();

    const { clientDistinct } = useOutletCntxtStats();
    const { clientChoose } = useOutletCntxtStats();
    const { setClientChoose } = useOutletCntxtStats();

    const [testSuite, setTestSuite] = useState<testSuiteType>([]);
    const [testSuiteChoose, setTestSuiteChoose] = useState<testSuiteChooseType>("");
    const [testSuiteFromVersion, setTestSuiteFromVersion] = useState<testSuiteFromVersionType>([]);
    const [testSuiteFromVersionWithDate, setTestSuiteFromVersionWithDate] = useState<testSuiteFromVersionWithDateType>([]);
    const [testStateCount, setTestStateCount] = useState<testStateCountType>([]);
    const [testStateCountWithDate, setTestStateCountWithDate] = useState<testStateCountWithDateType>([]);
    const [testState, setTestState] = useState<testStateType>([]);
    const [client, setClient] = useState<clientType>([]);
    const [clientVersion, setClientVersion] = useState<clientVersionType>([]);
    const [clientVersionChoose, setClientVersionChoose] = useState<clientVersionChooseType>(0)
    const [allClientID, setAllClientID] = useState<allClientIDType>([])
    const [version, setVersion] = useState<versionType>([]);
    const [date, setDate] = useState<dateType>([])
    const [dateWithTS, setDateWithTS] = useState<dateWithTSType>([])
    const [dateChoose, setDateChoose] = useState<dateChooseType>("")
    const [state, setState] = useState<stateType>([])


    const allDateRequest = useCallback(async () => {
        let idNumber: number;
        id !== undefined ? idNumber = parseInt(id) : idNumber = 0
        const query = new GetFromDatabase(idNumber, clientChoose, dateChoose)
        if (await query.checkJWT()) {
            if (dateChoose !== "") {
                setTestStateCountWithDate(await query.getTestStateCountWithDate())
            }
            setTestSuiteFromVersionWithDate(await query.getTestSuitesFromVersionWithDate());
            setDate(await query.getDate())
        }
    }, [dateChoose, id, clientChoose])

    const allRequest = useCallback(async () => {
        let idNumber: number;
        id !== undefined ? idNumber = parseInt(id) : idNumber = 0
        const query = new GetFromDatabase(idNumber, clientChoose, "")
        if (await query.checkJWT()) {
            setClientVersion(await query.getClientVersion(clientChoose));
            setTestSuiteFromVersion(await query.getTestSuitesFromVersion());
            setTestStateCount(await query.getTestStateCount());
            setTestState(await query.getTestState());
            setClient(await query.getClient());
            setVersion(await query.getVersion());
            setTestSuite(await query.getTestSuites());
            setDateWithTS(await query.getDateWithTS())
            setState(await query.getState())
        }
    }, [id, clientChoose])

    useEffect(() => {
        allRequest();
    }, [id, clientChoose, allRequest])

    useEffect(() => {
        allDateRequest();
    }, [dateChoose, id, clientChoose, allDateRequest])


    useEffect(() => {
        const arr: Array<number> = [];
        client.forEach(client => {
            if (client.client_name === clientChoose) {
                arr.push(client.id_client)
            }
        })
        setAllClientID(arr)

    }, [client, clientChoose])


    return (
        <div className="StatsPageStructure">
            <div className="divider div-transparent" />
            <VersionTitle
                version={version}
                id={id !== undefined ? parseInt(id) : 0}
                clientChoose={clientChoose}
            />
            <div className="divider div-transparent" />

            <StatsGraphPartStructure
                clientDistinct={clientDistinct}
                allClientID={allClientID}
                setClientChoose={setClientChoose}
                clientVersion={clientVersion}
                setTestSuiteChoose={setTestSuiteChoose}
                testSuiteChoose={testSuiteChoose}
                testState={testState}
                testStateCount={testStateCount}
                testSuiteFromVersion={testSuiteFromVersion}
                dateChoose={dateChoose}
                setDateChoose={setDateChoose}
                date={date}
                dateWithTS={dateWithTS}
                testSuiteFromVersionWithDate={testSuiteFromVersionWithDate}
                testStateCountWithDate={testStateCountWithDate}
                clientVersionChoose={clientVersionChoose}
                setClientVersionChoose={setClientVersionChoose}
            />

            <div className="divider div-transparent" />
            <div className="d-flex flex-row DownPart padding">
                <TestInfoStructure
                    allClientID={allClientID}
                    clientVersionChoose={clientVersionChoose}
                    testSuiteChoose={testSuiteChoose}
                    testState={testState}
                    dateChoose={dateChoose}
                    state={state}
                />
                <div className="dividerVertical div-transparentVertical" />
                <Outlet context={{ //TestAllInformation.tsx
                    testState,
                    client,
                    clientChoose,
                    testSuite,
                }} />
            </div>
        </div>
    )
}

export default StatsPageStructure;


export function useOutletCntxt() {
    return useOutletContext<StatsPageStructureContextType>();
}