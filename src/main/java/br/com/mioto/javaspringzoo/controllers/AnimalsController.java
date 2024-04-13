package br.com.mioto.javaspringzoo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/animals")
public class AnimalsController {

	@GetMapping("/all")
	public ResponseEntity<String> get() {
		return ResponseEntity.ok("Hello World!");
	}
}