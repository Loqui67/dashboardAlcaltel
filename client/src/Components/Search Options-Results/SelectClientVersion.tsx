/* ------------------- React ------------------- */

import { useState, useCallback, useEffect } from "react";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../../classes/GetFromDatabase";

/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types Interfaces Contexts ------------------- */

import { useStatsPageStructureContext } from "../../tools/context";
import { clientVersionType } from "../../tools/typeAndInterface";

/* ------------------- librairies tierces ------------------- */

import { useParams } from "react-router-dom";

function SelectClientVersion(): JSX.Element {
    const { setClientVersionChoose } = useStatsPageStructureContext();

    let { id, client } = useParams<string>();
    const [clientVersion, setClientVersion] = useState<clientVersionType>([]);

    const getClientVersion = useCallback(async () => {
        const query = new GetFromDatabase(
            id === undefined ? 0 : parseInt(id),
            "",
            ""
        );
        setClientVersion(
            await query.getClientVersion(client === undefined ? "" : client)
        );
    }, [id, client]);

    useEffect((): void => {
        getClientVersion();
    }, [getClientVersion]);

    return (
        <Form.Select
            defaultValue="Chrome"
            className="select-client-version form-select margin-top"
            id="clientVersion"
            onChange={(e: any) =>
                setClientVersionChoose(parseInt(e.target.value))
            }
        >
            <option value={0}>All</option>
            {clientVersion.map((client, key) => {
                return (
                    <option
                        key={`${client.id_client}-${key}`}
                        value={client.id_client}
                    >
                        {client.version}
                    </option>
                );
            })}
        </Form.Select>
    );
}

export default SelectClientVersion;
