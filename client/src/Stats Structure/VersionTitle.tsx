/* ------------------- Types And Interfaces ------------------- */

import { VersionTitleProps } from "../toolbox/typeAndInterface";

function VersionTitle(props: VersionTitleProps) {
  return (
    <>
      {props.version
        .filter((name) => name.id_version === props.id)
        .map((name, key) => {
          return (
            <div key={key} className="title">
              <h2>{`Client ${props.clientChoose} ${name.version_name}.${name.patch}`}</h2>
            </div>
          );
        })}
    </>
  );
}

export default VersionTitle;
