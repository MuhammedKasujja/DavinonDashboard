import { TABLE_FILTERED } from "./Types"

export function isTableFiltered(data) {
    return {
        type: TABLE_FILTERED,
        payload: { tableFiltered: data }
    }
}

