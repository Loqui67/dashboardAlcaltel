/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils";

/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types And Interfaces ------------------- */

import { SelectTSProps } from "../toolbox/typeAndInterface";

function SelectTS(props: SelectTSProps) {
  const space = useMemo(() => new Utils(), []);

  const onChange = (e: any) => {
    props.setTestSuiteChoose(e.target.value);
    props.setDateChoose("");
  };

  return (
    <Form.Select
      id="TS"
      defaultValue={""}
      className="selectTestSuite form-select margin-top"
      onChange={(e: any) => onChange(e)}
    >
      <option value={""}>All</option>
      {Array.from(
        new Set(props.testSuiteFromVersion.map((item) => item.testsSuites_name))
      ).map((testSuite, key) => {
        let result = space.formatStringToUpperAndLowerCase(testSuite);
        return (
          <option key={`${testSuite}-${key}`} value={testSuite}>
            {result}
          </option>
        );
      })}
    </Form.Select>
  );
}

export default SelectTS;
