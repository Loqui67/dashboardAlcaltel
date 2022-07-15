/* ------------------- React ------------------- */

import { useEffect } from 'react';

/* ------------------- Composants ------------------- */

import DropdownVersionPatchContent from '../Search Options-Results/DropdownVersionPatchContent';

/* ------------------- Fonctions ------------------- */

import { useOutletCntxtStats } from "../Pages/Stats";

/* ------------------- Librairies tierces ------------------- */

import { Outlet, useParams } from "react-router-dom";
import SelectClient from "../Search Options-Results/SelectClient";


function AllStatsOptions() {

    const { client } = useParams();

    const { clientDistinct } = useOutletCntxtStats();
    const { clientChoose } = useOutletCntxtStats();
    const { setClientChoose } = useOutletCntxtStats();

    useEffect(() => {
        if (client !== undefined) setClientChoose(client)
    }, [setClientChoose, client])

    return (
        <div className="Stats d-flex flex-column">
            <div className="d-flex flex-row">

                <div className="selectClient padding">
                    <label>Choose a client</label>
                    <SelectClient
                        clientDistinct={clientDistinct}
                        setClientChoose={setClientChoose}
                        clientChoose={clientChoose}
                        client={client}
                    />
                </div>
                <div className="selectVersion padding">
                    <label>Choose a version</label>
                    <DropdownVersionPatchContent
                        clientChoose={clientChoose}
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
    )
}

export default AllStatsOptions;