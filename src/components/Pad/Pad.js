import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import styles from './Pad.module.scss'
import green from '../../sounds/1.mp3'
import red from '../../sounds/2.mp3'
import blue from '../../sounds/3.mp3'
import yellow from '../../sounds/4.mp3'
import { useSelector, useDispatch } from 'react-redux'
import { setGameSequence, setGameSequenceToGuess, setRoundNumber } from '../../redux/actions'

export default function Pad(props) {
    const [play, setPlay] = useState(false)
    const [color, setColor] = useState('')
    const [canClick, setCanClick] = useState(false)


    const gameSpeed = useSelector(state => state.speed);
    const roundNumber = useSelector(state => state.roundNumber)
    const Sequence = useSelector(state => state.sequence)
    const SequenceToGuess = useSelector(state => state.sequenceToGuess)
    const dispatch = useDispatch()

    const getRandomPanel = () => {
        const panel = ['blue', 'red', 'green', 'yellow']
        return panel[parseInt(Math.random() * panel.length)]
    }

    useEffect(() => {
        //Set first sequence
        if (SequenceToGuess.length === 0 && Sequence.length === 0 && props.start) {
            const sequence = [getRandomPanel()];
            const sequenceToGuess = [...sequence];
            dispatch(setGameSequence(sequence))
            dispatch(setGameSequenceToGuess(sequenceToGuess))
            startGame(sequence)
        }
        //set New round and increase sequence
        if (SequenceToGuess.length === 0 && Sequence.length !== 0) {
            dispatch(setRoundNumber(roundNumber + 1))
            Sequence.push(getRandomPanel())
            const sequenceToGuess = [...Sequence];
            dispatch(setGameSequence(Sequence))
            dispatch(setGameSequenceToGuess(sequenceToGuess))
            startGame(Sequence)
        }

    }, [SequenceToGuess, props.start])


    const playSound = audioFile => {
        audioFile.play();
    }
    const hilight = async (color) => {
        return new Promise((resolve, reject) => {
            setPlay(true)
            setColor(color)
            playSound(setAudio(color))
            setTimeout(() => {
                setPlay(false)
                setColor('')
                setTimeout(() => {
                    resolve();
                }, 500)
            }, gameSpeed);
        })
    }
    const setAudio = (color) => {
        let audio = null;
        switch (color) {
            case 'green':
                audio = new Audio(green);
                break;
            case 'blue':
                audio = new Audio(blue);
                break;
            case 'red':
                audio = new Audio(red);
                break;
            case 'yellow':
                audio = new Audio(yellow);
                break;
        }
        return audio
    }

    const getClickedBtnColor = (color) => {
        if (!canClick) return
        //Get expected sequence
        let guessSequence = [...SequenceToGuess];
        //Get first color of sequnce
        const expectedColor = SequenceToGuess.shift();

        //Compare current clicked color and expected
        if (expectedColor === color) {
            setCanClick(false)
            playSound(setAudio(color))
            //Remove this color from guessSequnece
            setTimeout(() => {
                guessSequence.shift()
                dispatch(setGameSequenceToGuess(guessSequence))
                setCanClick(true)
            }, 1000)

        } else {
            dispatch(setGameSequence([]))
            dispatch(setGameSequenceToGuess([]))
            dispatch(setRoundNumber(1))
            setCanClick(false)
            props.setStart(false)
            alert('Game over')
        }
    }

    const startGame = async (sequence) => {
        for (const color of sequence) {
            await hilight(color)
        }
        setCanClick(true)
    }
    return (
        <div className={`${styles.pad}`}>
            <Button getClickedBtnColor={getClickedBtnColor} isPlay={play && color === 'green'} color="green" />
            <Button getClickedBtnColor={getClickedBtnColor} isPlay={play && color === 'red'} color="red" />
            <Button getClickedBtnColor={getClickedBtnColor} isPlay={play && color === 'blue'} color="blue" />
            <Button getClickedBtnColor={getClickedBtnColor} isPlay={play && color === 'yellow'} color="yellow" />
        </div>
    )
}
