import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'
import ErrorMessage from './components/Error'

const Person = ({ name, phoneNumber, onClick }) => {
  return <li>
    {name} {phoneNumber}
    <button onClick={onClick}>delete</button>
  </li>
}

const Persons = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            phoneNumber={person.phoneNumber}
            onClick={() => onDelete(person.id, person.name)}
          />
        ))}
    </ul>
  )
}

const Filter = ({onChange}) => {
  return (
    <>
      filter shown <input onChange={onChange}></input>
    </>
  )
}

const Form = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={nameOnChange} required />
      </div>
      <div>
        phone number: <input value={numberValue} onChange={numberOnChange} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personsService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }

  useEffect(hook, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newName,
      phoneNumber: newPhoneNumber
    }

    const personExists = persons.find(p => p.name === newName)
    if (personExists) {
      const confirmMsg = `${newName} is already added to phonebook, ` +
        'do you want to replace the old number with a new one?'
      const changedP = {...personExists, phoneNumber: newPhoneNumber}
      if (window.confirm(confirmMsg)) {
        personsService.updatePerson(changedP.id, changedP)
          .then(
            // update persons with the modified person
            setPersons(persons.map(p => p.id !== changedP.id ? p : changedP)),
            setNewName(''),
            setNewPhoneNumber(''),
            setNotification(`Modified ${newName}'s number to ${newPhoneNumber}`),
            setTimeout(() =>
              setNotification(null), 5000
            )
          )
          .catch( error => {
            setNewName(''),
            setNewPhoneNumber(''),
            setErrorMessage(`Information of ${newName} has already been removed from server`),
            setTimeout(() =>
              setErrorMessage(null), 5000
            )
          }
          )
        return
      } else {
        setNewName('')
        setNewPhoneNumber('')
        return (alert(`${newName} already in the phonebook, the number was not modified`))
      }
    }
    personsService.create(newPersonObject)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhoneNumber('')
    })
    setNotification(`Added ${newName}`)
    setTimeout(() =>
      setNotification(null), 5000
    )
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const searchName = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return

    personsService.delPerson(id)
      .then(
        setPersons(
          persons.filter(p => p.id !== id)
        )
      )
  }

  let filteredPersons = persons
  if (search !== '') {
    const match = persons.filter(person =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
    filteredPersons = match.length > 0 ? match : persons

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <ErrorMessage message={errorMessage}/>
      <Filter onChange={searchName}/>
      <h2>Add a new</h2>
      <Form onSubmit={addNewPerson}
        nameValue={newName}
        nameOnChange={handleNewName}
        numberValue={newPhoneNumber}
        numberOnChange={handleNewPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App