/* ------------------- React ------------------- */

import { useEffect, useMemo } from "react";

/* ------------------- Classes ------------------- */

import Utils from "../../classes/Utils";

/* ------------------- Composants Bootstrap ------------------- */

import Form from "react-bootstrap/Form";

/* ------------------- Types Interfaces Contexts ------------------- */

import { useStatsPageStructureContext } from "../../tools/context";

function SelectDate(): JSX.Element {
    const { dateWithTS, testSuiteChoose, setDateChoose, dateChoose, date } =
        useStatsPageStructureContext();

    const convertDate = useMemo(() => new Utils(), []);

    useEffect((): void => {
        (document.getElementById("date") as HTMLInputElement).value =
            dateChoose;
    }, [dateChoose]);

    return (
        <Form.Select
            id="date"
            defaultValue=""
            className="select-date form-select margin-top"
            onChange={(e: any) => setDateChoose(e.target.value)}
        >
            <option value="">All</option>
            {testSuiteChoose === ""
                ? date.map((date, key) => {
                      return (
                          <option
                              key={`${date.date}-${key}`}
                              value={convertDate.getDateAndDeleteHourOnDbFormat(
                                  date.date
                              )}
                          >
                              {convertDate.convertDateFromDbToRightFormat(
                                  date.date
                              )}
                          </option>
                      );
                  })
                : dateWithTS
                      .filter(
                          (date) => date.testsSuites_name === testSuiteChoose
                      )
                      .map((date, key) => {
                          return (
                              <option
                                  key={`${date.date}-${key}`}
                                  value={convertDate.getDateAndDeleteHourOnDbFormat(
                                      date.date
                                  )}
                              >
                                  {convertDate.convertDateFromDbToRightFormat(
                                      date.date
                                  )}
                              </option>
                          );
                      })}
        </Form.Select>
    );
}

export default SelectDate;
