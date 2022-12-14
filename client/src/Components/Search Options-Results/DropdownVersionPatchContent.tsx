/* ------------------- Composants Bootstrap ------------------- */

import { Dropdown, DropdownButton } from "react-bootstrap";

/* ------------------- React ------------------- */

import { useCallback, useEffect, useMemo, useState } from "react";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../../classes/GetFromDatabase";

/* ------------------- Enum ------------------- */

import { variant } from "../../tools/enum";

/* ------------------- Types Interfaces Contexts ------------------- */

import { versionFromClientType } from "../../tools/typeAndInterface";
import { useStatsContext } from "../../tools/context";

/* ------------------- Librairies tierces ------------------- */

import { Link } from "react-router-dom";

function DropdownVersionPatchContent(): JSX.Element {
    const { clientChoose } = useStatsContext();

    const [versionFromClient, setVersionFromClient] =
        useState<versionFromClientType>([]);

    const query = useMemo(
        () => new GetFromDatabase(0, clientChoose, ""),
        [clientChoose]
    );
    let name: string = "";

    const getVersionFromClient = useCallback(async () => {
        setVersionFromClient(await query.getVersionFromClient());
    }, [query, setVersionFromClient]);

    useEffect((): void => {
        getVersionFromClient();
    }, [getVersionFromClient]);

    return (
        <DropdownButton
            title="select client version"
            className="no-underline dropVersion"
            drop="down"
            variant="primary"
        >
            {versionFromClient.map((value, key) => {
                if (name !== value.version_name) {
                    name = value.version_name;
                    return (
                        <DropdownButton
                            key={key}
                            title={`client version ${name}`}
                            className="no-underline padding size"
                            drop="end"
                            variant={variant.primary}
                        >
                            {versionFromClient
                                .filter((names) => names.version_name === name)
                                .map((patches, key) => {
                                    return (
                                        <Link
                                            key={`${name}-${key}`}
                                            to={`${patches.id_version}`}
                                        >
                                            <Dropdown.Item as="button">{`client version ${name}.${patches.patch}`}</Dropdown.Item>
                                        </Link>
                                    );
                                })}
                        </DropdownButton>
                    );
                }
                return null;
            })}
        </DropdownButton>
    );
}

export default DropdownVersionPatchContent;
