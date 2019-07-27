class UsersService {
  get() {
    return fetch('http://localhost:3000/users').then(response => response.json());
  }

  add(name) {
    return fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }

  delete(id) {
    return fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE'
    }).then(response => response.status);
  }
}

export { UsersService };
