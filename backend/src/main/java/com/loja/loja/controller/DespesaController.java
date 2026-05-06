package com.loja.loja.controller;

import com.loja.loja.entities.Despesa;
import com.loja.loja.entities.Usuario;
import com.loja.loja.service.DespesaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("usuarios/despesas")
public class DespesaController {

    private final DespesaService despesaService;

    public DespesaController(DespesaService despesaService) {
        this.despesaService = despesaService;
    }

    @PostMapping("/criar/{contaId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Despesa> criarDespesa(
            @AuthenticationPrincipal Usuario usuario,
            @PathVariable("contaId") Long contaId,
            @RequestBody Despesa despesa) {
        Despesa novaDespesa = despesaService.criarDespesa(contaId, usuario.getId(), despesa);
        return new ResponseEntity<>(novaDespesa, HttpStatus.CREATED);
    }

    @GetMapping("/listar")  // ✅ era /listar/receitas
    public ResponseEntity<List<Despesa>> listarDespesas(@AuthenticationPrincipal Usuario usuario) {
        List<Despesa> despesas = despesaService.listarDespesasPorUsuario(usuario.getId());
        return ResponseEntity.ok(despesas);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Despesa> atualizarDespesa(
            @PathVariable Long id,
            @RequestBody Despesa despesaAtualizada) {
        Despesa despesa = despesaService.atualizarDespesa(id, despesaAtualizada);
        return ResponseEntity.ok(despesa);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<List<Despesa>> deletarDespesa(  // ✅ era List<Receita>
                                                          @PathVariable Long id,
                                                          @AuthenticationPrincipal Usuario usuario) {
        despesaService.deletarDespesa(id);
        List<Despesa> despesas = despesaService.listarDespesasPorUsuario(usuario.getId());
        return ResponseEntity.ok(despesas);
    }
}