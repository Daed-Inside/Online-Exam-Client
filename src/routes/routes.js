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
import MyTemplate from "../features/mytemplate/mytemplate";
import Personal from "../features/personal/personal";
import CreateTest from "../features/createTest/createTest";
import ManageClass from "../features/manageClass/manageClass";
import DoTest from "../features/doTest/doTest";
import Overview from "../features/resultOverview/overview";
import Dashboard from "../features/dashboard/dashboard";
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

  // window.addEventListener("storage", () => {
  //   const token = localStorage.getItem(constant.localStorage.TOKEN);
  //   if (!token) {
  //     //navigate("/login");
  //   }
  // });

  return (
    <>
      {token ? (
        <AdminRouting>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/personal-info" element={<Personal />} />
          <Route
            exact
            path="/template/create"
            element={<CreateTest is_new={true} />}
          />
          <Route
            exact
            path="/template/edit/:id"
            element={<CreateTest is_new={false} />}
          />
          <Route
            exact
            path="/template/clone/:id"
            element={<CreateTest is_new={true} />}
          />
          <Route path="/test/result/overview/:id" element={<Overview />} />
          <Route exact path="/manage/template" element={<MyTemplate />} />
          <Route path="/test/conduct/:id" element={<DoTest />} />
          <Route path="/manage/test" element={<MyTest />} />
          <Route path="/test/result/:id" element={<MyTest />} />
          <Route path="/manage/class" element={<ManageClass />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
        <div className="body-background">
          {/* <Router> */}
          <Routes>{children}</Routes>
          {/* </Router> */}
          {/* </body> */}
        </div>
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
