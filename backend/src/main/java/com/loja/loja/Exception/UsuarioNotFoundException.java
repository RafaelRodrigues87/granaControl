package com.loja.loja.Exception;

public class UsuarioNotFoundException extends RuntimeException {
    public UsuarioNotFoundException() { super("Usuário não encontrado"); }
}

