/* ------------------- Composants Bootstrap ------------------- */

import Navbar from "react-bootstrap/Navbar";
import { Nav, Container, Button } from "react-bootstrap";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../classes/GetFromDatabase";

/* ------------------- Enum ------------------- */

import { variant } from "../toolbox/enum";

/* ------------------- Types Interfaces Contexts ------------------- */

import { useLoginContext } from "../toolbox/context";

function NavBar() {
    const { loginStatus } = useLoginContext();
    const { setLoginStatus } = useLoginContext();

    async function logout() {
        localStorage.removeItem("token"); //on supprime le token
        const query = new GetFromDatabase(0, "", "");
        setLoginStatus({
            username: "",
            isLogged: false,
            admin: false,
            message: "",
        });
        query.logout(); //la requete va detruire session et cookie
    }

    return (
        //affiche différents menu en fonction de l'utilisateur connecté ou non
        <Navbar bg={variant.primary} variant={variant.dark}>
            <Container>
                <Navbar.Brand href="">Dashboard auto test</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/stats">Stats</Nav.Link>
                    {loginStatus.admin ? (
                        <>
                            <Nav.Link href="/register">
                                Register a new account
                            </Nav.Link>
                        </>
                    ) : null}
                    {loginStatus.username !== "" && (
                        <Nav.Link href="/editPassword">Edit password</Nav.Link>
                    )}
                </Nav>
                {loginStatus.username !== "" && (
                    <Navbar.Text>{`Logged as ${loginStatus.username}`}</Navbar.Text>
                )}
            </Container>
            {loginStatus.username !== "" && (
                <Button
                    variant="outline-dark"
                    className="margin-right"
                    onClick={logout}
                >
                    Log Out
                </Button>
            )}
        </Navbar>
    );
}

export default NavBar;
