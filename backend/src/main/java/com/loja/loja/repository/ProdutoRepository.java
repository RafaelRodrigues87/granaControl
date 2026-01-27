package com.loja.loja.repository;
import com.loja.loja.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
    Optional<Produto> findByNome(String nome);
}
