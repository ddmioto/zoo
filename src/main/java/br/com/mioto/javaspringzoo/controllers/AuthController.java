package br.com.mioto.javaspringzoo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import br.com.mioto.javaspringzoo.models.User;
import br.com.mioto.javaspringzoo.models.request.LoginRequest;
import br.com.mioto.javaspringzoo.models.response.ErrorResponse;
import br.com.mioto.javaspringzoo.models.response.LoginResponse;
import br.com.mioto.javaspringzoo.security.jwt.JwtUtils;

@Controller
@RequestMapping("/rest/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;

  private JwtUtils jwtUtil;

  public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtil) {
    this.authenticationManager = authenticationManager;
    this.jwtUtil = jwtUtil;
  }

  @ResponseBody
  @RequestMapping(value = "/login", method = RequestMethod.POST)
  public ResponseEntity login(@RequestBody LoginRequest loginReq) {

    try {
      // Authentication authentication = authenticationManager
      // .authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(),
      // loginReq.getPassword()));

      // String email = authentication.getName();
      // String token = JwtUtils.generateJwtToken(authentication);

      String email = loginReq.getEmail(); // Usando o email do LoginRequest
      String token = JwtUtils.generateJwtToken(email);

      LoginResponse loginRes = new LoginResponse(email, token);

      return ResponseEntity.ok(loginRes);

    } catch (BadCredentialsException e) {
      ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST, "Invalid username or password");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
  }
}