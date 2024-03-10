import axios_instance from './liveChatAxiosInst.js';

async function setNewMessage(
    operatorId,
    userId,
    chatId,
    chatIssue,
    continuationNb,
    message,
    setCom,
) {
    await axios_instance.post(
        process.env.REACT_APP_LIVE_CHAT_API,
        {
            action: "newMessage",
            operator_id: operatorId,
            user_id: userId,
            from_operator: 0,
            from_user: 1,
            chat_id: chatId,
            chat_issue: chatIssue,
            continuation_nb: continuationNb,
            message: message
        },
    )
    .then((resp) => {
        if (resp.status === 200) {
            setCom(resp.data);
        } else {
            setCom([]);
        }
    })
    .catch(() => setCom([]))
}

export default setNewMessage;