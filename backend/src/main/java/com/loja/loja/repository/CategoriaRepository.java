package com.loja.loja.repository;

import com.loja.loja.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    List<Categoria> findByCategoriaId(Long categoriaId);
}
