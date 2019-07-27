import { UsersService } from './modules.js';

let _usersService;
let _htmlElements;

class Users {
  constructor() {
    _usersService = new UsersService();
    this.initDomElements();

    let usersPromise = this.get();

    if (_htmlElements.addCheckbox.checked === true) {
      usersPromise = usersPromise
        .then(users => this.add(`User ${users.length + 1}`))
        .then(user => {
          console.log(`new user is added: `.toUpperCase(), user);
          return user;
        });
    }

    usersPromise
      .then(user => {
        console.log('render is started'.toUpperCase());
        return this.render();
      })
      .then(response =>
        console.log(`render is complete with status: ${response.status}`.toUpperCase())
      );
  }

  initDomElements() {
    _htmlElements = {
      deleteInput: document.querySelector('.delete-input'),
      deleteButton: document.querySelector('.delete-button'),
      addCheckbox: document.querySelector('.add-checkbox')
    };

    if (this.addUserCheckboxValue === null) {
      this.addUserCheckboxValue = _htmlElements.addCheckbox.checked;
    } else {
      _htmlElements.addCheckbox.checked = this.addUserCheckboxValue;
    }

    _htmlElements.addCheckbox.addEventListener('change', evt => {
      this.addUserCheckboxValue = evt.target.checked;
    });

    _htmlElements.deleteButton.addEventListener('click', () => {
      const userIdToDelete = _htmlElements.deleteInput.value;
      //add isNumber validation later
      this.delete(userIdToDelete).then(status => {
        console.log(`attempt to delete user ID=${userIdToDelete}, status:`, status);
        if (status === 200) {
          _htmlElements.deleteInput.value = '';
          _htmlElements.deleteInput.focus();
        }
      });
    });
  }

  get addUserCheckboxValue() {
    return JSON.parse(localStorage.getItem('add-checkbox'));
  }

  set addUserCheckboxValue(value) {
    localStorage.setItem('add-checkbox', JSON.stringify(value));
  }

  add(name) {
    return _usersService.add(name);
  }

  delete(id) {
    return _usersService.delete(id);
  }

  get() {
    return _usersService.get();
  }

  render() {
    return this.get().then(users => {
      users.forEach(user => {
        console.log('user', user.name);
      });

      return { status: 'OK' };
    });
  }
}

export { Users };
