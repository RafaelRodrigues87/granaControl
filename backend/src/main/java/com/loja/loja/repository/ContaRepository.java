package com.loja.loja.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.loja.loja.entities.Conta;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ContaRepository extends JpaRepository<Conta, Long> {
    List<Conta> findByUsuarioId(Long UsuarioId);
    @Query("SELECT COALESCE(SUM(c.saldo), 0) FROM Conta c WHERE c.usuario.id = :usuarioId")
    BigDecimal somarSaldoPorUsuario(@Param("usuarioId") Long usuarioId);
}
