/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types Interfaces Contexts ------------------- */

import { useStatsPageStructureContext } from "../toolbox/context";

function SelectModel() {
    const { clientModel, setModelChoose } = useStatsPageStructureContext();

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
