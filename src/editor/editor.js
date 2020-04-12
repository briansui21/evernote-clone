import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import _ from 'lodash';

class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    title: '',
    id: '',
    };
  }

  updateBody = async (val) => {
    await this.setState({ text: val });
    this.update();
  };

  update = 
    _.debounce(() => {
      this.props.noteUpdate(this.state.id, {
        title: this.state.title,
        body: this.state.text,
      });
    }, 1500);

  componentDidMount = () => {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id,
    });
  };

  componentDidUpdate = () => {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id,
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input
          className={classes.titleInput}
          placeholder='Note title...'
          value={this.state.title ? this.state.title : ''}
          onChange={(e) => this.updateTitle(e.target.value)}>
        </input>
        <ReactQuill
          className={classes.editorContainer}
          value={this.state.text}
          onChange={this.updateBody}
        ></ReactQuill>
      </>
    );
  }
};

export default withStyles(styles)(EditorComponent);
