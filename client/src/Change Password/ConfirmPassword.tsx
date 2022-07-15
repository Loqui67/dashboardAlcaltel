/* ------------------- Composants Bootstrap ------------------- */

import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

/* ------------------- React ------------------- */

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';

interface Props {
    username : string
    setStep : Dispatch<SetStateAction<boolean>>;
}

interface isPasswordCorrectType {
    state: boolean, 
    message: string
}

function ConfirmPassword({username, setStep} : Props) {

    const [password, setPassword] = useState('')
    const [isPasswordCorrect, setIsPasswordCorrect] = useState<isPasswordCorrectType>({state: false, message: ""})

    const submitPassword = useCallback(async () => {
        const query = new GetFromDatabase(0, "", "");
        //if (await query.checkJWT()) {
            setIsPasswordCorrect(await query.ConfirmPassword(username, password)); //vérifie que le mot de passe est correct
        //}
    }, [username, password])


    useEffect(() => {
        if (isPasswordCorrect.state === true) {
            setStep(true)  //pour passer a l'étape de maj du mot de passe
        }
    }, [isPasswordCorrect, setStep])

    return (
        <>
            {
                isPasswordCorrect.message !== "" && (       //on affiche une alerte si le mot de passe est incorrect, ou en cas d'erreur
                    <Alert variant={"danger"} className='alert'>
                        {
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        }
                        <p>
                            {isPasswordCorrect.message}
                        </p>
                    </Alert>
                )
            }
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Actual password"
                    aria-label="Actual password"
                    aria-describedby="passwordInput"
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)} }
                    type="password" />
            </InputGroup>
            <button 
                className={"margin-top btn btn-primary"} 
                onClick={()=> submitPassword()}>
                Confirm actual password
            </button>
        </>
    )
}

export default ConfirmPassword;