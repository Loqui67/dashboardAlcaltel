/* ------------------- React ------------------- */

import { useEffect } from "react";

/* ------------------- Composants ------------------- */

import DropdownVersionPatchContent from "../Search Options-Results/DropdownVersionPatchContent";
import Label from "../HTML components/Label";

/* ------------------- Types Interfaces Contexts ------------------- */

import { useStatsContext } from "../toolbox/context";

/* ------------------- Librairies tierces ------------------- */

import { Outlet, useParams } from "react-router-dom";
import SelectClient from "../Search Options-Results/SelectClient";

function AllStatsOptions() {
    const { client } = useParams();

    const { setClientChoose } = useStatsContext();

    useEffect(() => {
        if (client !== undefined) setClientChoose(client);
    }, [setClientChoose, client]);

    return (
        <div className="Stats d-flex flex-column">
            <div className="d-flex flex-row">
                <div className="selectClient padding">
                    <Label text="Choose a client" />
                    <SelectClient />
                </div>
                <div className="selectVersion padding">
                    <Label text="Choose a version" />
                    <DropdownVersionPatchContent />
                </div>
            </div>
            <div>
                <Outlet
                //StatsPageStructure.tsx
                />
            </div>
        </div>
    );
}

export default AllStatsOptions;
