/* ------------------- React ------------------- */

import { Dispatch, SetStateAction, useEffect } from "react";

/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils"

interface Props {
    date : Array<{date: string}>;
    dateWithTS : Array<{date: string, id_testsSuites: number}>;
    setDateChoose : Dispatch<SetStateAction<string>>;
    dateChoose : string;
    testSuiteChoose : number;
}

function SelectDate(props : Props) {

    const convertDate = new Utils()

    useEffect (() => {
        (document.getElementById("date") as HTMLInputElement).value = props.dateChoose;
    }, [props.dateChoose])


    return (
        <select id="date" defaultValue={""} className={"select-date form-select"} onChange={e => props.setDateChoose(e.target.value)}>
            <option value={""}>All</option>
            {
                props.testSuiteChoose === 0 ?
                props.date.map((date, key) => {
                    return (
                        <option key={`${date.date}-${key}`} value={convertDate.getDateAndDeleteHourOnDbFormat(date.date)}>{convertDate.convertDateFromDbToRightFormat(date.date)}</option>
                    )
                })
                :
                props.dateWithTS.filter(date => date.id_testsSuites === props.testSuiteChoose).map((date, key) => {
                    return (
                        <option key={`${date.date}-${key}`} value={convertDate.getDateAndDeleteHourOnDbFormat(date.date)}>{convertDate.convertDateFromDbToRightFormat(date.date)}</option>
                    )
                })
            }
        </select>
    )
}

export default SelectDate;