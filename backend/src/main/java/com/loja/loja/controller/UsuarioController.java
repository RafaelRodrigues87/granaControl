package com.loja.loja.controller;

import com.loja.loja.entity.Usuario;
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

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @PostMapping("/cadastrar")
    public Usuario criar(@RequestBody Usuario usuario){
        return usuarioService.salvar(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Map<String, String> dados){
        String email = dados.get("email");
        String senha = dados.get("senha");

        Usuario usuario = usuarioService.login(email, senha);
        return ResponseEntity.ok(usuario);
    }




    @GetMapping("/listar")
    public List<Usuario> listar(){
        return usuarioService.ListarTodos();
    }

    @GetMapping("buscar/{id}")
    public Usuario buscar(@PathVariable Long id){
        return usuarioService.BuscarPorId(id);
    }
    @DeleteMapping("deletar/{id}")
    public void deletar(@PathVariable Long id){
        usuarioService.deletar(id);
    }
}
