// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../App";
// import axios from "axios";  // Axios for making API requests

// function LoginDoctor() {
//     const { state, dispatch } = useContext(UserContext);  // Using global state
//     const [errorMessages, setErrorMessages] = useState({});
//     const [isSubmitted, setIsSubmitted] = useState(false);
  
//     const navigate = useNavigate();

//     const errors = {
//         uname: "Invalid Username",
//         pass: "Invalid Password"
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const { uname, pass } = document.forms[0];

//         try {
//             // Making a POST request to the backend for login
//             const response = await axios.post('/api/doctor/login', {
//                 username: uname.value,
//                 password: pass.value
//             });

//             if (response.data.success) {
//                 // Update global state with login status and doctor info
//                 dispatch({
//                     type: "USER",
//                     payload: { isLoggedIn: true, doctorId: response.data.doctor._id }
//                 });

//                 // Mark submission as successful
//                 setIsSubmitted(true);

//                 // Navigate to the prescription page after successful login
//                 navigate("/prescriptionpage");
//             }
//         } catch (error) {
//             // Handle login errors (username or password mismatch)
//             if (error.response && error.response.status === 401) {
//                 setErrorMessages({ name: "pass", message: errors.pass });
//             } else if (error.response && error.response.status === 404) {
//                 setErrorMessages({ name: "uname", message: errors.uname });
//             } else {
//                 console.error("Login error:", error);
//             }
//         }
//     };

//     // Generate JSX code for error message
//     const renderErrorMessage = (name) =>
//         name === errorMessages.name && (
//             <div className="error">{errorMessages.message}</div>
//         );

//     // JSX code for login form
//     const renderForm = (
//         <div className="wrapper">
//             <div className="logo">
//                 <img src="https://images2.imgbox.com/e4/b4/H10WmipC_o.png" alt=""></img>
//             </div>
//             <div className="text-center mt-4 name">
//                 DOCTOR LOGIN
//             </div>

//             <form className="login" onSubmit={handleSubmit}>
//                 <div className="login__field">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
//                         <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
//                     </svg>
//                     <input type="text" className="login__input" placeholder="Username" name="uname" required />
//                     {renderErrorMessage("uname")}
//                 </div>
//                 <div className="login__field">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
//                         <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
//                     </svg>
//                     <input type="password" className="login__input" placeholder="Password" name="pass" required />
//                     {renderErrorMessage("pass")}
//                 </div>
//                 <button className="btn mt-3">Login</button>
//             </form>
//         </div>
//     );

//     return (
//         <div className="app">
//             {renderForm}
//         </div>
//     );
// }

// export default LoginDoctor;



import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";  // Axios for making API requests

function LoginDoctor() {
    const { state, dispatch } = useContext(UserContext);  // Using global state
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const navigate = useNavigate();

    const errors = {
        uname: "Invalid Username",
        pass: "Invalid Password"
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { uname, pass } = document.forms[0];

        try {
            // Making a POST request to the backend for login
            const response = await axios.post('http://localhost:5000/doc/login', {
                username: uname.value,
                password: pass.value
            });

            if (response.data.success) {
                // Update global state with login status and doctor info
                localStorage.setItem('doctorId', response.data.doctor._id);
                dispatch({
                    type: "USER",
                    payload: { isLoggedIn: true, doctorId: response.data._id }
                });

                // Mark submission as successful
                setIsSubmitted(true);

                // Navigate to the prescription page after successful login
                navigate("/prescriptionpage");
            }
        } catch (error) {
            // Handle login errors (username or password mismatch)
            if (error.response && error.response.status === 401) {
                setErrorMessages({ name: "pass", message: errors.pass });
            } else if (error.response && error.response.status === 404) {
                setErrorMessages({ name: "uname", message: errors.uname });
            } else {
                console.error("Login error:", error);
            }
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="wrapper">
            <div className="logo">
                <img src="https://images2.imgbox.com/e4/b4/H10WmipC_o.png" alt=""></img>
            </div>
            <div className="text-center mt-4 name">
                DOCTOR LOGIN
            </div>

            <form className="login" onSubmit={handleSubmit}>
                <div className="login__field">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                    <input type="text" className="login__input" placeholder="Username" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="login__field">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg>
                    <input type="password" className="login__input" placeholder="Password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <button className="btn mt-3">Login</button>
                <Link to="/registerdoctor">Register</Link>

            </form>
        </div>
    );

    return (
        <div className="app">
            {renderForm}
        </div>
    );
}

export default LoginDoctor;
