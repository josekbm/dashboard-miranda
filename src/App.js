import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./Pages/dashboard";
import { Bookings } from "./Pages/bookings";
import { Contact } from "./Pages/contact";
import { Rooms } from "./Pages/rooms";
import { Users } from "./Pages/users";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Dashboard />} />
        <Route  path="/bookings" element={<Bookings />} />
        
        <Route  path="/rooms" element={<Rooms />} />
        
        <Route  path="/contact" element={<Contact />} />
        <Route  path="/users" element={<Users />} />{" "}
                      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
