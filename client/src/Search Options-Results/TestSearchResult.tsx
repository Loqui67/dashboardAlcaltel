/* ------------------- React ------------------- */

import { useMemo } from "react";

/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils";

/* ------------------- Types And Interfaces ------------------- */

import { TestSearchResultProps } from '../toolbox/typeAndInterface'

/* ------------------- Librairies tierces ------------------- */

import { Link } from "react-router-dom";


function TestSearchResult(props: TestSearchResultProps) {

    const utils = useMemo(() => new Utils(), []);

    interface dataMap {
        currentState: string;
        id_test: number;
        id_testRun: number;
        name: string;
    }

    return (
        <>
            {
                props.search.slice(props.pageVisited, props.pageVisited + props.userPerPage).map((test: dataMap, key: number) => {
                    let bgColor = utils.testToColor(test.currentState);
                    return (
                        <div key={`${test.id_test}-${key}`}>
                            <Link to={`${test.id_testRun}`}>
                                <button className={`buttonForTests padding bg-${bgColor}`}>
                                    <span className={`${bgColor} strong`}>
                                        {test.name.slice(0, 6)} &nbsp;
                                    </span>
                                    {
                                        utils.formatStringToUpperAndLowerCase(test.name.slice(7))
                                    }
                                </button>
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
}

export default TestSearchResult;