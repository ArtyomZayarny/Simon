import { SET_GAME_SPEED, SET_SEQUENCE, SET_SEQUENCE_TO_GUESS, SET_ROUND_NUMBER } from '../actionsType'

export const setGameSpeed = value => {
    return {
        type: SET_GAME_SPEED,
        payload: value
    }
}

export const setGameSequence = sequence => {
    return {
        type: SET_SEQUENCE,
        payload: sequence
    }
}

export const setGameSequenceToGuess = sequenceToGuess => {
    return {
        type: SET_SEQUENCE_TO_GUESS,
        payload: sequenceToGuess
    }
}

export const setRoundNumber = number => {
    return {
        type: SET_ROUND_NUMBER,
        payload: number
    }
}