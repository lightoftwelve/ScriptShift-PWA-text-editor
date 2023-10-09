// Starter Code except for where noted below
// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from "./database";
import { header } from "./header";

export default class {
  constructor() {
    const localData = localStorage.getItem("content");

    // check if CodeMirror is loaded
    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "",
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // The following code is code i wrote as there was an error in the starter code. This was in part to resolve it:
    getDb().then((data) => {
      console.log(data); // Log the data to see what you get

      // Get the content from the last entry of the array
      let lastEntryContent = data[data.length - 1]?.content;

      // Check if the content is a string before setting it to the editor
      if (typeof lastEntryContent === "string") {
        this.editor.setValue(lastEntryContent);
      } else {
        // Handle non-string data, maybe setting a default value or convert it to a string
        this.editor.setValue(localData || header || "Default content here");
      }
    });

    // Back to starter code:
    this.editor.on("change", () => {
      localStorage.setItem("content", this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on("blur", () => {
      console.log("The editor has lost focus");
      putDb(localStorage.getItem("content"));
    });
  }
}
