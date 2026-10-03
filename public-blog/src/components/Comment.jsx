import { useState } from "react";
import { api } from "../api/api";
import { fmt } from "../helpers/helpers";
import CommentForm from "./CommentForm";
import { useAuth } from "./useAuth";

export default function Comment ({postId, c, onUpdated, onDeleted }){
    const {user, token} = useAuth();
    const [editing, setEditing] = useState(false);
    const [err, setErr] = useState("");
    const mine = user && c.user?.id === user.id;

    async function save(content) {
        const d = await api(`/posts/${postId}/comments/${c.id}`, { method: "PUT", body: {content}, token});
        onUpdated({...c, ...(d?.comment ?? d), user: c.user});
        setEditing(false);
    }

    async function remove() {
        if(!window.confirm("Delete this comment?")) return;
        try{
            await api(`/posts/${postId}/comments/${c.id}`, {method: "DELETE", token});
            onDeleted(c.id);
        }catch (e){
            setErr(e.message);
        }
    }

    return (
        <li className="comment">
            <p className="meta">
                <strong>{c.user?.username}</strong>{c.user?.isAuthor && " (author) "} -  {fmt(c.timestamp)}
            </p>
            {editing ? (
                <CommentForm initial={c.content} submitLabel="Save changes"
                onSubmit={save} onCancel={() => setEditing(false)} />
            ): (
                <p className="body">{c.content}</p>
            )}
            {err && <p className="error">{err}</p>}
            {mine && !editing && (
                <div className="row">
                    <button className="link" onClick={() => setEditing(true)}>Edit</button>
                    <button className="link danger" onClick={remove}>Delete</button>
                </div>
            )}
        </li>
    );
}