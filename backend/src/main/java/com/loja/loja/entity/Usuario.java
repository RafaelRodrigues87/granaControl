package com.loja.loja.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate dataNascimento;

    @Column(nullable = false)
    private String telefone;

    @Column (nullable = false)
    private String cpf;

    @Column (nullable = false)
    private String email;

    @Column (nullable = false)
    private String senha;



    public Long getId(){
        return id;
    }


    public String getNome(){
        return nome;
    }
    public void setNome(String nome){
        this.nome = nome;
    }


    public LocalDate getDataNascimento(){
        return dataNascimento;
    }
    public void setDataNascimento(LocalDate dataNascimento){

        this.dataNascimento = dataNascimento;
    }

    public String getTelefone(){
        return telefone;
    }
    public void setTelefone(String telefone){
        this.telefone = telefone;
    }


    public String getCpf(){
        return cpf;
    }
    public void setCpf(String cpf){
        this.cpf = cpf;
    }

    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public String getSenha(){
        return senha;
    }
    public void setSenha(String senha){
        this.senha = senha;
    }





    public Usuario(Long id, String nome, LocalDate dataNascimento, String telefone, String cpf, String email, String senha){
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }

    public Usuario(){

    }
}
