package com.loja.loja.service;

import com.loja.loja.entities.Categoria;
import com.loja.loja.repository.CategoriaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CategoriaService {

    private CategoriaRepository categoriaRepository;


    @Autowired
    private CategoriaService categoriaService;

    public Categoria criarCategoria(Categoria categoria){

        if(categoriaRepository.findByCategoriaNome(categoria.getNome()) != null){
            throw new RuntimeException("Essa categoria ja existe");
        }
        return categoriaService.criarCategoria(categoria);
    }

    public  List<Categoria> listarCategoria(){
        return categoriaRepository.findAll();
    }

    public Categoria buscarPorId(Long Id){
       return categoriaRepository.findById(Id).orElseThrow(()->new RuntimeException("Categoria nao encontrada"));
    }

    @Transactional
    public void deletarCategoriaNome(String nome){
        if(categoriaRepository.findByCategoriaNome(nome) == null){
            throw new RuntimeException("a categoria informada nao existe");
        }
         categoriaRepository.deleteByNome(nome);
    }

    public void deletarCategoriaId(Long id){
        if(categoriaRepository.findById(id) == null){
            throw new RuntimeException("categoria com esse id nao encontrado");
        }
        categoriaRepository.deleteById(id);
    }
}
