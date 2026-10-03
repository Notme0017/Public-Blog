const BASE = "/api";

export async function api(path, {method = "GET", body, token} = {}) {
    const res = await fetch(BASE + path, {
        method,
        headers: {
            ...(body && {"Content-Type": "application/json"}),
            ...(token && {Authorization: `Bearer ${token}`}),
        },
        body: body? JSON.stringify(body): undefined,
    });
    const data = await res.json().catch(() => null);
    if(!res.ok){
        const msg =
            data?.errors?.map?.((e) => e.msg).join(" ")||
            data?.message || data?.error || `Request failed (${res.status})`;
        if(res.status === 401 && token) window.dispatchEvent(new Event("auth:expired"));
        const err = new Error(msg);
        err.status = res.status;
        throw err;
    }
    return data;
}