package com.loja.loja.service;

import com.loja.loja.entities.CodigoRecuperacao;
import com.loja.loja.entities.Usuario;
import com.loja.loja.repository.CodigoRecuperacaoRepository;
import com.loja.loja.repository.UsuarioRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private CodigoRecuperacaoRepository codigoRepository;
    @Autowired
    private EmailService emailService;

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario salvar(Usuario usuario){

        if (usuario.getSenha() == null || usuario.getSenha().isEmpty()) {
            throw new RuntimeException("Senha obrigatória");
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTodos(){
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id){
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
    }

    public Usuario buscarPorEmail(String email){
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
    }
    public Usuario login(String email, String senha){

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));

        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            throw new RuntimeException("Email ou senha inválidos");
        }

        return usuario;
    }


    //nome, data_nascimento, telefone, cpf, email, senha
    public Usuario atualizarUsuario(Long id, Usuario novoUsuario) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Optional.ofNullable(novoUsuario.getNome()).ifPresent(usuario::setNome);
        Optional.ofNullable(novoUsuario.getDataNascimento()).ifPresent(usuario::setDataNascimento);
        Optional.ofNullable(novoUsuario.getTelefone()).ifPresent(usuario::setTelefone);
        Optional.ofNullable(novoUsuario.getCpf()).ifPresent(usuario::setCpf);

        // Senha: só atualiza se vier preenchida, e encripta corretamente
        if (novoUsuario.getSenha() != null && !novoUsuario.getSenha().isEmpty()) {
            usuario.setSenha(passwordEncoder.encode(novoUsuario.getSenha()));
        }

        return usuarioRepository.save(usuario);
    }



    public void deletar(Long id){

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        usuarioRepository.delete(usuario);
    }

    //redefinicao de senha com email
    @Transactional
    public void solicitarRecuperacao(String email) {
        usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("email nao encontrado"));


        codigoRepository.deleteByEmail(email);

        String codigo = String.format("%06d", new java.util.Random().nextInt(999999));

        CodigoRecuperacao cr = new CodigoRecuperacao();
        cr.setEmail(email);
        cr.setCodigo(codigo);
        cr.setExpiracao(LocalDateTime.now().plusMinutes(15));
        cr.setUsado(false);
        codigoRepository.save(cr);

        System.out.println("✅ Código salvo: " + codigo); // log aqui

        emailService.enviarCodigo(email, codigo);

        System.out.println("✅ Email enviado!"); // se não aparecer, o erro é no envio
    }

    public void redefinirSenha(String email, String codigo, String novaSenha){
        CodigoRecuperacao cr = codigoRepository
                .findByEmailAndCodigoAndUsadoFalse(email, codigo)
                .orElseThrow(()-> new RuntimeException("codiog invalido ou expirado"));


        // Verifica se expirou
        if(cr.getExpiracao().isBefore(LocalDateTime.now())){
            throw new RuntimeException("codigo expirado");
        }


        // Atualiza a senha
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException("Usuario nao encontrado"));
        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);



        // Marca código como usado
        cr.setUsado(true);
        codigoRepository.save(cr);
    }
}