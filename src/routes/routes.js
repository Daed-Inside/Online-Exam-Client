import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Login from "../features/login/login";
import SignUp from "../features/signup/signup";
import NavBar from "../features/layout/navbar/navbar";
import * as React from "react";

function Routings({ children, ...renderProps }) {
  const isLogin = true;
  return (
    <>
      {isLogin === true ? (
        <AdminRouting>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <>
                <p>dashboard</p>
              </>
            }
          />
        </AdminRouting>
      ) : (
        <GlobalRouting>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </GlobalRouting>
      )}
    </>
  );
}

function AdminRouting({ children, ...props }) {
  return (
    <>
      <NavBar />
      <body>
        <Router>
          <Routes>{children}</Routes>
        </Router>
      </body>
    </>
  );
}

function GlobalRouting({ children, ...props }) {
  return (
    <Router>
      <Routes>{children}</Routes>
    </Router>
  );
}

export default Routings;
