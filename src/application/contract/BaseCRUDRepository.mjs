class BaseCRUDRepository {
  add(instance) {
    return Promise.reject(Error('not implemented'));
  }

  getById(id) {
    return Promise.reject(Error('not implemented'));
  }

  getAll() {
    return Promise.reject(Error('not implemented'));
  }

  getByProp(property, value) {
    return Promise.reject(Error('not implemented'));
  }

  getByName(name) {
    return Promise.reject(Error('not implemented'));
  }

  update(instance) {
    return Promise.reject(Error('not implemented'));
  }

  delete(id) {
    return Promise.reject(Error('not implemented'));
  }

  clear() {
    return Promise.reject(new Error('not implemented'));
  }
}

export default BaseCRUDRepository;
