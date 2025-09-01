import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Footer from './components/Footer'
import noteService from './services/notes'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, // 50% chance to being marked as important
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote)) // add the newnote to the Notes array
        setNewNote('') // clear newNote so the input value is empty after adding the new note
      })
  }


  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3001/notes/${id}` // unique URL for each note resource based on its id
    const note = notes.find(n => n.id === id) // find the note we want to modify, and we then assign it to the note variable
    // note.important = !note.important --> this would work, and looks simpler, but we must NEVER mutate state directly in React, always make a copy!!!
    const changedNote = {...note, important: !note.important} // exact copy of the old note, apart from the important property that has the value flipped

    noteService
      .update(id, changedNote)
      .then( returnedNote => {
        // translation
        // go through every note in notes, if the id matches use response.data (the changedNote), if not, leave the same note
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}></input>
        <button type='submit'>save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App