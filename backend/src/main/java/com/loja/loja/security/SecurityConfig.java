package com.loja.loja.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // IMPORTANTE
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSecurity // Adicione esta anotação!
public class SecurityConfig {
//
//    @Autowired
//    private JwtFilter jwtFilter; // Injetando o seu filtro

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );


        return http.build();
    }
}

// .csrf(csrf -> csrf.disable())
//        .authorizeHttpRequests(auth -> auth
//        .requestMatchers("/usuarios/login", "/usuarios/cadastrar").permitAll() // Liberados
//                        .anyRequest().authenticated() // Todo o resto EXIGE token
//                )
//                        // Adiciona o seu filtro na corrente de segurança do Spring
//                        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);