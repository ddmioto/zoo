package br.com.mioto.javaspringzoo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import br.com.mioto.javaspringzoo.security.jwt.JwtAuthenticationFilter;
import br.com.mioto.javaspringzoo.security.services.JwtUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Autowired
  private JwtUserDetailsService jwtUserDetailsService;

  @Autowired
  private JwtAuthenticationFilter jwtAuthorizationFilter;

  @SuppressWarnings({ "deprecation", "removal" })
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http.csrf().disable()
        .authorizeRequests()
        .requestMatchers("/rest/auth/**").permitAll()
        .anyRequest().authenticated()
        .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and().addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http,
      @SuppressWarnings("deprecation") NoOpPasswordEncoder noOpPasswordEncoder) throws Exception {
    AuthenticationManagerBuilder authenticationManagerBuilder = http
        .getSharedObject(AuthenticationManagerBuilder.class);
    authenticationManagerBuilder.userDetailsService(jwtUserDetailsService).passwordEncoder(noOpPasswordEncoder);
    return authenticationManagerBuilder.build();
  }

  @SuppressWarnings("deprecation")
  @Bean
  public NoOpPasswordEncoder passwordEncoder() {
    return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
  }

}
