import ACTIONS from "../action";

const users = []

const userReducers = (state = users, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_USERS:
            return action.payload
        default:
            return state
    }
}

export default userReducers