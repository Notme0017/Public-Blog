import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../components/useAuth";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { fmt, hasMore, items, LIMIT } from "../helpers/helpers";
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";

export default function PostPage (){
    const { id } = useParams();
    const { user, token } = useAuth();
    const location = useLocation();
    const [post, setPost] = useState(null);
    const [comments, setComments ] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
    setPage(1);
    setComments([]);
    setPost(null);
}, [id]);

    useEffect(() =>{
        api(`/posts/${id}`)
            .then((d) => setPost(d.post ?? d))
            .catch((e) => setErr(e.message));
    }, [id]);

    useEffect(() =>{
        api(`/posts/${id}/comments?page=${page}&limit=${LIMIT}`)
            .then((d) =>{
                const list = items(d);
                setComments((c) => (page === 1 ? list: [...c, ...list]));
                setMore(hasMore(d, list));
            })
            .catch(() => {});
    }, [id, page]);

    async function  addComment(content) {
        const d = await api(`/posts/${id}/comments`, {method: "post", body: {content}, token});
        const created = d?.comment ?? d;
        setComments((c) => [{...created, user}, ...c]);
    }

    if(err) return <main><p className="error">{err}</p></main>;
    if(!post) return <main><p className="muted">Loading...</p></main>;

    return (
        <main>
            <article>
                <h1 className="post-title">{post.title}</h1>
                <p className="meta">{post.user?.username} - {fmt(post.publishTime)}</p>
                <div className="post-body">{post.content}</div>
            </article>

            <section className="comments">
                <h2>Comments</h2>
                {user ? (
                    <CommentForm submitLabel="Post comment" onSubmit={addComment} />
                ): (
                    <p className="muted">
                        <Link to="/login" state={{from: location.pathname}}>Log in</Link> or {" "} <Link to="/signup" state={{from: location.pathname}}>sign up</Link> to join the discussion.
                    </p>
                )}
                {comments.length === 0 && <p className="muted">No comments yet.</p>} 
                <ul>
                    {comments.map((c) =>
                        <Comment 
                            key={c.id} 
                            postId={id} c={c} 
                            onUpdated={(u) => setComments((l) => l.map((x) => (x.id === u.id ? u : x)))}
                            onDeleted={(cid) => setComments((l) => l.filter((x) => x.id !== cid))}
                        />
                    )}
                </ul>
                {more && <button className="btn" onClick={() => setPage((n) =>n + 1)}> Load more comments</button>}
            </section>
        </main>
    );
}