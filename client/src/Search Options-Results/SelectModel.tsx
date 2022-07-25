/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types and interfaces ------------------- */

import { SelectModelProps } from "../toolbox/typeAndInterface";

function SelectModel(props: SelectModelProps) {
  return (
    <Form.Select
      defaultValue={""}
      id="model"
      className="select-model form-select margin-top"
      onChange={(e: any) => props.setModelChoose(e.target.value)}
    >
      <option value={""}>All</option>
      {props.clientModel
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
