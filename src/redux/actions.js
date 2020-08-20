import { EDIT_TASK } from "./action-types";
import { DELETE_TASK } from "./action-types";
import { ADD_TASK } from "./action-types";
import { ALL_TASK } from "./action-types";
import { ADD_EDIT_TASK } from "./action-types";

export const allTask = (payload) => {
  return {
      type: ALL_TASK,
      task: payload
  }
};

export const addTask = (payload) => {
  return {
      type: ADD_TASK,
      task: payload
  }
};

export const deleteTask = (payload) => {
  return {
      type: DELETE_TASK,
      task: payload
  }
};

export const editTask = (payload) => {
  return {
      type: EDIT_TASK,
      task: payload
  }
};

export const addEditTask = (payload) => {
  return {
      type: ADD_EDIT_TASK,
      task: payload
  }
};
