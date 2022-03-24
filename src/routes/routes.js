import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./routes.css";
import Login from "../features/login/login";
import SignUp from "../features/signup/signup";
import NavBar from "../features/layout/navbar/navbar";
import Footer from "../features/layout/footer/footer";
import MyTest from "../features/mytest/mytest";
import CreateTest from "../features/createTest/createTest";
import ManageClass from "../features/manageClass/manageClass";
import DoTest from "../features/doTest/doTest";
import constant from "../constants/constant";
import * as React from "react";

function Routings({ children, ...renderProps }) {
  const navigate = useNavigate();
  const token = localStorage.getItem(constant.localStorage.TOKEN);

  React.useEffect(() => {
    if (token) {
      // navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  window.addEventListener("storage", () => {
    const token = localStorage.getItem(constant.localStorage.TOKEN);
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
      {token ? (
        <AdminRouting>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route exact path="/CreateTest/:id" element={<CreateTest />} />
          <Route path="/DoTest" element={<DoTest />} />
          <Route path="/MyTest" element={<MyTest />} />
          <Route path="/ManageClass" element={<ManageClass />} />
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
          {/* <Router> */}
          <Routes>{children}</Routes>
          {/* </Router> */}
          {/* </body> */}
        </div>
        <Footer />
      </div>
    </>
  );
}

function GlobalRouting({ children, ...props }) {
  return (
    // <Router>
    <Routes>{children}</Routes>
    // </Router>
  );
}

export default Routings;
