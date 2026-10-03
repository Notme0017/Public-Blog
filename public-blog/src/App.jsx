import { BrowserRouter, Route, Routes} from "react-router-dom";
import { AuthProvider } from "./components/auth";
import Header from "./components/Header";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import AuthForm from "./components/AuthForm";

export default function App(){
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/posts/:id" element={<PostPage />} />
                    <Route path="/login" element={<AuthForm mode="login" />} />
                    <Route path="/signup" element={<AuthForm mode="signup" />}/>
                    <Route path="*" element={<main><p className="muted">Page not found.</p></main>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}