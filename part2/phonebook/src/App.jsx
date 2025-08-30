import { useState } from 'react'

const Person = ({ name }) => {
  return <li>{name}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPersonObject = { name: newName }

    if (persons.some( person => person.name === newName)) {
      return (alert(`${newName} already in the phonebook`))
    } else {
      setPersons(persons.concat(newPersonObject))
      setNewName('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
            <Person key={person.name} name={person.name}/>
          ))}
      </ul>
    </div>
  )
}

export default App