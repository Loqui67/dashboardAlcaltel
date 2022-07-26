/* ------------------- React ------------------- */

import { useEffect, useMemo, useState, useCallback } from "react";

/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils";
import GetFromDatabase from "../classes/GetFromDatabase";

/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types Interfaces Contexts ------------------- */

import { useStatsContext } from "../toolbox/context";
import { clientDistinctType } from "../toolbox/typeAndInterface";

/* ------------------- Librairies tierces ------------------- */

import { useParams } from "react-router-dom";

function SelectClient() {
    const [defaultValue, setDefaultValue] = useState<string>();
    const [clientDistinct, setClientDistinct] = useState<clientDistinctType>(
        []
    );

    const { client } = useParams();
    const { clientChoose, setClientChoose } = useStatsContext();

    const query = useMemo(() => new GetFromDatabase(0, "", ""), []);

    const getClient = useCallback(async () => {
        setClientDistinct(await query.getClientDistinct());
    }, [query]);

    useEffect(() => {
        getClient();
    }, [getClient]);

    useEffect(() => {
        client === undefined
            ? setDefaultValue("Chrome")
            : setDefaultValue(clientChoose);
    }, [client, clientChoose]);

    const utils = useMemo(() => new Utils(), []);

    return (
        <Form.Select
            defaultValue={defaultValue}
            className="select-client form-select margin-top"
            id="client"
            value={defaultValue}
            onChange={(e: any) => {
                setClientChoose(e.target.value);
                utils.redirectTo(`${utils.statsPath()}/${e.target.value}`);
            }}
        >
            {clientDistinct.map((client, key) => {
                return (
                    <option
                        key={`${client.id_client}-${key}`}
                        value={client.client_name}
                    >
                        {client.client_name}
                    </option>
                );
            })}
        </Form.Select>
    );
}

export default SelectClient;
