/* ------------------- Classes ------------------- */

import { useMemo } from "react";

/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils";

/* ------------------- Types And Interfaces ------------------- */

import { TestTitleProps } from "../toolbox/typeAndInterface";

function TestTitle(props: TestTitleProps) {
  const space = useMemo(() => new Utils(), []);

  return (
    <div className="d-flex flex-column justify-content-start title">
      <h3>
        <span className={`${props.TxtColor} strong`}>
          {props.test.name.slice(0, 6)}&nbsp;/&nbsp;
        </span>
        {`${space.formatStringToUpperAndLowerCase(props.test.name.slice(7))} :`}
      </h3>
      <h3 className={props.TxtColor}>{props.test.currentState}</h3>
    </div>
  );
}

export default TestTitle;
