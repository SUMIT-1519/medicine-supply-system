import React from "react";
import { createContext, useReducer } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Importing pages and components
import AddMedPage from "./pages/addMedPage";
import MedDashboard from "./pages/MedDashboard";
import Status from "./pages/statusPage";
import Navbar from "./components/navbar";
import NavbarMedical from "./components/navbarmedical";
import Home from "./pages/homePage";
import LoginDoctor from "./pages/LoginDoctor";
import LoginMedical from "./pages/LoginMedical";
import RegisterMedical from "./pages/RegisterMedical";
import RegisterDoctor from "./pages/RegisterDoctor";
import Consent from './pages/consentPage';
import PrescriptionPage from "./pages/prescriptionPage";
import PreBooking from "./pages/preBooking";
import Logout from "./pages/Logout";

// Importing context and reducer
import { initialState, userReducer } from "../src/reducer/UseReducer";

// Creating context
export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Check if medical owner is logged in
  const loggedinmedical = state.isLoggedIn;

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        {loggedinmedical ? <NavbarMedical /> : <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/logindoctor' element={<LoginDoctor />} />
          <Route path='/loginmedical' element={<LoginMedical />} />
          <Route path='/registermedical' element={<RegisterMedical />} />
          <Route path='/registerdoctor' element={<RegisterDoctor />} />

          <Route path='/meddashboard' element={<MedDashboard />} />
          <Route path='/addmed' element={<AddMedPage />} />
          <Route path='/status' element={<Status />} />
          <Route path='/consent/:id' element={<Consent />} />
          <Route path='/prescriptionpage' element={<PrescriptionPage />} />

          <Route path='/prebook/:prescriptionId' element={<PreBooking />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
