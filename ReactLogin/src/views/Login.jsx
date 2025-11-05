import { Link } from "react-router-dom";
import { createRef } from "react";
import { useStateContext } from "../context/ContextSource.jsx";
import { useState } from "react";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken, authenticateUser } = useStateContext();
  const [message, setMessage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const user = authenticateUser(email, password);

    if (user) {
      setUser(user);
      setToken("local-token"); // Simple token for localStorage-based auth
    } else {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="login-signup-wrapper animated fadeInDown">
      <card className="card login-signup-form-container" onSubmit={onSubmit}>
        {message && (
          <div className="alert">
            <p>{message}</p>
          </div>
        )}
        <h1 className="title">Account Login</h1>
        <div className="form-group">
          <label className="visually-hidden" htmlFor="email">
            Email
          </label>
          <input
            ref={emailRef}
            id="email"
            placeholder="Email"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="visually-hidden" htmlFor="password">
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            placeholder="Password"
            type="password"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Confirm
          </button>
        </div>
        <div className="text-center">
          <p className="message">
            Not Registered? <Link to="/signup">Create An Account</Link>
          </p>
        </div>
      </card>
    </div>
  );
}
