import React, { useState, useEffect } from 'react';
import { Note } from './components/Note';
import { Notification } from './components/Notification';
import noteService from './services/note';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app - JB 2019</em>
    </div> 
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('add a new note..')
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])

  const rows = () => notesToShow.map(note => 
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  )

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    }

    noteService
      .create(noteObject)
      .then((newNote) => {
        setNotes(notes.concat(newNote))
        setSuccessMessage(
          `Note '${newNote.content}' was updated on the server`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(changedNote => {
        setNotes(notes.map(note => note.id !== id ? note : changedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setNotes(notes.filter(n => n.id !== id))   
  }

  const notesToShow = showAll ?
    notes :
    notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification type="error" message={errorMessage} />
      <Notification type="success" message={successMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input onChange={(e) => setNewNote(e.target.value)} value={newNote} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App;
