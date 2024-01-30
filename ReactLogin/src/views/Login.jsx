import { Link } from "react-router-dom";
import axiosContext from "../axios-context.js";
import {createRef} from "react";
import {useStateContext} from "../context/ContextSource.jsx";
import {useState} from "react";

export default function Login() {
    const LoginSignupForm = {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const emailRef = createRef()
    const passwordRef = createRef()
    const {setUser, setToken} = useStateContext()
    const [message, setMessage] = useState(null)

    const onSubmit = e => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        
    }
}
