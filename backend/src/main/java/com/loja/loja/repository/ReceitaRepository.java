package com.loja.loja.repository;

import com.loja.loja.entities.Receita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    List<Receita> findByContaId(Long contaId);

    List<Receita> findByContaUsuarioId(Long usuarioId);
}

