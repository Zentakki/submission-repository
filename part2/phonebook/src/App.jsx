import { useState } from 'react'

const Person = ({ name, phoneNumber }) => {
  return <li>{name} {phoneNumber}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newName,
      phoneNumber: newPhoneNumber
    }

    if (
      persons.some( person => person.name === newName)
    ) {
      setNewName('')
      return (alert(`${newName} already in the phonebook`))
    } else {
      setPersons(persons.concat(newPersonObject))
      setNewName('')
      setNewPhoneNumber('')
    }
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
      filter shown <input onChange={searchName}></input>
      <h2>Add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} required />
        </div>
        <div>
          phone number: <input value={newPhoneNumber} onChange={handleNewPhoneNumber} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
            <Person key={person.name} name={person.name} phoneNumber={person.phoneNumber}/>
          ))}
      </ul>
    </div>
  )
}

export default App