/* ------------------- React ------------------- */

import { useCallback, useEffect, useMemo, useState } from "react";

/* ------------------- Composants ------------------- */

import TestHistory from "./TestHistory";
import TestLogs from "./TestLogs";
import TestSteps from "./TestSteps";
import TestSelectedDetails from "./TestSelectedDetails";
import TestTitle from "../Stats Structure/TestTitle";

/* ------------------- Fonctions ------------------- */

import { useOutletCntxt } from "../Stats Structure/StatsPageStructure";

/* ------------------- Composants Bootstrap ------------------- */

import InputGroup from 'react-bootstrap/InputGroup'
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils"
import GetFromDatabase from "../classes/GetFromDatabase";

/* ------------------- FontAwesome ------------------- */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboardList, faCheck } from '@fortawesome/free-solid-svg-icons'

/* ------------------- Librairies tierces ------------------- */

import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";



function TestAllInformation() {
    library.add(faClipboardList, faCheck)

    
    const { testRunID } = useParams<string>();

    const { testState } = useOutletCntxt();
    const { client } = useOutletCntxt();
    const { clientChoose } = useOutletCntxt();
    const { testSuite } = useOutletCntxt();
    const { versionWithLogs } = useOutletCntxt();
    const { testStep } = useOutletCntxt();
    const { testHistory } = useOutletCntxt();
    const { setTestStep } = useOutletCntxt();
    const { setTestHistory } = useOutletCntxt();

    const [isCopied, setIsCopied] = useState(false);
    const query = useMemo(() => new GetFromDatabase(0, clientChoose, ""), [clientChoose])

    const getHistory = useCallback(async (name: string, id: number) => {
        if (await query.checkJWT()) {
            setTestHistory(await query.getHistory(name, id))
        }
    }, [setTestHistory, query])

    const getStep = useCallback(async () => {
        if (await query.checkJWT()) {
            let id;
            testRunID === undefined ? id = "0" : id = testRunID
            setTestStep(await query.getStep(id));
        }
    }, [setTestStep, query, testRunID])


    useEffect(() => {
        testState.filter((data) => testRunID !== undefined ? data.id_testRun === parseInt(testRunID) : data.id_testRun === 0).map((test) => {
            getHistory(test.name, testRunID !== undefined ? parseInt(testRunID) : 0);
            getStep();
            return null
        })
    }, [getHistory, getStep, testRunID, testState])

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            {
                isCopied ? (
                    "Link copied !"
                ) : (
                    "Copy to clipboard"
                )
            }
        </Tooltip>
    );

    const utils = new Utils()

    return (
        <div className="details">
            {
                testState.filter((tests: { id_testRun: number }) => testRunID !== undefined ? tests.id_testRun === parseInt(testRunID) : tests.id_testRun === 0)
                    .map((test, key: number) => {
                        let TxtColor = utils.testToColor(test.currentState);
                        return (
                            <div key={key} className="d-flex flex-column justify-content-start padding text-start">
                                <TestTitle
                                    test={test}
                                    TxtColor={TxtColor}
                                />
                                <div className="d-flex flex-row space-between desc">
                                    <TestSelectedDetails
                                        test={test}
                                        client={client}
                                        testSuite={testSuite}
                                    />
                                    <div className="dividerVertical div-transparentVertical" />
                                    {
                                        testStep[0] !== undefined &&
                                        <TestSteps
                                            testStep={testStep}
                                        />
                                    }
                                </div>
                                <div className="d-flex flex-column link margin-top">
                                    <Form.Label htmlFor="basic-url">Link :</Form.Label>
                                    <InputGroup className="mb-1">
                                        <InputGroup.Text id="basic-addon1">
                                            {window.location.href}
                                        </InputGroup.Text>
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}>
                                            <CopyToClipboard
                                                text={window.location.href}
                                                onCopy={() => {
                                                    setIsCopied(true);
                                                    setTimeout(() => {
                                                        setIsCopied(false);
                                                    }, 3000)
                                                }}>
                                                <Button className="copy">
                                                    {
                                                        isCopied ? (
                                                            <FontAwesomeIcon icon={["fas", "check"]} />
                                                        ) : (
                                                            <FontAwesomeIcon icon={["fas", "clipboard-list"]} />
                                                        )
                                                    }
                                                </Button>
                                            </CopyToClipboard>
                                        </OverlayTrigger>
                                    </InputGroup>
                                </div>
                                <div>
                                    <TestHistory
                                        testHistory={testHistory}
                                    />
                                </div>
                                <div>
                                    <TestLogs
                                        versionWithLogs={versionWithLogs}
                                        test={test}
                                    />
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    );
}

export default TestAllInformation;