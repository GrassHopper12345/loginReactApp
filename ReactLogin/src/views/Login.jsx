import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useStateContext } from "../context/ContextSource.jsx";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function Login() {
  const { setUser, setToken, authenticateUser } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      showError("Please fill in all fields");
      return;
    }

    const user = authenticateUser(email, password);

    if (user) {
      setUser(user);
      setToken("local-token"); // Simple token for localStorage-based auth
    } else {
      showError("Invalid email or password");
    }
  };

  const title = (
    <div className="text-center">
      <h2 className="m-0">Account Login</h2>
    </div>
  );

  return (
    <div className="login-signup-wrapper animated fadeInDown">
      <Toast ref={toast} />
      <Card title={title} className="login-signup-form-container">
        <form onSubmit={onSubmit}>
          <div className="field mb-4">
            <span className="p-input-icon-left w-full">
              <i className="pi pi-envelope" />
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full"
              />
            </span>
          </div>
          <div className="field mb-4">
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full"
              inputClassName="w-full"
              toggleMask
              feedback={false}
            />
          </div>
          <div className="field mb-4">
            <Button
              label="Login"
              icon="pi pi-sign-in"
              type="submit"
              className="w-full"
            />
          </div>
          <div className="text-center">
            <p className="m-0">
              Not Registered? <Link to="/signup">Create An Account</Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
