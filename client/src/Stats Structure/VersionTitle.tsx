/* ------------------- Types Interfaces Contexts ------------------- */

import {
    useStatsContext,
    useStatsPageStructureContext,
} from "../toolbox/context";

/* ------------------- librairies tierces ------------------- */

import { useParams } from "react-router-dom";

function VersionTitle() {
    let { id } = useParams<string>();
    const { clientChoose } = useStatsContext();
    const { version } = useStatsPageStructureContext();

    return (
        <>
            {version
                .filter(
                    (name) =>
                        name.id_version ===
                        (id !== undefined ? parseInt(id) : 0)
                )
                .map((name, key) => {
                    return (
                        <div key={key} className="title">
                            <h2>{`Client ${clientChoose} ${name.version_name}.${name.patch}`}</h2>
                        </div>
                    );
                })}
        </>
    );
}

export default VersionTitle;
