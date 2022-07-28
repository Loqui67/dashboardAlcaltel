/* ------------------- React ------------------- */

import { useCallback, useEffect, useState } from "react";

/* ------------------- Composants ------------------- */

import Small from "../HTML components/Small";

/* ------------------- Composants Bootstrap ------------------- */

import InputGroup from "react-bootstrap/InputGroup";
import { FormControl } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

/* ------------------- Classes ------------------- */

import GetFromDatabase from "../../classes/GetFromDatabase";
import Utils from "../../classes/Utils";

/* ------------------- Enum ------------------- */

import { variant } from "../../tools/enum";

/* ------------------- Types And Interfaces ------------------- */

import {
    EnterNewPasswordProps,
    isUpdatedType,
} from "../../tools/typeAndInterface";

function EnterNewPassword(props: EnterNewPasswordProps): JSX.Element {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isUpdated, setIsUpdated] = useState<isUpdatedType>({
        state: false,
        message: "",
    });
    const [isPasswordOk, setIsPasswordOk] = useState(false);

    const changeUserPassword = useCallback(async () => {
        const query = new GetFromDatabase(0, "", "");
        setIsUpdated(await query.UpdatePassword(props.username, password)); //on demande le changement de mot de passe
    }, [props, password]);

    const check = useCallback(() => {
        const utils = new Utils();

        if (utils.verifPassword(password) && password === passwordConfirm) {
            //on vérifie que le mot de passe soit correct (bon format)
            setIsPasswordOk(true);
        } else {
            setIsPasswordOk(false);
        }
    }, [password, passwordConfirm]);

    useEffect((): void => {
        const utils = new Utils();
        check();
        if (isUpdated.state === true) {
            setTimeout(() => {
                //redirige après deux secondes à la page de statistiques si le mdp est bien mis à jour
                utils.redirectStats();
            }, 2000);
        }
    }, [isUpdated, check]);

    const renderPasswordTooltip = (props: any): JSX.Element => (
        <Tooltip id="button-tooltip" {...props}>
            <Small
                id="passwordTooltip"
                text="Password size must be 8-30 characters long."
            />
        </Tooltip>
    );

    const renderConfirmPasswordTooltip = (props: any): JSX.Element => (
        <Tooltip id="button-tooltip" {...props}>
            <Small
                id="confirmPasswordTooltip"
                text="Confirm your password by entering it again."
            />
        </Tooltip>
    );

    return (
        <>
            {isUpdated.message !== "" && ( //alerte en fonction du retour du serveur, erreur ou réussite
                <Alert
                    variant={isUpdated.state ? variant.success : variant.danger}
                    className="alert"
                >
                    {isUpdated.state ? (
                        <Alert.Heading>Good news!</Alert.Heading>
                    ) : (
                        <Alert.Heading>
                            Oh snap! You got an error!
                        </Alert.Heading>
                    )}
                    <p>{isUpdated.message}</p>
                </Alert>
            )}
            <OverlayTrigger
                placement="right"
                delay={{ show: 200, hide: 200 }}
                overlay={renderPasswordTooltip}
            >
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="New password"
                        aria-label="New password"
                        aria-describedby="passwordInput"
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value) //a chaque changement de valeur, on met le useState de password a jour
                        }
                        type="password"
                    />
                </InputGroup>
            </OverlayTrigger>
            <OverlayTrigger
                placement="right"
                delay={{ show: 200, hide: 200 }}
                overlay={renderConfirmPasswordTooltip}
            >
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Confirm new password"
                        aria-label="Confirm new password"
                        aria-describedby="confirmPasswordInput"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPasswordConfirm(e.target.value)
                        }
                        type="password"
                    />
                </InputGroup>
            </OverlayTrigger>
            <button
                className={
                    isPasswordOk
                        ? "margin-top btn btn-primary"
                        : "margin-top btn btn-primary disabled"
                }
                onClick={() => changeUserPassword()} //appel a la fonction pour changer de password
            >
                Change password
            </button>
        </>
    );
}

export default EnterNewPassword;
