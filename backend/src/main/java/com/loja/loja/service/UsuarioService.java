package com.loja.loja.service;


import com.loja.loja.entity.Usuario;
import com.loja.loja.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UsuarioService     {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario salvar(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> ListarTodos(){
        return  usuarioRepository.findAll();
    }

    public Usuario BuscarPorId(Long id){
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
    }

    public Usuario login(String email, String senha){
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException("usuario nao encontrado"));
        if (!usuario.getSenha().equals((senha))) {
            throw new RuntimeException("senha incorreta");
        }
        return usuario;
    }

    public void deletar(Long id){
        usuarioRepository.deleteById(id);
    }
}
