import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'
import green from '../../sounds/1.mp3'
import red from '../../sounds/2.mp3'
import blue from '../../sounds/3.mp3'
import yellow from '../../sounds/4.mp3'


Button.propTypes = {
    color: PropTypes.string
}


Button.defaultProps = {
    color: 'gray'
}
export default function Button({ color }) {
    const [play, setPlay] = useState(false)
    const sequence = ['blue'];


    // useEffect(() => {
    //     playSequence(sequence)
    // }, [])

    // const playSequence = (sequence) => {
    //     sequence.forEach((button) => {
    //         playSound(setAudio(button))
    //     })
    // }


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
    const playSound = audioFile => {
        console.log()
        audioFile.play();
        audioFile.onended = () => { console.log('end') }
    }
    const handlePlay = () => {
        setPlay(true)
        playSound(setAudio(color))
        setInterval(() => {
            setPlay(false)
        }, 500)
    }
    return (
        <button onClick={handlePlay} className={`${styles.btn} ${styles[color]} ${play ? styles['play'] : ''}`}></button>
    )
}
