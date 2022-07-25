/* ------------------- Classes ------------------- */

import Utils from "./Utils";

/* ------------------- Types And Interfaces ------------------- */

import { 
    allClientIDType, 
    clientVersionChooseType, 
    dateChooseType, 
    testStateCountType, 
    testStateCountWithDateType, 
    testStateType, 
    testSuiteChooseType, 
    testSuiteFromVersionType, 
    testSuiteFromVersionWithDateType
} from "../toolbox/typeAndInterface";


class UserDataChart {

    state = ["passed", "failed", "skipped"/* , "not run" */]
    bgColor = ['rgba(23, 222, 23,1)', 'rgba(255,0,0, 1)', 'rgba(248,168,5,1)', 'rgba(174,168,168,1)'];
    borderColor = ['rgba(23, 222, 23,1)', 'rgba(255,0,0,1)', 'rgba(248,168,5,1)', 'rgba(174,168,168,1)']

    testStateCount: testStateCountType;
    testSuiteFromVersion: testSuiteFromVersionType;
    testState: testStateType;
    testSuiteChoose: testSuiteChooseType;
    dateChoose: dateChooseType;
    testSuiteFromVersionWithDate: testSuiteFromVersionWithDateType;
    testStateCountWithDate: testStateCountWithDateType;
    allClientID: allClientIDType;
    clientVersionChoose: clientVersionChooseType;
    modelChoose: string

    constructor
        (
            testStateCount: testStateCountType,
            testSuiteFromVersion: testSuiteFromVersionType,
            testState: testStateType,
            testSuiteChoose: testSuiteChooseType,
            dateChoose: dateChooseType,
            testSuiteFromVersionWithDate: testSuiteFromVersionWithDateType,
            testStateCountWithDate: testStateCountWithDateType,
            allClientID: allClientIDType,
            clientVersionChoose: clientVersionChooseType,
            modelChoose: string
        ) {
        this.testStateCount = testStateCount;
        this.testSuiteFromVersion = testSuiteFromVersion;
        this.testState = testState;
        this.testSuiteChoose = testSuiteChoose;
        this.dateChoose = dateChoose;
        this.testSuiteFromVersionWithDate = testSuiteFromVersionWithDate;
        this.testStateCountWithDate = testStateCountWithDate;
        this.allClientID = allClientID;
        this.clientVersionChoose = clientVersionChoose;
        this.modelChoose = modelChoose;


        const key = 'testsSuites_name';

        this.testSuiteFromVersion = Array.from(new Map(testSuiteFromVersion.map(item =>
            [item[key], item])).values());  //on récupère les valeurs unique de chaque TS en fonction de leurs noms
    }

    getValuesPiePassed() {
        type dataMap = {
            passed?: number;
        }
        if (this.dateChoose === "") { //retourne le nombre de tests passed
            return this.testStateCount.map((data: dataMap) => data.passed)
        } else {
            return this.testStateCountWithDate.map((data: dataMap) => data.passed)
        }
    }

    getValuesPieFailed() {
        type dataMap = {
            failed?: number;
        }
        if (this.dateChoose === "") { //retourne le nombre de tests failed
            return this.testStateCount.map((data: dataMap) => data.failed)
        } else {
            return this.testStateCountWithDate.map((data: dataMap) => data.failed)
        }
    }

    getValuesPieSkipped() {
        type dataMap = {
            skipped?: number;
        }
        if (this.dateChoose === "") { //retourne le nombre de tests skipped
            return this.testStateCount.map((data: dataMap) => data.skipped)
        } else {
            return this.testStateCountWithDate.map((data: dataMap) => data.skipped)
        }
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




    getBar100Values() { //pour chaque etat (state), on filtre en fonction des valeurs des filtres et on retourne le nombre de valeur de chaque état
        type dataMap = {
            currentState?: string;
            id_testsSuites?: number;
            date?: string;
            id_client?: number;
            model?: string;
        }

        if (this.dateChoose === "") {
            return this.state.map(state => {
                return this.testSuiteFromVersion.filter((data: dataMap) => {
                    if (this.clientVersionChoose === 0) {
                        return this.allClientID.map(test => {
                            if (test === data.id_client) {
                                return data
                            }
                            return null
                        })
                    }
                    else {
                        if (data.id_client === this.clientVersionChoose) {
                            return data
                        }
                        return null
                    }
                }).map((element: dataMap) => {
                    return this.testState.filter(
                        (data: dataMap) => data.currentState === state && data.id_testsSuites === element.id_testsSuites
                    ).filter((data: dataMap) => {
                        if (this.modelChoose === "" || this.modelChoose === data.model) {
                            return data;
                        }
                        else {
                            return null
                        }
                    })
                }).map(data => data.length)
            })

        } else {
            return this.state.map(state => {
                return this.testSuiteFromVersionWithDate.filter((data: dataMap) => {
                    if (this.clientVersionChoose === 0) {
                        return this.allClientID.map(test => {
                            if (test === data.id_client) {
                                return data
                            }
                            return null
                        })
                    }
                    else {
                        if (data.id_client === this.clientVersionChoose) {
                            return data
                        }
                        return null
                    }
                }).filter(data => this.dateChoose === data.date).map((element: dataMap) => {
                    return this.testState.filter(
                        (data: dataMap) => data.currentState === state && data.id_testsSuites === element.id_testsSuites
                    ).filter((data: dataMap) => {
                        if (this.modelChoose === "" || this.modelChoose === data.model) {
                            return data;
                        }
                        else {
                            return null
                        }
                    })
                }).map(data => data.length)
            })
        }
    }




    getUserDataBar100Chart() {
        console.log(this.getBar100Values())
        type dataMap = {
            testsSuites_name?: string;
            date?: string;
            id_client?: number;
        }
        const convertDate = new Utils();
        let labels;
        if (this.dateChoose === "") { //on récupère le nom de tte les tests suites en fonctions des filtres
            labels = this.testSuiteFromVersion.filter((data: dataMap) => {
                if (this.clientVersionChoose === 0) {
                    return this.allClientID.map(test => {
                        if (test === data.id_client) {
                            return data
                        }
                        return null
                    })
                }
                else {
                    if (data.id_client === this.clientVersionChoose) {
                        return data
                    }
                    return null
                }
            })
                .map((testSuiteFromVersion: dataMap) => testSuiteFromVersion.testsSuites_name);
        } else {

            labels = this.testSuiteFromVersionWithDate.filter((data: dataMap) => {
                if (this.clientVersionChoose === 0) {
                    return this.allClientID.map(test => {
                        if (test === data.id_client) {
                            return data
                        }
                        return null
                    })
                }
                else {
                    if (data.id_client === this.clientVersionChoose) {
                        return data
                    }
                    return null
                }
            }).filter(
                (filter: dataMap) => convertDate.getDateAndDeleteHourOnDbFormat(filter.date) === this.dateChoose
            )
                .map((testSuiteFromVersion: dataMap) => testSuiteFromVersion.testsSuites_name);
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

    getBarValues() {    //retourne les valeurs du graphique en bar, le nombre de tests sur chaque état en fonction de la TS
        type dataMap = {
            currentState?: string;
            testsSuites_name?: string;
            date?: string;
            id_client?: number;
            model?: string
        }
        const convertDate = new Utils();
        return this.state.map(state => {
            return this.testState.filter((data: dataMap) => (data.testsSuites_name === this.testSuiteChoose)
                && data.currentState === state
                && (convertDate.getDateAndDeleteHourOnDbFormat(data.date) === this.dateChoose || this.dateChoose === "")
            ).filter((data: dataMap) => {
                if (this.clientVersionChoose === 0) {
                    return this.allClientID.map(test => {
                        if (test === data.id_client) {
                            return data
                        }
                        return null
                    })
                }
                else {
                    if (data.id_client === this.clientVersionChoose) {
                        return data
                    }
                    return null
                }
            }).filter((data: dataMap) => {
                if (this.modelChoose === "" || this.modelChoose === data.model) {
                    return data;
                }
                else {
                    return null
                }
            }).length
        })
    }


    getUserDataBarChart() {
        const labels = [this.testSuiteChoose] //le nom de la TS

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
                //cubicInterpolationMode: 'monotone',
            }, {
                label: "test failed",
                data: [
                    this.getBarValues()[1]
                ],
                backgroundColor: this.bgColor[1],
                borderColor: this.borderColor[1],
                borderWidth: 1,
                fill: true,
                //cubicInterpolationMode: 'monotone',
            }, {
                label: "test skipped",
                data: [
                    this.getBarValues()[2]
                ],
                backgroundColor: this.bgColor[2],
                borderColor: this.borderColor[2],
                borderWidth: 1,
                fill: true,
                //cubicInterpolationMode: 'monotone',
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



