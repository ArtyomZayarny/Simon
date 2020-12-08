import React from 'react'
import Button from '../Button/Button'
import styles from './Pad.module.scss'

export default function Pad(props) {
    return (
        <div className={`${styles.pad}`}>
            <Button color="red" />
            <Button color="green" />
            <Button color="blue" />
            <Button color="yellow" />
        </div>
    )
}
