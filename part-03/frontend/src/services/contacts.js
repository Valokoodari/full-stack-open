import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newObject =>
  axios.post(baseUrl, newObject).then(response => response.data)

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)

const remove = id =>
  axios.delete(`${baseUrl}/${id}`).then(response => response.data)

const contactService = { getAll, create, update, remove }
export default contactService
