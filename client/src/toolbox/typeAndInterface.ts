/* ------------------- import ------------------- */

import { Dispatch, SetStateAction } from "react";
import { ChartData } from 'chart.js'
import { dataChartTypeName } from "./enum";

/* ------------------- export ------------------- */

/* ------------------- Enter New Password and confirm ------------------- */

export interface ConfirmPasswordProps {
    username: string
    setStep: Dispatch<SetStateAction<boolean>>;
}

export interface isPasswordCorrectType {
    state: boolean,
    message: string
}

export interface EnterNewPasswordProps {
    username: string;
}

/* ------------------- All charts components ------------------- */

export interface Bar100ChartProps {
    chartData: ChartData<dataChartTypeName.bar100>;
}

export interface BarChartProps {
    chartData: ChartData<dataChartTypeName.bar>;
}

export interface PieChartProps {
    chartData: ChartData<dataChartTypeName.doughnut>;
}

export interface ChooseChartsProps {
    testSuiteChoose: string;
    userDataBarChart: ChartData<dataChartTypeName.bar>;
    userDataPieChart: ChartData<dataChartTypeName.doughnut>;
    userDataBar100Chart: ChartData<dataChartTypeName.bar100>;
}

/* ------------------- Login ------------------- */

export interface loginStatusType {
    username: string,
    admin: boolean,
    isLogged: boolean,
    message: string
}

export interface isLoggedType {
    loggedIn: boolean,
    user: Array<any>
}

export interface LoginPageProps {
    loginStatus: { error?: boolean, message: string, username: string, admin: boolean, isLogged: boolean };
    setLoginStatus: Dispatch<SetStateAction<{ error?: boolean, message: string, username: string, admin: boolean, isLogged: boolean }>>;
}

export interface Ilogin {
    error?: boolean,
    message: string,
    username: string,
    admin: boolean,
    auth: boolean,
    token: string
}

export interface NavBarProps {
    setLoginStatus: Dispatch<SetStateAction<{ admin: boolean, username: string, isLogged: boolean, message: string }>>
    loginStatus: { admin: boolean, username: string, isLogged: boolean }
}

/* ------------------- Stats ------------------- */

export type clientDistinctType = Array<{
    id_client: number,
    client_name: string
}>

/* ------------------- Context Type ------------------- */

export type StatsContextType = {
    clientDistinct: clientDistinctType
    clientChoose: string
    setClientChoose: Dispatch<SetStateAction<string>>
};

export type StatsPageStructureContextType = {
    testState: testStateType
    client: clientType
    clientChoose: string
    testSuite: testSuiteType
};

/* ------------------- StatsGraphPartStructureProps ------------------- */

export interface StatsGraphPartStructureProps {
    testStateCount: testStateCountType
    testSuiteFromVersion: testSuiteFromVersionType
    testState: testStateType
    testSuiteChoose: string;
    dateChoose: string;
    testSuiteFromVersionWithDate: testSuiteFromVersionWithDateType
    testStateCountWithDate: testStateCountWithDateType
    allClientID: Array<number>;
    clientVersionChoose: number;
    clientDistinct: clientDistinctType
    clientVersion: clientVersionType
    date: dateType
    dateWithTS: dateWithTSType
    setClientVersionChoose: Dispatch<SetStateAction<number>>;
    setClientChoose: Dispatch<SetStateAction<string>>;
    setTestSuiteChoose: Dispatch<SetStateAction<string>>;
    setDateChoose: Dispatch<SetStateAction<string>>;
}

/* ------------------- StatsPageStructure ------------------- */

export type testSuiteType = Array<{
    id_testsSuites: number,
    testsSuites_name: string
}>

export type testSuiteFromVersionType = Array<{
    id_testsSuites: number,
    testsSuites_name: string,
    id_client: number
}>

export type testSuiteFromVersionWithDateType = Array<{
    id_testsSuites: number,
    testsSuites_name: string,
    id_client: number,
    date: string
}>

export type testStateCountType = Array<{
    passed: number,
    failed: number,
    skipped: number
}>

export type testStateCountWithDateType = Array<{
    passed: number,
    failed: number,
    skipped: number
}>

export type testStateType = Array<{
    id_test: number,
    id_state: number,
    currentState: string,
    id_testsSuites: number,
    testsSuites_name: string,
    date: string,
    id_client: number,
    id_testRun: number,
    name: string,
    purpose: string
}>

export type clientType = Array<{
    version: string,
    id_client: number,
    client_name: string,
    model: string
}>

export type clientVersionType = Array<{
    id_client: number,
    version: string
}>

export type versionType = Array<{
    id_version: number,
    version_name: string,
    patch: number
}>

export type dateType = Array<{
    date: string
}>

export type dateWithTSType = Array<{
    date: string,
    id_testsSuites: number,
    testsSuites_name: string
}>

export type stateType = Array<{
    id_state: number,
    currentState: string
}>

/* ------------------- Title ------------------- */

export interface TestTitleProps {
    TxtColor: string;
    test: { name: string, currentState: string };
}

export interface VersionTitleProps {
    version: versionType
    id: number;
    clientChoose: string
}

/* ------------------- Modale ------------------- */

export interface ModaleProps {
    screenshotClient: string
    imageModale: string
    onHide: () => void;
    show: boolean
}

/* ------------------- Test details ------------------- */

export type testHistoryType = Array<{
    version_name: string,
    patch: number,
    currentState: string
}>

export interface TestHistoryProps {
    testHistory: testHistoryType
}

export type testStepType = Array<{
    description: string,
    testRailLink: string,
    verif: string
}>

export interface TestStepsProps {
    testStep: testStepType
}

export interface TestRailLinkProps {
    testStep: testStepType
}

export type versionWithLogsType = Array<{
    id_testRun: number,
    date: string,
    error_message: string,
    screenshot_luke: string,
    screenshot_rey: string
}>

export interface TestSelectedDetailsProps {
    client: clientType
    test: { date: string, purpose: string, id_client: number, id_testsSuites: number }
    testSuite: testSuiteType
}

/* ------------------- Test search ------------------- */

export interface DropdownVersionPatchContentProps {
    clientChoose: string
}

export interface SelectClientProps {
    clientDistinct: clientDistinctType
    setClientChoose: Dispatch<SetStateAction<string>>;
    clientChoose: string
    client: string | undefined
}

export interface SelectClientVersionProps {
    clientVersion: clientVersionType
    setClientVersionChoose: Dispatch<SetStateAction<number>>;
}

export interface SelectDateProps {
    date: dateType
    dateWithTS: dateWithTSType
    setDateChoose: Dispatch<SetStateAction<string>>;
    dateChoose: string;
    testSuiteChoose: string;
}

export interface SelectStateProps {
    state: stateType
    setStateChoose: Dispatch<SetStateAction<number>>;
}

export interface SelectTSProps {
    testSuiteFromVersion: testSuiteFromVersionType
    setTestSuiteChoose: Dispatch<SetStateAction<string>>;
    setDateChoose: Dispatch<SetStateAction<string>>;
}

export interface TestInfoStructureProps {
    testState: testStateType
    state: stateType
    testSuiteChoose: string
    allClientID: Array<number>
    clientVersionChoose: number
    dateChoose: string
}

export interface TestSearchResultProps {
    pageVisited: number;
    userPerPage: number;
    search: Array<{ currentState: string, id_test: number, id_testRun: number, name: string }>
}