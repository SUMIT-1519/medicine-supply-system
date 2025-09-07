import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App";
import { loggedinmedical } from "../reducer/UseReducer";

function Logout() {
    
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    localStorage.removeItem('medicalOwnerId');
    dispatch({ type: "MEDICAL", payload: { isLoggedIn: false, medicalOwnerId: null } });
    navigate('/');
}

export default Logout;