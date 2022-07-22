/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types And Interfaces ------------------- */

import { SelectClientVersionProps } from "../toolbox/typeAndInterface";

function SelectClientVersion(props: SelectClientVersionProps) {
  return (
    <Form.Select
      defaultValue="Chrome"
      className="select-client-version form-select margin-top"
      id="clientVersion"
      onChange={(e: any) =>
        props.setClientVersionChoose(parseInt(e.target.value))
      }
    >
      <option value={0}>All</option>
      {props.clientVersion.map((client, key) => {
        return (
          <option key={`${client.id_client}-${key}`} value={client.id_client}>
            {client.version}
          </option>
        );
      })}
    </Form.Select>
  );
}

export default SelectClientVersion;
