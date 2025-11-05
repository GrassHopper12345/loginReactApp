import { createBrowserRouter, Navigate } from "react-router-dom";
import Dash from "./Dashboard.jsx";
import Default from "./components/Default.jsx";
import Guest from "./components/Guest.jsx";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Signup from "./views/Signup.jsx";
import UserForm from "./views/UserForm.jsx";
import Users from "./views/Users.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Dash />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            }
        ]
    },
    {
        path: '/',
        element: <Guest />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;