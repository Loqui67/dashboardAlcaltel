/* ------------------- React ------------------- */

import { useEffect, useCallback, useMemo, useState, Dispatch, SetStateAction } from "react";

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';
import Utils from "../classes/Utils";

/* ------------------- Librairies tierces ------------------- */

import { Outlet, useParams, useOutletContext } from "react-router-dom";

type clientDistinctType = Array<{
    id_client: number,
    client_name: string
}>

function Stats() {

    const [clientDistinct, setClientDistinct] = useState<clientDistinctType>([]);
    const [clientChoose, setClientChoose] = useState<string>('Chrome');
    const [clientVersionChoose, setClientVersionChoose] = useState<number>(0);
    const [clientVersion, setClientVersion] = useState<Array<{ id_client: number, version: string }>>([]);

    const { id } = useParams();
    const query = useMemo(() => new GetFromDatabase(0, "", ""), [])

    const getLastVersion = useCallback(async () => {
        const utils = new Utils();
        const result = await query.getLastVersion();
        if (id === undefined) {
            utils.redirectTo(`/stats/${clientChoose}/${result[0].id_version}`);
        }
    }, [query, id, clientChoose]);

    const getClient = useCallback(async () => {
        setClientDistinct(await query.getClientDistinct());
    }, [query])

    const getClientVersion = useCallback(async () => {
        setClientVersion(await query.getClientVersion(clientChoose));
    }, [query, clientChoose])

    useEffect(() => {
        getLastVersion();
    }, [getLastVersion])

    useEffect(() => {
        getClient();
    }, [getClient])

    useEffect(() => {
        getClientVersion();
    }, [getClientVersion])


    return (
        <div className="Stats d-flex flex-column">
            <Outlet context={{ //AllStatsOptions.tsx
                clientVersion,
                clientVersionChoose,
                clientDistinct,
                clientChoose,
                setClientChoose,
                setClientVersionChoose
            }} />
        </div>
    );
}

export default Stats;


type ContextType = {
    clientVersion: Array<{ id_client: number, version: string }>
    clientVersionChoose: number
    clientDistinct: clientDistinctType
    clientChoose: string
    setClientChoose: Dispatch<SetStateAction<string>>
    setClientVersionChoose: Dispatch<SetStateAction<number>>
};

export function useOutletCntxtStats() {
    return useOutletContext<ContextType>();
}