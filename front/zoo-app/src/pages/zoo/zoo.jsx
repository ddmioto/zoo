import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import ZooService from './services/zoo.service';
import authService from '../auth/services/auth.service';

function Zoo() {
  const [zoos, setZoos] = useState([]);
  const [selectedZoo, setSelectedZoo] = useState(null);

  useEffect(() => {
    const fetchZoos = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser && currentUser.accessToken) {
          const zoosData = await ZooService.fetchZoosFromAPI(currentUser.accessToken);
          setZoos(zoosData);
        } else {
          console.error('Token JWT não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar zoos:', error.message);
      }
    };

    fetchZoos();
  }, []);

  const handleZooSelect = (zooId) => {
    setSelectedZoo(zooId);
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <MDBContainer fluid className="my-5 gradient-form min-vh-100">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol lg='6'>
            <MDBListGroup>
              {zoos.map((zoo) => (
                <MDBListGroupItem
                  key={zoo.id}
                  active={selectedZoo === zoo.id}
                  onClick={() => handleZooSelect(zoo.id)}
                  className="cursor-pointer"
                >
                  {zoo.name}
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCol>
          <MDBCol lg='6'>
            {selectedZoo !== null && (
              <div className="d-flex flex-column ms-5">
                <h4 className="mt-1 mb-3 pb-1">Animals in {zoos.find(zoo => zoo.id === selectedZoo).name}</h4>
                {zoos.find(zoo => zoo.id === selectedZoo).animals.length > 0 ? (
                  <ul>
                    {zoos.find(zoo => zoo.id === selectedZoo).animals.map((animal, index) => (
                      <li key={index}>{typeof animal === 'object' ? animal.name : animal}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No animals in this zoo.</p>
                )}
              </div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Zoo;
