/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils"

/* ------------------- React ------------------- */

import { Dispatch, SetStateAction } from 'react';

/* ------------------- Composants Bootstrap ------------------- */

import Form from 'react-bootstrap/Form'


interface Props {
    testSuiteFromVersion : Array<{id_testsSuites : number, testsSuites_name : string}>;
    setTestSuiteChoose : Dispatch<SetStateAction<number>>;
    setDateChoose : Dispatch<SetStateAction<string>>;
}

function SelectTS(props : Props) {

    const space = new Utils();

    return (
        <Form.Select id="TS" defaultValue={0} className={"selectTestSuite form-select margin-top"} onChange={(e: any) => {props.setTestSuiteChoose(parseInt(e.target.value)); props.setDateChoose("")}}>
            <option value={0}>All</option>
            {
                props.testSuiteFromVersion.map((testSuite, key) => {    
                    let result = space.formatStringToUpperAndLowerCase(testSuite.testsSuites_name);
                    return (
                        <option key={`${testSuite.id_testsSuites}-${key}`} value={testSuite.id_testsSuites}>{result}</option>
                    )
                })
            }
        </Form.Select>
    )
}

export default SelectTS; 