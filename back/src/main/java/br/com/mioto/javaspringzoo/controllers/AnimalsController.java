package br.com.mioto.javaspringzoo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/animals")
public class AnimalsController {
    
    @Autowired
    AnimalRepository animalRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/all")
    public ResponseEntity<?> allAnimals(int page, int size, String sortBy, String direction) {
        // Obtém o token JWT da solicitação
        String jwtToken = extractJwtTokenFromRequest();

        // Valida o token JWT
        if (jwtUtils.validateJwtToken(jwtToken)) {
            try {
                // Configuração da paginação e ordenação
                Pageable pageable = PageRequest.of(page, size, Sort.Direction.fromString(direction), sortBy);
                Page<Animal> animalsPage = animalRepository.findAll(pageable);

                // Verifica se a página solicitada está dentro do intervalo
                if (page >= animalsPage.getTotalPages()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Page not found");
                }

                // Retorna a página de animais
                return ResponseEntity.ok(animalsPage);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid sorting direction or field");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid JWT Token. Access Denied!");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Animal> adicionarAnimal(@RequestBody List<Animal> animal) {
        animalRepository.saveAll(animal);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> getAnimalByName(@PathVariable String name) {
        // Obtém o token JWT da solicitação
        String jwtToken = extractJwtTokenFromRequest();

        // Valida o token JWT
        if (jwtUtils.validateJwtToken(jwtToken)) {
            // Busca o animal pelo nome
            Optional<Animal> animal = animalRepository.findByName(name);
            if (animal.isPresent()) {
                return ResponseEntity.ok(animal.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Animal not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid JWT Token. Access Denied!");
        }
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
