/* ------------------- Composants Bootstrap ------------------- */

import {Dropdown, DropdownButton} from "react-bootstrap";

/* ------------------- React ------------------- */

import { useCallback, useEffect, useMemo, useState } from 'react';

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../classes/GetFromDatabase";

/* ------------------- Librairies tierces ------------------- */

import {Link} from "react-router-dom";


function DropdownVersionPatchContent() {

    const [version, setVersion] = useState<Array<{id_version: number, version_name: string, patch: number}>>([]);

    const query = useMemo(() => new GetFromDatabase(0, "", ""), []) 
    let name = "";
    let idVersion;

    const getVersion = useCallback(async () => {
        setVersion(await query.getVersion());
    }, [query, setVersion]);

    useEffect(() => {
        getVersion();
    }, [getVersion])


    return (
        <div className="d-flex flex-row">
            <DropdownButton title={"select web client"} className={"no-underline"} drop={"down"}>
                {
                    version.map((value, key)=> {
                        if (name !== value.version_name) {
                            name = value.version_name;
                            return (
                                <DropdownButton key={key} title={`Web client ${name}`} className={"no-underline padding size"} drop={"end"}>
                                    {
                                        version.filter(names => names.version_name === name).map((patches, key) => {
                                            idVersion = patches.id_version;
                                            return (
                                                <Link key={`${name}-${key}`} to={`${idVersion}`}>
                                                    <Dropdown.Item as="button">{`Web client ${name}.${patches.patch}`}</Dropdown.Item>
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
        </div>
    )
}

export default DropdownVersionPatchContent;





