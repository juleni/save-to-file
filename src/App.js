import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FormDataComponent from "./components/FormDataComponent";

function App() {
  return (
    <div className="App">
      <h3>Items for Local Storage</h3>
      <FormDataComponent />
    </div>
  );
}

export default App;
