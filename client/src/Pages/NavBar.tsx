/* ------------------- React ------------------- */

import { Dispatch, SetStateAction } from 'react';

/* ------------------- Composants Bootstrap ------------------- */

import Navbar from 'react-bootstrap/Navbar'
import { Nav, Container, Button } from "react-bootstrap";

/* ------------------- Librairies tierces ------------------- */

import Axios from 'axios';



interface Props {
    setLoginStatus: Dispatch<SetStateAction<{admin:boolean, username: string, isLogged: boolean}>>
    loginStatus: {admin:boolean, username: string, isLogged: boolean}
}

function NavBar(props : Props) {

    async function logout() {
        props.setLoginStatus({username:"", isLogged: false, admin: false})
       Axios.get("http://ns3053040.ip-137-74-95.eu:3001/logout")
    }

    return (
        <Navbar bg="info" variant="dark">
            <Container>
                <Navbar.Brand href="">Dashboard auto test</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/stats">Stats</Nav.Link>
                    {
                        props.loginStatus.admin ? (
                            <>
                                <Nav.Link href="/register">Register a new account</Nav.Link>
                            </>
                        ) : null
                    }
                    {
                        props.loginStatus.username !== undefined && (
                            <Nav.Link href="/editPassword">Edit password</Nav.Link>
                        )
                    }
                </Nav>
                    {
                        props.loginStatus.username !== undefined && (
                            <Navbar.Text>{`Logged as ${props.loginStatus.username}`}</Navbar.Text>
                        )
                    }
            </Container>
            {
                props.loginStatus.username !== undefined && (
                    <Button variant="outline-dark" className="margin-right" onClick={logout}>Log Out</Button>
                )
            }
        </Navbar>
    );
}

export default NavBar;


