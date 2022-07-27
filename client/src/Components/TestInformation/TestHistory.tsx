/* ------------------- Composants Bootstrap ------------------- */

import { useCallback, useEffect, useMemo, useState } from "react";

/* ------------------- Composants Bootstrap ------------------- */

import Table from "react-bootstrap/Table";

/* ------------------- Classes ------------------- */

import Utils from "../../classes/Utils";

/* ------------------- Types And Interfaces ------------------- */

import { TestHistoryProps } from "../../tools/typeAndInterface";

function TestHistory(props: TestHistoryProps): JSX.Element {
    const [versionUnique, setVersionUnique] = useState<Array<any>>([]);
    const [patchUnique, setPatchUnique] = useState<Array<Array<any>>>([]);

    //TODO Opti a faire, pq pas un foreach version puis foreach patch (en créant un tableau avec les valeurs uniques)
    const utils = useMemo(() => new Utils(), []);

    const VersionUnique = useCallback(() => {
        setVersionUnique(
            utils.getUniqueValueFromArrayOfObject(
                props.testHistory,
                "version_name"
            )
        );
    }, [utils, props.testHistory]);

    const PatchUnique = useCallback(() => {
        setPatchUnique(
            versionUnique.map((version) => {
                return utils.getUniqueValueFromArrayOfObject(
                    props.testHistory.filter(
                        (element) =>
                            element.version_name === version.version_name
                    ),
                    "patch"
                );
            })
        );
    }, [versionUnique, props.testHistory, utils]);

    useEffect((): void => {
        VersionUnique();
        PatchUnique();
    }, [VersionUnique, PatchUnique]);

    return (
        <div className="margin-top">
            {versionUnique[0] !== undefined && patchUnique[0] !== undefined ? (
                <Table striped bordered hover responsive>
                    <tbody>
                        {versionUnique.map((version, versionKey) => {
                            return (
                                <tr key={versionKey}>
                                    {patchUnique[versionKey].map(
                                        (patch, patchKey) => {
                                            return (
                                                <td key={patchKey}>
                                                    {`client ${version.version_name}.${patch.patch} : test ${patch.currentState}`}
                                                </td>
                                            );
                                        }
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : null}
        </div>
    );
}

export default TestHistory;
