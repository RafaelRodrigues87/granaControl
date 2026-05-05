package com.loja.loja.controller;

import java.util.List;

import com.loja.loja.entities.Receita;
import com.loja.loja.entities.Usuario;
import com.loja.loja.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
    @RequestMapping("usuarios/receitas")
public class ReceitaController {

    private final ReceitaService receitaService;
    @Autowired


    public ReceitaController(ReceitaService receitaService){
        this.receitaService = receitaService;
    }

    @PostMapping("/adicionar/{contaId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Receita> criarReceita(
            @AuthenticationPrincipal Usuario usuario,
            @PathVariable Long contaId,
            @RequestBody Receita receita) {

        Receita novaReceita = receitaService.criarReceita(usuario.getId(), contaId, receita);
            return new ResponseEntity<>(novaReceita, HttpStatus.CREATED);

    }

    //procura e lista as receitas pelo id da conta(A conta esta atribuida a um usuario)

    @GetMapping("/listar/conta/{contaId}")
    public ResponseEntity<List<Receita>> listarPorConta(@PathVariable Long contaId){
        //aqui usamos aquele metodo do seu repository que validamos no inicio!
        List<Receita> receitas = receitaService.BuscarPorConta(contaId);
        return ResponseEntity.ok(receitas);
    }

    //busca pelo id do token
    @GetMapping("/lista/usuario")
    public ResponseEntity<List<Receita>> listarPorUsuario(@AuthenticationPrincipal Usuario usuario) {
        List<Receita> receitas = receitaService.BuscarPorUsuario(usuario.getId());
        return ResponseEntity.ok(receitas);
    }
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Receita> atualizarReceita(@PathVariable Long id, @RequestBody Receita receitaAtualizado){
        // O serviço já deve cuidar de buscar, validar e salvar
        Receita receita = receitaService.atualizarReceita(id, receitaAtualizado);

        // Retornamos 200 OK com o objeto atualizado
        return ResponseEntity.ok(receita);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarReceita(@PathVariable Long id){
        receitaService.deletarReceita(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}
