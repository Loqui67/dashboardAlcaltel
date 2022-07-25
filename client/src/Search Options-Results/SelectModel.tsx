import { Dispatch, SetStateAction } from "react";
import Form from "react-bootstrap/Form";

interface Props {
  clientModel: Array<{ model: string }>;
  setModelChoose: Dispatch<SetStateAction<string>>;
}

function SelectModel(props: Props) {
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
