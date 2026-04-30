package com.loja.loja.controller;
import com.loja.loja.entities.Conta;
import com.loja.loja.entities.Usuario;
import com.loja.loja.service.ContaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("usuarios/contas")
public class ContaController {

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

    @GetMapping("/saldo-total")
    public ResponseEntity<BigDecimal> saldoTotal(@AuthenticationPrincipal Usuario usuario){
        BigDecimal total = contaService.calcularSaldoTotal(usuario.getId());
        return ResponseEntity.ok(total);
    }
}
