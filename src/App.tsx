
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from "./Pages/Dashboard";
import { Bookings } from "./Pages/bookings/Bookings";
import { Contacts } from "./Pages/contacts/Contacts";
import { Rooms } from "./Pages/rooms/Rooms";
import { SingleRoom } from './Pages/rooms/SingleRoom';
import { SingleUser } from './Pages/users/SingleUser';
import { Users } from "./Pages/users/Users";
import Login from "./Pages/Login";
import { Layout } from "./Components/Layout";
import './App.css';
import LoginProvider from './context/LoginProvider';
import RequiredAuth from './context/RequiredAuth';

function App() {
  

    
  return (
    
    <LoginProvider>
    <BrowserRouter>
      <RequiredAuth>
      <Routes>        
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />            
            <Route path="/Bookings" element={<Bookings />} />
            <Route path="/Rooms" element={<Rooms />} />
            <Route  path = "/Rooms/:id" element={<SingleRoom/>}/>
            <Route path="/Contacts" element={<Contacts />} />
            <Route path="/Users" element={<Users />} />
            <Route  path = "/Users/:id" element={<SingleUser/>}/>
          </Route>      
      <Route path="/Login" element={<Login />} />
      </Routes>
      </RequiredAuth>
    </BrowserRouter>
    </LoginProvider>
    

    
    
  );
}

export default App;
