/* ------------------- Composants Bootstrap ------------------- */

import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

/* ------------------- React ------------------- */

import { useCallback, useEffect, useState } from 'react';

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';
import Utils from '../classes/Utils';

interface Props {
    username: string;
}

function EnterNewPassword (props : Props) {

    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isUpdated, setIsUpdated] = useState<{state : boolean, message : string}>({state: false, message: ""})
    const [isPasswordOk, setIsPasswordOk] = useState(false)

    const changeUserPassword = useCallback(async () => {
        const query = new GetFromDatabase(0, "", "");
        if (await query.checkJWT()) {
            setIsUpdated(await query.UpdatePassword(props.username, password));
        }
    }, [props, password])


    const check = useCallback(() => {
        const utils = new Utils()

        if (utils.verifPassword(password) && password === passwordConfirm) {
            setIsPasswordOk(true)
        } else {
            setIsPasswordOk(false)
        }
    }, [password, passwordConfirm])


    useEffect(() => {
        const utils = new Utils()
        check();
        if (isUpdated.state === true) {
            setTimeout(() => {
                utils.redirectStats();
            }, 2000)
        }
    }, [isUpdated, check])

    const renderPasswordTooltip = (props : any) => (
        <Tooltip id="button-tooltip" {...props}>
            <small id="passwordTooltip">
                Password size must be 8-30 characters long.
            </small>
        </Tooltip>
    );

    const renderConfirmPasswordTooltip = (props : any) => (
        <Tooltip id="button-tooltip" {...props}>
            <small id="confirmPasswordTooltip">
                Confirm your password by entering it again.
            </small>
        </Tooltip>
    );

    return (
        <>
            {
                isUpdated.message !== "" && (
                    <Alert variant={isUpdated.state ? "success" : "danger"} className='alert'>
                        {isUpdated.state ?
                            <Alert.Heading>Good news!</Alert.Heading> :
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        }
                        <p>
                            {isUpdated.message}
                        </p>
                    </Alert>
                )
            }
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
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)} }
                        type="password" />
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
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {setPasswordConfirm(e.target.value)} }
                        type="password" />
                </InputGroup>
            </OverlayTrigger>
            <button 
                className={isPasswordOk ? "margin-top btn btn-primary" : "margin-top btn btn-primary disabled"} 
                onClick={()=> changeUserPassword()}>
                Change password
            </button>
        </>
    )
}

export default EnterNewPassword;