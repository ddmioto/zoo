package br.com.mioto.javaspringzoo.models;

import java.util.List;

public class Animal {
  private String name;
  private Taxonomy taxonomy;
  private List<String> locations;
  private Characteristics characteristics;

  // Getters and setters
  public String getName() {
      return name;
  }

  public void setName(String name) {
      this.name = name;
  }

  public Taxonomy getTaxonomy() {
      return taxonomy;
  }

  public void setTaxonomy(Taxonomy taxonomy) {
      this.taxonomy = taxonomy;
  }

  public List<String> getLocations() {
      return locations;
  }

  public void setLocations(List<String> locations) {
      this.locations = locations;
  }

  public Characteristics getCharacteristics() {
      return characteristics;
  }

  public void setCharacteristics(Characteristics characteristics) {
      this.characteristics = characteristics;
  }
}