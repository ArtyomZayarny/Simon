import React from 'react'
import Pad from './components/Pad/Pad';

function App() {

  // const []
  return (
    <div className="App">
      <h1>Simon says</h1>
      <p>Round 1</p>
      <p>Level:<select>
        <option>easy</option>
        <option>medium</option>
        <option>hard</option>
      </select></p>
      <Pad />
      <button>start game</button>
    </div>
  );
}

export default App;
