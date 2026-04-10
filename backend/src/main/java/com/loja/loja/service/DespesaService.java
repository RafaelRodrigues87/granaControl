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



    public Despesa criarDespesa(Long categoria_id, Long conta_id,
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
        Categoria categoria = categoriaRepository.findById(categoria_id)
                .orElseThrow(() -> new RuntimeException("Categoria nao encontrada"));

        // validação básica
        if (despesa.getValor() == null) {
            throw new RuntimeException("Valor obrigatório");
        }

        // setar relacionamentos
        despesa.setUsuario(usuario);
        despesa.setConta(conta);
        despesa.setCategoria(categoria);

        // saldo
        if (conta.getSaldo() == null) {
            conta.setSaldo(BigDecimal.ZERO);
        }

        BigDecimal novoSaldo = conta.getSaldo().subtract(despesa.getValor());
        conta.setSaldo(novoSaldo);

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
        public Despesa atualizarDespesa(Long id, Despesa novaDespesa){
            Despesa despesa = despesaRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Despesa nao encontrada"));

            // data
            if (novaDespesa.getData() != null &&
                    !novaDespesa.getData().equals(despesa.getData())) {
                despesa.setData(novaDespesa.getData());
            }

            // status
            if (novaDespesa.getStatus() != null &&
                    !novaDespesa.getStatus().equals(despesa.getStatus())) {
                despesa.setStatus(novaDespesa.getStatus());
            }

            // valor
            if (novaDespesa.getValor() != null &&
                    novaDespesa.getValor().compareTo(despesa.getValor()) != 0) {
                despesa.setValor(novaDespesa.getValor());
            }

            // descricao
            if (novaDespesa.getDescricao() != null &&
                    !novaDespesa.getDescricao().equals(despesa.getDescricao())) {
                despesa.setDescricao(novaDespesa.getDescricao());
            }

            return despesaRepository.save(despesa);
        }





    @Transactional
    public void deletarDespesa(Long id){
        Despesa despesa = despesaRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Despesa nao encontrada"));

        Conta conta = despesa.getConta();

        conta.setSaldo(conta.getSaldo().add(despesa.getValor()));

        contaRepository.save(conta);
        despesaRepository.delete(despesa);

    }



}
