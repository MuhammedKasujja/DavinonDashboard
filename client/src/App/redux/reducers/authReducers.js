const initState = {
    email: null
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state }
        case "REGISTER":
            return { ...state }
        default:
            return state;
    }
}