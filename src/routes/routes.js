import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./routes.css";
import Login from "../features/login/login";
import SignUp from "../features/signup/signup";
import NavBar from "../features/layout/navbar/navbar";
import Footer from "../features/layout/footer/footer";
import MyTest from "../features/mytest/mytest";
import CreateTest from "../features/createTest/createTest";
import DoTest from "../features/doTest/doTest";
import * as React from "react";

function Routings({ children, ...renderProps }) {
  const isLogin = true;
  return (
    <>
      {isLogin === true ? (
        <AdminRouting>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/CreateTest" element={<CreateTest />} />
          <Route path="/DoTest" element={<DoTest />} />
          <Route path="/MyTest" element={<MyTest />} />
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
      <div className="full-wrap-content">
        <NavBar />
        {/* <body className="body-background"> */}
        <div className="body-background">
          <Router>
            <Routes>{children}</Routes>
          </Router>
          {/* </body> */}
        </div>
        <Footer />
      </div>
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
