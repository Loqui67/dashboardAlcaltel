/* ------------------- Classes ------------------- */

import { useMemo } from "react";

/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils";

/* ------------------- Types And Interfaces ------------------- */

import { TestTitleProps } from "../toolbox/typeAndInterface";

function TestTitle(props: TestTitleProps) {
  const utils = useMemo(() => new Utils(), []);
  const identifier = useMemo(
    () => utils.testCaseIdentifier(props.test.name),
    [props.test.name, utils]
  );

  return (
    <div className="d-flex flex-column justify-content-start title">
      <h3>
        <span className={`${props.TxtColor} strong`}>
          {identifier?.identifier}&nbsp;/&nbsp;
        </span>
        {`${utils.formatStringToUpperAndLowerCase(
          identifier?.name === undefined ? "" : identifier.name
        )} :`}
      </h3>
      <h3 className={props.TxtColor}>{props.test.currentState}</h3>
    </div>
  );
}

export default TestTitle;
