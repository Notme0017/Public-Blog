import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Header(){
    const {user, ready, logout} = useAuth();
    return (
        <header className="bar">
            <Link to="/" className="brand">Blogs</Link>
            <nav>
                {!ready ? null: user ? (
                    <>
                        <span className="who">{user.username}</span>
                        <button className="link" onClick={logout}>Log out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Log in</Link>
                        <Link to="/signup" className="btn small">Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    );
};