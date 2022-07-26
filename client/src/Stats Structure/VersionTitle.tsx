/* ------------------- React ------------------- */

import { useCallback, useEffect, useState } from "react";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../classes/GetFromDatabase";

/* ------------------- Types Interfaces Contexts ------------------- */

import { versionType } from "../toolbox/typeAndInterface";
import { useStatsContext } from "../toolbox/context";

/* ------------------- librairies tierces ------------------- */

import { useParams } from "react-router-dom";

function VersionTitle() {
    let { id } = useParams<string>();
    const { clientChoose } = useStatsContext();

    const [version, setVersion] = useState<versionType>({
        id_version: 0,
        version_name: "0",
        patch: 0,
    });

    const getVersion = useCallback(async () => {
        const query = new GetFromDatabase(
            id === undefined ? 0 : parseInt(id),
            "",
            ""
        );
        setVersion(await query.getVersion());
    }, [id]);

    useEffect(() => {
        getVersion();
    }, [getVersion]);

    return (
        <div className="title">
            <h2>{`Client ${clientChoose} ${version.version_name}.${version.patch}`}</h2>
        </div>
    );
}

export default VersionTitle;
