import React from 'react'
import isLoading from '../../images/id-loading-5.gif'

const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 text-center loading"
            style={{ background: "#0008", color: "white", top: 0, left: 0, zIndex: 50 }}>
            <br />
            <img style={{
                opacity: 0.7,
                position: "absolute"
            }} src={isLoading} alt="is loading" />
            <svg width="205" height="250" viewBox="0 0 40 50">
                <text fill="#fff" x="5" y="47">Chờ tí ...</text>
            </svg>

        </div>
    )
}

export default Loading
