

export async function AdicionarReceita(contaId, dados) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/usuarios/receitas/adicionar/${contaId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dados) // 🔥 ESSENCIAL
      }
    );

    const text = await response.text(); // 🔥 evita crash
    const resultado = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new Error(resultado?.error || "Erro ao criar receita");
    }

    return resultado;

  } catch (err) {
    throw err;
  }
}

// Busca as receitas do usuário logado (pelo Token)
export async function ListarReceitaUsuario() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/receitas/lista/usuario`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar receitas");
    return await response.json();
  } catch (err) {
    console.error("Erro no Service:", err);
    return []; // Retorna array vazio em caso de erro para não quebrar o componente
  }
}

// Busca receitas de uma conta específica
export async function ListarReceitasPorConta(contaId) {
    try {
        const token = localStorage.getItem("token");
        // ROTA CORRIGIDA: Adicionado o prefixo /usuarios/receitas/ e corrigido para /listar/conta/
        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/receitas/listar/conta/${contaId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        if (!response.ok) throw new Error("Erro ao buscar receitas da conta");
        return await response.json();
    } catch (err) {
        throw err;
    }
}

export async function deletarReceita(id){
    try{

        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/receitas/deletar/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
            },  
        });
        const resultado = await response.json();

        if(!response.ok){
            throw new Error(resultado.error || "erro ao deletar receita v")
        }

        return resultado;

    } catch(err){
        throw err;
    }
}