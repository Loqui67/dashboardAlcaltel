/* ------------------- React ------------------- */

import { Dispatch, SetStateAction } from 'react';

/* ------------------- Composants Bootstrap ------------------- */

import Navbar from 'react-bootstrap/Navbar'
import { Nav, Container, Button } from "react-bootstrap";

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';

/* ------------------- Enum ------------------- */

import { variant } from '../enum/enum'


interface Props {
    setLoginStatus: Dispatch<SetStateAction<{ admin: boolean, username: string, isLogged: boolean, message: string }>>
    loginStatus: { admin: boolean, username: string, isLogged: boolean }
}

function NavBar(props: Props) {

    async function logout() {
        localStorage.removeItem("token")
        const query = new GetFromDatabase(0, "", "");
        props.setLoginStatus({ username: "", isLogged: false, admin: false, message: "" })
        query.logout();
    }

    return (
        <Navbar bg={variant.primary} variant={variant.dark}>
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
                        props.loginStatus.username !== "" && (
                            <Nav.Link href="/editPassword">Edit password</Nav.Link>
                        )
                    }
                </Nav>
                {
                    props.loginStatus.username !== "" && (
                        <Navbar.Text>{`Logged as ${props.loginStatus.username}`}</Navbar.Text>
                    )
                }
            </Container>
            {
                props.loginStatus.username !== "" && (
                    <Button variant="outline-dark" className="margin-right" onClick={logout}>Log Out</Button>
                )
            }
        </Navbar>
    );
}

export default NavBar;


