import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import animalService from './services/animal.service';

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [zoos, setZoos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const zoosData = animalService.getZoosFromLocalStorage();
        setZoos(Array.isArray(zoosData) ? zoosData : []);

        // Obter uma lista de todos os animais únicos
        const allAnimals = (Array.isArray(zoosData) ? zoosData : []).reduce((acc, curr) => {
          return acc.concat(curr.animals);
        }, []);

        const uniqueAnimals = getUniqueAnimalNames(allAnimals);
        setAnimals(uniqueAnimals);
      } catch (error) {
        console.error('Erro ao obter dados:', error.message);
      }
    };

    fetchData();
  }, []);

  const getUniqueAnimalNames = (zoosData) => {
    const animalNames = new Set();

    zoosData.forEach(animal => {
      animalNames.add(animal.name);
    });
  
    return [...animalNames];
  };

  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(animal);
  };

  // Filtrar zoológicos que possuem o animal selecionado
  const zoosWithSelectedAnimal = zoos.filter(zoo =>
    zoo.animals.some(animal =>
      typeof animal === 'string' ? animal === selectedAnimal : animal.name === selectedAnimal
    )
  );

  return (
    <div className="vh-100">
      <MDBContainer fluid className="my-5 gradient-form min-vh-100">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol lg='6' className="scrollable-list"> {/* Adicionado a classe para aplicar estilos */}
            <MDBListGroup className="animal-list">
              {animals.map((animal, index) => (
                <MDBListGroupItem
                  key={index}
                  active={selectedAnimal === animal}
                  onClick={() => handleAnimalSelect(animal)}
                  className="cursor-pointer"
                >
                  {animal}
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCol>
         <MDBCol lg='6'>
            <div className="d-flex flex-column ms-5">
              <h4 className="mt-1 mb-3 pb-1">Zoos with {selectedAnimal}</h4>
              <ul>
                {zoosWithSelectedAnimal.length > 0 ? (
                  zoosWithSelectedAnimal.map((zoo) => (
                    <li key={zoo.id}>{zoo.name}</li>
                  ))
                ) : (
                  <p>No zoos have this animal.</p>
                )}
              </ul>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Animals;
