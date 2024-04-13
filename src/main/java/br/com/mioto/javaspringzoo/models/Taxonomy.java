package br.com.mioto.javaspringzoo.models;

class Taxonomy {
  private String kingdom;
  private String phylum;
  private String classe;
  private String order;
  private String family;
  private String genus;
  private String scientificName;

  public String getKingdom() {
      return kingdom;
  }

  public void setKingdom(String kingdom) {
      this.kingdom = kingdom;
  }

  public String getPhylum() {
      return phylum;
  }

  public void setPhylum(String phylum) {
      this.phylum = phylum;
  }

  public String getClasse() {
      return classe;
  }

  public void setClasse(String classe) {
      this.classe = classe;
  }

  public String getOrder() {
      return order;
  }

  public void setOrder(String order) {
      this.order = order;
  }

  public String getFamily() {
      return family;
  }

  public void setFamily(String family) {
      this.family = family;
  }

  public String getGenus() {
      return genus;
  }

  public void setGenus(String genus) {
      this.genus = genus;
  }

  public String getScientificName() {
      return scientificName;
  }

  public void setScientificName(String scientificName) {
      this.scientificName = scientificName;
  }
}