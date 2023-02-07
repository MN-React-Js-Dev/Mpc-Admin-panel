import "./App.css";
 import Home from "./Component/Home";
import Header from "./Component/Navbar/Header";
import SmallNav from "./Component/Navbar/SmallNav";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Form from "./Pages/Form";
import CreateUser from "./Pages/CreateUser";
import Login from "./Pages/Login";
import Users from "./Pages/Users";
import RegisterUser from "./Pages/RegisterUser";
import Footer from "./Component/Navbar/Footer";
function App() {
  return (
    <>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <Header />
          <div class="layout-page">
            <SmallNav />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/form" element={<Form />}></Route>
              <Route exact path="/create-user" element={<CreateUser />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/users" element={<Users />}></Route>
              <Route exact path="/register-user" element={<RegisterUser />}></Route>
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
