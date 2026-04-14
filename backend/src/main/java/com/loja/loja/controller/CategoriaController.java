package com.loja.loja.controller;


import com.loja.loja.entities.Categoria;
import com.loja.loja.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("usuarios/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService){
        this.categoriaService = categoriaService;
    }

    @PostMapping("/criar")
    @ResponseStatus(HttpStatus.CREATED)
    public Categoria criarCategoria(@RequestBody Categoria categoria){
        return categoriaService.criarCategoria(categoria);
    }

    @GetMapping("/listar")
    public List<Categoria> ListarCategoria(){
        return categoriaService.listarCategoria();
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Categoria> atualizarCategoria(@PathVariable Long id, @RequestBody Categoria categoriaAtualizada){
        Categoria categoria = categoriaService.atualizarCategoria(id, categoriaAtualizada);
        return ResponseEntity.ok(categoria);
    }

    @DeleteMapping("/deletar/{nome}")
    public ResponseEntity<Void> deletarCategoriaNome(@PathVariable String nome) {
        categoriaService.deletarCategoriaNome(nome);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarCategoriaId(@PathVariable Long id) {
        categoriaService.deletarCategoriaId(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}
