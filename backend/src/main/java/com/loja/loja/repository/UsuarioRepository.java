package com.loja.loja.repository;

import com.loja.loja.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    Optional<Usuario> findByEmail(String email);
}

/* repository.save(meuUsuario);            // Salva no banco (INSERT)
repository.findAll();                    // Traz todos os usuários (SELECT *)
repository.findByEmail("teste@loja.com"); // Sua busca customizada
repository.deleteById(1L);               // Remove o usuário de ID 1 (DELETE)

 */