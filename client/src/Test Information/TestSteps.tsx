/* ------------------- Composants Bootstrap ------------------- */

import InputGroup from 'react-bootstrap/InputGroup'
import { Button } from "react-bootstrap";

interface Props {
    testStep: Array<{description: string, testRailLink: string, verif: string}>
}


function TestSteps(props : Props) {
    return (
        <div className="secondPart d-flex flex-column">
            {
                props.testStep[0].description ? 
                props.testStep.map((step, key) => (
                    <div key={key}>
                        <p className="underline">{`Step ${key + 1} :`}</p>
                        <p>{step.description}<br/>{`► ${step.verif}`}</p>
                    </div>
                )) :
                (
                    <InputGroup className="mb-1 redirectTestRail">
                        <InputGroup.Text id="basic-addon1">
                            {props.testStep[0].testRailLink}
                        </InputGroup.Text>
                        <Button onClick={() => {window.open(props.testStep[0].testRailLink, '_blank', 'noopener,noreferrer')}}>
                            Open TestRail
                        </Button>
                    </InputGroup>
                )
            }
            
        </div>
    )
}

export default TestSteps;