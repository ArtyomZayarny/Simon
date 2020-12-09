import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import styles from './Pad.module.scss'
import green from '../../sounds/1.mp3'
import red from '../../sounds/2.mp3'
import blue from '../../sounds/3.mp3'
import yellow from '../../sounds/4.mp3'

export default function Pad(props) {

    const [play, setPlay] = useState(false)
    const [color, setColor] = useState('')
    const [canClick, setCanClick] = useState(false)
    const [sequence, setSequence] = useState([])
    const [sequenceToGuess, setSequenceToGuess] = useState([])

    const getRandomPanel = () => {
        const panel = ['blue', 'red', 'green', 'yellow']
        return panel[parseInt(Math.random() * panel.length)]
    }

    useEffect(() => {
        if (sequenceToGuess.length === 0 && sequence.length === 0 && props.start) {
            const sequence = [getRandomPanel()];
            const sequenceToGuess = [...sequence];
            setSequence(sequence)
            setSequenceToGuess(sequenceToGuess)
            startGame(sequence)
        }

        if (sequenceToGuess.length === 0 && sequence.length !== 0) {
            //set New round
            sequence.push(getRandomPanel())
            const sequenceToGuess = [...sequence];
            setSequence(sequence)
            setSequenceToGuess(sequenceToGuess)
            startGame(sequence)
        }

    }, [sequenceToGuess, props.start])



    const hilight = async (color) => {
        return new Promise((resolve, reject) => {
            setPlay(true)
            setColor(color)
            setTimeout(() => {
                setPlay(false)
                setColor('')
                setTimeout(() => {
                    resolve();
                }, 250)
            }, 1000);
        })
    }

    const getClickedBtnColor = (color) => {
        if (!canClick) return
        let guessSequence = [...sequenceToGuess];
        const expectedColor = sequenceToGuess.shift();

        if (expectedColor === color) {
            //Remove this color from 
            guessSequence.shift()
            setSequenceToGuess(guessSequence)
        } else {
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
