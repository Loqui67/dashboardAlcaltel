/* ------------------- Classes ------------------- */

import Utils from "./Utils";

/* ------------------- Outils ------------------- */

import { serverAddress } from "../toolbox/address";

/* ------------------- Librairies tierces ------------------- */

import Axios from "axios";
Axios.defaults.withCredentials = true;

class GetFromDatabase {
    address: string = serverAddress; //adresse du serveur
    id: number;
    client: string;
    date: string;

    utils = new Utils();

    constructor(id: number, client: string, date: string) {
        this.id = id;
        this.client = client;
        this.date = date;
    }

    async getClient() {
        //recupère le contenu de la table client
        const response = await Axios.get(`${this.address}client`);
        return response.data[0];
    }

    async getClientDistinct() {
        //recupère le nom de tout les clients existant (une seule fois)
        const response = await Axios.get(`${this.address}clientDistinct`);
        return response.data[0];
    }

    async getClientModel() {
        //recupère le nom de tout les modèles existant (une seule fois)
        const response = await Axios.get(`${this.address}clientModel`, {
            params: {
                id: this.id,
            },
        });
        return response.data[0];
    }

    async getClientVersion(clientChoose: string) {
        //récupère la version de chaque client en fonction de la version de Rainbow
        const response = await Axios.get(`${this.address}clientVersion`, {
            params: {
                clientChoose: clientChoose,
                id: this.id,
            },
        });
        return response.data[0];
    }

    async getDate() {
        //récupère les dates d'exécutions d'une version
        const response = await Axios.get(`${this.address}date`, {
            params: {
                id: this.id,
            },
        });
        return response.data[0];
    }

    async getDateWithTS() {
        //récupère les dates d'exécutions d'une version avec les TS
        const response = await Axios.get(`${this.address}dateWithTS`, {
            params: {
                id: this.id,
            },
        });
        return response.data[0];
    }

    async getHistory(name: string) {
        //récupère l'historique du test à l'aide de son test case. retourne toute les valeurs, sauf celui de la version en question
        const response = await Axios.get(`${this.address}testHistory`, {
            params: {
                name: name,
                id: this.id,
                client: this.client,
            },
        });
        return response.data[0];
    }

    async getStep(id: number) {
        //reécupère les steps d'un test à l'aide de son id
        const response = await Axios.get(`${this.address}step`, {
            params: {
                id: id,
            },
        });
        return response.data[0];
    }

    async getTestSuites() {
        //récupère le nom de toute les TS
        const response = await Axios.get(`${this.address}testSuite`);
        return response.data[0];
    }

    async getTestSuitesFromVersion() {
        //récupère le nom de toute les TS en fonction de la version
        const response = await Axios.get(
            `${this.address}testSuiteFromVersion`,
            {
                params: {
                    id: this.id,
                },
            }
        );
        return response.data[0];
    }

    async getTestSuitesFromVersionWithDate() {
        //récupère le nom de toute les TS en fonction de la version et de la date
        const response = await Axios.get(
            `${this.address}testSuiteFromVersionWithDate`,
            {
                params: {
                    id: this.id,
                },
            }
        );
        return response.data[0];
    }

    async getTestState() {
        //récupère toute les informations des tests éxécutés sur la version et le client
        const response = await Axios.get(`${this.address}testState`, {
            params: {
                id: this.id,
                client: this.client,
            },
        });
        return response.data[0];
    }

    async getState() {
        //récupère la liste des states
        const response = await Axios.get(`${this.address}state`);
        return response.data[0];
    }

    async getTestStateCount() {
        //récupère la somme des états des tests : passed, skipped, failed..
        const response = await Axios.get(`${this.address}testStateCount`, {
            params: {
                id: this.id,
                client: this.client,
            },
        });
        return response.data[0];
    }

    async getTestStateCountWithDate() {
        //récupère la somme des états des tests en fonction de la date : passed, skipped, failed..
        const response = await Axios.get(
            `${this.address}testStateCountWithDate`,
            {
                params: {
                    id: this.id,
                    client: this.client,
                    date: this.date,
                },
            }
        );
        return response.data[0];
    }

    async getVersion() {
        //récupère la liste des versions
        const response = await Axios.get(`${this.address}version`, {
            params: {
                id: this.id,
            },
        });
        return response.data[0][0];
    }

    async getLastVersion() {
        //récupère la dernière version existante
        const response = await Axios.get(`${this.address}lastVersion`, {
            params: {
                client: this.client,
            },
        });
        return response.data[0];
    }

    async getVersionWithLogs(testID: number) {
        //récupère les logs d'un test en fonction de son id
        const response = await Axios.get(`${this.address}versionWithLogs`, {
            params: {
                id: testID,
            },
        });
        return response.data[0];
    }

    async getVersionFromClient() {
        //récupère la liste des versions d'un client
        const response = await Axios.get(`${this.address}versionFromClient`, {
            params: {
                client: this.client,
            },
        });
        return response.data[0];
    }

    async registerUser(username: string, password: string, admin: boolean) {
        //demande l'enregistrement d'un utilisateur dans la base
        const response = await Axios.post(`${this.address}register`, {
            username: username,
            password: password,
            admin: admin,
        });
        return response.data;
    }

    async ConfirmPassword(username: string, password: string) {
        //demande la confirmation du mot de passe
        const response = await Axios.post(`${this.address}confirmPassword`, {
            username: username,
            password: password,
        });
        return response.data;
    }

    async UpdatePassword(username: string, password: string) {
        //demande la maj du mot de passe
        const response = await Axios.put(`${this.address}updatePassword`, {
            username: username,
            password: password,
        });
        return response.data;
    }

    async isLogged() {
        //on cherche a savoir si l'utilisateur est encore connecté (à l'aide des cookies)

        const response = await Axios.get(`${this.address}login`);
        if (!response.data.loggedIn && !this.utils.isLoginPage()) {
            //on redirige sur la page de connexion s'il n'est pas log
            this.utils.redirectLogin();
        } else if (response.data.loggedIn && this.utils.isLoginPage()) {
            //on redirige sur la page de stats s'il est log
            this.utils.redirectStats();
        }
        return response.data;
    }

    async login(username: string, password: string) {
        //on demande la connexions
        const response = await Axios.post(`${this.address}login`, {
            username: username,
            password: password,
        });
        return response.data;
    }
    async logout() {
        //on detruit la session
        Axios.get(`${this.address}logout`);
    }

    async checkJWT() {
        //on vérifie l'identité de l'utilisateur
        let a = localStorage.getItem("token");
        const response = await Axios.get(`${this.address}isUserAuth`, {
            headers: {
                "x-access-token": a === null ? "" : a,
            },
        });
        if (response.data.auth === true) {
            return true;
        } else {
            return false;
        }
    }
}

export default GetFromDatabase;
