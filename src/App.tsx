
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from "./Pages/Dashboard";
import { Bookings } from "./Pages/Bookings";
import { Contacts } from "./Pages/Contacts";
import { Rooms } from "./Pages/Rooms";
import { SingleRoom } from './Pages/SingleRoom';
import { Users } from "./Pages/Users";
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
            <Route path="/SingleRoom" element={<SingleRoom />} />
            <Route path="/Contacts" element={<Contacts />} />
            <Route path="/Users" element={<Users />} />
          </Route>      
      <Route path="/Login" element={<Login />} />
      </Routes>
      </RequiredAuth>
    </BrowserRouter>
    </LoginProvider>
    

    
    
  );
}

export default App;
