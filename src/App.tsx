import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from "./Pages/Dashboard";
import { Bookings } from "./Pages/bookings/Bookings";
import { Contacts } from "./Pages/contacts/Contacts";
import { Rooms } from "./Pages/rooms/Rooms";
import { Users } from "./Pages/users/Users";
import { SingleRoom } from './Pages/rooms/SingleRoom';
import { SingleBooking } from './Pages/bookings/SingleBooking';
import { SingleUser } from './Pages/users/SingleUser';
import Login from "./Pages/login/Login";
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
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:id" element={<SingleBooking />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<SingleRoom />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<SingleUser />} />
          </Route>      
      <Route path="/Login" element={<Login />} />
      </Routes>
      </RequiredAuth>
    </BrowserRouter>
    </LoginProvider>
    
    
    
  );
}
export default App;
