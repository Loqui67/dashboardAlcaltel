/* ------------------- React ------------------- */

import { useEffect, useCallback, useMemo, useState } from "react";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../classes/GetFromDatabase";
import Utils from "../classes/Utils";

/* ------------------- Types Interfaces Contexts ------------------- */

import { clientChooseType } from "../toolbox/typeAndInterface";

import { StatsContext } from "../toolbox/context";

/* ------------------- Librairies tierces ------------------- */

import { Outlet, useParams } from "react-router-dom";

function Stats() {
    const { id, client } = useParams();

    const [clientChoose, setClientChoose] = useState<clientChooseType>(
        client === undefined ? "Chrome" : client
    );

    const query = useMemo(
        () => new GetFromDatabase(0, clientChoose, ""),
        [clientChoose]
    );

    const getLastVersion = useCallback(async () => {
        const utils = new Utils();
        const result = await query.getLastVersion();
        utils.redirectTo(`/stats/${clientChoose}/${result[0].id_version}`);
    }, [query, clientChoose]);

    useEffect(() => {
        if (id === undefined) {
            getLastVersion();
        }
    }, [getLastVersion, id]);

    return (
        <StatsContext.Provider value={{ clientChoose, setClientChoose }}>
            <div className="Stats d-flex flex-column">
                <Outlet
                //AllStatsOptions.tsx
                />
            </div>
        </StatsContext.Provider>
    );
}

export default Stats;
