package com.loja.loja.repository;

import com.loja.loja.entities.Despesa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {
    List<Despesa> findByUsuarioId(Long usuarioId);
}
/* repository.save(meuUsuario);            // Salva no banco (INSERT)
repository.findAll();                    // Traz todos os usuários (SELECT *)
repository.findByEmail("teste@loja.com"); // Sua busca customizada
    repository.deleteById(1L);               // Remove o usuário de ID 1 (DELETE)

 */