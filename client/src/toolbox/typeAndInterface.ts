/* ------------------- React ------------------- */

import { Dispatch, SetStateAction } from "react";


export interface ConfirmPasswordProps {
    username: string
    setStep: Dispatch<SetStateAction<boolean>>;
}

export interface isPasswordCorrectType {
    state: boolean,
    message: string
}