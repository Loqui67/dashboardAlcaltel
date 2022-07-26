/* ------------------- Composants Bootstrap ------------------- */

import Table from "react-bootstrap/Table";

/* ------------------- Types And Interfaces ------------------- */

import { TestHistoryProps } from "../toolbox/typeAndInterface";

function TestHistory(props: TestHistoryProps) {
    let lastVersion: string = "";
    let lastPatch: number = 0;

    return (
        <div className="margin-top">
            <Table striped bordered hover responsive>
                <tbody>
                    {props.testHistory.map((history, key) => {
                        if (history.version_name === lastVersion) {
                            return null;
                        } else {
                            lastVersion = history.version_name;
                            return (
                                <tr key={key}>
                                    {props.testHistory
                                        .filter(
                                            (name) =>
                                                name.version_name ===
                                                lastVersion
                                        )
                                        .map((value, key) => {
                                            if (value.patch === lastPatch) {
                                                return null;
                                            } else {
                                                lastPatch = value.patch;
                                                return (
                                                    <td key={key}>
                                                        {`In client ${lastVersion}.${lastPatch}, this test ${
                                                            value.currentState ===
                                                                "skipped" ||
                                                            value.currentState ===
                                                                "not run"
                                                                ? "was"
                                                                : ""
                                                        } ${
                                                            value.currentState
                                                        }`}
                                                    </td>
                                                );
                                            }
                                        })}
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default TestHistory;
