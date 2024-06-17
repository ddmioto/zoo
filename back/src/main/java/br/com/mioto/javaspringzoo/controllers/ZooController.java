package br.com.mioto.javaspringzoo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import br.com.mioto.javaspringzoo.models.Zoo;
import br.com.mioto.javaspringzoo.repositories.ZooRepository;
import br.com.mioto.javaspringzoo.security.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/zoo")
public class ZooController {
    
    @Autowired
    private ZooRepository zooRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/all")
    public ResponseEntity<?> getAllZoos() {
        String jwtToken = extractJwtTokenFromRequest();

        if (jwtUtils.validateJwtToken(jwtToken)) {
            List<Zoo> zoos = (List<Zoo>) zooRepository.findAll();
            return ResponseEntity.ok(zoos);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid JWT Token. Access Denied!");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Zoo> addZoos(@RequestBody List<Zoo> zoos) {
        zooRepository.saveAll(zoos);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    private String extractJwtTokenFromRequest() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
