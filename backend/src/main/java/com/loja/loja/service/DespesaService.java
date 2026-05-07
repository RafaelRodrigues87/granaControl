package com.loja.loja.service;

import com.loja.loja.entities.*;
import com.loja.loja.repository.CategoriaRepository;
import com.loja.loja.repository.ContaRepository;
import com.loja.loja.repository.DespesaRepository;
import com.loja.loja.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

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



    public Despesa criarDespesa( Long conta_id,
                                Long usuario_id, Despesa despesa){

        // buscar conta
        Conta conta = contaRepository.findById(conta_id)
                .orElseThrow(() -> new RuntimeException("Conta nao encontrada"));

        // validar se a conta pertence ao usuario
        if(!conta.getUsuario().getId().equals(usuario_id)){
            throw new RuntimeException("Conta nao pertence ao usuario");
        }

        // buscar usuario
        Usuario usuario = usuarioRepository.findById(usuario_id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        // buscar categoria


        // validação básica
        if (despesa.getValor() == null) {
            throw new RuntimeException("Valor obrigatório");
        }

        // setar relacionamentos
        despesa.setUsuario(usuario);
        despesa.setConta(conta);


        // saldo
        if (conta.getSaldo() == null) {
            conta.setSaldo(BigDecimal.ZERO);
        }

        if ("PAGO".equalsIgnoreCase(despesa.getStatus())) {
            BigDecimal novoSaldo = conta.getSaldo().subtract(despesa.getValor());
            conta.setSaldo(novoSaldo);
            contaRepository.save(conta);
        }

        // salvar conta
        contaRepository.save(conta);

        // salvar despesa
        return despesaRepository.save(despesa);
    }



    public List<Despesa> listarDespesas(){
        return despesaRepository.findAll();
    }




    public List<Despesa> listarDespesasPorUsuario(Long usuario_id){
        return despesaRepository.findByUsuarioId(usuario_id);
    }






        //atualizar campos
        public Despesa atualizarDespesa(Long id, Despesa despesaAtualizada) {

            Despesa despesa = despesaRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Despesa não encontrada"));

            // Guarda status antigo
            String statusAntigo = despesa.getStatus();

            Optional.ofNullable(despesaAtualizada.getValor())
                    .ifPresent(despesa::setValor);

            Optional.ofNullable(despesaAtualizada.getData())
                    .ifPresent(despesa::setData);

            Optional.ofNullable(despesaAtualizada.getDescricao())
                    .ifPresent(despesa::setDescricao);

            Optional.ofNullable(despesaAtualizada.getStatus())
                    .ifPresent(despesa::setStatus);

            Conta conta = despesa.getConta();

            // PENDENTE -> PAGO
            if ("Pendente".equalsIgnoreCase(statusAntigo)
                    && "Pago".equalsIgnoreCase(despesa.getStatus())) {

                conta.setSaldo(
                        conta.getSaldo().subtract(despesa.getValor())
                );
            }

            // PAGO -> PENDENTE
            if ("Pago".equalsIgnoreCase(statusAntigo)
                    && "Pendente".equalsIgnoreCase(despesa.getStatus())) {

                conta.setSaldo(
                        conta.getSaldo().add(despesa.getValor())
                );
            }

            return despesaRepository.save(despesa);
        }


    @Transactional
    public void deletarDespesa(Long id) {
        Despesa despesa = despesaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Despesa nao encontrada"));

        // só devolve o saldo se estava PAGO
        if ("PAGO".equalsIgnoreCase(despesa.getStatus())) {
            Conta conta = despesa.getConta();
            conta.setSaldo(conta.getSaldo().add(despesa.getValor()));
            contaRepository.save(conta);
        }

        despesaRepository.delete(despesa);
    }



}
