/* ------------------- React ------------------- */

import { useEffect, useCallback, useMemo, useState, Dispatch, SetStateAction } from "react";

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';
import Utils from "../classes/Utils";

/* ------------------- Librairies tierces ------------------- */

import { Outlet, useOutletContext, useParams } from "react-router-dom";

type clientDistinctType = Array<{
    id_client: number,
    client_name: string
}>

function Stats() {

    const { id, client } = useParams();

    const [clientDistinct, setClientDistinct] = useState<clientDistinctType>([]);
    const [clientChoose, setClientChoose] = useState<string>(client === undefined ? "Chrome" : client);

    const query = useMemo(() => new GetFromDatabase(0, clientChoose, ""), [clientChoose])

    const getLastVersion = useCallback(async () => {
        const utils = new Utils();
        if (await query.checkJWT()) {
            const result = await query.getLastVersion();
            console.log(result)
            utils.redirectTo(`/stats/${clientChoose}/${result[0].id_version}`);
        }
    }, [query, clientChoose]);

    const getClient = useCallback(async () => {
        if (await query.checkJWT()) {
            setClientDistinct(await query.getClientDistinct());
        }
    }, [query])

    useEffect(() => {
        if (id === undefined) {
            getLastVersion();
        }
    }, [getLastVersion, id])

    useEffect(() => {
        getClient();
    }, [getClient])


    return (
        <div className="Stats d-flex flex-column">
            <Outlet context={{ //AllStatsOptions.tsx
                clientDistinct,
                clientChoose,
                setClientChoose,
            }} />
        </div>
    );
}

export default Stats;


type ContextType = {
    clientDistinct: clientDistinctType
    clientChoose: string
    setClientChoose: Dispatch<SetStateAction<string>>
};

export function useOutletCntxtStats() {
    return useOutletContext<ContextType>();
}