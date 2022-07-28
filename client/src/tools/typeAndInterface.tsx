/* ------------------- import ------------------- */

import { Dispatch, SetStateAction } from "react";
import { ChartData } from "chart.js";
import { dataChartTypeName } from "./enum";

/* ------------------- export ------------------- */

/* ------------------- Enter New Password and confirm ------------------- */

export interface ConfirmPasswordProps {
    username: string;
    setStep: Dispatch<SetStateAction<boolean>>;
}

export interface isPasswordCorrectType {
    state: boolean;
    message: string;
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
    userDataBarChart: ChartData<dataChartTypeName.bar>;
    userDataPieChart: ChartData<dataChartTypeName.doughnut>;
    userDataBar100Chart: ChartData<dataChartTypeName.bar100>;
}

/* ------------------- Login/reg ------------------- */

export type loginStatusType = {
    error?: boolean;
    username: string;
    admin: boolean;
    isLogged: boolean;
    message: string;
};

export type isLoggedType = {
    loggedIn: boolean;
    user: Array<any>;
};

export interface LoginPageProps {
    loginStatus: loginStatusType;
    setLoginStatus: Dispatch<SetStateAction<loginStatusType>>;
}

export interface Ilogin {
    error?: boolean;
    message: string;
    username: string;
    admin: boolean;
    auth: boolean;
    token: string;
}

export interface NavBarProps {
    setLoginStatus: Dispatch<SetStateAction<loginStatusType>>;
    loginStatus: loginStatusType;
}

export type regStateType = {
    message?: string;
    state: boolean;
};

export type isUpdatedType = {
    state: boolean;
    message: string;
};

/* ------------------- Stats ------------------- */

export type clientDistinctType = Array<{
    id_client: number;
    client_name: string;
}>;

export type clientChooseType = string;

/* ------------------- Context Type ------------------- */

export type StatsContextType = {
    clientChoose: string;
    setClientChoose: Dispatch<SetStateAction<string>>;
};

export type StatsPageStructureContextType = {
    testState: testStateType;
    client: clientType;
    clientChoose: string;
    testSuite: testSuiteType;
};

/* ------------------- StatsGraphPartStructureProps ------------------- */

export interface StatsGraphPartStructureProps {
    testStateCount: testStateCountType;
    testSuiteFromVersion: testSuiteFromVersionType;
    testState: testStateType;
    testSuiteChoose: testSuiteChooseType;
    dateChoose: dateChooseType;
    testSuiteFromVersionWithDate: testSuiteFromVersionWithDateType;
    testStateCountWithDate: testStateCountWithDateType;
    allClientID: allClientIDType;
    clientVersionChoose: clientVersionChooseType;
    clientModel: clientModelType;
    clientVersion: clientVersionType;
    date: dateType;
    dateWithTS: dateWithTSType;
    modelChoose: modelChooseType;
    setModelChoose: Dispatch<SetStateAction<modelChooseType>>;
    setClientVersionChoose: Dispatch<SetStateAction<clientVersionChooseType>>;
    setTestSuiteChoose: Dispatch<SetStateAction<testSuiteChooseType>>;
    setDateChoose: Dispatch<SetStateAction<dateChooseType>>;
}

/* ------------------- StatsPageStructure ------------------- */

export type testSuiteType = Array<{
    id_testsSuites: number;
    testsSuites_name: string;
}>;

export type testSuiteChooseType = string;

export type testSuiteFromVersionType = Array<{
    id_testsSuites: number;
    testsSuites_name: string;
    id_client: number;
}>;

export type testSuiteFromVersionWithDateType = Array<{
    id_testsSuites: number;
    testsSuites_name: string;
    id_client: number;
    date: string;
}>;

export type testStateCountType = Array<{
    passed: number;
    failed: number;
    skipped: number;
}>;

export type testStateCountWithDateType = Array<{
    passed: number;
    failed: number;
    skipped: number;
}>;

export type testStateType = Array<{
    id_test: number;
    id_state: number;
    currentState: string;
    id_testsSuites: number;
    testsSuites_name: string;
    date: string;
    id_client: number;
    id_testRun: number;
    name: string;
    purpose: string;
    model: string;
}>;

export type thisTestType =
    | {
          id_test: number;
          id_state: number;
          currentState: string;
          id_testsSuites: number;
          testsSuites_name: string;
          date: string;
          id_client: number;
          id_testRun: number;
          name: string;
          purpose: string;
          model: string;
      }
    | undefined;

export type clientType = Array<{
    version: string;
    id_client: number;
    client_name: string;
    model: string;
}>;

export type clientVersionType = Array<{
    id_client: number;
    version: string;
}>;

export type clientModelType = Array<{
    model: string;
}>;

export type clientVersionChooseType = number;

export type allClientIDType = Array<number>;

export type versionType = {
    id_version: number;
    version_name: string;
    patch: number;
};

export type dateType = Array<{
    date: string;
}>;

export type dateWithTSType = Array<{
    date: string;
    id_testsSuites: number;
    testsSuites_name: string;
}>;

export type modelChooseType = string;

export type dateChooseType = string;

export type stateType = Array<{
    id_state: number;
    currentState: string;
}>;

export type versionFromClientType = Array<{
    id_version: number;
    version_name: string;
    patch: number;
}>;

/* ------------------- Title ------------------- */

export interface TestTitleProps {
    TxtColor: string;
    test: { name: string; currentState: string };
}

export interface VersionTitleProps {
    version: versionType;
}

/* ------------------- Modale ------------------- */

export interface ModaleProps {
    screenshotClient: string;
    imageModale: string;
    onHide: () => void;
    show: boolean;
}

/* ------------------- Test details ------------------- */

export type testHistoryType = Array<{
    version_name: string;
    patch: number;
    currentState: string;
}>;

export interface TestHistoryProps {
    testHistory: testHistoryType;
}

export type testStepType = Array<{
    description: string;
    testRailLink: string;
    verif: string;
}>;

export interface TestStepsProps {
    testStep: testStepType;
}

export interface TestRailLinkProps {
    testStep: testStepType;
}

export type versionWithLogsType = Array<{
    id_testRun: number;
    date: string;
    error_message: string;
    screenshot_luke: string;
    screenshot_rey: string;
}>;

export interface TestSelectedDetailsProps {
    client: clientType;
    test: {
        date: string;
        purpose: string;
        id_client: number;
        id_testsSuites: number;
    };
    testSuite: testSuiteType;
}

/* ------------------- Test search ------------------- */

export type stateChooseType = number;

export type searchType = Array<{
    currentState: string;
    id_test: number;
    id_testRun: number;
    name: string;
}>;

export interface DropdownVersionPatchContentProps {
    clientChoose: clientChooseType;
}

export interface SelectClientProps {
    client: string | undefined;
}

export interface SelectClientVersionProps {
    clientVersion: clientVersionType;
    setClientVersionChoose: Dispatch<SetStateAction<clientVersionChooseType>>;
}

export interface SelectDateProps {
    date: dateType;
    dateWithTS: dateWithTSType;
    setDateChoose: Dispatch<SetStateAction<dateChooseType>>;
    dateChoose: dateChooseType;
    testSuiteChoose: testSuiteChooseType;
}

export interface SelectStateProps {
    setStateChoose: Dispatch<SetStateAction<stateChooseType>>;
}

export interface SelectTSProps {
    testSuiteFromVersion: testSuiteFromVersionType;
    setTestSuiteChoose: Dispatch<SetStateAction<testSuiteChooseType>>;
    setDateChoose: Dispatch<SetStateAction<dateChooseType>>;
}

export interface TestInfoStructureProps {
    testState: testStateType;
    testSuiteChoose: testSuiteChooseType;
    allClientID: allClientIDType;
    clientVersionChoose: clientVersionChooseType;
    dateChoose: dateChooseType;
    modelChoose: modelChooseType;
}

export interface TestSearchResultProps {
    pageVisited: number;
    userPerPage: number;
    search: searchType;
}

export interface SelectModelProps {
    clientModel: clientModelType;
    setModelChoose: Dispatch<SetStateAction<modelChooseType>>;
}
