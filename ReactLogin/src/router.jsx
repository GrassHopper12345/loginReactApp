import {creaeteBrowserRouter, Navigate} from "react-router-dom";
 import Dash from "./Dashboard.jsx";
 import Default from "./Default.jsx";
 import Guest from "./Guest.jsx";
 import Login from "./views/Login.jsx";
 import NotFound from "./views/NotFound.jsx";
 import Signup from "./views/Signup.jsx";
 import UserForm from "./views/UserForm.jsx";
 import Users from "./views/Users.jsx";

  const router = creaeteBrowserRouter([
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
        ],
    }
  ])