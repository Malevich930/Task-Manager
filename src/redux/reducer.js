import { EDIT_TASK } from "./action-types";
import { DELETE_TASK } from "./action-types";
import { ADD_TASK } from "./action-types";
import { ALL_TASK } from "./action-types";
import { ADD_EDIT_TASK } from "./action-types";

const initialUserState = {
    tasks: [],
    taskEdit: ''
}

export const reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case ALL_TASK:
            return {
                ...state,
                tasks: action.task
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            };
        case ADD_EDIT_TASK:
            return {
                ...state,
                tasks: action.task
            };
        case EDIT_TASK:
            return {
                ...state,
                taskEdit: action.task
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: action.task
            };
        default:
            return state
    }
}