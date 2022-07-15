/* ------------------- Classes ------------------- */

import Utils from "./Utils";

/* ------------------- Librairies tierces ------------------- */

import Axios from "axios";
Axios.defaults.withCredentials = true;

class GetFromDatabase {

    adress: string = "http://ns3053040.ip-137-74-95.eu:3001/";
    id: number;
    client: string;
    date: string;

    utils = new Utils()

    constructor(id: number, client: string, date: string) {
        this.id = id;
        this.client = client;
        this.date = date;
    }



    async getClient() {
        const response = await Axios.get(`${this.adress}client`);
        return (response.data[0]);
    }

    async getClientDistinct() {
        const response = await Axios.get(`${this.adress}clientDistinct`);
        return (response.data[0]);
    }

    async getClientVersion(clientChoose: string) {
        const response = await Axios.get(`${this.adress}clientVersion`, {
            params: {
                clientChoose: clientChoose
            }
        });
        return (response.data[0]);
    }

    async getDate() {
        const response = await Axios.get(`${this.adress}date`, {
            params: {
                id: this.id
            }
        });
        return (response.data[0]);
    }

    async getDateWithTS() {
        const response = await Axios.get(`${this.adress}dateWithTS`, {
            params: {
                id: this.id
            }
        });
        return (response.data[0]);
    }



    async getHistory(name: string, id: number | string) {
        const response = await Axios.get(`${this.adress}testHistory`, {
            params: {
                name: name,
                id: id
            }
        });
        return (response.data[0]);
    }

    async getStep(name: string) {
        const response = await Axios.get(`${this.adress}step`, {
            params: {
                name: name
            }
        });
        return (response.data[0]);
    }


    async getTestSuites() {
        const response = await Axios.get(`${this.adress}testSuite`);
        return (response.data[0]);
    }

    async getTestSuitesFromVersion() {
        const response = await Axios.get(`${this.adress}testSuiteFromVersion`, {
            params: {
                id: this.id,
            }
        });
        return (response.data[0]);
    }

    async getTestSuitesFromVersionWithDate() {
        const response = await Axios.get(`${this.adress}testSuiteFromVersionWithDate`, {
            params: {
                id: this.id,
            }
        });
        return (response.data[0]);
    }


    async getTestState() {
        const response = await Axios.get(`${this.adress}testState`, {
            params: {
                id: this.id
            }
        });
        return (response.data[0]);
    }


    async getState() {
        const response = await Axios.get(`${this.adress}state`);
        return (response.data[0]);
    }


    async getTestStateCount() {
        const response = await Axios.get(`${this.adress}testStateCount`, {
            params: {
                id: this.id,
                client: this.client,
            }
        });
        return (response.data[0]);
    }

    async getTestStateCountWithDate() {
        const response = await Axios.get(`${this.adress}testStateCountWithDate`, {
            params: {
                id: this.id,
                client: this.client,
                date: this.date,
            }
        });
        return (response.data[0]);
    }




    async getVersion() {
        const response = await Axios.get(`${this.adress}version`);
        return (response.data[0]);
    }

    async getLastVersion() {
        const response = await Axios.get(`${this.adress}lastVersion`);
        return (response.data[0]);
    }

    async getVersionWithLogs() {
        const response = await Axios.get(`${this.adress}versionWithLogs`, {
            params: {
                id: this.id,
            }
        });
        return (response.data[0]);
    }

    async getVersionFromClient() {
        const response = await Axios.get(`${this.adress}versionFromClient`, {
            params: {
                client: this.client,
            }
        });
        return (response.data[0]);
    }


    async registerUser(username: string, password: string, admin: boolean) {
        const response = await Axios.post(`${this.adress}register`, { username: username, password: password, admin: admin });
        return (response.data)
    }

    async ConfirmPassword(username: string, password: string) {
        const response = await Axios.post(`${this.adress}confirmPassword`, { username: username, password: password });
        return (response.data)
    }

    async UpdatePassword(username: string, password: string) {
        const response = await Axios.put(`${this.adress}updatePassword`, { username: username, password: password });
        return (response.data)
    }


    async isLogged() {

        const response = await Axios.get(`${this.adress}login`);

        if (!response.data.loggedIn && window.location.href !== this.utils.loginPath()) {
            this.utils.redirectLogin();
        }
        if (response.data.loggedIn && window.location.href === this.utils.loginPath()) {
            this.utils.redirectStats();
        }
        return response.data;
    }


    async login(username: string, password: string) {
        const response = await Axios.post(`${this.adress}login`, {
            username: username,
            password: password,
        })
        return response.data;
    }
    async logout() {
        Axios.get(`${this.adress}logout`)
    }

    async checkJWT() {
        let a = localStorage.getItem('token')
        const response = await Axios.get(`${this.adress}isUserAuth`, {
            headers: {
                "x-access-token": a === null ? "" : a
            }
        })
        if (response.data.auth === true) {
            return true;
        } else {
            return false;
        }
    }
}

export default GetFromDatabase;