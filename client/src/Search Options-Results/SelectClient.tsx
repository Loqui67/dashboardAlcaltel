/* ------------------- React ------------------- */

import { Dispatch, SetStateAction } from "react";

interface Props {
    clientDistinct : Array<{id_client: number, client_name: string}>;
    setClientChoose : Dispatch<SetStateAction<{name: string, type: string}>>;
}


function SelectClient(props : Props) {

    return (
        <select defaultValue={["Chrome", "Web"]} className={"select-client form-select padding3"} id={"client"} 
        onChange={e => props.setClientChoose({name: e.target.value[0], type: e.target.value[1]})}>
            <option value={["Chrome", "Web"]}>Chrome</option>
            {
                props.clientDistinct.map((client, key) => {
                    if(key !== 0) {
                        let valueType = "Web"
                        if(client.client_name === "IOS" || client.client_name === "Android") {
                            valueType = "Mobile"
                        }
                        return (
                            <option key={`${client.id_client}-${key}`} value={[client.client_name, valueType]}>{client.client_name}</option>
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