import React , {useState} from 'react';
import { updateDifficulty } from '../store.js';
 
const AddDifficulty = ({difficulty, id, dispatch, routeId}) => {

  const [routeDifficulty, setRouteDifficulty] = useState();
  const handleSelectChange = (event) => {
    setRouteDifficulty(event.target.value);
  };

  const addDifficultyLevel = () => {
    const addDifficulty  = {id: id, difficulty: routeDifficulty}
    dispatch({type: 'ADD_DIFFICULTY', payload: addDifficulty})
    updateDifficulty(routeId, routeDifficulty);
  }

  return (
    <p className="select-route">
          <select
            className="route-difficulty"
            value={routeDifficulty}
            onChange={handleSelectChange}
          >
            {difficulty
              .map((level) => (
                <option value={level}>{level}</option>
              ))}
          </select>
          <button className="difficulty-btn" type="button" onClick={addDifficultyLevel}>
            ADD
          </button>
        </p>
  )
}

export default AddDifficulty;