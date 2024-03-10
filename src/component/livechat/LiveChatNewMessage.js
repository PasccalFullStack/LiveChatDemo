import React from 'react';
import livechat_icons from './liveChatFunction/livechat_icons';

export default function LiveChaytNewMessage(props) {
    const style_button = {
        '--newMesButBackground': 'lightgrey',
        padding: '0 2px',
        fontSize: '12px',
    }
    return (
        <>
            {props.writeNewMessage.display && (
                <div className="message_container">
                    <div className="message_title_container">
                        <p className="message_title">
                            <span style={{fontSize: '12px', fontWeight: '700'}}>
                                Nouveau message
                            </span>
                            <br></br>
                            de : <span style={{fontSize: '14px', fontWeight: '700'}}>Vous</span>
                        </p>
                        <p className="message_title" style={{color: 'blue', fontSize: '12px'}}>
                            {livechat_icons.new_message()}
                            <span
                                className="message_recep_date"
                                style={{color: props.messageLength >= 255 ? 'red' : 'blue'}}>
                            {props.messageLength} / 255
                            </span>
                        </p>
                    </div>
                    <div className="message_text_container">
                        <p className="message_text">
                            <span style={{marginLeft: '20px'}}></span>
                            <textarea
                                style={{width: '92%'}}
                                id="newMessageContent"
                                onChange={() => {
                                    props.setMessageLength(
                                    document.querySelector('#newMessageContent').value.length
                                );
                                if (document.querySelector('#newMessageContent').value.length >= 255) {
                                    document.querySelector('#newMessageContent').value = 
                                    document.querySelector('#newMessageContent').value.substr(0, 254)
                                }
                                }}>
                            </textarea>
                        </p>
                        <div className="newMessZone">
                        {props.com.communication && props.com.communication.length > 2 && (
                            <>
                                <button
                                    style={style_button}
                                    onClick={() => props.sendNewMessage('Oui')}>
                                    Oui
                                </button>
                                <button
                                    style={style_button}
                                    onClick={() => props.sendNewMessage('Peut-être')}>
                                    Peut-être
                                </button>
                                <button
                                    style={style_button}
                                    onClick={() => props.sendNewMessage('Non')}>
                                    Non
                                </button>
                            </>
                        )}
                        <button
                            style={{
                            '--newMesButBackground': '#F7D59E',
                            transform: 'scale(0.8)',
                            color: 'red',
                            }}
                            onClick={() => {
                                props.setWriteNewMessage({...props.writeNewMessage, display: false});
                                props.setMessageLength(0);
                            }}>
                            {livechat_icons.reset_message()}
                        </button>
                        <button
                            style={{'--newMesButBackground': 'lightgreen'}}
                            onClick={() => props.sendNewMessage()}>
                            {livechat_icons.send_message()}
                        </button>
                        </div>
                    </div>
                    <div className="message_arrow_user"></div>
                </div>
            )}
        </>
    )
}
