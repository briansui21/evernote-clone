import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

const firebase = require('firebase');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    };
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        this.setState({ notes });
      });
    console.log('Init app state');
  };

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter((_note) => _note !== note),
    });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1
        ? this.selectNote(
            this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex - 1
          )
        : this.setState({ selectedNoteIndex: null, selectedNote: null });
    }
    firebase.firestore().collection('notes').doc(note.id).delete();
  };

  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  };

  newNote = async (title) => {
    const newFromDb = await firebase.firestore().collection('notes').add({
      title: title,
      body: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    const newId = newFromDb.id;
    console.log(newId);
    this.setState([...this.state.notes, { title: title, body: '' }]);
    const newIndex = this.state.notes.indexOf(
      this.state.notes.filter((_note) => _note.id === newId)[0]
    );
    this.setState({
      selectedNoteIndex: newIndex,
      selectedNote: this.state.notes[newIndex],
    });
  };

  noteUpdate = async (id, noteObj) => {
    await firebase.firestore().collection('notes').doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {(() => {
          console.log(this.state);
        })()}
        {this.state.selectedNote ? (
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
