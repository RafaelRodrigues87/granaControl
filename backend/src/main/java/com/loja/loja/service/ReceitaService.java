package com.loja.loja.service;
import com.loja.loja.entities.Conta;
import com.loja.loja.entities.Receita;
import com.loja.loja.repository.ContaRepository;
import com.loja.loja.repository.ReceitaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {


    private final ContaRepository contaRepository;
    private final ReceitaRepository receitaRepository;

    public ReceitaService(ContaRepository contaRepository, ReceitaRepository receitaRepository){
        this.contaRepository = contaRepository;
        this.receitaRepository = receitaRepository;
    }


    public  List<Receita> BuscarPorConta(Long contaId){
        return receitaRepository.findByContaId(contaId);
    }
    public List<Receita> BuscarPorUsuario(Long UsuarioId){
        return receitaRepository.findByContaUsuarioId(UsuarioId);
    }


    public Receita criarReceita(Long usuarioId, Long contaId, Receita receita){
        Conta conta = contaRepository.findById(contaId)
                .orElseThrow (()-> new RuntimeException("Conta nao encontrada"));

        if(!conta.getUsuario().getId().equals(usuarioId)){
            throw new RuntimeException("essa conta nao pertence ao usario informado");
        }

        //associar a receita a conta
        receita.setUsuario(conta.getUsuario());
        receita.setConta(conta);

        //atualizar o saldo da conta
        BigDecimal novoSaldo = conta.getSaldo().add(receita.getValor());
        conta.setSaldo(novoSaldo);

        contaRepository.save(conta);
        return receitaRepository.save(receita);
    }

    //valor, data, descicao
    public Receita atualizarReceita(Long id, Receita receitaAtualizada){
        Receita receita = receitaRepository.findById(id)
                .orElseThrow (()-> new RuntimeException("receita nao encontrada"));

        Optional.ofNullable(receitaAtualizada.getValor()).ifPresent(receita::setValor);
        Optional.ofNullable(receitaAtualizada.getData()).ifPresent(receita::setData);
        Optional.ofNullable(receitaAtualizada.getDescricao()).ifPresent(receita::setDescricao);

       return receitaRepository.save(receita);
    }

        @Transactional
        public void deletarReceita(Long id){
            Receita receita = receitaRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Receita não encontrada"));

            Conta conta = receita.getConta();

            //subtrai o valor da receita na conta
            conta.setSaldo(conta.getSaldo().subtract(receita.getValor()));

           contaRepository.save(conta);
           receitaRepository.delete(receita);

        }

}
