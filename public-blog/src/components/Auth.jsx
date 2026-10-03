import { useEffect, useState} from "react";
import { api } from "../api/api"
import { Ctx } from "./useAuth";


export function AuthProvider({children}) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(!token);

    const logout = () =>{
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    useEffect(() =>{
        window.addEventListener("auth:expired", logout);
        return () => window.removeEventListener("auth:expired", logout);
    }, []);

    useEffect(() =>{
        if(!token) return;
        api("/auth/me", {token})
            .then((d) => setUser(d.user ?? d))
            .catch(logout)
            .finally(() => setReady(true));
    }, [token]);

    async function login(username, password) {
        const d = await api("/auth/login", {method: "POST", body: { username, password}});
        localStorage.setItem("token", d.token);
        setToken(d.token);
    }

    async function signup(username, password) {
        await api("/auth/signup", {method: "POST", body: {username, password}});
        await login(username, password);
    }

    return (
        <Ctx.Provider value={{token, user, ready, login, signup, logout}}>
            {children}
        </Ctx.Provider>
    );
}