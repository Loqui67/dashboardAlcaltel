/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Classes ------------------- */


import Utils from "../classes/Utils";


interface Props {
    client: Array<{version: string, id_client: number, client_name: string, model: string}>
    test: {date: string, purpose: string, id_client: number, id_testsSuites: number}
    testSuite: Array<{id_testsSuites: number, testsSuites_name: string}>
}

function TestSelectedDetails(props : Props) {

    const convertDate = useMemo(() => new Utils(), [])
    return (
        <div className="firstPart">
            <p className="strong">{props.test.purpose}</p>
            {
                props.client.filter(client => client.id_client === props.test.id_client).map((client, key) => (
                <div key={key}>
                    <p>{`Client : ${client.client_name} ${client.version ? client.version : ""}`}</p>
                    {
                        client.model ? 
                            <p>{`Model : ${client.model}`}</p>
                        : null
                    }
                </div>
                ))
            }
            {
                props.testSuite.filter(testSuite => testSuite.id_testsSuites === props.test.id_testsSuites).map((testSuite, key) => (
                <p key={key}>{`Tests suite : ${testSuite.testsSuites_name}`}</p>
                ))
            }
            <p>{`Date : ${convertDate.convertDateFromDbToRightFormat(props.test.date)}`}</p>
        </div>
    )

}

export default TestSelectedDetails;