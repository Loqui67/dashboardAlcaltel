/* ------------------- React ------------------- */

import { useCallback, useEffect, useState } from "react";

/* ------------------- Composants ------------------- */

import Paragraph from "../HTML components/Paragraph";

/* ------------------- Composants Bootstrap ------------------- */

import InputGroup from "react-bootstrap/InputGroup";
import { FormControl } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../classes/GetFromDatabase";

/* ------------------- Enum ------------------- */

import { variant } from "../toolbox/enum";

/* ------------------- Types And Interfaces ------------------- */

import {
    ConfirmPasswordProps,
    isPasswordCorrectType,
} from "../toolbox/typeAndInterface";

function ConfirmPassword({ username, setStep }: ConfirmPasswordProps) {
    const [password, setPassword] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] =
        useState<isPasswordCorrectType>({ state: false, message: "" });

    const submitPassword = useCallback(async () => {
        const query = new GetFromDatabase(0, "", "");
        if (await query.checkJWT()) {
            setIsPasswordCorrect(
                await query.ConfirmPassword(username, password)
            ); //vérifie que le mot de passe est correct
        }
    }, [username, password]);

    useEffect(() => {
        if (isPasswordCorrect.state === true) {
            setStep(true); //pour passer a l'étape de maj du mot de passe
        }
    }, [isPasswordCorrect, setStep]);

    return (
        <>
            {isPasswordCorrect.message !== "" && ( //on affiche une alerte si le mot de passe est incorrect, ou en cas d'erreur
                <Alert variant={variant.danger} className="alert">
                    {<Alert.Heading>Oh snap! You got an error!</Alert.Heading>}
                    <Paragraph text={isPasswordCorrect.message} />
                </Alert>
            )}
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Actual password"
                    aria-label="Actual password"
                    aria-describedby="passwordInput"
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value) //a chaque changement de valeur, on met le useState de password a jour
                    }
                    type="password"
                />
            </InputGroup>
            <button
                className="margin-top btn btn-primary"
                onClick={() => submitPassword()} //on appelle la fonction pour verifier le pasword
            >
                Confirm actual password
            </button>
        </>
    );
}

export default ConfirmPassword;
