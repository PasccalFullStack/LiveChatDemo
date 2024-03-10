import React, {useState, useEffect, useRef} from 'react';
import LiveChatControlPanel from './LiveChatControlPanel';
import LiveChatWaitingMode from './LiveChatWaitingMode';
import LiveChatDisplayMessage from './LiveChatDisplayMessage';
import LiveChatNewMessage from './LiveChatNewMessage';
import getUsers from './liveChatRequest/liveChatGetUsers';
import getCom from './liveChatRequest/liveChatGetCom';
import setNewMessage from './liveChatRequest/liveChatSetNewMessage';
import './liveChatStyle/livechat.css';

export default function LiveChat(props) {
  const [livechatDispMode, setLivechatDispMode] = useState('small');
  const [currentUserId, setCurrentUserId] = useState(0);
  const [messageLength, setMessageLength] = useState(0);
  const [containerDim, setContainerDim] = useState({
    width: '22vw',
    height: '30vh'
  });
  const [writeNewMessage, setWriteNewMessage] = useState({
    display: true,
    message: '',
    validation: '',
  });
  const refreshInterval = useRef(null);
  const sendNewMessage = (mess = '') => {
    let message = document.querySelector('#newMessageContent').value;
    if (message !== '' || mess !== '') {
      let operatorId = props.com.operator ? props.com.operator.id : 0;
      let chatId = props.com.communication.length > 0 
        ? props.com.communication[0].chat_id 
        : 0;
      let chatIssue = props.com.communication.length > 0
        ? props.com.communication[0].chat_issue 
        : '';
      let chatContinuation = props.com.length > 0
        ? props.com.communication[0].chat_continuation_nb
        : '0';
      setNewMessage(
        operatorId,
        props.showActifUser.id,
        chatId,
        chatIssue,
        chatContinuation,
        message !== '' ? message : mess,
        props.setCom,
      );
      setMessageLength(0);
      setWriteNewMessage({
        display: false,
        message: '',
        validation: '',
      });
    }
  };
  useEffect (() => {
    if (props.userList.length === 0) {
      getUsers(props.setUserList, props.pseudo.pseudo);
    }
    if (props.showActifUser.id !== currentUserId) {
      setLivechatDispMode('small');
    }
    if (props.showActifUser.id !== currentUserId && props.showActifUser.id !== 0) {
      setCurrentUserId(props.showActifUser.id);
      getCom(props.showActifUser.id, props.setCom, props.pseudo.pseudo);
      clearInterval(refreshInterval.current);
      refreshInterval.current = setInterval(() =>
        getCom(props.showActifUser.id, props.setCom, props.pseudo.pseudo),
        3000);
    }
    if (livechatDispMode !== 'small') {
      let scroll = document.querySelector('.live_chat_container');
      scroll.scrollTop = scroll.scrollHeight;
    }
    switch (livechatDispMode) {
      case 'small':
        setContainerDim({width: '20vw', height: '4.5vh', fontSize: '14px', overflowY: 'hidden'});
        break;
      case 'medium':
        setContainerDim({width: '22vw', height: '38vh', fontSize: '14px', overflowY: 'auto'});
        break;
      case 'larg':
        setContainerDim({width: '45vw', height: '80vh', fontSize: '18px', overflowY: 'auto'});
        break;
      default:
        setContainerDim({width: '20vw', height: '4vh', fontSize: '14px', overflowY: 'auto'});
        break;
    }
    return ;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [livechatDispMode, props.com, props.userList, props.showActifUser, currentUserId])
  return (
    <div 
      className="live_chat_container" 
      id="scroll_style" 
      style={{
        width: containerDim.width,
        height: containerDim.height,
        fontSize: containerDim.fontSize,
        overflowY: containerDim.overflowY,
        background: 
          livechatDispMode === 'larg'
            ? 'rgba(107, 107, 107, 0.8)'
            : 'rgba(198, 203, 241, 0.8)',
      }}>
      <LiveChatControlPanel 
        com={props.com}
        livechatDispMode={livechatDispMode}
        setLivechatDispMode={setLivechatDispMode}
        currentUserId={currentUserId}
        writeNewMessage={writeNewMessage}
        setWriteNewMessage={setWriteNewMessage} />
      {livechatDispMode === 'small' && (
        <LiveChatWaitingMode
          com={props.com} />
      )}
      {livechatDispMode !== 'small'
        && props.com.communication.length > 0 
        && props.com.communication.map((oneCom, index) => (
          <LiveChatDisplayMessage
            key={"comContainer" + index}
            oneCom={oneCom}
            com={props.com}
            setCom={props.setCom}
            index={index}
            writeNewMessage={writeNewMessage}
            setWriteNewMessage={setWriteNewMessage}
          />
      
      ))}
      <LiveChatNewMessage
        com={props.com}
        writeNewMessage={writeNewMessage}
        setWriteNewMessage={setWriteNewMessage}
        messageLength={messageLength}
        setMessageLength={setMessageLength}
        sendNewMessage={sendNewMessage} />
    </div>
  )
}
