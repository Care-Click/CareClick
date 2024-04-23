import { Routes, Route, useNavigate } from "react-router-dom";
import React from 'react'
import Navbar from "./components/auth/Navbar.tsx";
import Login from "./components/auth/Login.tsx";
import SignUp from "./components/auth/SignUp.tsx";
import Allpatients from "./components/doctor/Allpatients.tsx";
import MedicalExp from "./components/auth/MedicalExp.tsx";


const App = () => {
  return (
    <div className="App" >
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/join-us" element={<SignUp />} />

        <Route path="/allpatient" element={<Allpatients />} />
        <Route path="/medicalExp" element={<MedicalExp />} />


      </Routes>
    </div>
  )
}

export default App
