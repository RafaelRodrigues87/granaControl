package com.loja.loja.repository;

import com.loja.loja.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    List<Categoria> findByCategoriaId(Long Id);
    List<Categoria> findByCategoriaNome(String nome);

   void deleteByNome(String nome);
}
/* repository.save(meuUsuario);            // Salva no banco (INSERT)
repository.findAll();                    // Traz todos os usuários (SELECT *)
repository.findByEmail("teste@loja.com"); // Sua busca customizada
    repository.deleteById(1L); */