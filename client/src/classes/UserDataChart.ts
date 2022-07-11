/* ------------------- Classes ------------------- */

import Utils from "./Utils";

class UserDataChart {

    state = ["passed", "failed", "skipped", "not run"]
    bgColor = ['rgba(23, 222, 23,1)', 'rgba(255,0,0, 1)', 'rgba(248,168,5,1)', 'rgba(174,168,168,1)'];
    borderColor = ['rgba(23, 222, 23,1)', 'rgba(255,0,0,1)', 'rgba(248,168,5,1)', 'rgba(174,168,168,1)']

    testStateCount : Array<{passed : number, failed : number, skipped : number}>;
    testSuiteFromVersion : Array<{id_testsSuites : number, testsSuites_name : string, id_client : number}>;
    testState : Array<{currentState: string, id_testsSuites: number, date: string, id_client: number}>;
    testSuiteChoose : number;
    dateChoose : string;
    testSuiteFromVersionWithDate : Array<{id_testsSuites : number, testsSuites_name : string, id_client : number}>;
    testStateCountWithDate : Array<{passed : number, failed : number, skipped : number}>;
    allClientID : Array<number>;


    constructor
        (
            testStateCount : Array<{passed : number, failed : number, skipped : number}>,
            testSuiteFromVersion : Array<{id_testsSuites : number, testsSuites_name : string, id_client : number}>,
            testState : Array<{currentState: string, id_testsSuites: number, date: string, id_client: number}>,
            testSuiteChoose : number,
            dateChoose : string,
            testSuiteFromVersionWithDate : Array<{id_testsSuites : number, testsSuites_name : string, id_client : number}>,
            testStateCountWithDate : Array<{passed : number, failed : number, skipped : number}>,
            allClientID :  Array<number>
        ) {
        this.testStateCount = testStateCount;
        this.testSuiteFromVersion = testSuiteFromVersion;
        this.testState = testState;
        this.testSuiteChoose = testSuiteChoose;
        this.dateChoose = dateChoose;
        this.testSuiteFromVersionWithDate = testSuiteFromVersionWithDate;
        this.testStateCountWithDate = testStateCountWithDate;
        this.allClientID = allClientID;
    }

    getValuesPiePassed() {
        type dataMap = {
            passed?: number;
        }
        let r;
        if (this.dateChoose === "") {
            r = this.testStateCount.map((data : dataMap) => data.passed)
        } else {
            r = this.testStateCountWithDate.map((data : dataMap) => data.passed)
        }
        return r;
    }

    getValuesPieFailed() {
        type dataMap = {
            failed ?: number;
        }
        let r;
        if (this.dateChoose === "") {
            r = this.testStateCount.map((data : dataMap) => data.failed)
        } else {
            r = this.testStateCountWithDate.map((data : dataMap) => data.failed)
        }
        return r;
    }

    getValuesPieSkipped() {
        type dataMap = {
            skipped?: number;
        }
        let r;
        if (this.dateChoose === "") {
            r = this.testStateCount.map((data : dataMap) => data.skipped)
        } else {
            r = this.testStateCountWithDate.map((data : dataMap) => data.skipped)
        }
        return r;
    }


    getUserDataPieChart() {
        const userDataPieChart = {
            labels: ["passed", "failed", "skipped"/* , "not run" */],
            datasets: [{
                label: "test states",
                data: [this.getValuesPiePassed()[0], this.getValuesPieFailed()[0], this.getValuesPieSkipped()[0]/* , this.testStateCount.map((data) => data.not_played) */] as Array<number>,
                backgroundColor: [
                    'rgba(16,251,0, 0.2)',
                    'rgba(255,0,0, 0.2)',
                    'rgba(248,168,5,0.2)',
                    'rgba(174,168,168, 0.2)',
                ],
                borderColor: [
                    'rgb(16,251,0)',
                    'rgb(255,0,0)',
                    'rgb(248,168,5)',
                    'rgb(174,168,168)',
                ],
                borderWidth: 1
            }]
        }
        return userDataPieChart;
    }




    getBar100Values() {
        type dataMap = {
            currentState?: string;
            id_testsSuites?: number;
            date?: string;
            id_client?: number;
        }
        const convertDate = new Utils();
        return this.state.map(state => { 
            return this.testSuiteFromVersion.map((element : dataMap) => {
                return this.testState.filter(
                    (data : dataMap) => data.currentState === state
                        && data.id_testsSuites === element.id_testsSuites
                        && (convertDate.getDateAndDeleteHourOnDbFormat(data.date) === this.dateChoose || this.dateChoose === "")
                ).filter((data : dataMap) => {
                    return this.allClientID.map(test => {
                        if(test === data.id_client) {
                            return data
                        }
                        return null
                    })
                })
            }).map(data => data.length)
        })
    }


    getUserDataBar100Chart() {
        type dataMap = {
            testsSuites_name?: string;
            date?: string;
            id_client?: number;
        }
        const convertDate = new Utils();
        let labels;
        if (this.dateChoose === "") {
            labels = this.testSuiteFromVersion.filter((data : dataMap) => {
                return this.allClientID.map(test => {
                    if(test === data.id_client) {
                        return data
                    }
                    return null
                })
            })
                .map((testSuiteFromVersion : dataMap) => testSuiteFromVersion.testsSuites_name);
        } else {
            labels = this.testSuiteFromVersionWithDate.filter(
                (filter : dataMap) => convertDate.getDateAndDeleteHourOnDbFormat(filter.date) === this.dateChoose
            ).filter((data : dataMap) => {
                return this.allClientID.map(test => {
                    if(test === data.id_client) {
                        return data
                    }
                    return null
                })
            })
                .map((testSuiteFromVersion : dataMap) => testSuiteFromVersion.testsSuites_name);
        }

        const userDataLineChart = {
            labels: labels,

            datasets: [
                {
                    label: "test passed (%)",
                    data: this.getBar100Values()[0],
                    backgroundColor: this.bgColor[0],
                    borderColor: this.borderColor[0],
                    borderWidth: 1,
                    fill: true,
                    //cubicInterpolationMode: 'monotone',
                }, {
                    label: "test failed (%)",
                    data: this.getBar100Values()[1],
                    backgroundColor: this.bgColor[1],
                    borderColor: this.borderColor[1],
                    borderWidth: 1,
                    fill: true,
                    //cubicInterpolationMode: 'monotone',
                }, {
                    label: "test skipped (%)",
                    data: this.getBar100Values()[2],
                    backgroundColor: this.bgColor[2],
                    borderColor: this.borderColor[2],
                    borderWidth: 1,
                    fill: true,
                    //cubicInterpolationMode: 'monotone',
                }/* , {
                    label: "test not run (%)",
                    data: this.getNumberByStateLine()[3],
                    backgroundColor: this.bgColor[3],
                    borderColor: this.borderColor[3],
                    borderWidth: 1,
                    fill: true,
                    //cubicInterpolationMode: 'monotone',
                } */
            ]
        }
        return userDataLineChart;
    }

    getBarValues() {
        type dataMap = {
            currentState?: string;
            id_testsSuites?: number;
            date?: string;
            id_client?: number;
        }
        const convertDate = new Utils();
        return this.state.map(state => { 
            return this.testState.filter((data : dataMap) => (data.id_testsSuites === this.testSuiteChoose || this.testSuiteChoose === 0)
            && data.currentState === state
            && (convertDate.getDateAndDeleteHourOnDbFormat(data.date) === this.dateChoose || this.dateChoose === "")
        ).filter((data : dataMap) => {
            return this.allClientID.map(test => {
                if(test === data.id_client) {
                    return data
                }
                return null
            })
        }).length
        })
    }


    getUserDataBarChart() {
        type dataMap = {
            testsSuites_name?: string;
            id_testsSuites?: number;
            id_client?: number;
        }
        const labels = this.testSuiteFromVersion.filter((filter : dataMap) => (filter.id_testsSuites === this.testSuiteChoose || this.testSuiteChoose === 0))
        .filter((data : dataMap) => {
            return this.allClientID.map(test => {
                if(test === data.id_client) {
                    return data
                }
                return null
            })
        })
            .map((testSuiteFromVersion : dataMap) => testSuiteFromVersion.testsSuites_name)

        const userDataBarChart = {
            labels: labels,

            datasets: [{
                label: "test passed",
                data: [
                    this.getBarValues()[0]
                ],
                backgroundColor: this.bgColor[0],
                borderColor: this.borderColor[0],
                borderWidth: 1,
                fill: true,
                cubicInterpolationMode: 'monotone',
            }, {
                label: "test failed",
                data: [
                    this.getBarValues()[1]
                ],
                backgroundColor: this.bgColor[1],
                borderColor: this.borderColor[1],
                borderWidth: 1,
                fill: true,
                cubicInterpolationMode: 'monotone',
            }, {
                label: "test skipped",
                data: [
                    this.getBarValues()[2]
                ],
                backgroundColor: this.bgColor[2],
                borderColor: this.borderColor[2],
                borderWidth: 1,
                fill: true,
                cubicInterpolationMode: 'monotone',
            }/* , {
                label: "test not run",
                data: [
                    this.getNumberByStateBar()[3]
                ],
                backgroundColor: this.bgColor[3],
                borderColor: this.borderColor[3],
                borderWidth: 1,
                fill: true,
                cubicInterpolationMode: 'monotone',
            } */]
        }
        return userDataBarChart;
    }
}

export default UserDataChart;



