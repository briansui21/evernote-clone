import React, { useState, useEffect } from "react";
import "./App.css";
import SidebarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";

const firebase = require("firebase");

const App = () => {
    const [state, setState] = useState({
        selectedNoteIndex: null,
        selectedNote: null,
        notes: null,
    });

    const initState = () => {
        firebase
            .firestore()
            .collection("notes")
            .onSnapshot((serverUpdate) => {
                const notes = serverUpdate.docs.map((_doc) => {
                    const data = _doc.data();
                    data["id"] = _doc.id;
                    return data;
                });
                console.log(notes);
                setState({ notes });
            });
    };
    useEffect(initState, []);

    return (
        <div className="app-container">
            <SidebarComponent />
            <EditorComponent />
        </div>
    );
};

export default App;
