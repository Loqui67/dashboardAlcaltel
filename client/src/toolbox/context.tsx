import { createContext, Dispatch, SetStateAction, useContext } from "react";

import {
    allClientIDType,
    clientType,
    clientVersionChooseType,
    dateChooseType,
    dateType,
    dateWithTSType,
    loginStatusType,
    modelChooseType,
    StatsContextType,
    testStateType,
    testSuiteChooseType,
    testSuiteFromVersionType,
    testSuiteFromVersionWithDateType,
    testSuiteType,
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
    clientChoose: "Chrome",
    setClientChoose: () => {},
});

export const useStatsContext = () => useContext(StatsContext);

//StatsPageStructure context//

export type StatsPageStructureContextType = {
    testState: testStateType;
    client: clientType;
    testSuite: testSuiteType;
    allClientID: allClientIDType;
    setTestSuiteChoose: Dispatch<SetStateAction<testSuiteChooseType>>;
    testSuiteChoose: testSuiteChooseType;
    testSuiteFromVersion: testSuiteFromVersionType;
    dateChoose: dateChooseType;
    setDateChoose: Dispatch<SetStateAction<dateChooseType>>;
    date: dateType;
    dateWithTS: dateWithTSType;
    testSuiteFromVersionWithDate: testSuiteFromVersionWithDateType;
    clientVersionChoose: clientVersionChooseType;
    setClientVersionChoose: Dispatch<SetStateAction<clientVersionChooseType>>;
    modelChoose: modelChooseType;
    setModelChoose: Dispatch<SetStateAction<modelChooseType>>;
};

export const StatsPageStructureContext =
    createContext<StatsPageStructureContextType>({
        testState: [],
        client: [],
        testSuite: [],
        allClientID: [],
        setTestSuiteChoose: () => {},
        testSuiteChoose: "",
        testSuiteFromVersion: [],
        dateChoose: "",
        setDateChoose: () => {},
        date: [],
        dateWithTS: [],
        testSuiteFromVersionWithDate: [],
        clientVersionChoose: 0,
        setClientVersionChoose: () => {},
        modelChoose: "",
        setModelChoose: () => {},
    });

export const useStatsPageStructureContext = () =>
    useContext(StatsPageStructureContext);
