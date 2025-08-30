import { useState } from 'react'

const Person = ({ name, phoneNumber }) => {
  return <li>{name} {phoneNumber}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phoneNumber: '666-666-666'
    }
  ])
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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((person) => (
            <Person key={person.name} name={person.name} phoneNumber={person.phoneNumber}/>
          ))}
      </ul>
    </div>
  )
}

export default App