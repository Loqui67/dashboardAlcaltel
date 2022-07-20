/* ------------------- React ------------------- */

import { useEffect, useMemo, useState } from "react";

/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils";

/* ------------------- Composants Bootstrap ------------------- */

import Form from 'react-bootstrap/Form'

/* ------------------- Types And Interfaces ------------------- */

import { SelectClientProps } from '../toolbox/typeAndInterface'


function SelectClient(props: SelectClientProps) {

    const [defaultValue, setDefaultValue] = useState<string>();

    useEffect(() => {
        props.client === undefined ? setDefaultValue("Chrome") : setDefaultValue(props.clientChoose)
    }, [props.client, props.clientChoose])

    const utils = useMemo(() => new Utils(), [])

    return (
        <Form.Select defaultValue={defaultValue} className="select-client form-select margin-top" id="client" value={defaultValue}
            onChange={(e: any) => { props.setClientChoose(e.target.value); utils.redirectTo(`${utils.statsPath()}/${e.target.value}`) }}>
            {
                props.clientDistinct.map((client, key) => {
                    return (
                        <option key={`${client.id_client}-${key}`} value={client.client_name}>{client.client_name}</option>
                    )
                })
            }
        </Form.Select>
    )
}

export default SelectClient;