package com.loja.loja.controller;
import com.loja.loja.entities.Conta;
import com.loja.loja.service.ContaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("usuarios/contas")
public class ContaController {

    private final ContaService contaService;

    public ContaController(ContaService contaService){
        this.contaService = contaService;
    }

    @PostMapping("/criar/{usuarioId}")
    public Conta criarConta(
            @PathVariable Long usuarioId,
            @RequestBody Conta conta){
        return contaService.criarConta(usuarioId, conta);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Conta> listarContas(
            @PathVariable Long usuarioId){
        return contaService.listarContas(usuarioId);
    }

    @DeleteMapping("deletar/{contaid}")
    public void deletarConta(@PathVariable Long contaid){

    }
}
