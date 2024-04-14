package br.com.mioto.javaspringzoo.controllers;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.List;

public class FakeAuthentication {

  public static Authentication generateFakeAuthentication(String username, String role) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority(role));

    User principal = new User(username, "", authorities);
    return new UsernamePasswordAuthenticationToken(principal, "", authorities);
  }
}
