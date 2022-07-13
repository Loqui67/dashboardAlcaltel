/* ------------------- React ------------------- */

import { Dispatch, SetStateAction } from "react";

/* ------------------- Composants Bootstrap ------------------- */

import Form from 'react-bootstrap/Form'


interface Props {
    clientVersion : Array<{id_client: number, version: string}>;
    setClientVersionChoose : Dispatch<SetStateAction<number>>;
}


function SelectClientVersion(props : Props) {

    return (
        <Form.Select defaultValue={"Chrome"} className={"select-client-version form-select margin-top"} id={"clientVersion"} 
        onChange={(e: any) => props.setClientVersionChoose(parseInt(e.target.value))}>
            <option value={0}>All</option>
            {
                props.clientVersion.map((client, key) => {
                    if(key !== 0) {
                        return (
                            <option key={`${client.id_client}-${key}`} value={client.id_client}>{client.version}</option>
                        )
                    }
                    else {
                        return null;
                    }
                })
            }
        </Form.Select>
    )
}

export default SelectClientVersion;