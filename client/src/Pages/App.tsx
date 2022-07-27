/* ------------------- React ------------------- */

import { useState, useCallback, useEffect } from "react";

/* ------------------- Styles ------------------- */

import "./Styles/App.css";

/* ------------------- Composants ------------------- */

import StatsPageStructure from "../Components/Stats Structure/StatsPageStructure";
import TestAllInformation from "../Components/TestInformation/TestAllInformation";
import AllStatsOptions from "../Components/Stats Structure/AllStatsOptions";
import NavBar from "./NavBar";

/* ------------------- Pages ------------------- */

import Stats from "./Stats";
import NoPage from "./NoPage";
import ChangePassword from "./ChangePassword";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../classes/GetFromDatabase";

/* ------------------- Types Interfaces Contexts ------------------- */

import { loginStatusType } from "../tools/typeAndInterface";
import { LoginContext } from "../tools/context";

/* ------------------- librairies tierces ------------------- */

import { Route, Routes } from "react-router-dom";

function App() {
    const [loginStatus, setLoginStatus] = useState<loginStatusType>({
        username: "",
        isLogged: false,
        admin: false,
        message: "",
    });

    const isLoggedIn = useCallback(async () => {
        //on vérifie si l'utilisateur est connecté ou non
        const query = new GetFromDatabase(0, "", "");
        if (!loginStatus.isLogged) {
            const res = await query.isLogged();
            if (res.loggedIn) {
                setLoginStatus({
                    username: res.user[0].username,
                    admin: res.user[0].isAdmin,
                    isLogged: true,
                    message: "",
                });
            }
        }
    }, [loginStatus]);

    useEffect(() => {
        isLoggedIn();
    }, [isLoggedIn]);

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
