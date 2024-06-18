import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Pagination } from 'react-bootstrap';

const mockAnimals = [
  { id: 1, name: 'Elefante' },
  { id: 2, name: 'Leão' },
  { id: 3, name: 'Girafa' },
  { id: 4, name: 'Zebra' },
  { id: 5, name: 'Pinguim' },
  { id: 6, name: 'Canguru' },
  { id: 7, name: 'Cobra' },
  { id: 8, name: 'Papagaio' },
  { id: 9, name: 'Tigre' },
  { id: 10, name: 'Rinoceronte' },
  { id: 11, name: 'Urso' },
  { id: 12, name: 'Gorila' }
];

const Admin = () => {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '' });
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(mockAnimals.length / itemsPerPage);
  const currentAnimals = mockAnimals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAnimalSelection = (animal) => {
    setSelectedAnimals((prevSelected) => {
      if (prevSelected.includes(animal)) {
        return prevSelected.filter((a) => a !== animal);
      } else {
        return [...prevSelected, animal];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newZoo = {
      name,
      cnpj,
      address,
      animals: selectedAnimals,
    };
    console.log('Zoológico criado:', newZoo);
    alert('Zoológico criado com sucesso!');
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
            {currentAnimals.map((animal) => (
              <Form.Check
                type="checkbox"
                label={animal.name}
                key={animal.id}
                checked={selectedAnimals.includes(animal)}
                onChange={() => handleAnimalSelection(animal)}
              />
            ))}
          </div>
          <Pagination>
            <Pagination.Prev onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
