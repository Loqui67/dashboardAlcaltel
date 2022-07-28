/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Components ------------------- */

import Paragraph from "../HTML components/Paragraph";

/* ------------------- Classes ------------------- */

import Utils from "../../classes/Utils";

/* ------------------- Types And Interfaces ------------------- */

import { TestSelectedDetailsProps } from "../../tools/typeAndInterface";

function TestSelectedDetails(props: TestSelectedDetailsProps): JSX.Element {
    const client = useMemo(
        () =>
            props.client.find(
                (client) => client.id_client === props.test.id_client
            ),
        [props.client, props.test.id_client]
    );
    const convertDate = useMemo(() => new Utils(), []);

    return (
        <div className="firstPart">
            <div>
                {client?.version ? (
                    <Paragraph
                        text={`Client : ${client.client_name} ${client.version}`}
                    />
                ) : null}
                {client?.model ? (
                    <Paragraph text={`Model : ${client.model}`} />
                ) : null}

                <Paragraph
                    text={`Tests suite : ${
                        props.testSuite.find(
                            (testSuite) =>
                                testSuite.id_testsSuites ===
                                props.test.id_testsSuites
                        )?.testsSuites_name
                    }`}
                />
                <Paragraph
                    text={`Date : ${convertDate.convertDateFromDbToRightFormat(
                        props.test.date
                    )}`}
                />
            </div>
        </div>
    );
}

export default TestSelectedDetails;
