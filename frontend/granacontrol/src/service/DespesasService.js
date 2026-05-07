export async function AdicionarDespesa(contaId, dados) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/usuarios/despesas/criar/${contaId}`, // ✅ barra no início
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dados)
      }
    );

    const text = await response.text();
    const resultado = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new Error(resultado?.error || "Erro ao criar despesa");
    }

    return resultado;

  } catch (err) {
    throw err;
  }
}

export async function ListarDespesaUsuario() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/despesas/listar`, { // ✅ era /listar/receitas
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar despesa");
    return await response.json();
  } catch (err) {
    console.error("Erro no Service:", err);
    return [];
  }
}

export async function deletarDespesa(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/despesas/deletar/${id}`, { // ✅ barra no início
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.error || "Erro ao deletar despesa");
    }

    return resultado;

  } catch (err) {
    throw err;
  }
}

export async function atualizarDespesa(id, dados){
        const token = localStorage.getItem("token");
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/despesas/atualizar/${id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${  token}`
                },
                body: JSON.stringify(dados)
            });
            const resultado = await response.json();
            
            if(!response.ok) throw new Error(resultado.error || "erro ao atualizar  Despesa");
            return resultado;

        } catch(err){
            throw err;
        }
    }