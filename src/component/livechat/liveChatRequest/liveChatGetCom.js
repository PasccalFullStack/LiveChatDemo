import axios_instance from './liveChatAxiosInst.js';

async function getCom(userId, setCom, tester) {
    await axios_instance.post(
        process.env.REACT_APP_LIVE_CHAT_API,
        {
            action: "readCommunication",
            user_id: userId,
            tester: tester,
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

export default getCom;