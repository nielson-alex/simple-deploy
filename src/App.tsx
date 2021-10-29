import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={async () => {
            fetch("/get_location_groups")
              .then((res: any): any => res.json())
              .then((res: any): void => console.log("res:", res));
          }}
        >Click</button>
        <p>
          aaaaaaaaaaaaaaaaaaaa Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
