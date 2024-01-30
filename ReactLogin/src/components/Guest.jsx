import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextSource";

export default function Guest() {
    const {user, token} = useStateContext();
    if(token) {
        return<Navigate to="/" />;
    }
    return(
        <div id="guestLayout">
            <Outlet />
        </div>
    );
}