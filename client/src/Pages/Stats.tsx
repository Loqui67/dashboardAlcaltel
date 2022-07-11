/* ------------------- React ------------------- */

import { useEffect, useCallback, useMemo } from "react";

/* ------------------- Composants ------------------- */

import DropdownVersionPatchContent from '../Search Options-Results/DropdownVersionPatchContent';

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';

/* ------------------- Librairies tierces ------------------- */

import {Outlet, useParams} from "react-router-dom";



function Stats() {

    const {id} = useParams();

    const query = useMemo(() => new GetFromDatabase(0, "", ""), []) 

    const getLastVersion = useCallback(async () => {
        const result = await query.getLastVersion();
        if(id === undefined) {
            const path = `/stats/${result[0].id_version}`;
            window.location.href = path;
        }
    }, [query, id]);


    useEffect(() => {
        getLastVersion();
    }, [getLastVersion])


    return (
        <div className="Stats d-flex flex-column">
            <DropdownVersionPatchContent/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
}

export default Stats;
