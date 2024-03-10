import axios_instance from './liveChatAxiosInst.js';

async function getUsers(setUserList) {
    await axios_instance.post(
        process.env.REACT_APP_LIVE_CHAT_API, 
        {
            action: 'getUsers'
        },
    )
    .then((resp) => {
        if (resp.status === 200) {
            setUserList(resp.data.userList);
        } else {
            setUserList([]);
        }
    })
    .catch(() => setUserList([]))
}

export default getUsers;