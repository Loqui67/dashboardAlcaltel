/* ------------------- Styles ------------------- */

import '../Styles/App.css';

/* ------------------- Composants ------------------- */

import StatsPageStructure from "../Stats Structure/StatsPageStructure";
import TestAllInformation from '../Test Information/TestAllInformation';
import NavBar from "./NavBar";

/* ------------------- Pages ------------------- */

import Stats from "./Stats";
import NoPage from "./NoPage";
import ChangePassword from './ChangePassword';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';

/* ------------------- React ------------------- */

import { useState, useCallback, useEffect } from 'react';

/* ------------------- librairies tierces ------------------- */

import { Route, Routes } from "react-router-dom";


function App() {

    const loginPath = 'http://ns3053040.ip-137-74-95.eu:3000/login';
    const statsPath = 'http://ns3053040.ip-137-74-95.eu:3000/stats';

    const [loginStatus, setLoginStatus] = useState<{username : string, admin : boolean, isLogged : boolean}>({username: "", isLogged: false, admin: false});
    const [isLogged, setIsLogged] = useState<{loggedIn : boolean, user: Array<any>}>({loggedIn: false, user: []});


    const isLoggedIn = useCallback(async () => {
        const query = new GetFromDatabase(0, "", "");
        if (loginStatus.username === "" && window.location.href !== loginPath) {
            setIsLogged(await query.isLogged())
            if (isLogged.loggedIn) {
                setLoginStatus({username: isLogged.user[0].username, admin: isLogged.user[0].isAdmin, isLogged: true})
            }
        }
        else if (!loginStatus.isLogged && window.location.href === loginPath) {
            setIsLogged(await query.isLogged())
            if (isLogged.loggedIn) {
                window.location.href = statsPath;
                setLoginStatus({username: isLogged.user[0].username, admin: isLogged.user[0].isAdmin, isLogged: true})
            } else {
                setLoginStatus({username: "", isLogged : false, admin: false})
            }
        }
    }, [isLogged, loginStatus])

    useEffect(() => {
        isLoggedIn()
    }, [isLoggedIn])

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
                    <Route path=":id" element={<StatsPageStructure/>}>
                        <Route path=":testRunID" element={<TestAllInformation/>}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;