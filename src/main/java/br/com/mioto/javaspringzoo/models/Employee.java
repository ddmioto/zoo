package br.com.mioto.javaspringzoo.models;

import java.util.List;

public class Employee {
  private String name;
  private String cpf;
  private List<Address> address;
  private Double salary;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCpf() {
    return this.cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  public List<Address> getAddress() {
    return this.address;
  }

  public void setAddress(List<Address> address) {
    this.address = address;
  }

  public Double getSalary() {
    return this.salary;
  }

  public void setSalary(Double salary) {
    this.salary = salary;
  }

}
