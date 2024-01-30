import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextSource.js";
import axiosContext from "../axios-context.js";
import { useEffect } from "react";
import { useEffect } from "react";
import Head from "./Head.jsx";

export default function Default() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />
    }
    const onLogout = e => {
        e.preventDefault();

        axiosContext.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }
    useEffect(() => {
        axiosContext.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])
    return (
        <div id="defaultLayout">
            <div className="content">
                <Head user={user} onLogout={onLogout} />
                <main>
                    <Outlet user={user} />
                </main>
                {notification &&
                    <div className="notification">{notification}</div>
                }
            </div>
        </div>
    )
}