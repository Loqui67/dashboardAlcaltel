import { createContext, Dispatch, SetStateAction, useContext } from "react";

import {
    allClientIDType,
    clientModelType,
    clientType,
    clientVersionChooseType,
    clientVersionType,
    dateChooseType,
    dateType,
    dateWithTSType,
    loginStatusType,
    modelChooseType,
    StatsContextType,
    testStateCountType,
    testStateCountWithDateType,
    testStateType,
    testSuiteChooseType,
    testSuiteFromVersionType,
    testSuiteFromVersionWithDateType,
    testSuiteType,
    versionType,
} from "./typeAndInterface";

//login context//

export type LoginContextType = {
    loginStatus: loginStatusType;
    setLoginStatus: Dispatch<SetStateAction<loginStatusType>>;
};

export const LoginContext = createContext<LoginContextType>({
    loginStatus: {
        username: "",
        isLogged: false,
        admin: false,
        message: "",
    },
    setLoginStatus: () => {},
});

export const useLoginContext = () => useContext(LoginContext);

//Stats context//

export const StatsContext = createContext<StatsContextType>({
    clientDistinct: [],
    clientChoose: "Chrome",
    setClientChoose: () => {},
});

export const useStatsContext = () => useContext(StatsContext);

//StatsPageStructure context//

export type StatsPageStructureContextType = {
    version: versionType;
    testState: testStateType;
    client: clientType;
    testSuite: testSuiteType;
    allClientID: allClientIDType;
    clientVersion: clientVersionType;
    setTestSuiteChoose: Dispatch<SetStateAction<testSuiteChooseType>>;
    testSuiteChoose: testSuiteChooseType;
    testStateCount: testStateCountType;
    testSuiteFromVersion: testSuiteFromVersionType;
    dateChoose: dateChooseType;
    setDateChoose: Dispatch<SetStateAction<dateChooseType>>;
    date: dateType;
    dateWithTS: dateWithTSType;
    testSuiteFromVersionWithDate: testSuiteFromVersionWithDateType;
    testStateCountWithDate: testStateCountWithDateType;
    clientVersionChoose: clientVersionChooseType;
    setClientVersionChoose: Dispatch<SetStateAction<clientVersionChooseType>>;
    clientModel: clientModelType;
    modelChoose: modelChooseType;
    setModelChoose: Dispatch<SetStateAction<modelChooseType>>;
};

export const StatsPageStructureContext =
    createContext<StatsPageStructureContextType>({
        version: [],
        testState: [],
        client: [],
        testSuite: [],
        allClientID: [],
        clientVersion: [],
        setTestSuiteChoose: () => {},
        testSuiteChoose: "",
        testStateCount: [],
        testSuiteFromVersion: [],
        dateChoose: "",
        setDateChoose: () => {},
        date: [],
        dateWithTS: [],
        testSuiteFromVersionWithDate: [],
        testStateCountWithDate: [],
        clientVersionChoose: 0,
        setClientVersionChoose: () => {},
        clientModel: [],
        modelChoose: "",
        setModelChoose: () => {},
    });

export const useStatsPageStructureContext = () =>
    useContext(StatsPageStructureContext);
