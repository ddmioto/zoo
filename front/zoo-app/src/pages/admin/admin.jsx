import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Pagination } from 'react-bootstrap';
import axios from 'axios';
import authService from '../auth/services/auth.service';

const API_URL = 'http://localhost:8080/api';

const Admin = () => {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState({ street: '', number: '', city: '', state: '', cep: '' });
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [animalsPage, setAnimalsPage] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [token, setToken] = useState(""); 

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setToken(currentUser.accessToken);
    console.log(currentUser);
    fetchAnimals(currentPage, itemsPerPage);
  }, [currentPage]);

  const fetchAnimals = async (page, size, sortBy = 'name', direction = 'asc') => {
    try {
      const currentUser = authService.getCurrentUser();
      const response = await axios.get(`${API_URL}/animals/all?page=${page - 1}&size=${size}&sortBy=${sortBy}&direction=${direction}`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      });
      console.log(response.data);
      setAnimalsPage(response.data);
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
    }
  };

  const handleAnimalSelection = (animalId) => {
    setSelectedAnimals((prevSelected) => {
      if (prevSelected.includes(animalId)) {
        return prevSelected.filter((id) => id !== animalId);
      } else {
        return [...prevSelected, animalId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newZoo = {
      name,
      cnpj,
      address,
      animalIds: selectedAnimals,
    };

    try {
      await axios.post(`${API_URL}/zoo/add`, newZoo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Zoológico criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar zoológico:', error);
      alert('Erro ao criar zoológico');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Adicionar Zoológico</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formZooName">
              <Form.Label>Nome do Zoológico</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do zoológico"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formZooCnpj">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o CNPJ"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formZooAddress">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rua"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
              />
              <Form.Control
                type="text"
                placeholder="Número"
                value={address.number}
                onChange={(e) => setAddress({ ...address, number: e.target.value })}
              />
              <Form.Control
                type="text"
                placeholder="Cidade"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
              <Form.Control
                type="text"
                placeholder="Estado"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
              />
              <Form.Control
                type="text"
                placeholder="CEP"
                value={address.zip}
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Adicionar Zoológico
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h2>Selecionar Animais</h2>
          <div>
            {animalsPage.content.map((animal) => (
              <Form.Check
                type="checkbox"
                label={animal.name}
                key={animal.id}
                checked={selectedAnimals.includes(animal.id)}
                onChange={() => handleAnimalSelection(animal.id)}
              />
            ))}
          </div>
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            />
            {Array.from({ length: animalsPage.totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(Math.min(currentPage + 1, animalsPage.totalPages))}
              disabled={currentPage === animalsPage.totalPages}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
