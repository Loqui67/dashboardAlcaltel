/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types And Interfaces ------------------- */

import { SelectStateProps } from "../../tools/typeAndInterface";

function SelectState(props: SelectStateProps): JSX.Element {
    return (
        <Form.Select
            defaultValue={0}
            id="state"
            className="select-state form-select margin-top"
            onChange={(e: any) =>
                props.setStateChoose(parseInt(e.target.value))
            }
        >
            <option value={0}>All</option>
            <option value={1}>passed</option>
            <option value={2}>failed</option>
            <option value={3}>skipped</option>
        </Form.Select>
    );
}

export default SelectState;
