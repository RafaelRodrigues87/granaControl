//package com.loja.loja.security;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
//public class JwtFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private JwtService jwtService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        String path = request.getServletPath();
//
//        // Rotas públicas
//        if (path.startsWith("/usuarios/login") || path.startsWith("/usuarios/cadastrar")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String authHeader = request.getHeader("Authorization");
//
//        // Verifica se o header existe
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            response.getWriter().write("Token nao informado");
//            return;
//        }
//
//        String token = authHeader.substring(7);
//        System.out.println("Token recebido: " + token);
//        try {
//
//            // Valida token
//            if (!jwtService.tokenValido(token)) {
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                response.getWriter().write("Token invalido");
//                return;
//            }
//
//        } catch (Exception e) {
//
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            response.getWriter().write("Erro ao validar token");
//            return;
//        }
//
//        // continua requisição
//        filterChain.doFilter(request, response);
//    }
//}