/* ------------------- React ------------------- */

import { useCallback, useEffect, useMemo, useState } from "react";

/* ------------------- Composants ------------------- */

import Modale from "./modale";
import Paragraph from "../HTML components/Paragraph";
import Image from "../HTML components/Image";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../../classes/GetFromDatabase";

/* ------------------- Types And Interfaces ------------------- */

import { versionWithLogsType } from "../../tools/typeAndInterface";

/* ------------------- Librairies tierces ------------------- */

import { useParams } from "react-router-dom";
import { serverAddress } from "../../tools/address";

function TestLogs(): JSX.Element {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [imageModale, setImageModale] = useState<string>("");
    const [screenshotClient, setScreenshotClient] = useState<string>("");
    const [versionWithLogs, setVersionWithLogs] = useState<versionWithLogsType>(
        []
    );

    const clientName = ["luke", "rey"];
    const prefix = useMemo(() => `${serverAddress}SeleniumReports/`, []);
    const logs = useMemo(
        () =>
            versionWithLogs[0] !== undefined ? versionWithLogs[0] : undefined,
        [versionWithLogs]
    );
    const date = useMemo(
        () => (logs !== undefined ? logs.date.replaceAll("-", ".") : ""),
        [logs]
    );

    function modale(
        screenshotClient: string,
        client: string,
        date: string,
        imageName: string
    ): void {
        setModalShow(true);
        setImageModale(`${prefix}${client}/${date}/${imageName}`);
        setScreenshotClient(screenshotClient);
    }

    const { client, testRunID } = useParams();

    const getLogs = useCallback(async () => {
        const query = new GetFromDatabase(0, "", "");
        setVersionWithLogs(
            await query.getVersionWithLogs(
                testRunID === undefined ? 0 : parseInt(testRunID)
            )
        );
    }, [testRunID]);

    useEffect((): void => {
        getLogs();
    }, [getLogs]);

    return logs !== undefined ? (
        <div>
            <div className="divider div-transparent" />
            <div className="d-flex flex-column padding">
                <div className="errorMessage">
                    <h6>Error message :</h6>
                    <Paragraph text={logs.error_message} />
                </div>
                <div className="d-flex flex-row imageContainer">
                    {clientName.map((name) => {
                        return (
                            <div className="screenCell d-flex flex-column padding">
                                <h6>{`${name} client screenshot :`}</h6>
                                <Image
                                    src={`${prefix}${client}/${date}/${
                                        logs[
                                            `screenshot_${name}` as keyof typeof logs
                                        ]
                                    }`}
                                    alt={`screenshot ${name}`}
                                    className="image"
                                    OnClick={() =>
                                        modale(
                                            name,
                                            client === undefined ? "" : client,
                                            date,
                                            logs[
                                                `screenshot_${name}` as keyof typeof logs
                                            ] as string
                                        )
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
                <Modale
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    imageModale={imageModale}
                    screenshotClient={screenshotClient}
                />
            </div>
        </div>
    ) : (
        <></>
    );
}

export default TestLogs;
