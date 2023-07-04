import React, { createContext, useContext, useReducer } from 'react'

const LoginContext = createContext(false);

export const useLogin = () => {
    return useContext(LoginContext)
}

const reducer = (state,action) => {
    switch (action.type) {
        case 'login':
            if(action.user.mail === "admin@admin.com" && action.user.pass === "admin"){
                localStorage.setItem("user", JSON.stringify({mail: action.user.mail, isLogged: true}))
                return {...state, mail: action.user.mail, isLogged: true}
            } else {
                return {...state, isLogged: false}
            }
        case 'logout':
            localStorage.removeItem("user");
            return {...state, mail: "", isLogged: false}    
        default : 
            return {...state}    
    }
}

function LoginProvider({children}) {

    let userEmpty = {mail: "" , isLogged: false};

    const [user, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("user")) || userEmpty)

    return(
        <LoginContext.Provider value={{user,dispatch}}>
            {children}
        </LoginContext.Provider>
    )

  
}

export default LoginProvider
