import './App.css';
import logo from './logo.svg';
const { ipcRenderer } = window.require('electron');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=>ipcRenderer.send('close-me')}>Quit</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reloads.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React r
        </a>
      </header>
    </div>
  );
}

export default App;
