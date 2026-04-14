package com.loja.loja.service;

import com.loja.loja.entities.Categoria;
import com.loja.loja.repository.CategoriaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    // Use o construtor para injetar o Repository
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria criarCategoria(Categoria categoria) {
        // Verifica se já existe
        if (categoriaRepository.findByNome(categoria.getNome()) != null) {
            throw new RuntimeException("Essa categoria ja existe");
        }

        // CORREÇÃO: Salva usando o REPOSITORY, não o service
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> listarCategoria() {
        return categoriaRepository.findAll();
    }

    public Categoria buscarPorId(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria nao encontrada"));
    }

    public Categoria atualizarCategoria(Long id, Categoria categoriaAtualizada){
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Categoria nao encontrada"));

        Optional.ofNullable(categoriaAtualizada.getNome()).ifPresent(categoria::setNome);
        Optional.ofNullable(categoriaAtualizada.getCategoria()).ifPresent(categoria::setCategoria);

        return categoriaRepository.save(categoria);
    }

    @Transactional
    public void deletarCategoriaNome(String nome) {
        if (categoriaRepository.findByNome(nome) == null) {
            throw new RuntimeException("a categoria informada nao existe");
        }
        categoriaRepository.deleteByNome(nome);
    }

    @Transactional
    public void deletarCategoriaId(Long id) {
        // findById retorna um Optional, então verificamos se está presente
        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("categoria com esse id nao encontrado");
        }
        categoriaRepository.deleteById(id);
    }
}