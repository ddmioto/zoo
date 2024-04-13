package br.com.mioto.javaspringzoo.models;

import java.util.List;

public class Zoo {
  private String name;
  private String cnpj;
  private Address address;
  private List<Animal> animals;

  // Getters and setters
  public String getName() {
      return name;
  }

  public void setName(String name) {
      this.name = name;
  }

  public String getCnpj() {
      return cnpj;
  }

  public void setCnpj(String cnpj) {
      this.cnpj = cnpj;
  }

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public List<Animal> getAnimals() {
      return animals;
  }

  public void setAnimals(List<Animal> animals) {
      this.animals = animals;
  }
}
