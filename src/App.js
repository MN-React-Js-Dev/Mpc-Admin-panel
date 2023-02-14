import "./App.css";
import Home from "./Component/Home";
import { Routes, Route } from "react-router-dom";
import Form from "./Pages/Form";
import CreateUser from "./Pages/CreateUser";
import Login from "./Component/WithoutNav/Login";
import Users from "./Pages/Users";
import RegisterUser from "./Pages/RegisterUser";
import WithoutNav from "./Component/WithoutNav/WithoutNav";
import WithNav from "./Component/WithNav/WithNav";
import ChangePassword from "./Component/WithoutNav/ChangePassword";
import ForgotPassword from "./Component/WithoutNav/ForgotPassword";
import ResetPassword from "./Component/WithoutNav/ResetPassword";
import Orders from "./Pages/Orders";

function App() {

  // const token = localStorage.getItem('MPCADMIN')
  // console.log("TOKEN In APP~~~>>>>>>", token)

  return (
    <>
    <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/" element={<Login />} />
          <Route path="/change-password" element={ <ChangePassword /> } />
          <Route path="/forgot-password" element={ <ForgotPassword/> } />
          <Route path="/reset-password" element={ <ResetPassword/> } />
        </Route>
        
        <Route element={<WithNav />}>
          <Route exact path="/home" element={<Home />}></Route>
          <Route path="/form" element={<Form />} />
          <Route path="/form/:id" element={<Form />} />
          <Route exact path="/create-user" element={<CreateUser />}></Route>
          <Route exact path="/users" element={<Users />}></Route>
          <Route exact path="/register-user" element={<RegisterUser />}></Route>
          <Route exact path="/update-user/:id" element={<RegisterUser />}></Route>
          <Route exact path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
