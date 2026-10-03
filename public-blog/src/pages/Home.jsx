import { useEffect, useState } from "react";
import { fmt, hasMore, items, LIMIT } from "../helpers/helpers";
import { api } from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() =>{
        let ignore = false;

        const fetchPosts = async () =>{
            setLoading(true);
            try{
                const d = await api(`/posts?page=${page}&limit=${LIMIT}`);
                if(ignore) return;

                const list = items(d);
                setPosts((p) => (page === 1? list: [...p, ...list]));
                setMore(hasMore(d, list));
            }catch(e){
                if(!ignore) setErr(e.message);
            }finally{
                if(!ignore) setLoading(false);
            }
        };
        fetchPosts();

        return () => {ignore = true;}
        /*Self Comment
            Well the thing is when say you pressed load more again while the first
            page is loading. In that case, the ignore which is a cleanup function
            runs and sets ignore as true. What it does is, say hey we are on the next
            page, don't load previous data now. If you gained it, just discard it.
        */
    }, [page]);

    return (
        <main>
            <h1 className="page-title">Latest Posts </h1>
            {err && <p className="error">{err}</p>}
            {
            !loading && 
            !err && 
            posts.length === 0 &&
            <p className="muted">No posts have been published.</p>
            }

            {posts.map((p) =>(
                <article key={p.id} className="post-time">
                    <h2><Link to={`/posts/${p.id}`}>{p.title}</Link></h2>

                    <p className="meta">{p.user?.username} - {fmt(p?.publishTime)} - {p._count?.comments ?? 0} comments</p>
                    <p className="excerpt">{p.content.length > 220 ? p.content.slice(0, 220) + "...": p.content}</p>
                </article>
            ))}
            {loading && <p className="muted">Loading...</p>}
            {more && !loading && <button className="btn" onClick={() => setPage((n) => n + 1)}>Load more posts</button>}
        </main>
    );
};