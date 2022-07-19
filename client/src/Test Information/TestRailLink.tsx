/* ------------------- Composants Bootstrap ------------------- */

import InputGroup from 'react-bootstrap/InputGroup'
import { Button } from "react-bootstrap";


interface Props {
    testStep: Array<{ description?: string, testRailLink?: string, verif?: string }>
}


function TestRailLink(props: Props) {

    return (
        <InputGroup className="mb-1 redirectTestRail">
            <InputGroup.Text id="basic-addon1">
                {props.testStep[0].testRailLink}
            </InputGroup.Text>
            <Button onClick={() => window.open(props.testStep[0].testRailLink, '_blank', 'noopener,noreferrer')}>
                Open TestRail
            </Button>
        </InputGroup>
    )
}

export default TestRailLink;