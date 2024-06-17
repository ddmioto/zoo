// zooService.js

class ZooService {
  fetchZoosFromLocalStorage() {
    // Dados de exemplo (mock)
    const zoos = [
      { id: 1, name: 'Zoo 1', animals: ['Lion', 'Elephant', 'Giraffe'] },
      { id: 2, name: 'Zoo 2', animals: ['Tiger', 'Zebra'] },
      { id: 3, name: 'Zoo 3', animals: ['Lion', 'Zebra', 'Giraffe'] },
    ];
    
    // Salvar no localStorage para simular a persistência
    localStorage.setItem('zoos', JSON.stringify(zoos));
    return zoos;
  }
}

export default new ZooService();
