package br.com.mioto.javaspringzoo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.mioto.javaspringzoo.models.Zoo;

@Repository
public interface ZooRepository extends JpaRepository<Zoo, Long> {
}