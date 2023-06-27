
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Bookings } from "./Pages/Bookings";
import { Contact } from "./Pages/Contact";
import { Rooms } from "./Pages/Rooms";
import { Users } from "./Pages/Users";


import { Layout } from "./Componentes/Layout";

import './App.css';



function App() {
  
  return (
    <>
    
    <BrowserRouter>
      <Routes>
      

            <Route element={<Layout />}>
              <Route  path="/" element={<Dashboard />} />
              <Route  path="/Bookings" element={<Bookings />} />
              
              <Route  path="/Rooms" element={<Rooms />} />
              
              <Route  path="/Contact" element={<Contact />} />
              <Route  path="/Users" element={<Users />} />{" "}
              
              
            </Route>
                      
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
