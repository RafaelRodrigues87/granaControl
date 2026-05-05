package com.loja.loja.controller;
import com.loja.loja.entities.Conta;
import com.loja.loja.entities.Usuario;
import com.loja.loja.repository.UsuarioRepository;
import com.loja.loja.service.ContaService;
import com.loja.loja.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("usuarios/contas")
public class ContaController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private final ContaService contaService;

    public ContaController(ContaService contaService){
        this.contaService = contaService;
    }

    @PostMapping("/criar")
    @ResponseStatus(HttpStatus.CREATED)
    public Conta criarConta(
            @AuthenticationPrincipal Usuario usuario,
            @RequestBody Conta conta) {
        return contaService.criarConta(usuario.getId(), conta);
    }

    @GetMapping("/listar")
    public List<Conta> listarContas(@AuthenticationPrincipal Usuario usuario) {
        return contaService.listarContas(usuario.getId());
    }


        @PutMapping("/atualizar")
    public ResponseEntity<Conta> atualizaConta( @AuthenticationPrincipal Usuario usuario, @RequestBody Conta contaAtualizada){
        Conta conta = contaService.atualizarConta(usuario.getId(), contaAtualizada);

        return ResponseEntity.ok(conta);
    }

    @DeleteMapping("/deletar/{contaId}")
    public List<Conta> deletarConta(
            @PathVariable Long contaId,
            @AuthenticationPrincipal Usuario usuario){

        contaService.deletarConta(contaId);
        return contaService.listarContas(usuario.getId());
    }

    @GetMapping("/saldototal")
    public ResponseEntity<BigDecimal> saldoTotal(@AuthenticationPrincipal UserDetails userDetails) {
        // 1. Busca o usuário completo através do email que vem do token
        Usuario usuario = usuarioService.buscarPorEmail(userDetails.getUsername());

        // 2. Passa o ID desse usuário para o serviço de contas
        BigDecimal total = contaService.calcularSaldoTotal(usuario.getId());

        return ResponseEntity.ok(total);
    }
}
