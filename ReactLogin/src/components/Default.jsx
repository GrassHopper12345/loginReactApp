import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextSource.jsx";
import Head from "./Head.jsx";

export default function Default() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />
    }
    const onLogout = e => {
        e.preventDefault();
        setUser({})
        setToken(null)
    }
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