import ACTIONS from './index'
import Axios from 'axios'

export const fetchAllUsers = async (token) => {
    const res = await Axios.get('/user/all_infor', {
        headers: { Authorization: token }
    })
    return res
}

export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    }
}