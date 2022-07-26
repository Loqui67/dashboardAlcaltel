/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types Interfaces Contexts ------------------- */

import { useStatsPageStructureContext } from "../toolbox/context";

function SelectClientVersion() {
    const { clientVersion, setClientVersionChoose } =
        useStatsPageStructureContext();

    return (
        <Form.Select
            defaultValue="Chrome"
            className="select-client-version form-select margin-top"
            id="clientVersion"
            onChange={(e: any) =>
                setClientVersionChoose(parseInt(e.target.value))
            }
        >
            <option value={0}>All</option>
            {clientVersion.map((client, key) => {
                return (
                    <option
                        key={`${client.id_client}-${key}`}
                        value={client.id_client}
                    >
                        {client.version}
                    </option>
                );
            })}
        </Form.Select>
    );
}

export default SelectClientVersion;
