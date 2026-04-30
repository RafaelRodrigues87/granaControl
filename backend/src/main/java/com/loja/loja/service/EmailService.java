package com.loja.loja.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private Environment env;

    public void enviarCodigo(String destinatario, String codigo) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(env.getProperty("spring.mail.username"));
        msg.setTo(destinatario);
        msg.setSubject("Recuperação de senha - GranaControl");
        msg.setText("Seu código: " + codigo + "\nVálido por 15 minutos.");
        mailSender.send(msg);
    }
}