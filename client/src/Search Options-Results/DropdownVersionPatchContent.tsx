/* ------------------- Composants Bootstrap ------------------- */

import { Dropdown, DropdownButton } from "react-bootstrap";

/* ------------------- React ------------------- */

import { useCallback, useEffect, useMemo, useState } from 'react';

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../classes/GetFromDatabase";

/* ------------------- Enum ------------------- */

import { variant } from '../toolbox/enum'

/* ------------------- Librairies tierces ------------------- */

import { Link } from "react-router-dom";

interface Props {
    clientChoose: string
}


function DropdownVersionPatchContent(props: Props) {

    const [versionFromClient, setVersionFromClient] = useState<Array<{ id_version: number, version_name: string, patch: number }>>([]);

    const query = useMemo(() => new GetFromDatabase(0, props.clientChoose, ""), [props.clientChoose])
    let name = "";

    const getVersionFromClient = useCallback(async () => {
        if (await query.checkJWT()) {
            setVersionFromClient(await query.getVersionFromClient());
        }
    }, [query, setVersionFromClient]);

    useEffect(() => {
        getVersionFromClient();
    }, [getVersionFromClient])



    return (
        <DropdownButton title="select client version" className="no-underline dropVersion" drop="down" variant="primary">
            {
                versionFromClient.map((value, key) => {
                    if (name !== value.version_name) {
                        name = value.version_name;
                        return (
                            <DropdownButton key={key} title={`client version ${name}`} className="no-underline padding size" drop="end" variant={variant.primary}>
                                {
                                    versionFromClient.filter(names => names.version_name === name).map((patches, key) => {
                                        return (
                                            <Link key={`${name}-${key}`} to={`${patches.id_version}`}>
                                                <Dropdown.Item as="button">{`client version ${name}.${patches.patch}`}</Dropdown.Item>
                                            </Link>
                                        )
                                    })
                                }
                            </DropdownButton>
                        )
                    }
                    return null;
                })
            }
        </DropdownButton>
    )
}

export default DropdownVersionPatchContent;





