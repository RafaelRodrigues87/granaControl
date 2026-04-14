package com.loja.loja.service;
import com.loja.loja.entities.Conta;
import com.loja.loja.entities.Usuario;
import com.loja.loja.repository.ContaRepository;
import com.loja.loja.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ContaService {

    private final ContaRepository contaRepository;
    private final UsuarioRepository usuarioRepository;

    public ContaService(ContaRepository contaRepository, UsuarioRepository usuarioRepository){
        this.contaRepository = contaRepository;
        this.usuarioRepository = usuarioRepository;
    }


    public Conta criarConta(Long usuarioId, Conta conta){
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(()-> new RuntimeException("usuario nao encontrado"));

                conta.setUsuario(usuario);

                //verifica se o saldo é null
                if(conta.getSaldo() == null){
                    conta.setSaldo(BigDecimal.ZERO);
                }
                return contaRepository.save(conta);
    }

    public List<Conta> listarContas(Long usuarioId){
        return contaRepository.findByUsuarioId(usuarioId);
    }

    public Conta atualizarConta(Long id, Conta contaAtualizada){
        Conta conta = contaRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("conta nao encontrada"));

        Optional.ofNullable(contaAtualizada.getNome()).ifPresent(conta::setNome);
        Optional.ofNullable(contaAtualizada.getSaldo()).ifPresent(conta::setSaldo);

        return contaRepository.save(conta);
    }

    @Transactional
    public void deletarConta(Long contaId){
        Conta conta = contaRepository.findById(contaId)
                .orElseThrow(()-> new RuntimeException("Conta nao encontrada"));

        contaRepository.delete(conta);
    }
}
