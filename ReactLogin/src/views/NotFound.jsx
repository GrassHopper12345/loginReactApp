import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <h1 className="title">404 - Page Not Found</h1>
            <p className="message">The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
    )
}

