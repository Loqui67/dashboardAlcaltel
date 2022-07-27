/* ------------------- Classes ------------------- */

import Utils from "../../classes/Utils";

/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types Interfaces Contexts ------------------- */

import { useStatsPageStructureContext } from "../../tools/context";

function SelectTS(): JSX.Element {
    const space = useMemo(() => new Utils(), []);

    const { setTestSuiteChoose, testSuiteFromVersion, setDateChoose } =
        useStatsPageStructureContext();

    const onChange = (e: any) => {
        setTestSuiteChoose(e.target.value);
        setDateChoose("");
    };

    return (
        <Form.Select
            id="TS"
            defaultValue={""}
            className="selectTestSuite form-select margin-top"
            onChange={(e: any) => onChange(e)}
        >
            <option value={""}>All</option>
            {Array.from(
                new Set(
                    testSuiteFromVersion.map((item) => item.testsSuites_name)
                )
            ).map((testSuite, key) => {
                let result = space.formatStringToUpperAndLowerCase(testSuite);
                return (
                    <option key={`${testSuite}-${key}`} value={testSuite}>
                        {result}
                    </option>
                );
            })}
        </Form.Select>
    );
}

export default SelectTS;
