/* ------------------- Composants Bootstrap ------------------- */

import Form from 'react-bootstrap/Form'

/* ------------------- Types And Interfaces ------------------- */

import { SelectStateProps } from '../toolbox/typeAndInterface'


function SelectState(props: SelectStateProps) {

    return (
        <Form.Select defaultValue={0} id="state" className="select-state form-select margin-top" onChange={(e: any) => props.setStateChoose(parseInt(e.target.value))}>
            <option value={0}>All</option>
            {
                props.state.map((state, key) => {
                    if (state.currentState !== "not run") {
                        return (
                            <option key={`${state.currentState}-${key}`} value={state.id_state}>{state.currentState}</option>
                        )
                    } else {
                        return null;
                    }
                })
            }
        </Form.Select>
    )
}

export default SelectState;