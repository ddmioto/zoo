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
    // Obter a lista de zoológicos do serviço de animais
    const zoosData = animalService.getZoosFromLocalStorage();
    setZoos(Array.isArray(zoosData) ? zoosData : []);

    // Obter uma lista de todos os animais
    const allAnimals = (Array.isArray(zoosData) ? zoosData : []).reduce((acc, curr) => {
      return acc.concat(curr.animals);
    }, []);

    // Remover duplicatas da lista de todos os animais
    const uniqueAnimals = [...new Set(allAnimals)];
    setAnimals(uniqueAnimals);
  }, []);

  // Obter uma lista de zoológicos que têm o animal selecionado
  const zoosWithSelectedAnimal = zoos.filter(zoo => zoo.animals.includes(selectedAnimal));

  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(animal);
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center"> {/* Ocupa toda a altura da tela */}
      <MDBContainer fluid className="my-5 gradient-form min-vh-100"> {/* Ocupa toda a largura e altura mínima */}
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol lg='6'>
            <MDBListGroup>
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
            {selectedAnimal && (
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
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Animals;
