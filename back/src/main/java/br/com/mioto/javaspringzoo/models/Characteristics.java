package br.com.mioto.javaspringzoo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "characteristics")
class Characteristics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "prey")
    private String prey;

    @Column(name = "name_of_young")
    private String nameOfYoung;

    @Column(name = "group_behavior")
    private String groupBehavior;

    @Column(name = "biggest_threat")
    private String biggestThreat;

    @Column(name = "most_distinctive_feature")
    private String mostDistinctiveFeature;

    @Column(name = "gestation_period")
    private String gestationPeriod;

    @Column(name = "litter_size")
    private String litterSize;

    @Column(name = "habitat")
    private String habitat;

    @Column(name = "diet")
    private String diet;

    @Column(name = "type")
    private String type;

    @Column(name = "common_name")
    private String commonName;

    @Column(name = "origin")
    private String origin;

    @Column(name = "number_of_species")
    private String numberOfSpecies;

    @Column(name = "location")
    private String location;

    @Column(name = "color")
    private String color;

    @Column(name = "skin_type")
    private String skinType;

    @Column(name = "top_speed")
    private String topSpeed;

    @Column(name = "lifespan")
    private String lifespan;

    @Column(name = "weight")
    private String weight;

    @Column(name = "height")
    private String height;

    @Column(name = "length")
    private String length;

    @Column(name = "age_of_sexual_maturity")
    private String ageOfSexualMaturity;

    @Column(name = "age_of_weaning")
    private String ageOfWeaning;

  // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrey() {
        return prey;
    }

    public void setPrey(String prey) {
        this.prey = prey;
    }

    public String getNameOfYoung() {
        return nameOfYoung;
    }

    public void setNameOfYoung(String nameOfYoung) {
        this.nameOfYoung = nameOfYoung;
    }

    public String getGroupBehavior() {
        return groupBehavior;
    }

    public void setGroupBehavior(String groupBehavior) {
        this.groupBehavior = groupBehavior;
    }

    public String getBiggestThreat() {
        return biggestThreat;
    }

    public void setBiggestThreat(String biggestThreat) {
        this.biggestThreat = biggestThreat;
    }

    public String getMostDistinctiveFeature() {
        return mostDistinctiveFeature;
    }

    public void setMostDistinctiveFeature(String mostDistinctiveFeature) {
        this.mostDistinctiveFeature = mostDistinctiveFeature;
    }

    public String getGestationPeriod() {
        return gestationPeriod;
    }

    public void setGestationPeriod(String gestationPeriod) {
        this.gestationPeriod = gestationPeriod;
    }

    public String getLitterSize() {
        return litterSize;
    }

    public void setLitterSize(String litterSize) {
        this.litterSize = litterSize;
    }

    public String getHabitat() {
        return habitat;
    }

    public void setHabitat(String habitat) {
        this.habitat = habitat;
    }

    public String getDiet() {
        return diet;
    }

    public void setDiet(String diet) {
        this.diet = diet;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCommonName() {
        return commonName;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getNumberOfSpecies() {
        return numberOfSpecies;
    }

    public void setNumberOfSpecies(String numberOfSpecies) {
        this.numberOfSpecies = numberOfSpecies;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSkinType() {
        return skinType;
    }

    public void setSkinType(String skinType) {
        this.skinType = skinType;
    }

    public String getTopSpeed() {
        return topSpeed;
    }

    public void setTopSpeed(String topSpeed) {
        this.topSpeed = topSpeed;
    }

    public String getLifespan() {
        return lifespan;
    }

    public void setLifespan(String lifespan) {
        this.lifespan = lifespan;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getAgeOfSexualMaturity() {
        return ageOfSexualMaturity;
    }

    public void setAgeOfSexualMaturity(String ageOfSexualMaturity) {
        this.ageOfSexualMaturity = ageOfSexualMaturity;
    }

    public String getAgeOfWeaning() {
        return ageOfWeaning;
    }

    public void setAgeOfWeaning(String ageOfWeaning) {
        this.ageOfWeaning = ageOfWeaning;
    }
}