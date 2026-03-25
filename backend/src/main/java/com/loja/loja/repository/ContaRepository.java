package com.loja.loja.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.loja.loja.entities.Conta;
import java.util.List;

public interface ContaRepository extends JpaRepository<Conta, Long> {
    List<Conta> findByUsuarioId(Long UsuarioId);
}
