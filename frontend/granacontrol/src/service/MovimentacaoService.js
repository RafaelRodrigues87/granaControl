export async function buscarUltimasMovimentacoes() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/movimentacoes/ultimas`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Erro ao buscar movimentações");
    return await res.json();
}