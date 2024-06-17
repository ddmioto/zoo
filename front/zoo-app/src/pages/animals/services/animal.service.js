class AnimalService {
  getZoosFromLocalStorage() {
    const storedZoos = JSON.parse(localStorage.getItem('zoos'));
    return storedZoos || [];
  }
}

export default new AnimalService();
