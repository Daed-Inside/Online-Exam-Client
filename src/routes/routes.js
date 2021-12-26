import {BrowserRouter as Router, Route, Navigate, Routes  } from "react-router-dom";
import Login from "../features/login/login";
import SignUp from "../features/signup/signup";


function Routings(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    )
}

export default Routings;





