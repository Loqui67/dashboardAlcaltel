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
    testSuiteFromVersionWithDateType,
    modelChooseType,
} from "../toolbox/typeAndInterface";

class UserDataChart {
    state = ["passed", "failed", "skipped"];
    borderColor = [
        "rgba(23, 222, 23,1)",
        "rgba(255,0,0, 1)",
        "rgba(248,168,5,1)",
    ];
    bgColorFull = [
        "rgba(23, 222, 23,1)",
        "rgba(255,0,0,1)",
        "rgba(248,168,5,1)",
    ];
    bgColorLight = [
        "rgba(23, 222, 23,0.2)",
        "rgba(255,0,0,0.2)",
        "rgba(248,168,5,0.2)",
    ];

    testStateCount: testStateCountType;
    testSuiteFromVersion: testSuiteFromVersionType;
    testState: testStateType;
    testSuiteChoose: testSuiteChooseType;
    dateChoose: dateChooseType;
    testSuiteFromVersionWithDate: testSuiteFromVersionWithDateType;
    testStateCountWithDate: testStateCountWithDateType;
    allClientID: allClientIDType;
    clientVersionChoose: clientVersionChooseType;
    modelChoose: modelChooseType;

    constructor(
        testStateCount: testStateCountType,
        testSuiteFromVersion: testSuiteFromVersionType,
        testState: testStateType,
        testSuiteChoose: testSuiteChooseType,
        dateChoose: dateChooseType,
        testSuiteFromVersionWithDate: testSuiteFromVersionWithDateType,
        testStateCountWithDate: testStateCountWithDateType,
        allClientID: allClientIDType,
        clientVersionChoose: clientVersionChooseType,
        modelChoose: modelChooseType
    ) {
        this.testStateCount = testStateCount;
        this.testSuiteFromVersion = testSuiteFromVersion;
        this.testState = testState;
        this.testSuiteChoose = testSuiteChoose;
        this.dateChoose = dateChoose;
        this.testStateCountWithDate = testStateCountWithDate;
        this.allClientID = allClientID;
        this.clientVersionChoose = clientVersionChoose;
        this.modelChoose = modelChoose;

        const key = "testsSuites_name";

        //on récupère les valeurs unique de chaque TS en fonction de leurs noms
        this.testSuiteFromVersion = Array.from(
            new Map(
                testSuiteFromVersion.map((item) => [item[key], item])
            ).values()
        );

        this.testSuiteFromVersionWithDate = testSuiteFromVersionWithDate;
    }

    getValuesPie(params: Array<any>) {
        return this.state.map((state) => {
            return params.map((data) => data[state]);
        });
    }

    getUserDataPieChart() {
        let value: Array<any>;
        this.dateChoose === ""
            ? (value = this.getValuesPie(this.testStateCount))
            : (value = this.getValuesPie(this.testStateCountWithDate));
        const userDataPieChart = {
            labels: this.state,
            datasets: [
                {
                    label: "test states",
                    data: value.map((element) => element),
                    backgroundColor: this.bgColorLight.map(
                        (element) => element
                    ),
                    borderColor: this.borderColor.map((element) => element),
                    borderWidth: 1,
                },
            ],
        };
        return userDataPieChart;
    }

    getBar100Values(params: Array<any>) {
        //pour chaque etat (state), on filtre en fonction des valeurs des filtres et on retourne le nombre de valeur de chaque état
        type dataMap = {
            currentState?: string;
            id_testsSuites?: number;
            date?: string;
            id_client?: number;
            model?: string;
        };

        return this.state.map((state) => {
            return params
                .filter((data: dataMap) => {
                    if (this.clientVersionChoose === 0) {
                        return this.allClientID.map((test) => {
                            if (test === data.id_client) {
                                return data;
                            }
                            return null;
                        });
                    } else {
                        if (data.id_client === this.clientVersionChoose) {
                            return data;
                        }
                        return null;
                    }
                })
                .filter(
                    (data) =>
                        this.dateChoose === data.date || this.dateChoose === ""
                )
                .map((element: dataMap) => {
                    return this.testState
                        .filter(
                            (data: dataMap) =>
                                data.currentState === state &&
                                data.id_testsSuites === element.id_testsSuites
                        )
                        .filter(
                            (data) =>
                                this.dateChoose === data.date ||
                                this.dateChoose === ""
                        )
                        .filter((data: dataMap) => {
                            if (
                                this.modelChoose === "" ||
                                this.modelChoose === data.model
                            ) {
                                return data;
                            } else {
                                return null;
                            }
                        });
                })
                .map((data) => data.length);
        });
    }

    getBar100Labels(params: Array<any>) {
        type dataMap = {
            testsSuites_name?: string;
            date?: string;
            id_client?: number;
        };

        return params
            .filter((data: dataMap) => {
                if (this.clientVersionChoose === 0) {
                    return this.allClientID.map((test) => {
                        if (test === data.id_client) {
                            return data;
                        }
                        return null;
                    });
                } else if (data.id_client === this.clientVersionChoose) {
                    return data;
                }
                return null;
            })
            .filter(
                (filter: dataMap) =>
                    filter.date === this.dateChoose || this.dateChoose === ""
            )
            .map(
                (testSuiteFromVersion: dataMap) =>
                    testSuiteFromVersion.testsSuites_name
            );
    }

    getUserDataBar100Chart() {
        let value: Array<any>;
        this.dateChoose === ""
            ? (value = this.getBar100Values(this.testSuiteFromVersion))
            : (value = this.getBar100Values(this.testSuiteFromVersionWithDate));

        const userDataLineChart = {
            labels:
                this.dateChoose === ""
                    ? this.getBar100Labels(this.testSuiteFromVersion)
                    : this.getBar100Labels(this.testSuiteFromVersionWithDate),
            datasets: this.state.map((element, index) => {
                return {
                    label: `test ${element} (%)`,
                    data: value[index],
                    backgroundColor: this.bgColorFull[index],
                    borderColor: this.borderColor[index],
                    borderWidth: 1,
                    fill: true,
                };
            }),
        };
        return userDataLineChart;
    }

    getBarValues() {
        //retourne les valeurs du graphique en bar, le nombre de tests sur chaque état en fonction de la TS
        type dataMap = {
            currentState?: string;
            testsSuites_name?: string;
            date?: string;
            id_client?: number;
            model?: string;
        };
        const convertDate = new Utils();
        return this.state.map((state) => {
            return this.testState
                .filter(
                    (data: dataMap) =>
                        data.testsSuites_name === this.testSuiteChoose &&
                        data.currentState === state &&
                        (convertDate.getDateAndDeleteHourOnDbFormat(
                            data.date
                        ) === this.dateChoose ||
                            this.dateChoose === "")
                )
                .filter((data: dataMap) => {
                    if (this.clientVersionChoose === 0) {
                        return this.allClientID.map((test) => {
                            if (test === data.id_client) {
                                return data;
                            }
                            return null;
                        });
                    } else {
                        if (data.id_client === this.clientVersionChoose) {
                            return data;
                        }
                        return null;
                    }
                })
                .filter((data: dataMap) => {
                    if (
                        this.modelChoose === "" ||
                        this.modelChoose === data.model
                    ) {
                        return data;
                    } else {
                        return null;
                    }
                }).length;
        });
    }

    getUserDataBarChart() {
        let value: Array<any> = this.getBarValues();
        const userDataBarChart = {
            labels: [this.testSuiteChoose], //le nom de la TS

            datasets: this.state.map((element, index) => {
                return {
                    label: `test ${element}`,
                    data: [value[index]],
                    backgroundColor: this.bgColorFull[index],
                    borderColor: this.borderColor[index],
                    borderWidth: 1,
                    fill: true,
                };
            }),
        };
        return userDataBarChart;
    }
}

export default UserDataChart;
