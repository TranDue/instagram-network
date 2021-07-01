import React from 'react'
import LeftSide from '../../components/message/LeftSide'

const Message = () => {
    return (
        <div className="message d-flex">
            <div className="col-md-4 border-right px-0">
                <LeftSide />
            </div>

            <div className="col-md-8 px-0 right_mess">
                <div className="d-flex justify-content-center 
                align-items-center flex-column h-100">

                    <i className="fab fa-facebook-messenger text-primary"
                        style={{ fontSize: '5rem' }} />
                    <h3>Messenger</h3>
                    <h5>Your Messages</h5>
                    <span style={{
                        color: 'gray'
                    }}>
                        Send private photos and messages to a friend or group.
                    </span>
                    <span aria-label="Direct" className="glyphsSpriteDirect__outline__96 u-__7"></span>
                </div>
            </div>
        </div>
    )
}

export default Message
