export async function ListarReceitaUsuario(usuarioId){
    try{

        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/receitas/lista/usuario/${usuarioId}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
            },
        });
        const resultado = await response.json();

        if(!response.ok){
            throw new Error(resultado.error || "erro ao buscar  receitas")
        }

        return resultado;

    } catch(err){
        throw err;
    }
}