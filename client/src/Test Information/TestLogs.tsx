/* ------------------- Composants ------------------- */

import Modale from "./modale";
import Paragraph from "../HTML components/Paragraph";

/* ------------------- React ------------------- */

import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
    versionWithLogs: Array<{ id_testRun: number, date: string, error_message: string, screenshot_luke: string, screenshot_rey: string }>
    test: { id_testRun: number }
}

function TestLogs(props: Props) {

    const [modalShow, setModalShow] = useState<boolean>(false);
    const [imageModale, setImageModale] = useState<string>("");
    const [screenshotClient, setScreenshotClient] = useState<string>("");

    const prefix = useMemo(() => "http://ns3053040.ip-137-74-95.eu:3001/SeleniumReports/", []);


    function modale(screenshotClient: string, client: string, date: string, imageName: string) {
        setModalShow(true);
        setImageModale(`${prefix}${client}/${date}/${imageName}`)
        setScreenshotClient(screenshotClient);
    }

    const { client } = useParams();

    return (
        <>
            {
                props.versionWithLogs.filter(versionWithLogs => versionWithLogs.id_testRun === props.test.id_testRun).map((logs, key) => {
                    const date = `${logs.date.slice(0, 4)}.${logs.date.slice(5, 7)}.${logs.date.slice(8, 10)}`;
                    return (
                        <div key={key}>
                            <div className="divider div-transparent" />
                            <div className="d-flex flex-column padding">
                                <div className="errorMessage">
                                    <h6>Error message :</h6>
                                    <Paragraph text={logs.error_message} />
                                </div>
                                <div className="d-flex flex-row imageContainer">
                                    <div className="screenCell d-flex flex-column padding">
                                        <h6>Luke client screenshot :</h6>
                                        <img src={`${prefix}${client}/${date}/${logs.screenshot_luke}`} alt="screenshot luke" className="image" onClick={() => modale("Luke", client === undefined ? "" : client, date, logs.screenshot_luke)} />
                                    </div>
                                    <div className="screenCell d-flex flex-column padding">
                                        <h6>Rey client screenshot :</h6>
                                        <img src={`${prefix}${client}/${date}/${logs.screenshot_rey}`} alt="screenshot rey" className="image" onClick={() => modale("Rey", client === undefined ? "" : client, date, logs.screenshot_rey)} />
                                    </div>
                                </div>
                                <Modale show={modalShow} onHide={() => setModalShow(false)} imageModale={imageModale} screenshotClient={screenshotClient} />
                            </div>
                        </div>
                    )
                })
            }
        </>

    )
}

export default TestLogs;