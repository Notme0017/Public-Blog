export const LIMIT = 10;

export const fmt = (d) => (d ? new Date(d).toLocaleDateString(undefined, {year: "numeric", month: "short", day: "numeric"}): "");

export const hasMore = (d, list) =>{
    return d?.pagination ? d.pagination.currentPage < d.pagination.totalPages : list.length === LIMIT;
}

export const items = (d) =>{
    return (Array.isArray(d) ? d: d?.posts ?? d?.comments ?? d?.data ?? []);
};