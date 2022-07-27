/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Components ------------------- */

import Paragraph from "../HTML components/Paragraph";

/* ------------------- Classes ------------------- */

import Utils from "../../classes/Utils";

/* ------------------- Types And Interfaces ------------------- */

import { TestSelectedDetailsProps } from "../../tools/typeAndInterface";

function TestSelectedDetails(props: TestSelectedDetailsProps): JSX.Element {
    const convertDate = useMemo(() => new Utils(), []);
    return (
        <div className="firstPart">
            {props.client
                .filter((client) => client.id_client === props.test.id_client)
                .map((client, key) => (
                    <div key={key}>
                        <Paragraph
                            text={`Client : ${client.client_name} ${
                                client.version ? client.version : ""
                            }`}
                        />
                        {client.model ? (
                            <Paragraph text={`Model : ${client.model}`} />
                        ) : null}
                    </div>
                ))}
            {props.testSuite
                .filter(
                    (testSuite) =>
                        testSuite.id_testsSuites === props.test.id_testsSuites
                )
                .map((testSuite, key) => (
                    <Paragraph
                        key={key}
                        _key={key}
                        text={`Tests suite : ${testSuite.testsSuites_name}`}
                    />
                ))}
            <Paragraph
                text={`Date : ${convertDate.convertDateFromDbToRightFormat(
                    props.test.date
                )}`}
            />
        </div>
    );
}

export default TestSelectedDetails;
