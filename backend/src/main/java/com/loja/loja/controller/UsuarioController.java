package com.loja.loja.controller;

import com.loja.loja.entities.Usuario;
import com.loja.loja.security.JwtService;
import com.loja.loja.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final JwtService jwtService;

    public UsuarioController(UsuarioService usuarioService,
                             JwtService jwtService){
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        usuarioService.salvar(usuario);
        return ResponseEntity.ok(
                Map.of("mensagem", "Usuário cadastrado com sucesso")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dados) {

        Usuario usuario = usuarioService.login(
                dados.get("email"),
                dados.get("senha")
        );

        String token = jwtService.gerarToken(usuario.getEmail());

        // 🔥 REMOVE A SENHA ANTES DE RETORNAR
        usuario.setSenha(null);

        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "usuario", usuario
                )
        );
    }

    @GetMapping("/listar")
    public List<Usuario> listar(){
        return usuarioService.listarTodos();
    }

    @GetMapping("/buscar/{id}")
    public Usuario buscar(@PathVariable Long id){
        return usuarioService.buscarPorId(id);
    }

    @PutMapping("/atualizar/{id}")
    public Usuario atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado){
        Usuario usuario = usuarioService.atualizarUsuario(id, usuarioAtualizado);
        return usuarioService.salvar(usuario);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id){
        usuarioService.deletar(id);
        return ResponseEntity.ok(
                Map.of("mensagem", "Usuário deletado com sucesso")
        );
    }
}