import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';

const SidebarComponent = (props) => {
  const [state, setState] = useState({
    addingNote: false,
    title: null,
  });

  const { notes, classes, selectedNoteIndex } = props;

  const newNoteBtnClick = () => {
    setState({ title: null, addingNote: !state.addingNote });
  };

  const updateTitle = (txt) => {
    setState({ ...state, title: txt });
  };

  const newNote = () => {
    props.newNote(state.title);
    setState({addingNote: false})
  };

  const selectNote = (note, index) => {
    props.selectNote(note, index);
  };

  const deleteNote = (note) => {
    props.deleteNote(note);
  };

  if (notes) {
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
          {state.addingNote ? 'Cancel' : 'New Note'}
        </Button>
        {state.addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={(e) => updateTitle(e.target.value)}
            ></input>
            <Button className={classes.newNoteSubmitBtn} onClick={newNote}>
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {
            notes.map((_note, _index) => {
              return (
                <div key={_index}>
                  <SidebarItemComponent
                  _note={_note}
                  _index={_index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={selectNote}
                  deleteNote={deleteNote}
                  ></SidebarItemComponent>
                  <Divider></Divider>
                </div>
              );
            })
          }
        </List>
      </div>
    );
  } else {
    return (<div></div>);
  }
};

export default withStyles(styles)(SidebarComponent);
