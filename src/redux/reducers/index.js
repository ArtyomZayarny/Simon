import { SET_GAME_SPEED, SET_SEQUENCE_TO_GUESS, SET_SEQUENCE, SET_ROUND_NUMBER } from '../actionsType'

const initialState = {
    speed: 1500,
    sequence: [],
    sequenceToGuess: [],
    roundNumber: 1
}

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case SET_GAME_SPEED:
            return {
                ...state,
                speed: action.payload,
                sequence: [],
                roundNumber: 1,
                sequenceToGuess: []
            }
        case SET_SEQUENCE:
            return { ...state, sequence: action.payload }
        case SET_SEQUENCE_TO_GUESS:
            return { ...state, sequenceToGuess: action.payload }
        case SET_ROUND_NUMBER:
            return { ...state, roundNumber: action.payload }

        default:
            return state
    }
}