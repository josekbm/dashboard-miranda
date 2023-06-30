import React from "react";
import { useState } from "react";
import { Logo } from "../Componentes/SideBarStyled";
import { LogContainer } from "./LoginStyled";
import { LogForm } from "./LoginStyled";
import { Inputs } from "./LoginStyled";
import { EditButton } from "../Componentes/Button";
import logo from "../Assets/Logo.png" 
import { useNavigate } from "react-router-dom";

export function Login ()  {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesLogin = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    localStorage.setItem('logged', 'true');
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    if(email === "admin@admin.com" && password === "admin") {
      navigate("/Dashboard");
    }else {
      navigate("/Login");
    }
  };
    
  return (
        <LogContainer>
          <LogForm onSubmit={handlesLogin} >
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
                type='text' 
                name='email'
                id='email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                autoCompleted='off'
                placeholder="Email"
                />
              <label htmlFor="password">Pasword:</label>
              <input type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  autoCompleted='off'
                  placeholder="Password"
                  />
            </Inputs>
            
            <EditButton type="submit">Login</EditButton>
          </LogForm>
        </LogContainer>
                
    );
}

export default Login;