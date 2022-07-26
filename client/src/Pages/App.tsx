/* ------------------- React ------------------- */

import { useState, useCallback, useEffect } from "react";

/* ------------------- Styles ------------------- */

import "./Styles/App.css";

/* ------------------- Composants ------------------- */

import StatsPageStructure from "../Stats Structure/StatsPageStructure";
import TestAllInformation from "../Test Information/TestAllInformation";
import AllStatsOptions from "../Stats Structure/AllStatsOptions";
import NavBar from "./NavBar";

/* ------------------- Pages ------------------- */

import Stats from "./Stats";
import NoPage from "./NoPage";
import ChangePassword from "./ChangePassword";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../classes/GetFromDatabase";
import Utils from "../classes/Utils";

/* ------------------- Types Interfaces Contexts ------------------- */

import { loginStatusType, isLoggedType } from "../toolbox/typeAndInterface";
import { LoginContext } from "../toolbox/context";

/* ------------------- librairies tierces ------------------- */

import { Route, Routes } from "react-router-dom";

function App() {
    const [loginStatus, setLoginStatus] = useState<loginStatusType>({
        username: "",
        isLogged: false,
        admin: false,
        message: "",
    });
    const [isLogged, setIsLogged] = useState<isLoggedType>({
        loggedIn: false,
        user: [],
    });

    const isLoggedIn = useCallback(async () => {
        //on vérifie si l'utilisateur est connecté ou non
        const utils = new Utils();
        const query = new GetFromDatabase(0, "", "");
        if (!loginStatus.isLogged && !utils.isLoginPage()) {
            setIsLogged(await query.isLogged());
            if (isLogged.loggedIn) {
                setLoginStatus({
                    username: isLogged.user[0].username,
                    admin: isLogged.user[0].isAdmin,
                    isLogged: true,
                    message: "",
                });
            }
        } else if (!loginStatus.isLogged && utils.isLoginPage()) {
            const a: isLoggedType = await query.isLogged();
            if (a.loggedIn) {
                setIsLogged(a);
                utils.redirectStats();
                setLoginStatus({
                    username: isLogged.user[0].username,
                    admin: isLogged.user[0].isAdmin,
                    isLogged: true,
                    message: "",
                });
            }
        }
    }, [isLogged, loginStatus]);

    useEffect(() => {
        isLoggedIn();
    }, [isLoggedIn, isLogged, loginStatus]);

    return (
        //les routes affichent un composant en fonction de l'adresse de la page
        <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="*" element={<NoPage />} />
                    {loginStatus.admin ? (
                        <Route path="/register" element={<RegisterPage />} />
                    ) : null}
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/editPassword"
                        element={
                            <ChangePassword username={loginStatus.username} />
                        }
                    />
                    <Route path="/stats" element={<Stats />}>
                        <Route path=":client" element={<AllStatsOptions />}>
                            <Route path=":id" element={<StatsPageStructure />}>
                                <Route
                                    path=":testRunID"
                                    element={<TestAllInformation />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </div>
        </LoginContext.Provider>
    );
}

export default App;
