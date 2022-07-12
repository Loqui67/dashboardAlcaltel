/* ------------------- React ------------------- */

import { useEffect, useCallback, useMemo, useState, Dispatch, SetStateAction } from "react";

/* ------------------- Composants ------------------- */

import DropdownVersionPatchContent from '../Search Options-Results/DropdownVersionPatchContent';

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';

/* ------------------- Librairies tierces ------------------- */

import {Outlet, useParams, useOutletContext} from "react-router-dom";
import SelectClient from "../Search Options-Results/SelectClient";
import SelectClientVersion from "../Search Options-Results/SelectClientVersion";

type clientDistinctType = Array<{
    id_client: number, 
    client_name: string
}>

function Stats() {

    const [clientDistinct, setClientDistinct] = useState<clientDistinctType>([]);
    const [clientChoose, setClientChoose] = useState<string>('Chrome');
    const [clientVersionChoose, setClientVersionChoose] = useState<number>(0);
    const [clientVersion, setClientVersion] = useState<Array<{id_client: number, version: string}>>([]);

    const {id} = useParams();

    const query = useMemo(() => new GetFromDatabase(0, "", ""), []) 

    const getLastVersion = useCallback(async () => {
        const result = await query.getLastVersion();
        if(id === undefined) {
            const path = `/stats/${result[0].id_version}`;
            window.location.href = path;
        }
    }, [query, id]);

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
            <div className="d-flex flex-row">
                <DropdownVersionPatchContent/>
                <div className="selectClient padding">
                    <label>Choose a client</label>
                        <SelectClient
                        clientDistinct={clientDistinct}
                        setClientChoose={setClientChoose}
                    />
                </div>
                <div className="selectClientVersion padding">
                    <label>Choose a client version</label>
                        <SelectClientVersion
                        clientVersion={clientVersion}
                        setClientVersionChoose={setClientVersionChoose}
                    />
                </div>
            </div>
            <div>
                <Outlet context={{ //StatsPageStructure.tsx
                    clientDistinct,
                    clientChoose,
                    setClientChoose
                }} />
            </div>
        </div>
    );
}

export default Stats;


type ContextType = { 
    clientDistinct:clientDistinctType
    clientChoose:string
    setClientChoose:Dispatch<SetStateAction<string>>
};

export function useOutletCntxtStats() {
    return useOutletContext<ContextType>();
  }