/* ------------------- React ------------------- */

import { Dispatch, SetStateAction } from 'react';

interface Props {
    state : Array<{id_state: number, currentState: string}>;
    setStateChoose : Dispatch<SetStateAction<number>>;
}


function SelectState(props : Props) {

    return (
        <select defaultValue={0} id="state" className={"select-state form-select"} onChange={e => props.setStateChoose(parseInt(e.target.value))}>
            <option value={0}>All</option>
            {
                props.state.map((state, key) => {
                    if (state.currentState !== "not run")
                    {
                        return (
                            <option key={`${state.currentState}-${key}`} value={state.id_state}>{state.currentState}</option>
                        )
                    } else {
                        return null;
                    }
                })
            }
        </select>
    )
}

export default SelectState;