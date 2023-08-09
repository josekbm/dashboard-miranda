import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Logo } from "../../Components/SideBarStyled";
import { LogContainer, LogForm, Inputs } from "./LoginStyled";
import { EditButton } from "../../Components/Button";
import logo from "../../Assets/Logo.png";
import { useLogin } from '../../context/LoginProvider'; 
import { toast } from 'react-toastify';


let toastMSG = (msg = "Wrong User") => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  })
} 

const loginApi = async(mail: String,password: String) => {
  try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}login`,{
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({email: mail, password: password}),
          headers: {"Content-type": "application/json;charset=UTF-8"}
      })
      if(!response.ok){
          toastMSG("Wrong User")
      }else{
          const data = await response.json();
          return data;
      }
  }catch(e){
      console.log(e)
  }
}




export function Login (props: any)  {
  const login = useLogin()
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/")
    }
  })

  const handleForm = async (event: React.ChangeEvent<HTMLInputElement & HTMLFormElement>) =>{
    event.preventDefault();
    if(mail===""){
      return toastMSG("Empty Email")
    }
    if(pass===""){
      return toastMSG("Empty Password")
    }
    const token  = await loginApi(mail,pass)
    if(!token){
      return toastMSG("There's no Token!")
    }
    login.dispatch({type: 'login', user: {mail,pass,token}})
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