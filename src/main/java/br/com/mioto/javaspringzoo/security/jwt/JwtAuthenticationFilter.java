package br.com.mioto.javaspringzoo.security.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.mioto.javaspringzoo.security.services.JwtUserDetailsService;

import javax.crypto.SecretKey;
import java.io.IOException;

@Configuration
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private static final SecretKey SECRET_KEY = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS512);

  @Autowired
  private JwtUserDetailsService jwtUserDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      String jwt = parseJwt(request);
      if (jwt != null) {
        if (jwt.equals("FAKE_JWT")) { // Verifica se é um token falso
          UserDetails userDetails = jwtUserDetailsService.loadUserByUsername("fakeuser"); // Carrega os detalhes do
                                                                                          // usuário falso
          UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
              userDetails, null, userDetails.getAuthorities());
          SecurityContextHolder.getContext().setAuthentication(authentication); // Configura a autenticação falsa no
                                                                                // contexto de segurança
        } else if (validateJwtToken(jwt)) { // Verifica se é um token JWT válido
          String username = extractUsername(jwt);
          UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);
          UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
              userDetails, null, userDetails.getAuthorities());
          SecurityContextHolder.getContext().setAuthentication(authentication); // Configura a autenticação JWT no
                                                                                // contexto de segurança
        }
      }
    } catch (ExpiredJwtException e) {
      logger.error("Token JWT expirado: {}");
    } catch (JwtException e) {
      logger.error("Erro ao processar token JWT: {}");
    }
    filterChain.doFilter(request, response);
  }

  private String parseJwt(HttpServletRequest request) {
    String headerAuth = request.getHeader("Authorization");
    if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
      return headerAuth.substring(7);
    }
    return null;
  }

  private boolean validateJwtToken(String jwt) {
    try {
      Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(jwt);
      return true;
    } catch (JwtException e) {
      logger.error("Token JWT inválido: {}");
    }
    return false;
  }

  private String extractUsername(String jwt) {
    return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(jwt).getBody().getSubject();
  }
}
