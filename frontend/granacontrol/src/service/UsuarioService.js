export async function CadastrarUsuario(dados){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/cadastrar`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const resultado = await response.json();
         
        if(!response.ok) throw new Error(resultado.error || "erro ao cadastrar usuario");
        return resultado;

    } catch(err){
        throw err;
    }
}

export async function LoginUsuario(email, senha) {
    try{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/login`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, senha}),
    });
     const resultado = await response.json();
         
        if(!response.ok) throw new Error(resultado.error || "erro ao logar usuario");
        return resultado;
    }catch(err){
        throw err;
    }
}

export const buscarUsuario = async () => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/me`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const msg = await response.text(); // ✅ texto em vez de json
    throw new Error(msg || "Erro ao buscar usuário");
  }

  return await response.json();
};


    export async function atualizarUsuario(dados){
        const token = localStorage.getItem("token");
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/atualizar`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${  token}`
                },
                body: JSON.stringify(dados)
            });
            const resultado = await response.json();
            
            if(!response.ok) throw new Error(resultado.error || "erro ao atualizar  usuario");
            return resultado;

        } catch(err){
            throw err;
        }
    }