import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'



Button.propTypes = {
    color: PropTypes.string,
    isPlay: PropTypes.bool,
}


Button.defaultProps = {
    color: 'gray',
    isPlay: false
}
export default function Button({ color, getClickedBtnColor, isPlay }) {


    return (
        <button onClick={() => { getClickedBtnColor(color) }} className={`${styles.btn} ${styles[color]} ${isPlay ? styles['play'] : ''}`}></button>
    )
}
