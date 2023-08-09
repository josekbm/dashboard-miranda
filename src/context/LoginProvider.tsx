import React, { createContext, useContext, useReducer } from 'react'
import { CrossFetch } from '../Features/API'


interface State{
    mail: string,
    pass: string,
    token: string,
    isLogged: boolean
}

interface Action{
    type: string,
    user: {
        mail: string,
        pass: string,
        token: string
    }
}

interface Context{
    user: {
        mail: string,
        pass: string,
        token: string,
        isLogged: boolean
    }
    dispatch?: any
}

const initialContext: Context = {
    user:{
        mail: '',
        pass: '',
        token: '',
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
            if(action.user.token){
              localStorage.setItem("user", JSON.stringify({mail: action.user.mail, token: action.user.token, isLogged: true}))
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

    let userEmpty = {mail: "", isLogged: false}

    const [user, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("user") || JSON.stringify(userEmpty)))

    return(
        <LoginContext.Provider value={{user,dispatch}}>
            {children}
        </LoginContext.Provider>
    )

  
}

export default LoginProvider

/*import React, { ReactNode, createContext, useState } from 'react';
import { CrossFetch } from '../../Api/Api';

class User implements IUser {
  email: string;
  isLogged: boolean;
  user: string;
  token: string;

  constructor(email: string, isLogged: boolean, user: string) {
    this.email = email;
    this.isLogged = isLogged;
    this.user = user;
    this.token = '';
  }
  login(user: string, email: string): void {
    // Implement the login functionality here
    // For example, you can set the provided values to the instance properties
    this.user = user;
    this.email = email;
    this.isLogged = true;
  }
  logout(): void {
    // Implement the logout functionality here
    // For example, you can reset the instance properties to their default values
    this.user = '';
    this.email = '';
    this.isLogged = false;
  }
}

export interface IUser {
  email: string;
  isLogged: boolean;
  user: string;
  login: (user: string, password: string, email: string) => void;
  logout: () => void;
}
const defaultUser = new User('', false, '');
// Crea el contexto de autenticación
export const AuthContext = createContext<IUser>(null!);

// Crea el proveedor del contexto de autenticación
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  //Obtener usuario del local storage
  const userJson = localStorage.getItem('user');
  let userLoaded: User = defaultUser;
  if (userJson) {
    userLoaded = JSON.parse(userJson);
  }

  const [user, setUser] = useState<User>(userLoaded);

  // Función para iniciar sesión
  const login = async (user: string, password: string, email: string) => {
    let userLogged = new User(user, true, email);
    let response = await CrossFetch('login', 'POST', {
      name: user,
      email: email,
      password: password,
    });

    if (!response) {
      let userNotLogged = new User('', false, '');
      setUser(userNotLogged);
    } else {
      userLogged.token = response.token;
      setUser(userLogged);
      // guardar en el local storage
      let userJson = JSON.stringify(userLogged);
      localStorage.setItem('user', userJson);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    let userLoggedOut = new User(user.user, false, user.email);
    setUser(userLoggedOut);

    // guardar en el local storage
    let userJson = JSON.stringify(userLoggedOut);
    localStorage.setItem('user', userJson);
  };

  return (
    <AuthContext.Provider value={{ ...user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};*/