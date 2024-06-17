// package br.com.mioto.javaspringzoo.config;

// import java.util.Arrays;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.stereotype.Component;

// import br.com.mioto.javaspringzoo.models.Address;
// import br.com.mioto.javaspringzoo.models.Animal;
// import br.com.mioto.javaspringzoo.models.Zoo;
// import br.com.mioto.javaspringzoo.repositories.AnimalRepository;
// import br.com.mioto.javaspringzoo.repositories.ZooRepository;

// @Component
// public class DataLoader implements CommandLineRunner {

//     @Autowired
//     private ZooRepository zooRepository;

//     @Autowired
//     private AnimalRepository animalRepository;

//     @Override
//     public void run(String... args) throws Exception {
//         // Limpar os zoológicos da base de dados (mantendo os animais)
//         zooRepository.deleteAll();

//         // Recuperar todos os animais da base de dados
//         List<Animal> allAnimals = (List<Animal>) animalRepository.findAll();

//         // Dividir os animais em grupos para cada zoológico
//         List<Animal> animalsForZoo1 = allAnimals.subList(0, 10);
//         List<Animal> animalsForZoo2 = allAnimals.subList(10, 20);
//         List<Animal> animalsForZoo3 = allAnimals.subList(20, 30);
//         List<Animal> animalsForZoo4 = allAnimals.subList(30, 40);

//         // Criar zoológicos e associar os animais
//         Zoo zoo1 = new Zoo();
//         zoo1.setName("Zoo 1");
//         zoo1.setCnpj("12345678901234");
//         Address address1 = new Address();
//         address1.setStreet("Rua A");
//         address1.setNumber(100);
//         address1.setCep("12345-678");
//         address1.setCity("Cidade A");
//         zoo1.setAddress(address1);

//         Zoo zoo2 = new Zoo();
//         zoo2.setName("Zoo 2");
//         zoo2.setCnpj("23456789012345");
//         Address address2 = new Address();
//         address2.setStreet("Rua B");
//         address2.setNumber(200);
//         address2.setCep("23456-789");
//         address2.setCity("Cidade B");
//         zoo2.setAddress(address2);

//         Zoo zoo3 = new Zoo();
//         zoo3.setName("Zoo 3");
//         zoo3.setCnpj("34567890123456");
//         Address address3 = new Address();
//         address3.setStreet("Rua C");
//         address3.setNumber(300);
//         address3.setCep("34567-890");
//         address3.setCity("Cidade C");
//         zoo3.setAddress(address3);

//         Zoo zoo4 = new Zoo();
//         zoo4.setName("Zoo 4");
//         zoo4.setCnpj("45678901234567");
//         Address address4 = new Address();
//         address4.setStreet("Rua D");
//         address4.setNumber(400);
//         address4.setCep("45678-901");
//         address4.setCity("Cidade D");
//         zoo4.setAddress(address4);

//         // Associar animais aos zoológicos
//         zoo1.setAnimals(animalsForZoo1);
//         zoo2.setAnimals(animalsForZoo2);
//         zoo3.setAnimals(animalsForZoo3);
//         zoo4.setAnimals(animalsForZoo4);

//         // Salvar os zoológicos na base de dados
//         zooRepository.saveAll(Arrays.asList(zoo1, zoo2, zoo3, zoo4));
//     }
// }
