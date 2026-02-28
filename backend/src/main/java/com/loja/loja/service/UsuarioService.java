package com.loja.loja.service;


import com.loja.loja.entities.Usuario;
import com.loja.loja.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class UsuarioService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario salvar(Usuario usuario){
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTodos(){
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id){
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
    }

    public Usuario login(String email, String senha){
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        System.out.println("Senha digitada: '" + senha + "'");
        System.out.println("Senha do banco: '" + usuario.getSenha() + "'");

        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        return usuario;
    }

    public void deletar(Long id){
        usuarioRepository.deleteById(id);
    }
}

