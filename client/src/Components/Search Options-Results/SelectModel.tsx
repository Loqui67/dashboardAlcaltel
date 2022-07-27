/* ------------------- React ------------------- */

import { useState, useCallback, useEffect } from "react";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../../classes/GetFromDatabase";

/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types Interfaces Contexts ------------------- */

import { useStatsPageStructureContext } from "../../tools/context";
import { clientModelType } from "../../tools/typeAndInterface";

/* ------------------- librairies tierces ------------------- */

import { useParams } from "react-router-dom";

function SelectModel(): JSX.Element {
    const { setModelChoose } = useStatsPageStructureContext();
    let { id } = useParams<string>();
    const [clientModel, setClientModel] = useState<clientModelType>([]);

    const getClientModel = useCallback(async () => {
        const query = new GetFromDatabase(
            id === undefined ? 0 : parseInt(id),
            "",
            ""
        );
        setClientModel(await query.getClientModel());
    }, [id]);

    useEffect((): void => {
        getClientModel();
    }, [getClientModel]);

    return (
        <Form.Select
            defaultValue={""}
            id="model"
            className="select-model form-select margin-top"
            onChange={(e: any) => setModelChoose(e.target.value)}
        >
            <option value={""}>All</option>
            {clientModel
                .filter((element) => element.model !== null)
                .map((element, key) => (
                    <option key={key} value={element.model}>
                        {element.model}
                    </option>
                ))}
        </Form.Select>
    );
}

export default SelectModel;
