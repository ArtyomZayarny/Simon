import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Pad from './components/Pad/Pad';
import { setGameSpeed } from './redux/actions'

function App() {
  const [start, setStart] = useState(false)
  const round = useSelector(state => state.roundNumber)
  const dispatch = useDispatch();

  const setLevel = level => {
    setStart(false)
    switch (level) {
      case 'easy':
        dispatch(setGameSpeed(1500))
        break;
      case 'medium':
        dispatch(setGameSpeed(1000))
        break;
      case 'hard':
        dispatch(setGameSpeed(400))
        break
    }
  }

  return (
    <div className="App">
      <h1>Simon says</h1>
      <p>Round {round}</p>
      <p>Level:<select onChange={(e) => { setLevel(e.target.value) }}>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select></p>
      <Pad start={start} setStart={setStart} />
      <button
        onClick={() => { setStart(true) }}
        disabled={start}
      > start game</button>
    </div >
  );
}

export default App;
