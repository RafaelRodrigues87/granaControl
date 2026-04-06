package com.loja.loja.service;

import com.loja.loja.entities.Conta;
import com.loja.loja.entities.Despesa;
import com.loja.loja.entities.Receita;
import com.loja.loja.entities.Usuario;
import com.loja.loja.repository.CategoriaRepository;
import com.loja.loja.repository.ContaRepository;
import com.loja.loja.repository.DespesaRepository;
import com.loja.loja.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DespesaService {

    private final DespesaRepository despesaRepository;
    private final ContaRepository contaRepository;
    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;

    //construtor
    public DespesaService(DespesaRepository despesaRepository,ContaRepository contaRepository, UsuarioRepository usuarioRepository,
                          CategoriaRepository categoriaRepository){

        this.despesaRepository = despesaRepository;
        this.contaRepository = contaRepository;
        this.usuarioRepository = usuarioRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public Despesa criarDepesa(Long categoria_id, Long conta_id,
                               Long usuario_id, Despesa despesa){

        //verificacao de conta existente
        Conta conta = contaRepository.findById(conta_id)
                .orElseThrow(()-> new RuntimeException("Conta nao encontrada"));

        if(!conta.getUsuario().getId().equals(usuario_id)){
            throw new RuntimeException("conta nao encontrada");
        }

        //buscando e setando usuario
        Usuario usuario = usuarioRepository.findById(usuario_id)
                        .orElseThrow(()-> new RuntimeException("Usuario nao encontrado"));


        despesa.setUsuario(usuario);


        //atualizando saldo da conta
        BigDecimal novoSaldo = conta.getSaldo().subtract(despesa.getValor());
        conta.setSaldo(novoSaldo);

        //salvando a despesa
        return despesaRepository.save(despesa);
    }

    public List<Despesa> listarDespesas(){
        return despesaRepository.findAll();
    }

    public List<Despesa> listarDespesasPorUsuario(Long usuario_id){
        return despesaRepository.findByUsuarioId(usuario_id);
    }



}
