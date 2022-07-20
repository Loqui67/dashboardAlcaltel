/* ------------------- React ------------------- */

import { Dispatch, SetStateAction, useState, useCallback } from 'react';

/* ------------------- Classes ------------------- */

import GetFromDatabase from '../classes/GetFromDatabase';
import Utils from '../classes/Utils';

/* ------------------- Composants ------------------- */

import Paragraph from '../HTML components/Paragraph';

/* ------------------- Composants Bootstrap ------------------- */

import Alert from 'react-bootstrap/Alert'
import InputGroup from 'react-bootstrap/InputGroup'
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

/* ------------------- FontAwesome ------------------- */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faEye } from '@fortawesome/free-solid-svg-icons'

/* ------------------- Enum ------------------- */

import { variant } from '../toolbox/enum'



interface Props {
  loginStatus: { error?: boolean, message: string, username: string, admin: boolean, isLogged: boolean };
  setLoginStatus: Dispatch<SetStateAction<{ error?: boolean, message: string, username: string, admin: boolean, isLogged: boolean }>>;
}

interface Ilogin {
  error?: boolean,
  message: string,
  username: string,
  admin: boolean,
  auth: boolean,
  token: string
}

function LoginPage({ loginStatus, setLoginStatus }: Props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  library.add(faUser, faEye)

  const tryLogin = useCallback(async () => {
    const query = new GetFromDatabase(0, "", "");
    const utils = new Utils();
    const login: Ilogin = await query.login(username, password)
    if (!login.auth) {
      setLoginStatus({ username: "", admin: false, isLogged: login.auth, message: login.message, error: true });
    } else {
      localStorage.setItem("token", login.token)
      setLoginStatus({ username: login.username, admin: login.admin, isLogged: login.auth, message: "" });
      utils.redirectStats();
    }
  }, [password, username, setLoginStatus]);


  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Show password
    </Tooltip>
  );

  return (
    <div className="center d-flex flex-column login margin-top-xl">
      <h2>Login to your account !</h2>
      {
        loginStatus.message !== "" && (
          <Alert variant={variant.danger} className='alert'>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <Paragraph text = {loginStatus.message}/>
          </Alert>
        )
      }
      <div className="d-flex flex-column margin-top-xl">
        <InputGroup className="mb-3">
          <InputGroup.Text id="UsernameInput"><FontAwesomeIcon icon={["fas", "user"]} /></InputGroup.Text>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="UsernameInput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value) }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Password"
            aria-label="Password"
            type={showPassword ? "text" : "password"}
            aria-describedby="passwordInput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && tryLogin()}
          />
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button id="confirmPasswordInput" onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)}>
              <FontAwesomeIcon icon={["fas", "eye"]} />
            </Button>
          </OverlayTrigger>

        </InputGroup>
        <button id="login" className='margin-top btn btn-primary' onClick={() => tryLogin()}>Login</button>
        <Form.Text id="login" muted>
          If you don't have an account, please contact Zittel Christophe at&nbsp;
          <span className='blue'>
            christophe.zittel@al-enterprise.com
          </span>
          .
        </Form.Text>
      </div>
    </div>
  )
}

export default LoginPage;