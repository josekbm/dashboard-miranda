import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useLogin } from './LoginProvider';

function RequiredAuth({children}) {

    const auth = useLogin();

    const location = useLocation();
    
    if(!auth.user.isLogged && location.pathname!=="/login"){
        return <Navigate to="/login"/>
    }

    return children

  
}

export default RequiredAuth