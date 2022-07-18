/* ------------------- React ------------------- */

import { useCallback, useEffect, useMemo, useState } from 'react';

/* ------------------- Composants ------------------- */

import Paragraph from '../HTML components/Paragraph';
import Small from '../HTML components/Small';

/* ------------------- Composants Bootstrap ------------------- */

import Alert from 'react-bootstrap/Alert'
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

/* ------------------- Classes ------------------- */

import Utils from '../classes/Utils';
import GetFromDatabase from '../classes/GetFromDatabase';

/* ------------------- FontAwesome ------------------- */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faEye } from '@fortawesome/free-solid-svg-icons'

/* ------------------- Enum ------------------- */

import { variant } from '../enum/enum'


function RegisterPage() {

    library.add(faUser, faEye)

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [passwordRegConfirm, setPasswordRegConfirm] = useState('')

    const [regState, setRegState] = useState<{ message?: string, state: boolean }>({ state: false })
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUsernameOk, setIsUsernameOk] = useState(false)
    const [isPasswordOk, setIsPasswordOk] = useState(false)


    const query = useMemo(() => new GetFromDatabase(0, "", ""), [])


    async function registerUser() {
        let admin: boolean;
        if (isAdmin) admin = true;
        else admin = false;
        if (await query.checkJWT()) {
            setRegState(await query.registerUser(usernameReg, passwordReg, admin));
        }
    }

    const check = useCallback(() => {
        const utils = new Utils()

        if (utils.verifUsername(usernameReg) && !utils.hasSpecialCharacters(usernameReg)) {
            setIsUsernameOk(true)
        } else {
            setIsUsernameOk(false)
        }
        if (utils.verifPassword(passwordReg) && passwordReg === passwordRegConfirm) {
            setIsPasswordOk(true)
        } else {
            setIsPasswordOk(false)
        }
    }, [usernameReg, passwordReg, passwordRegConfirm])

    useEffect(() => {
        check();
    })

    const renderUsernameTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            <Small id="usernameTooltip" text="Username size must be 5-20 characters long. No special characters allowed."/>
        </Tooltip>
    );

    const renderPasswordTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            <Small id="passwordTooltip" text="Password size must be 8-30 characters long."/>
        </Tooltip>
    );

    const renderConfirmPasswordTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            <Small id="confirmPasswordTooltip" text="Confirm your password by entering it again."/>
        </Tooltip>
    );

    return (
        <div className="Register d-flex flex-column margin-top-xl">
            <h2>Register a new account !</h2>
            {
                regState.message && (
                    <Alert variant={regState.state ? variant.success : variant.danger} className='alert'>
                        {regState.state ?
                            <Alert.Heading>Good news!</Alert.Heading> :
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        }
                        <Paragraph text={regState.message} />
                    </Alert>
                )
            }
            <div className="d-flex flex-column margin-top-xl">
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 200, hide: 200 }}
                    overlay={renderUsernameTooltip}
                >
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="UsernameInput"><FontAwesomeIcon icon={["fas", "user"]} /></InputGroup.Text>
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="UsernameInput"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUsernameReg(e.target.value) }}
                        />
                    </InputGroup>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 200, hide: 200 }}
                    overlay={renderPasswordTooltip}
                >
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="passwordInput"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordReg(e.target.value)}
                            type="password"
                        />
                        {/*  <Button id="confirmPasswordInput"><FontAwesomeIcon icon={["fas", "eye"]}/></Button> */}
                    </InputGroup>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 200, hide: 200 }}
                    overlay={renderConfirmPasswordTooltip}
                >
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Confirm password"
                            aria-label="Confirm password"
                            aria-describedby="confirmPasswordInput"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordRegConfirm(e.target.value)}
                            type="password"
                        />
                        {/* <Button id="confirmPasswordInput"><FontAwesomeIcon icon={["fas", "eye"]}/></Button> */}
                    </InputGroup>
                </OverlayTrigger>
                <Form.Check
                    type={"checkbox"}
                    id={"checkbox"}
                    label={"User is admin ?"}
                    onClick={() => setIsAdmin(!isAdmin)}
                />
                <button
                    className={isUsernameOk && isPasswordOk ? "margin-top btn btn-primary" : "margin-top btn btn-primary disabled"}
                    onClick={() => registerUser()}>
                    Create account
                </button>
            </div>
        </div>
    )
}

export default RegisterPage;