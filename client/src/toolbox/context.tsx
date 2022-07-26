import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { loginStatusType } from "./typeAndInterface";

export type LoginContextType = {
    loginStatus: loginStatusType;
    setLoginStatus: Dispatch<SetStateAction<loginStatusType>>;
};

export const LoginContext = createContext<LoginContextType>({
    loginStatus: {
        username: "",
        isLogged: false,
        admin: false,
        message: "",
    },
    setLoginStatus: () => {},
});

export const useLoginContext = () => useContext(LoginContext);
