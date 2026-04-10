package com.loja.loja.controller;


import com.loja.loja.entities.Despesa;
import com.loja.loja.entities.Receita;
import com.loja.loja.service.DespesaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("usuarios/despesas")
public class DespesaController {

    private final DespesaService despesaService;

    public DespesaController(DespesaService despesaService){
         this.despesaService = despesaService;
    }

    @PostMapping("/criar/{usuarioId}/{categoriaId}/{contaId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Despesa> criarDespesa(
            @PathVariable("usuarioId") Long usuarioId,
            @PathVariable("categoriaId") Long categoriaId,
            @PathVariable("contaId") Long contaId,
            @RequestBody Despesa despesa){

        Despesa novaDespesa = despesaService
                .criarDespesa(categoriaId, contaId, usuarioId, despesa);

        return new ResponseEntity<>(novaDespesa, HttpStatus.CREATED);
    }

    @GetMapping("/listar/receitas/{usuarioId}")
    public ResponseEntity<List<Despesa>> listarDepesas(@PathVariable Long usuarioId){
        List<Despesa> despesas = despesaService.listarDespesasPorUsuario(usuarioId);
        return ResponseEntity.ok(despesas);

    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Despesa> atualizarDespesa(@PathVariable Long id, @RequestBody Despesa despesaAtualizada){

        Despesa despesa = despesaService.atualizarDespesa(id, despesaAtualizada);
        return ResponseEntity.ok(despesa);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletarDespesa(@PathVariable Long id){

        despesaService.deletarDespesa(id);

    }

}

