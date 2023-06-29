import { useRef, useState, useEffect } from "react";
import { Logo } from "../Componentes/SideBarStyled";
import { LogContainer } from "./LoginStyled";
import { LogForm } from "./LoginStyled";
import { Inputs } from "./LoginStyled";
import { EditButton } from "../Componentes/Button";
import logo from "../Assets/Logo.png" 
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useLocalStorage from "../Hooks/useLocalStorage";
import useImput from "../Hooks/useInput";

export const Login =(props) => {
  const {setAuth, persist, setPersist} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, reset, attibuteObj] = useImput('')//useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])
  
    
  return (
        <LogContainer>
          <LogForm onSubmit={submitHandler} >
            <Logo column>
              <img src={logo} alt="logo" />
              <h2>travl</h2>
            </Logo>

            <p>
              (Use email=<strong> admin@admin.com </strong> and password=
              <strong> admin</strong> to test the application )
            </p>
            <Inputs>
              <label htmlFor="email">Email:</label>
              <input input type="text" name="username" value={username} onChange={changeHandler}/>
              <label htmlFor="password">Pasword:</label>
              <input type="password" name="password" value={password} onChange={changeHandler}/>
            </Inputs>
            
            <EditButton type="submit">Login</EditButton>
          </LogForm>
        </LogContainer>
                
    );
}

export default Login;