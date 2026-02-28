package com.loja.loja.controller;

import com.loja.loja.entities.Usuario;
import com.loja.loja.security.JwtService;
import com.loja.loja.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private JwtService jwtService;

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
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

    @GetMapping("buscar/{id}")
    public Usuario buscar(@PathVariable Long id){
        return usuarioService.buscarPorId(id);
    }
    @DeleteMapping("deletar/{id}")
    public void deletar(@PathVariable Long id){
        usuarioService.deletar(id);
    }
}
