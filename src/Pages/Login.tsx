import React, { useEffect, useState } from 'react'
import { Logo } from "../Components/SideBarStyled";
import { LogContainer } from "./LoginStyled";
import { LogForm } from "./LoginStyled";
import { Inputs } from "./LoginStyled";
import { EditButton } from "../Components/Button";
import logo from "../Assets/Logo.png" 
import { useNavigate } from "react-router-dom";
import { useLogin } from '../context/LoginProvider';

export function Login ()  {
  const login = useLogin()

  const [mail, setMail] = useState("");

  const [pass, setPass] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/")
    }
  })

  const handleForm = (event: React.ChangeEvent<HTMLInputElement & HTMLFormElement>) =>{
    event.preventDefault();
    login.dispatch({type: 'login', user: {mail,pass}})
    setTimeout(() => {
      if(localStorage.getItem("user")){
        
      }
    },100)
    setTimeout(() => navigate('/'), 100)
  }
  

  const handleMail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  }

  const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  }
  //Validación usuario y contraseña
 



    
  return (
        <LogContainer>
          <LogForm onSubmit={handleForm} data-testid="login__form">
            <Logo column>
              <img src={logo} alt="logo" />
              <h2>Miranda Dashboard</h2>
            </Logo>

            <p>
              (Use email=<strong> admin@admin.com </strong> and password=
              <strong> admin</strong> to test the application )
            </p>
            <Inputs>
              <label htmlFor="email">Email:</label>

              <input
                data-testid="login__email__input" 
                type='text' 
                name='email'
                id='email'
                onChange={handleMail}
                placeholder="Email"
                />
              <label htmlFor="password">Pasword:</label>
              <input
                data-testid="login__password__input" 
                type='password'
                name='password'
                id='password'
                onChange={handlePass}
                placeholder="Password"
                  />
            </Inputs>
            
            <EditButton type="submit" data-testid="login__submit__button">Login</EditButton>
          </LogForm>
        </LogContainer>
                
    );
}

export default Login;