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

import br.com.mioto.javaspringzoo.models.Animal;
import br.com.mioto.javaspringzoo.repositories.AnimalRepository;
import br.com.mioto.javaspringzoo.security.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/animals")
public class AnimalsController {
    
    @Autowired
    AnimalRepository animalRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/all")
    public ResponseEntity<?> allAnimals() {
        // Obtém o token JWT da solicitação
        String jwtToken = extractJwtTokenFromRequest();

        // Valida o token JWT
        if (jwtUtils.validateJwtToken(jwtToken)) {
            Iterable<Animal> animals = animalRepository.findAll();
            return ResponseEntity.ok(animals);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid JWT Token. Access Denied!");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Animal> adicionarAnimal(@RequestBody List<Animal> animal) {
        animalRepository.saveAll(animal);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Método para extrair o token JWT da solicitação
    private String extractJwtTokenFromRequest() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}