import {TABLE_FILTERED} from "../actions/Types"

const initState = {
    tableFiltered: false
}

export const tableReducer = (state = initState, action) => {
    switch (action.type) {
        case TABLE_FILTERED:
            return { ...state, tableFiltered: action.payload.tableFiltered }
        default:
            return state;
    }
}