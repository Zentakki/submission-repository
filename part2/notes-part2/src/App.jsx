import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [ notes, setNotes ] = useState(props.notes)
  const [ newNote, setNewNote ] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5, // 50% chance to being marked as important
    }
    setNotes(notes.concat(noteObject)) // add the newnote to the Notes array
    setNewNote('') // clear newNote so the input value is empty after adding the new note
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={ () => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}></input>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App