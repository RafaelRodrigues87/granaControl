package com.loja.loja.entity;
import jakarta.persistence.*;
import lombok.*;



@Entity
@Builder
public class Produto{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private Double preco;

    @Column(nullable = false)
    private int quantidade_estoque;

    public Long getId(){
        return id;
    }

    public String getNome(){
        return nome;
    }
    public void setNome(String nome){
        this.nome = nome;
    }

    public String getDescricao(){
        return descricao;
    }
    public void setDescricao(String descricao){
        this.descricao = descricao;
    }

    private Double getPreco(){
        return preco;
    }
    public void setPreco(Double preco){
        this.preco = preco;
    }

    public int getQuantidade_estoque(){
        return quantidade_estoque;
    }
    public void setQuantidade_estoque(int quantidade_estoque){
        this.quantidade_estoque = quantidade_estoque;
    }

    public Produto(){

    }
    public Produto(Long id, String nome, String descricao, Double Preco, int quantidade_estoque){
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade_estoque = quantidade_estoque;


    }


    

}
