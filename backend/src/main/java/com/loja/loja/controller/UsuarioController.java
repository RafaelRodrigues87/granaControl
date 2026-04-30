package com.loja.loja.controller;

import com.loja.loja.entities.Usuario;
import com.loja.loja.security.JwtService;
import com.loja.loja.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(401).body("Usuário não autenticado");
        }

        Usuario usuario = usuarioService.buscarPorEmail(userDetails.getUsername());
        usuario.setSenha(null);

        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/listar")
    public List<Usuario> listar(){
        return usuarioService.listarTodos();
    }

    @GetMapping("/buscar/{id}")
    public Usuario buscar(@PathVariable Long id){
        return usuarioService.buscarPorId(id);
    }

    @PutMapping("/atualizar")
    public ResponseEntity<Usuario> atualizarUsuario(
            @AuthenticationPrincipal Usuario usuario,
            @RequestBody Usuario usuarioAtualizado) {

        Usuario atualizado = usuarioService.atualizarUsuario(usuario.getId(), usuarioAtualizado);
        return ResponseEntity.ok(atualizado);
    }
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Usuario> atualizarUsuarioID(
            @PathVariable Long id,
            @RequestBody Usuario usuarioAtualizado) {

        Usuario atualizado = usuarioService.atualizarUsuario(id, usuarioAtualizado);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id){
        usuarioService.deletar(id);
        return ResponseEntity.ok(
                Map.of("mensagem", "Usuário deletado com sucesso")
        );
    }

    @PostMapping("/recuperar-senha")
    public ResponseEntity<String> solicitarRecuperacao(@RequestBody Map<String, String> body) {
        try {
            usuarioService.solicitarRecuperacao(body.get("email"));
            return ResponseEntity.ok("Código enviado para o e-mail");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // ✅ retorna o erro real
        }
    }

    @PostMapping("/verificar-codigo")
    public ResponseEntity<String> verificarCodigo(@RequestBody Map<String, String> body) {
        usuarioService.redefinirSenha(body.get("email"), body.get("codigo"), body.get("novaSenha"));
        return ResponseEntity.ok("Senha redefinida com sucesso");
    }
}