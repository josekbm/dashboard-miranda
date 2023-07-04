import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from "./Pages/Dashboard";
import { Bookings } from "./Pages/Bookings";
import { Contact } from "./Pages/Contact";
import { Rooms } from "./Pages/Rooms";
import { Users } from "./Pages/Users";
import Login from "./Pages/Login";
import { Layout } from "./Components/Layout";
import './App.css';
import LoginProvider from './context/LoginProvider';
import RequiredAuth from './context/RequiredAuth';

function App() {
  

    
  return (
    <>
    <LoginProvider>
    <BrowserRouter>
      <RequiredAuth>
      <Routes>        
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Bookings" element={<Bookings />} />
            <Route path="/Rooms" element={<Rooms />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Users" element={<Users />} />
          </Route>      
      <Route exact path="/Login" element={<Login />} />
      </Routes>
      </RequiredAuth>
    </BrowserRouter>
    </LoginProvider>
    

    
    </>
  );
}

export default App;
