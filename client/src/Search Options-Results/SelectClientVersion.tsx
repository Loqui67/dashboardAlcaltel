/* ------------------- React ------------------- */

import { Dispatch, SetStateAction } from "react";

interface Props {
    clientVersion : Array<{id_client: number, version: string}>;
    setClientVersionChoose : Dispatch<SetStateAction<number>>;
}


function SelectClientVersion(props : Props) {

    return (
        <select defaultValue={"Chrome"} className={"select-client-version form-select padding3"} id={"clientVersion"} 
        onChange={e => props.setClientVersionChoose(parseInt(e.target.value))}>
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
        </select>
    )
}

export default SelectClientVersion;