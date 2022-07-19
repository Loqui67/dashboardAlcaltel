/* ------------------- Composants HTML ------------------- */

import Paragraph from '../HTML components/Paragraph';

/* ------------------- Composants ------------------- */

import TestRailLink from './TestRailLink';

interface Props {
    testStep: Array<{ description: string, testRailLink: string, verif: string }>
}


function TestSteps(props: Props) {
    return (
        <div className="secondPart d-flex flex-column">
            {
                props.testStep[0].description &&
                props.testStep.map((step, key) => (
                    <div key={key}>
                        <Paragraph text={`Step ${key + 1} :`} className="underline" />
                        <Paragraph text={[step.description, <br />, `► ${step.verif}`]} />
                    </div>
                ))
            }
            { 
                props.testStep[0].testRailLink &&
                    <TestRailLink
                        testStep={props.testStep}
                    />
            }

        </div>
    )
}

export default TestSteps;