import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import { useStateContext } from "../context/ContextSource.jsx";

export default function Signup() {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const { setUser, setToken, saveUser, getUserByEmail } = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = e => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirmation = passwordConfirmationRef.current.value;

        // Basic validation
        const validationErrors = {};
        
        if (!name) {
            validationErrors.name = ['Name is required'];
        }
        if (!email) {
            validationErrors.email = ['Email is required'];
        }
        if (!password) {
            validationErrors.password = ['Password is required'];
        }
        if (password !== passwordConfirmation) {
            validationErrors.password_confirmation = ['Passwords do not match'];
        }

        // Check if email already exists
        if (getUserByEmail(email)) {
            validationErrors.email = ['Email already exists'];
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Save user to localStorage
        const newUser = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        };

        saveUser(newUser);

        // Auto-login after signup
        const user = getUserByEmail(email);
        if (user) {
            setUser(user);
            setToken('local-token');
        }
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup</h1>
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password Please!" />
                    <button className="btn btn-block" >Sign-Up</button>
                    <p className="message">Already Registerd?<Link to="/login">Please Sign-In!</Link></p>
                </form>
            </div>
        </div>
    )
}