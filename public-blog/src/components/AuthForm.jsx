import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useState } from "react";

export default function AuthForm({mode}){
    const { login, signup } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);
    const isSignup = mode === "signup";

    async function submit(e) {
        e.preventDefault();
        setBusy(true);
        setErr("");
        try{
            await (isSignup? signup: login)(username, password);
            navigate(location.state?.from || "/", { replace: true });
        }catch(e) {
            setErr(e.message);
        }finally {
            setBusy(false);
        }
    }

    return (
        <main className="narrow">
            <h1 className="page-title">{isSignup? "Create an account" : "Log in"}</h1>

            <form onSubmit={submit} className="auth">
                <label>Username<input value={username} onChange={(e) =>setUsername(e.target.value)} autoComplete="username" required /></label>
                <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isSignup ? "new-password" : "current-password"} required /></label>
                {isSignup && <p className="muted small-text">8+ characters with a digit, lowercase, uppercase and one of @$!%*?&</p>}
                {err && <p className="error">{err}</p>}
                <button className="btn" disabled={busy}>{isSignup ? "Sign up" : "Log in"}</button>
            </form>

            <p className="muted">
                {isSignup ? <>Already registered? <Link to="/login" state={location.state}>Log in</Link></> : <> New here? <Link to="/signup" state={location.state}>Create an account</Link></>}
            </p>
        </main>
    );
}