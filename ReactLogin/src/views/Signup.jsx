import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useStateContext } from "../context/ContextSource.jsx";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function Signup() {
    const { setUser, setToken, saveUser, getUserByEmail } = useStateContext();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const toast = useRef(null);

    const showError = (message) => {
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: message,
            life: 3000,
        });
    };

    const onSubmit = e => {
        e.preventDefault();

        // Basic validation
        if (!name) {
            showError("Name is required");
            return;
        }
        if (!email) {
            showError("Email is required");
            return;
        }
        if (!password) {
            showError("Password is required");
            return;
        }
        if (password !== passwordConfirmation) {
            showError("Passwords do not match");
            return;
        }

        // Check if email already exists
        if (getUserByEmail(email)) {
            showError("Email already exists");
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

    const title = (
        <div className="text-center">
            <h2 className="m-0">Signup</h2>
        </div>
    );

    return (
        <div className="login-signup-wrapper animated fadeInDown">
            <Toast ref={toast} />
            <Card title={title} className="login-signup-form-container">
                <form onSubmit={onSubmit}>
                    <div className="field mb-4">
                        <span className="p-input-icon-left w-full">
                            <i className="pi pi-user" />
                            <InputText
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full"
                                required
                            />
                        </span>
                    </div>
                    <div className="field mb-4">
                        <span className="p-input-icon-left w-full">
                            <i className="pi pi-envelope" />
                            <InputText
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                type="email"
                                className="w-full"
                                required
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
                            required
                        />
                    </div>
                    <div className="field mb-4">
                        <Password
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="Repeat Password"
                            className="w-full"
                            inputClassName="w-full"
                            toggleMask
                            feedback={false}
                            required
                        />
                    </div>
                    <div className="field mb-4">
                        <Button
                            label="Sign Up"
                            icon="pi pi-user-plus"
                            type="submit"
                            className="w-full"
                        />
                    </div>
                    <div className="text-center">
                        <p className="m-0">
                            Already Registered? <Link to="/login">Please Sign-In!</Link>
                        </p>
                    </div>
                </form>
            </Card>
        </div>
    )
}