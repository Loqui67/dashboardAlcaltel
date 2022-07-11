/* ------------------- Classes ------------------- */

import Utils from "../classes/Utils";

/* ------------------- Librairies tierces ------------------- */

import { Link } from "react-router-dom";

interface Props {
    pageVisited : number;
    userPerPage : number;
    search : Array<{currentState: string, id_test: number, id_testRun: number, name: string}>
}

interface dataMap {
    currentState: string;
    id_test: number;
    id_testRun: number;
    name: string;
}

function TestSearchResult(props : Props) {

    const utils = new Utils()

    return (
        <>
            {
                props.search.slice(props.pageVisited, props.pageVisited + props.userPerPage).map((test : dataMap, key : number) => {
                    let bgColor = utils.testToColor(test.currentState);
                    return (
                        <div key={`${test.id_test}-${key}`}>
                            <Link to={`${test.id_testRun}`}>
                                <button className={`buttonForTests padding bg-${bgColor}`}>
                                    <span className={`${bgColor} strong`}>
                                        {test.name.slice(0,6)} &nbsp;
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