import React from 'react';
import initLiveChatCom from './liveChatRequest/liveChatInitCom';
import livechat_icons from './liveChatFunction/livechat_icons';
import liveChatFunction from './liveChatFunction/liveChatFunction';

export default function LiveChatControlPanel(props) {
    return (
        <>
            {props.livechatDispMode !== 'larg' && props.currentUserId !== 0 && (
                <div 
                    className="screen_but" 
                    style={{'--marginTopVal': '0'}}
                    onClick={() => {
                        liveChatFunction.deploy_screen(
                            props.livechatDispMode,
                            props.setLivechatDispMode
                        );
                        if (props.com.length === 0) {
                            initLiveChatCom(
                            props.showActifUser.id,
                            props.setCom,
                            );
                        }
                    }}>
                    {livechat_icons.deploy_screen_icon()}
                </div>
            )}
            {props.livechatDispMode !== 'small' && (
                <div 
                    className="screen_but" 
                    style={{'--marginTopVal': '34px'}}
                    onClick={() => 
                        liveChatFunction.retract_screen(
                            props.livechatDispMode,
                            props.setLivechatDispMode
                    )}>
                    {livechat_icons.retract_screen_icon()}
                </div>
            )}
            {!props.writeNewMessage.display && props.livechatDispMode !== 'small' && (
                <div 
                    className="screen_but" 
                    style={{
                        '--marginTopVal': '68px',
                        '--paddingVal': '5px 5px 2px 5px',
                        '--backgroundVal':
                            'radial-gradient(rgb(104, 231, 53), rgb(176, 238, 151), rgb(104, 231, 53))',
                        '--borderVal': '1px solid rgb(0, 60, 255)',
                    }}
                    onClick={() => props.setWriteNewMessage({
                        ...props.writeNewMessage,
                        display: true,
                    })}>
                    {livechat_icons.new_message()}
                </div>
            )}
        </>
    )
}
