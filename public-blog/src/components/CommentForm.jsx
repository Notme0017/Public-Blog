import { useState } from "react";

export default function CommentForm({ initial = "", submitLabel, onSubmit, onCancel}){
    const [text, setText] = useState(initial);
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);

    async function submit(e) {
        e.preventDefault();
        setBusy(true);
        setErr("");
        try{
            await onSubmit(text);
            if(!initial) setText("");
        }catch(e){
            setErr(e.message);
        }finally{
            setBusy(false);
        }
    }

    return (
        <div className="comment-form">
            <textarea value={text} onChange={(e) => setText(e.target.value)}
            rows={3} maxLength={2000} placeholder="Write a comment" />
            {err && <p className="error">{err}</p>}
            <div className="row">
                <button className="btn" onClick={submit} disabled={busy || !text.trim()}>{submitLabel}</button>
                {onCancel &&  <button className="link" onClick={onCancel}>Cancel</button>}
            </div>
        </div>
    );
};