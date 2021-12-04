import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes";
import './App.css';

function App() {
  return (
    <div id="app-container">
      {routes()}
      <ToastContainer />
    </div>
  );
}

export default App;