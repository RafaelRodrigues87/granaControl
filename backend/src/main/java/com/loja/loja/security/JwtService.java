package com.loja.loja.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;
    private final long EXPIRATION = 1000 * 60 * 60;

    private Key getKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String gerarToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extrairEmail(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)   // CORREÇÃO AQUI
                .getBody()
                .getSubject();
    }

    public boolean tokenValido(String token){
        try{
            Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token);   // CORREÇÃO AQUI
            return true;
        } catch(JwtException | IllegalArgumentException e){
            return false;
        }
    }
}