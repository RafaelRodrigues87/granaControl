export async function enviarCodigoRecuperacao(email) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/recuperar-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("E-mail não encontrado");
}
export async function redefinirSenha(email, codigo, novaSenha) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/verificar-codigo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo, novaSenha }),
    });
    if (!res.ok) throw new Error("Código inválido ou expirado");
}