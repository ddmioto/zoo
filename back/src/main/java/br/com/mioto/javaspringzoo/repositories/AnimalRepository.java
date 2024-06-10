package br.com.mioto.javaspringzoo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.mioto.javaspringzoo.models.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    // Outros métodos de consulta personalizados podem ser adicionados aqui, se necessário
}