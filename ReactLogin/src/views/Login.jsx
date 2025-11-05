import { Link } from "react-router-dom";
import { createRef } from "react";
import { useStateContext } from "../context/ContextSource.jsx";
import { useState } from "react";

export default function Login() {
    const LoginSignupForm = {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const emailRef = createRef()
    const passwordRef = createRef()
    const { setUser, setToken, authenticateUser } = useStateContext()
    const [message, setMessage] = useState(null)

    const onSubmit = e => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const user = authenticateUser(email, password);
        
        if (user) {
            setUser(user);
            setToken('local-token'); // Simple token for localStorage-based auth
        } else {
            setMessage('Invalid email or password');
        }
    }

    return (
        <div className="container animated fadeInDown" style={LoginSignupForm}>
            <form className="row g-3" onSubmit={onSubmit}>
                {message &&
                    <div className="alert">
                        <p>{message}</p>
                    </div>
                }

                <h1 className="title">Account Login</h1>
                <div className="col-auto">
                    <label className="visually-hidden" htmlFor="statisEmail2">Email</label>
                    <input ref={emailRef} placeholder="Email" type="text" className="form-control" />
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" htmlFor="statisPassword2">Password</label>
                    <input ref={passwordRef} placeholder="Password" type="password" className="form-control" />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" type="submit">Confirm</button>
                </div>
                <div className="text-center">
                    <p className="message">Not Registered? <Link to="/signup">Create An Account</Link></p>
                </div>
            </form>
        </div>
    )
}
