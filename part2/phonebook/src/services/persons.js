import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const getUrl = axios.get(baseUrl)
    return getUrl.then(response => response.data)
}

const create = person => {
    const newPerson = axios.post(baseUrl, person)
    return newPerson.then(response => response.data)
}

const delPerson = id => {
    const deletePerson = axios.delete(`${baseUrl}/${id}`)
    return deletePerson.then(response => response.data)
}

const updatePerson = (id, newPerson) => {
    const update = axios.put(`${baseUrl}/${id}`, newPerson)
    return update.then(response => response.data)
}

export default { getAll, create, delPerson, updatePerson }