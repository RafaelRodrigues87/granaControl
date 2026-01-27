package com.loja.loja.controller;
import com.loja.loja.entity.Produto;
import com.loja.loja.service.ProdutoService;
import com.loja.loja.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    private ProdutoController(ProdutoService produtoService){
        this.produtoService = produtoService;
    }

    @PostMapping
    public Produto criarProduto(@RequestBody Produto produto){
        return produtoService.salvar(produto);
    }

    @GetMapping
    public List<Produto> listarTodos(){
        return produtoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Produto BuscarPorId(Long id){
        return produtoService.buscarPorId(id);
    }
    @GetMapping("/{nome}")
    public Produto BuscarPorNome(String nome){
        return produtoService.BuscarNome(nome);
    }
    @DeleteMapping("/{id}")
    public void DeletarPorId(Long id){
        produtoService.deletar(id);
    }
}
