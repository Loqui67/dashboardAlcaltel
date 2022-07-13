/* ------------------- Styles ------------------- */

import '../Styles/App.css';

/* ------------------- Composants ------------------- */

import StatsPageStructure from "../Stats Structure/StatsPageStructure";
import TestAllInformation from '../Test Information/TestAllInformation';
import AllStatsOptions from '../Stats Structure/AllStatsOptions';
import NavBar from "./NavBar";

/* ------------------- Pages ------------------- */

import Stats from "./Stats";
import NoPage from "./NoPage";
import ChangePassword from './ChangePassword';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';
import Utils from '../classes/Utils';

/* ------------------- React ------------------- */

import { useState, useCallback, useEffect } from 'react';

/* ------------------- librairies tierces ------------------- */

import { Route, Routes } from "react-router-dom";




function App() {


    interface loginStatusType {
        username: string, 
        admin: boolean, 
        isLogged: boolean,
        message: string
    }

    interface isLoggedType {
        loggedIn: boolean, 
        user: Array<any>
    }


    const [loginStatus, setLoginStatus] = useState<loginStatusType>({username: "", isLogged: false, admin: false, message: ""});
    const [isLogged, setIsLogged] = useState<isLoggedType>({loggedIn: false, user: []});


    const isLoggedIn = useCallback(async () => {
        const utils = new Utils()
        const query = new GetFromDatabase(0, "", "");
        if (loginStatus.username === "" && window.location.href !== utils.loginPath()) {
            setIsLogged(await query.isLogged())
            if (isLogged.loggedIn) {
                setLoginStatus({username: isLogged.user[0].username, admin: isLogged.user[0].isAdmin, isLogged: true, message: ""})
            }
        }
        else if (!loginStatus.isLogged && window.location.href === utils.loginPath()) {
            const a:isLoggedType = await query.isLogged()
            if (a.loggedIn) {
                setIsLogged(a);
                console.log(a)
                console.log(isLogged)
                utils.redirectStats();
                setLoginStatus({username: isLogged.user[0].username, admin: isLogged.user[0].isAdmin, isLogged: true, message: ""})
            }
        }
    }, [isLogged, loginStatus])

    useEffect(() => {
        isLoggedIn()
    }, [isLoggedIn, isLogged, loginStatus])

    return (
        <div className="App">
            <NavBar loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
            <Routes>
                <Route path="*" element={<NoPage/>}/>
                {
                    loginStatus.admin ? (
                    <Route path="/register" element={<RegisterPage/>}/>
                    ) : null
                }
                <Route path="/login" element={<LoginPage loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>}/>
                <Route path="/editPassword" element={<ChangePassword username={loginStatus.username}/>}/>
                <Route path="/stats" element={<Stats/>}>
                    <Route path=":client" element={<AllStatsOptions/>}>
                        <Route path=":id" element={<StatsPageStructure/>}>
                            <Route path=":testRunID" element={<TestAllInformation/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;