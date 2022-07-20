/* ------------------- React ------------------- */

import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils"

/* ------------------- Composants Bootstrap ------------------- */

import Form from 'react-bootstrap/Form'


interface Props {
    date: Array<{ date: string }>;
    dateWithTS: Array<{ date: string, id_testsSuites: number, testsSuites_name: string }>;
    setDateChoose: Dispatch<SetStateAction<string>>;
    dateChoose: string;
    testSuiteChoose: string;
}

function SelectDate(props: Props) {

    const convertDate = useMemo(() => new Utils(), [])
    useEffect(() => {
        (document.getElementById("date") as HTMLInputElement).value = props.dateChoose;
    }, [props.dateChoose])

    return (
        <Form.Select id="date" defaultValue="" className="select-date form-select margin-top" onChange={(e: any) => props.setDateChoose(e.target.value)}>
            <option value="">All</option>
            {
                props.testSuiteChoose === "" ?
                    props.date.map((date, key) => {
                        return (
                            <option key={`${date.date}-${key}`} value={convertDate.getDateAndDeleteHourOnDbFormat(date.date)}>{convertDate.convertDateFromDbToRightFormat(date.date)}</option>
                        )
                    })
                    :
                    props.dateWithTS.filter(date => date.testsSuites_name === props.testSuiteChoose).map((date, key) => {
                        return (
                            <option key={`${date.date}-${key}`} value={convertDate.getDateAndDeleteHourOnDbFormat(date.date)}>{convertDate.convertDateFromDbToRightFormat(date.date)}</option>
                        )
                    })
            }
        </Form.Select>
    )
}

export default SelectDate;