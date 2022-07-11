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

function ConfirmPassword({username, setStep} : Props) {

    const [password, setPassword] = useState('')
    const [isPasswordCorrect, setIsPasswordCorrect] = useState<{state: boolean; message: string}>({state: false, message: ""})

    const submitPassword = useCallback(async () => {
        const query = new GetFromDatabase(0, "", "");
        setIsPasswordCorrect(await query.ConfirmPassword(username, password));
    }, [username, password])


    useEffect(() => {
        if (isPasswordCorrect.state === true) {
            setStep(true)
        }
    }, [isPasswordCorrect, setStep])

    return (
        <>
            {
                isPasswordCorrect.message !== "" && (
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