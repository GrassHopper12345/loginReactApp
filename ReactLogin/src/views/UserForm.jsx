import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextSource.jsx";

export default function UserForm() {
    const navigator = useNavigate();
    let { id } = useParams();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setNotification, saveUser, getUserByEmail, getUserById } = useStateContext()

    useEffect(() => {
        if (id) {
            setLoading(true)
            // Find user by id
            const foundUser = getUserById(id);
            if (foundUser) {
                setUser({
                    id: foundUser.id,
                    name: foundUser.name || '',
                    email: foundUser.email || '',
                    password: '',
                    password_confirmation: '',
                })
            }
            setLoading(false)
        }
    }, [id])

    const onSubmit = e => {
        e.preventDefault();
        
        // Basic validation
        const validationErrors = {};
        
        if (!user.name) {
            validationErrors.name = ['Name is required'];
        }
        if (!user.email) {
            validationErrors.email = ['Email is required'];
        }
        
        // Check if email already exists (for new users or if email changed)
        if (user.email) {
            const existingUser = getUserByEmail(user.email);
            if (existingUser && existingUser.id !== user.id) {
                validationErrors.email = ['Email already exists'];
            }
        }
        
        // Password validation
        if (!user.id && !user.password) {
            // New users must provide a password
            validationErrors.password = ['Password is required'];
        }
        if (user.password && user.password !== user.password_confirmation) {
            validationErrors.password_confirmation = ['Passwords do not match'];
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Save user
        saveUser(user);
        setNotification(user.id ? 'User was successfully updated.' : 'User was successfully created.')
        navigator('/users')
    }
    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} placeholder="Name" />
                        <input value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="Email" />
                        <input type="password" onChange={e => setUser({ ...user, password: e.target.value })} placeholder="Password" />
                        <input type="password" onChange={e => setUser({ ...user, password_confirmation: e.target.value })} placeholder="Password Confirmation" />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}