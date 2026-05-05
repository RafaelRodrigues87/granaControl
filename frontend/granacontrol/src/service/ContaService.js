export async function buscarSaldoTotal() {
    const token = localStorage.getItem("token"); // Verifique se o nome da chave é 'token'
    const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/contas/saldototal`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // Sem isso, dá 403
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar saldo total");
    }

    return await response.json();
}


export async function CadastrarConta(dados){
     const token = localStorage.getItem("token");
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/contas/criar`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`      
            },
            body: JSON.stringify(dados)
        });
        const resultado = await response.json();
         
        if(!response.ok) throw new Error(resultado.error || "erro ao cadastrar uma conta");
        return resultado;

    } catch(err){
        throw err;
    }
}

export async function ListarConta(){
    try{

        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/contas/listar`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
            },
        });
        const resultado = await response.json();

        if(!response.ok){
            throw new Error(resultado.error || "erro ao buscar  contas")
        }

        return resultado;

    } catch(err){
        throw err;
    }
}



export async function deletarConta(contaId){
    try{

        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/contas/deletar/${contaId}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
            },  
        });
        const resultado = await response.json();

        if(!response.ok){
            throw new Error(resultado.error || "erro ao deletar conta")
        }

        return resultado;

    } catch(err){
        throw err;
    }
}