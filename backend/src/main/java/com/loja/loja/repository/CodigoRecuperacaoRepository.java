package com.loja.loja.repository;
import com.loja.loja.entities.CodigoRecuperacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface CodigoRecuperacaoRepository extends JpaRepository<CodigoRecuperacao, Long> {
    Optional<CodigoRecuperacao> findByEmailAndCodigoAndUsadoFalse(String email, String codigo);
    void deleteByEmail(String email);
}
