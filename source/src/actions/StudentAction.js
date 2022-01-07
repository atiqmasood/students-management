import dispatcher from "../appDispatcher";
import axios from "axios";
// ACTIONS TYPES
export const LOAD_STUDENT_LIST_STARTED = "LOAD_STUDENT_LIST_STARTED";
export const LOAD_STUDENT_LIST_SUCCESS = "LOAD_STUDENT_LIST_SUCCESS";
export const LOAD_STUDENT_LIST_ERROR = "LOAD_STUDENT_LIST_ERROR";
// ADD STUDENT
export const ADD_STUDENT_STARTED = "ADD_STUDENT_STARTED";
export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS";
export const ADD_STUDENT_ERROR = "ADD_STUDENT_ERROR";
// UPDATE STUDENT
export const UPADATE_STUDENT_STARTED = "UPADATE_STUDENT_STARTED";
export const UPADATE_STUDENT_SUCCESS = "UPADATE_STUDENT_SUCCESS";
export const UPADATE_STUDENT_ERROR = "UPADATE_STUDENT_ERROR";

// BASE URL
const BASE_URL = "http://localhost:8088";
export function getStudentsList() {
  dispatcher.dispatch({ type: LOAD_STUDENT_LIST_STARTED });
  axios
    .get(`${BASE_URL}/api/Students`)
    .then((response) => {
      dispatcher.dispatch({
        type: LOAD_STUDENT_LIST_SUCCESS,
        payload: response?.data ?? [],
      });
    })
    .catch((error) => {
      dispatcher.dispatch({ type: LOAD_STUDENT_LIST_ERROR, payload: error });
    });
}
export function addStudent(data) {
  dispatcher.dispatch({ type: ADD_STUDENT_STARTED });
  return axios
    .post(`${BASE_URL}/api/Students`, data)
    .then((response) => {
      dispatcher.dispatch({
        type: ADD_STUDENT_SUCCESS,
        payload: response?.data ?? [],
      });
      return { isSuccess: true, data: response?.data };
    })
    .catch((error) => {
      dispatcher.dispatch({ type: ADD_STUDENT_ERROR, payload: error });
    });
}
// UPDATE
export function updateStudent(id, data) {
  dispatcher.dispatch({ type: UPADATE_STUDENT_STARTED });
  axios
    .put(`${BASE_URL}/api/Students/${id}`, data)
    .then((response) => {
      dispatcher.dispatch({
        type: UPADATE_STUDENT_SUCCESS,
        payload: response?.data ?? [],
      });
    })
    .catch((error) => {
      dispatcher.dispatch({ type: UPADATE_STUDENT_ERROR, payload: error });
    });
}
