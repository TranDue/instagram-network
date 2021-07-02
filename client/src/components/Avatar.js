import { useSelector } from 'react-redux'
import React from 'react'

const Avatar = ({ src, size }) => {
    const { theme } = useSelector(state => state)

    return (
        <img src={src} alt="avatar" className={size}
            style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }} />
    )
}

export default Avatar
