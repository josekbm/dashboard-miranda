import { Navigate, Outlet } from 'react-router-dom'
export const PrivateRoutes = () => {
  let auth = {'setLoggedIn':true}
return (
    auth.setLoggedIn ? <Outlet/> :  <Navigate to='/Login'/>
  )
}
