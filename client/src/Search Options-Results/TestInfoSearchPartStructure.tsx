/* ------------------- React ------------------- */

import React, { useMemo, useState } from "react";

/* ------------------- Composants ------------------- */

import SelectState from "./SelectState";
import TestSearchResult from "./TestSearchResult";
import Label from "../HTML components/Label";

/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils"

/* ------------------- Types And Interfaces ------------------- */

import { TestInfoStructureProps, stateChooseType, searchType } from '../toolbox/typeAndInterface'

/* ------------------- Librairies tierces ------------------- */

import ReactPaginate from 'react-paginate'


function TestInfoStructure(props: TestInfoStructureProps) {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [stateChoose, setStateChoose] = useState<stateChooseType>(0)

    const utils = useMemo(() => new Utils(), []);



    const testSuiteFilter: any = useMemo(() => {
        if (props.testSuiteChoose === "") {
            return props.testState;
        } else {
            return props.testState.filter(filter => filter.testsSuites_name === props.testSuiteChoose)
        }
    }, [props.testState, props.testSuiteChoose])


    const searchTermFilter: any = useMemo(() => {

        if (searchTerm === "") {
            return testSuiteFilter
        } else {
            return testSuiteFilter.filter((search: { name: string }) => search.name.toLowerCase().includes(searchTerm.replace(/\s/g, '').toLowerCase()))
        }
    }, [testSuiteFilter, searchTerm])


    const clientVersionFilter: any = useMemo(() => {
        return searchTermFilter.filter((clientVersion: { id_client: number }) => {
            if (props.clientVersionChoose === 0) {
                return props.allClientID.map(test => {
                    if (test === clientVersion.id_client) {
                        return clientVersion
                    }
                    return null
                })
            }
            else if (clientVersion.id_client === props.clientVersionChoose) {
                return clientVersion
            }
            return null
        })
    }, [searchTermFilter, props.allClientID, props.clientVersionChoose])


    const dateFilter: any = useMemo(() => {
        if (props.dateChoose === "") {
            return clientVersionFilter;
        } else {
            return clientVersionFilter.filter((date: { date: string }) => props.dateChoose === utils.getDateAndDeleteHourOnDbFormat(date.date))
        }
    }, [clientVersionFilter, props.dateChoose, utils])


    const stateFilter: any = useMemo(() => {
        if (stateChoose === 0) {
            return dateFilter;
        } else {
            return dateFilter.filter((state: { id_state: number }) => stateChoose === state.id_state)
        }
    }, [dateFilter, stateChoose])


    const search: searchType = useMemo(() => {
        return stateFilter
    }, [stateFilter])


    const userPerPage: number = 10;
    const pageVisited: number = pageNumber * userPerPage;

    const pageCount: number = Math.ceil(search.length / userPerPage)


    type Page = {
        selected: number;
    }

    const changePage = ({ selected }: Page) => {
        setPageNumber(selected);
    }

    if (pageCount < pageNumber) {
        setPageNumber(0)
    }

    return (
        <div className="Tests">
            <div className="d-flex flex-row input padding3 padding">
                <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="d-flex flex-row select padding3 padding filter justify-content-space-between">
                <div className="d-flex flex-column justify-content-start selectState">
                    <Label text="Choose a state" />
                    <SelectState
                        setStateChoose={setStateChoose}
                        state={props.state}
                    />
                </div>
            </div>
            <TestSearchResult
                pageVisited={pageVisited}
                search={search}
                userPerPage={userPerPage}
            />
            <div className="d-flex flex-row justify-content-center pagination padding">
                <ReactPaginate
                    forcePage={search.length > 0 ? pageNumber : -2}
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination"}
                    previousLinkClassName={"previousLink btn btn-primary"}
                    nextLinkClassName={"nextLink btn btn-primary"}
                    activeLinkClassName={"active"}
                    pageLinkClassName={"btn btn-outline-primary"}
                    disabledLinkClassName={"disabled"}
                    breakLabel="..."
                    breakLinkClassName={"btn btn-outline-primary"}
                    renderOnZeroPageCount={() => null}
                    pageRangeDisplayed={1}
                    disableInitialCallback={true}
                />
            </div>
        </div>
    )
}

export default TestInfoStructure;