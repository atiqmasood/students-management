import dispatcher from "../appDispatcher";
import axios from "axios";
export const LOAD_STUDENT_FAMILY_STARTED = "LOAD_STUDENT_FAMILY_STARTED";
export const LOAD_STUDENT_FAMILY_SUCCESS = "LOAD_STUDENT_FAMILY_SUCCESS";
export const LOAD_STUDENT_FAMILY_ERROR = "LOAD_STUDENT_FAMILY_ERROR";
// ADD FAMILY MEMBERS
export const ADD_FAMILY_STARTED = "ADD_FAMILY_STARTED";
export const ADD_FAMILY_SUCCESS = "ADD_FAMILY_SUCCESS";
export const ADD_FAMILY_ERROR = "ADD_FAMILY_ERROR";
// UPDATE FAMILY MEMBERS
export const UPDATE_FAMILY_STARTED = "UPDATE_FAMILY_STARTED";
export const UPDATE_FAMILY_SUCCESS = "UPDATE_FAMILY_SUCCESS";
export const UPDATE_FAMILY_ERROR = "UPDATE_FAMILY_ERROR";
// DELETE FAMILY MEMBERS
export const DELETE_FAMILY_STARTED = "DELETE_FAMILY_STARTED";
export const DELETE_FAMILY_SUCCESS = "DELETE_FAMILY_SUCCESS";
export const DELETE_FAMILY_ERROR = "DELETE_FAMILY_ERROR";

// BASE URL
const BASE_URL = "http://localhost:8088";
// get family
export function getStudentFamily(studentId) {
  dispatcher.dispatch({ type: LOAD_STUDENT_FAMILY_STARTED });
  axios
    .get(`${BASE_URL}/api/Students/${studentId}/FamilyMembers/`)
    .then((response) => {
      dispatcher.dispatch({
        type: LOAD_STUDENT_FAMILY_SUCCESS,
        payload: response?.data ?? [],
      });
    })
    .catch((error) => {
      dispatcher.dispatch({
        type: LOAD_STUDENT_FAMILY_ERROR,
        payload: error,
      });
    });
}
// ADD STUDENT FAMILY
export function addStudentFamily(studentId, data, callback) {
  dispatcher.dispatch({ type: ADD_FAMILY_STARTED });
  axios
    .post(`${BASE_URL}/api/Students/${studentId}/FamilyMembers/`, data)
    .then((response) => {
      dispatcher.dispatch({
        type: ADD_FAMILY_SUCCESS,
        payload: response?.data ?? [],
      });
      callback(response?.data?.ID);
    })
    .catch((error) => {
      dispatcher.dispatch({
        type: ADD_FAMILY_ERROR,
        payload: error,
      });
    });
}
// UPDATE STUDENT FAMILY
export function updateFamilyMember(data, id) {
  dispatcher.dispatch({ type: UPDATE_FAMILY_STARTED });
  axios
    .put(`${BASE_URL}/api/FamilyMembers/${id}`, data)
    .then((response) => {
      dispatcher.dispatch({
        type: UPDATE_FAMILY_SUCCESS,
        payload: response?.data ?? [],
      });
    })
    .catch((error) => {
      dispatcher.dispatch({
        type: UPDATE_FAMILY_ERROR,
        payload: error,
      });
    });
}
// DELETE STUDENT FAMILY
export function deleteFamilyMember(id) {
  dispatcher.dispatch({ type: DELETE_FAMILY_STARTED });
  axios
    .delete(`${BASE_URL}/api/FamilyMembers/${id}`)
    .then((response) => {
      dispatcher.dispatch({
        type: DELETE_FAMILY_SUCCESS,
        payload: response?.data ?? [],
      });
    })
    .catch((error) => {
      dispatcher.dispatch({
        type: DELETE_FAMILY_ERROR,
        payload: error,
      });
    });
}
