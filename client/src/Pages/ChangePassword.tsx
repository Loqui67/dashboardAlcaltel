/* ------------------- React ------------------- */

import { useState } from 'react';

/* ------------------- Composants ------------------- */

import EnterNewPassword from '../Change Password/EnterNewPassword';
import ConfirmPassword from '../Change Password/ConfirmPassword';

interface Props {
    username: string;
}
function ChangePassword(props : Props) {

    const [step, setStep] = useState(false)

    return (
        <div className="d-flex flex-column margin-top-xl">
            <h2>Change your password</h2>
            <div className="editPassword d-flex flex-column margin-top-xl">
                {
                    !step ? 
                    <ConfirmPassword username = {props.username} setStep={setStep}/> 
                    :
                    <EnterNewPassword username = {props.username}/>
                }
            </div>
        </div>
    )
}

export default ChangePassword;