package br.com.mioto.javaspringzoo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import br.com.mioto.javaspringzoo.models.Address;
import br.com.mioto.javaspringzoo.models.Animal;
import br.com.mioto.javaspringzoo.models.Zoo;
import br.com.mioto.javaspringzoo.models.request.ZooRequest;
import br.com.mioto.javaspringzoo.repositories.AddressRepository;
import br.com.mioto.javaspringzoo.repositories.AnimalRepository;
import br.com.mioto.javaspringzoo.repositories.ZooRepository;
import br.com.mioto.javaspringzoo.security.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/zoo")
public class ZooController {
    
    @Autowired
    private ZooRepository zooRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AddressRepository addressRepository;

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
public ResponseEntity<?> addZoo(@RequestBody ZooRequest zooRequest) {
    String jwtToken = extractJwtTokenFromRequest();

    if (jwtUtils.validateJwtToken(jwtToken)) {
        List<Animal> animals = animalRepository.findAllById(zooRequest.getAnimalIds());

        // Criar um novo endereço a partir dos dados recebidos
        Address address = new Address();
        address.setStreet(zooRequest.getAddress().getStreet());
        address.setNumber(zooRequest.getAddress().getNumber()); // Ajuste conforme o seu modelo de endereço
        address.setCep(zooRequest.getAddress().getCep());
        address.setCity(zooRequest.getAddress().getCity());

        // Salvar o endereço para obter um ID válido
        address = addressRepository.save(address);

        // Criar o zoológico e associar o endereço e os animais
        Zoo zoo = new Zoo();
        zoo.setName(zooRequest.getName());
        zoo.setCnpj(zooRequest.getCnpj());
        zoo.setAddress(address);
        zoo.setAnimals(animals);

        // Salvar o zoológico
        zooRepository.save(zoo);

        return new ResponseEntity<>(HttpStatus.CREATED);
    } else {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid JWT Token. Access Denied!");
    }
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
