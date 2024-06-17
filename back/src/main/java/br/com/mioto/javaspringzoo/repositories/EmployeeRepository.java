package br.com.mioto.javaspringzoo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.mioto.javaspringzoo.models.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}