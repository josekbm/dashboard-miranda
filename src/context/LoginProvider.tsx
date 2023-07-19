import React, { createContext, useContext, useReducer } from 'react'

interface State{
    mail: string,
    pass: string,
    isLogged: boolean
}

interface Action{
    type: string,
    user: {
        mail: string,
        pass: string,
    }
}

interface Context{
    user: {
        mail: string,
        pass: string,
        isLogged: boolean
    }
    dispatch?: any
}

const initialContext: Context = {
    user:{
        mail: '',
        pass: '',
        isLogged: false
    }
}

const LoginContext = createContext(initialContext);

export const useLogin = () => {
    return useContext(LoginContext)
}

const reducer = (state: State ,action: Action) => {
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

const LoginProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [user, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("user") || JSON.stringify({mail: "" , isLogged: false})))

    return(
        <LoginContext.Provider value={{user,dispatch}}>
            {children}
        </LoginContext.Provider>
    )

  
}

export default LoginProvider
