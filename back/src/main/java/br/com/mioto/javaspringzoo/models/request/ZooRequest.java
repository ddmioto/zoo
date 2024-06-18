package br.com.mioto.javaspringzoo.models.request;

import java.util.List;

import br.com.mioto.javaspringzoo.models.Address;

public class ZooRequest {
    private String name;
	private String cnpj;
    private Address address;
    private List<Long> animalIds;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCnpj() {
        return this.cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public Address getAddress() {
        return this.address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<Long> getAnimalIds() {
        return this.animalIds;
    }

    public void setAnimalIds(List<Long> animalIds) {
        this.animalIds = animalIds;
    }

}