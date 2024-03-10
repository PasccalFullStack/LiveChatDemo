import axios_instance from './liveChatAxiosInst.js';

async function setMessageIsReadingState(id, userId, setCom) {
    await axios_instance.post(
        process.env.REACT_APP_LIVE_CHAT_API,
        {
            action: "setReadingState",
            message_id: id,
            user_id: userId,
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

export default setMessageIsReadingState;