/* ------------------- React ------------------- */

import React, { useState, useCallback, useEffect, Dispatch, SetStateAction } from "react";

/* ------------------- Composants ------------------- */

import StatsGraphPartStructure from "./StatsGraphPartStructure";
import TestInfoStructure from "../Search Options-Results/TestInfoSearchPartStructure";
import VersionTitle from "./VersionTitle";

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';

/* ------------------- Librairies tierces ------------------- */

import { Outlet, useParams, useOutletContext } from "react-router-dom";


function StatsPageStructure() {
 
    let { id } = useParams<string>();

    type testSuiteType = Array<{
        id_testsSuites: number,
        testsSuites_name: string
    }>

    type testSuiteFromVersionType = Array<{
        id_testsSuites : number, 
        testsSuites_name : string, 
        id_client : number
    }>

    type testSuiteFromVersionWithDateType = Array<{
        id_testsSuites : number, 
        testsSuites_name : string, 
        id_client : number
    }>

    type testStateCountType = Array<{
        passed : number, 
        failed : number, 
        skipped : number
    }>

    type testStateCountWithDateType = Array<{
        passed : number, 
        failed : number, 
        skipped : number
    }>

    type testStateType = Array<{
        id_test: number, 
        id_state: number, 
        currentState: string, 
        id_testsSuites: number, 
        date: string, 
        id_client: number, 
        id_testRun: number, 
        name: string, 
        purpose: string
    }>
    
    type versionWithLogsType = Array<{
        id_testRun: number, 
        date: string, 
        error_message: string, 
        screenshot_luke: string, 
        screenshot_rey: string
    }>
    
    type clientType = Array<{
        version: string, 
        id_client: number, 
        client_name: string, 
        model: string
    }>
    
    type clientDistinctType = Array<{
        id_client: number, 
        client_name: string
    }>
    
    type clientChooseType = {
        name: string, 
        type: string
    }
    
    type versionType = Array<{
        id_version: number, 
        version_name: string, 
        patch: number
    }>
    
    type dateType = Array<{
        date: string
    }>
    
    type dateWithTSType = Array<{
        date: string, 
        id_testsSuites: number
    }>
    
    type stateType = Array<{
        id_state: number, 
        currentState: string
    }>
    
    type testHistoryType = Array<{
        version_name: string, 
        patch: number, 
        currentState:string
    }>
    
    type testStepType = Array<{
        description: string, 
        testRailLink: string, 
        verif: string
    }>


    const [testSuite, setTestSuite] = useState<testSuiteType>([]);
    const [testSuiteChoose, setTestSuiteChoose] = useState<number>(0);
    const [testSuiteFromVersion, setTestSuiteFromVersion] = useState<testSuiteFromVersionType>([]);
    const [testSuiteFromVersionWithDate, setTestSuiteFromVersionWithDate] = useState<testSuiteFromVersionWithDateType>([]);
    const [testStateCount, setTestStateCount] = useState<testStateCountType>([]);
    const [testStateCountWithDate, setTestStateCountWithDate] = useState<testStateCountWithDateType>([]);
    const [testState, setTestState] = useState<testStateType>([]);
    const [versionWithLogs, setVersionWithLogs] = useState<versionWithLogsType>([]);
    const [client, setClient] = useState<clientType>([]);
    const [allClientID, setAllClientID] = useState<Array<number>>([])
    const [clientDistinct, setClientDistinct] = useState<clientDistinctType>([]);
    const [clientChoose, setClientChoose] = useState<clientChooseType>({name: "Chrome", type: "Web"});
    const [version, setVersion] = useState<versionType>([]);
    const [date, setDate] = useState<dateType>([])
    const [dateWithTS, setDateWithTS] = useState<dateWithTSType>([])
    const [dateChoose, setDateChoose] = useState<string>("")
    const [state, setState] = useState<stateType>([])

    const [testHistory, setTestHistory] = useState<testHistoryType>([]);
    const [testStep, setTestStep] = useState<testStepType>([]);


    const allDateRequest = useCallback(async () => {
        let idNumber : number;
        id !== undefined ? idNumber = parseInt(id) : idNumber = 0
        const query = new GetFromDatabase(idNumber, clientChoose.name, dateChoose)
        if (dateChoose !== "") {
            setTestStateCountWithDate(await query.getTestStateCountWithDate())
        }
        setTestSuiteFromVersionWithDate(await query.getTestSuitesFromVersionWithDate());
        setDate(await query.getDate())
    }, [dateChoose, id, clientChoose])

    const allRequest = useCallback(async () => {
        let idNumber : number;
        id !== undefined ? idNumber = parseInt(id) : idNumber = 0       
        const query = new GetFromDatabase(idNumber, clientChoose.name, "")
        setTestSuiteFromVersion(await query.getTestSuitesFromVersion());
        setVersionWithLogs(await query.getVersionWithLogs());
        setTestStateCount(await query.getTestStateCount());
        setTestState(await query.getTestState());
        setClient(await query.getClient());
        setClientDistinct(await query.getClientDistinct());
        setVersion(await query.getVersion());
        setTestSuite(await query.getTestSuites());
        setDateWithTS(await query.getDateWithTS())
        setState(await query.getState())
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
            if (client.client_name === clientChoose.name) {
                arr.push(client.id_client)
            }
        })
        setAllClientID(arr)

    }, [client, clientChoose])


    return (
        <div className={"StatsContainerOne"}>

            <VersionTitle
                version={version}
                id={id !== undefined ? parseInt(id) : 0}
            />
            <div className="divider div-transparent" />

            <StatsGraphPartStructure
                clientDistinct={clientDistinct}
                allClientID={allClientID}
                setClientChoose={setClientChoose}
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
            />

            <div className="divider div-transparent" />
            <div className={"d-flex flex-row DownPart padding"}>
                <TestInfoStructure
                    allClientID={allClientID}
                    testSuiteChoose={testSuiteChoose}
                    testState={testState}
                    dateChoose={dateChoose}
                    state={state}
                />
                <div className="dividerVertical div-transparentVertical" />
                <Outlet context={{
                    testState,
                    client,
                    testSuite,
                    versionWithLogs,
                    testStep,
                    testHistory,
                    setTestStep,
                    setTestHistory,
                }} />
            </div>
        </div>
    )
}

export default StatsPageStructure;


type ContextType = { 
    testState:Array<{id_test: number, id_state: number, currentState: string, id_testsSuites: number, date: string, id_client: number, id_testRun: number, name: string, purpose: string}>
    client:Array<{version: string, id_client: number, client_name: string, model: string}>
    testSuite:Array<{id_testsSuites: number, testsSuites_name: string}>
    versionWithLogs:Array<{id_testRun: number, date: string, error_message: string, screenshot_luke: string, screenshot_rey: string}>
    testStep:Array<{description: string, testRailLink: string, verif: string}>
    testHistory:Array<{version_name: string, patch: number, currentState:string}>
    setTestStep:Dispatch<SetStateAction<Array<{description: string, testRailLink: string, verif: string}>>>
    setTestHistory:Dispatch<SetStateAction<Array<{version_name: string, patch: number, currentState:string}>>>
};

export function useOutletCntxt() {
    return useOutletContext<ContextType>();
  }