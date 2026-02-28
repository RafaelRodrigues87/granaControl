package com.loja.loja.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;


@Service
public class JwtService {
    private final String Secret = "RafaelRodriguesBezerraRamosOtacianoBezerra";
    private final long EXPIRATION = 1000 * 60 * 60;

    private Key getKey(){
        return Keys.hmacShaKeyFor(Secret.getBytes());
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
                .parseClaimsJwt(token)
                .getBody()
                .getSubject();
    }

    public boolean tokenValido(String token){
        try{
            Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJwt(token);
            return true;
        } catch(JwtException | IllegalArgumentException e){
            return false;
        }
    }
}
