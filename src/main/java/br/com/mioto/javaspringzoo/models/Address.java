package br.com.mioto.javaspringzoo.models;

public class Address {
  private String street;
  private Integer number;
  private String cep;
  private String city;

  public String getStreet() {
    return this.street;
  }

  public void setStreet(String street) {
    this.street = street;
  }

  public Integer getNumber() {
    return this.number;
  }

  public void setNumber(Integer number) {
    this.number = number;
  }

  public String getCep() {
    return this.cep;
  }

  public void setCep(String cep) {
    this.cep = cep;
  }

  public String getCity() {
    return this.city;
  }

  public void setCity(String city) {
    this.city = city;
  }

}
