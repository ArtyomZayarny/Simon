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

    const sequence = ['blue', 'red', 'green']

    useEffect(() => {
        // hilight('blue')
        playSequence(sequence)
    }, [])

    const hilight = async (color) => {
        return new Promise((resolve, reject) => {
            console.log('color', color)
            setPlay(true)
            setColor(color)
            setTimeout(() => {
                setPlay(false)
                setColor('')
                resolve();
            }, 1000);
        })

    }

    const playSequence = async (sequence) => {
        for (const color of sequence) {
            await hilight(color)
        }
    }

    return (
        <div className={`${styles.pad}`}>
            <Button isPlay={play && color === 'green'} color="green" />
            <Button isPlay={play && color === 'red'} color="red" />
            <Button isPlay={play && color === 'blue'} color="blue" />
            <Button isPlay={play && color === 'yellow'} color="yellow" />
        </div>
    )
}
