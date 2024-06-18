package br.com.mioto.javaspringzoo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.mioto.javaspringzoo.models.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}