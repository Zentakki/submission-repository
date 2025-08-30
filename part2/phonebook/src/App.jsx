import { useState } from 'react'

const Person = ({ name, phoneNumber }) => {
  return <li>{name} {phoneNumber}</li>
}

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
          <Person key={person.name} name={person.name} phoneNumber={person.phoneNumber}/>
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
      <Filter onChange={searchName}/>
      <h2>Add a new</h2>
      <Form onSubmit={addNewPerson}
        nameValue={newName}
        nameOnChange={handleNewName}
        numberValue={newPhoneNumber}
        numberOnChange={handleNewPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App