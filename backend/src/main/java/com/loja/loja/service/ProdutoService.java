package com.loja.loja.service;

import com.loja.loja.entity.Produto;
import com.loja.loja.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado pelo id "));
    }

    public Produto BuscarNome(String nome){
        return produtoRepository.findByNome(nome)
                .orElseThrow(()-> new RuntimeException("Produto nao encontrado pelo nome"));
    }

    public void deletar(Long id) {
        produtoRepository.deleteById(id);
    }
}
