/* ------------------- React ------------------- */

import { Dispatch, SetStateAction } from "react";

interface Props {
    clientDistinct : Array<{id_client: number, client_name: string}>;
    setClientChoose : Dispatch<SetStateAction<string>>;
}


function SelectClient(props : Props) {

    return (
        <select defaultValue={"Chrome"} className={"select-client form-select padding3"} id={"client"} 
        onChange={e => props.setClientChoose(e.target.value)}>
            <option value={"Chrome"}>Chrome</option>
            {
                props.clientDistinct.map((client, key) => {
                    if(key !== 0) {
                        return (
                            <option key={`${client.id_client}-${key}`} value={client.client_name}>{client.client_name}</option>
                        )
                    }
                    else {
                        return null;
                    }
                })
            }
        </select>
    )
}

export default SelectClient;