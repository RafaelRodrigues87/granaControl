package com.loja.loja.controller;

import java.util.List;

import com.loja.loja.entities.Receita;
import com.loja.loja.service.ReceitaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("usuarios/receitas")
public class ReceitaController {

    private final ReceitaService receitaService;

    public ReceitaController(ReceitaService receitaService){
        this.receitaService = receitaService;
    }

    @PostMapping("/adicionar/{usuarioId}/{contaId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Receita> criarReceita(
            @PathVariable Long usuarioId,
            @PathVariable Long contaId,
            @RequestBody Receita receita) {

        Receita novaReceita = receitaService.criarReceita(usuarioId, contaId, receita);
            return new ResponseEntity<>(novaReceita, HttpStatus.CREATED);

    }

    //procura e lista as receitas pelo id da conta(A conta esta atribuida a um usuario)

    @GetMapping("/listar/conta/{contaId}")
    public ResponseEntity<List<Receita>> listarPorConta(@PathVariable Long contaId){
        //aqui usamos aquele metodo do seu repository que validamos no inicio!
        List<Receita> receitas = receitaService.BuscarPorConta(contaId);
        return ResponseEntity.ok(receitas);
    }

    //procura e lista as receitas pelo id do usuario
    @GetMapping("/lista/usuario/{usuarioid}")
    public ResponseEntity<List<Receita>> ListarPorUsuario(@PathVariable Long UsuarioId){
        List<Receita> receitas = receitaService.BuscarPorConta(UsuarioId);
        return ResponseEntity.ok(receitas);
    }

    @DeleteMapping("/deletar/{id}")
    public List<Receita> deletarReceita(@PathVariable Long id,
                                        @RequestBody Long UsuarioId){
        receitaService.deletarReceita(id);
        return  receitaService.BuscarPorConta(UsuarioId);
    }
}
