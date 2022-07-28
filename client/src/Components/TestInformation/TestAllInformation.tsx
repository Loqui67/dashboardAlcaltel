/* ------------------- React ------------------- */

import { useCallback, useEffect, useMemo, useState } from "react";

/* ------------------- Composants ------------------- */

import TestHistory from "./TestHistory";
import TestLogs from "./TestLogs";
import TestSteps from "./TestSteps";
import TestSelectedDetails from "./TestSelectedDetails";
import TestTitle from "../Stats Structure/TestTitle";
import Paragraph from "../HTML components/Paragraph";

/* ------------------- Classes ------------------- */

import Utils from "../../classes/Utils";
import GetFromDatabase from "../../classes/GetFromDatabase";

/* ------------------- Types Interfaces Contexts ------------------- */

import {
    testHistoryType,
    testStepType,
    thisTestType,
} from "../../tools/typeAndInterface";
import {
    useStatsPageStructureContext,
    useStatsContext,
} from "../../tools/context";

/* ------------------- Librairies tierces ------------------- */

import { useParams } from "react-router-dom";
import LinkToTest from "./LinkToTest";

function TestAllInformation(): JSX.Element {
    const { testRunID } = useParams<string>();
    const { testState, client, testSuite } = useStatsPageStructureContext();
    const { clientChoose } = useStatsContext();

    const [testHistory, setTestHistory] = useState<testHistoryType>([]);
    const [testStep, setTestStep] = useState<testStepType>([]);

    const [thisTest, setThisTest] = useState<thisTestType>();

    const { id } = useParams();

    const query = useMemo(
        () =>
            new GetFromDatabase(
                id === undefined ? 0 : parseInt(id),
                clientChoose,
                ""
            ),
        [id, clientChoose]
    );

    const getStepAndHistory = useCallback(
        async (id: number) => {
            if (testState[0] !== undefined) {
                const name = testState.filter((test) => test.id_testRun === id);
                setTestHistory(await query.getHistory(name[0].name));
                setTestStep(await query.getStep(id));
            }
        },
        [setTestStep, setTestHistory, query, testState]
    );

    useEffect((): void => {
        getStepAndHistory(testRunID === undefined ? 0 : parseInt(testRunID));
    }, [getStepAndHistory, testRunID, testState]);

    const utils = useMemo(() => new Utils(), []);

    useEffect((): void => {
        setThisTest(
            testState.find((tests: { id_testRun: number }) =>
                testRunID !== undefined
                    ? tests.id_testRun === parseInt(testRunID)
                    : tests.id_testRun === 0
            )
        );
    }, [testState, testRunID]);

    return thisTest !== undefined ? (
        <div className="details">
            <div className="d-flex flex-column justify-content-start padding text-start">
                <TestTitle
                    test={thisTest}
                    TxtColor={utils.testToColor(thisTest.currentState)}
                />
                <Paragraph
                    text={thisTest.purpose.replaceAll("_", " ")}
                    className="strong"
                />
                <div className="d-flex flex-row space-between desc">
                    <TestSelectedDetails
                        test={thisTest}
                        client={client}
                        testSuite={testSuite}
                    />
                    <div className="dividerVertical div-transparentVertical" />
                    {testStep[0] !== undefined && (
                        <TestSteps testStep={testStep} />
                    )}
                </div>
                <LinkToTest />
                <div>
                    {testHistory[0] !== undefined && (
                        <TestHistory testHistory={testHistory} />
                    )}
                </div>
                <div>
                    <TestLogs />
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
}

export default TestAllInformation;
