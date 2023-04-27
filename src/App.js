// import logo from "./logo.svg";
// import "./App.css";
import Navbar from "./components/Share/Navbar/Navbar";
import Profile from "./components/Profile/Profile/Profile";
import Footer from "./components/Share/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { render } from "react-dom";
import Register from "./components/Security/Register/Register";
import Login from "./components/Security/Login/Login";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import PrivateRoute from "./components/Security/PrivateRoute/PrivateRoute";
import PageNotFound from "./components/Share/PageNotFound/PageNotFound";
import ProfileSetting from "./components/Profile/ProfileSetting/ProfileSetting";

function App() {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile></Profile>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile-settings"
            element={
              <PrivateRoute>
                <ProfileSetting></ProfileSetting>
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/*" element={<PageNotFound></PageNotFound>} />
        </Routes>
        <Footer></Footer>
      </AuthProvider>
    </BrowserRouter>,

    document.getElementById("root")
  );
}

export default App;
