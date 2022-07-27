/* ------------------- React ------------------- */

import { useState } from "react";

/* ------------------- Composants ------------------- */

import EnterNewPassword from "../Components/Change Password/EnterNewPassword";
import ConfirmPassword from "../Components/Change Password/ConfirmPassword";

interface Props {
    username: string;
}

function ChangePassword(props: Props) {
    const [step, setStep] = useState(false);

    return (
        <div className="d-flex flex-column margin-top-xl">
            <h2>Change your password</h2>
            <div className="editPassword d-flex flex-column margin-top-xl">
                {!step ? ( //affiche tel ou tel composants si le mot de passe actuel à été validé
                    <ConfirmPassword
                        username={props.username}
                        setStep={setStep}
                    />
                ) : (
                    <EnterNewPassword username={props.username} />
                )}
            </div>
        </div>
    );
}

export default ChangePassword;
