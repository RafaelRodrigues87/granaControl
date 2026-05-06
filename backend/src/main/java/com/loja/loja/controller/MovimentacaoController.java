package com.loja.loja.controller;


import com.loja.loja.entities.Despesa;
import com.loja.loja.entities.Receita;
import com.loja.loja.entities.Usuario;
import com.loja.loja.service.DespesaService;
import com.loja.loja.service.ReceitaService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios/movimentacoes")
@CrossOrigin(origins = "*")
public class MovimentacaoController {

    private final ReceitaService receitaService;
    private final DespesaService despesaService;

    public MovimentacaoController(ReceitaService receitaService, DespesaService despesaService) {
        this.receitaService = receitaService;
        this.despesaService = despesaService;
    }

    @GetMapping("/ultimas")
    public List<Map<String, Object>> ultimasMovimentacoes(@AuthenticationPrincipal Usuario usuario) {
        List<Map<String, Object>> movimentacoes = new ArrayList<>();

        // Adiciona receitas
        List<Receita> receitas = receitaService.BuscarPorUsuario(usuario.getId());
        for (Receita r : receitas) {
            movimentacoes.add(Map.of(
                    "id", r.getId(),
                    "descricao", r.getDescricao(),
                    "valor", r.getValor(),
                    "data", r.getData().toString(),
                    "tipo", "RECEITA",
                    "contaNome", r.getConta() != null ? r.getConta().getNome() : ""
            ));
        }

        // Adiciona despesas
        List<Despesa> despesas = despesaService.listarDespesasPorUsuario(usuario.getId());
        for (Despesa d : despesas) {
            movimentacoes.add(Map.of(
                    "id", d.getId(),
                    "descricao", d.getDescricao(),
                    "valor", d.getValor(),
                    "data", d.getData().toString(),
                    "tipo", "DESPESA",
                    "contaNome", d.getConta() != null ? d.getConta().getNome() : ""
            ));
        }

        // Ordena por data e pega as 3 mais recentes
        return movimentacoes.stream()
                .sorted(Comparator.comparing(m -> ((String) m.get("data")), Comparator.reverseOrder()))
                .limit(3)
                .collect(java.util.stream.Collectors.toList());
    }
}